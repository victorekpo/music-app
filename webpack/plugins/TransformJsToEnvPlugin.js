const path = require('path');
const fs = require('fs').promises;

let hasRun = false;

class TransformJsToEnvPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('TransformJsToEnvPlugin', async (compilation) => {
      if (hasRun) return;
      try {
        await this.generateEnvFiles();
        hasRun=true;
      } catch (error) {
        compilation.errors.push(error);
      }
    });
  }

  async generateEnvFiles() {
    const dirPath = path.resolve(this.options.sourceDir);
    const outputDir = path.resolve(this.options.outputDir);
    console.log("dir", dirPath, outputDir)

    const files = await fs.readdir(dirPath);
    const defaultConfigPath = path.join(dirPath, 'default.js');
    console.log('DEFAULT CONFIG PATH', defaultConfigPath);

    const defaultConfig = await this.loadConfig(defaultConfigPath);
    console.log('DEFAULT CONFIG', defaultConfig);

    if (!defaultConfig) {
      throw new Error('Default configuration file not found or invalid.');
    }

    await Promise.all(files.map(file => this.processFile(file, dirPath, outputDir, defaultConfig)));
  }

  async processFile(file, dirPath, outputDir, defaultConfig) {
    const filePath = path.join(dirPath, file);
    if (file !== 'default.js' && path.extname(file) === '.js') {
      const envConfig = await this.loadConfig(filePath);

      if (envConfig) {
        const mergedConfig = { ...defaultConfig, ...envConfig };
        console.log('MERGED CONFIG', mergedConfig);

        const envContent = this.transformJsToEnv(mergedConfig);
        const envFileName = `.env.${path.basename(file, '.js')}`;
        const envFilePath = path.join(outputDir, envFileName);

        await fs.writeFile(envFilePath, envContent, 'utf8');
        console.log('WRITING FILE', envFilePath);
      }
    }
  }

  async loadConfig(filePath) {
    console.log('LOADING CONFIG', filePath);
    try {
      const config = require(filePath);
      console.log('CONFIG', config);

      if (typeof config === 'object' && config !== null) {
        return config;
      }
    } catch (e) {
      console.error('Error loading config', e);
      return null;
    }
  }

  transformJsToEnv(config, prefix = '') {
    console.log('CONFIG TO TRANSFORM', config);
    const objToEntries = Object.entries(config);
    console.log('OBJ TO ENTRIES', objToEntries);

    return objToEntries
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          console.log('VALUE IS OBJ', value);
          const newPrefix = prefix ? `${prefix}_${key}` : key;
          const nestedEnv = this.transformJsToEnv(value, newPrefix);
          console.log('NESTED ENV', nestedEnv);
          return nestedEnv;
        }
        return `${prefix ? `${prefix}_` : ''}${key}=${value}`;
      })
      .join('\n');
  }
}

module.exports = TransformJsToEnvPlugin;