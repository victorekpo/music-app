const path = require('path');
const fs = require('fs').promises;

let hasRun = false;
const DEFAULT_CONFIG = 'default';
const LOCAL_CONFIG = 'local';
const DEFAULT_ENV_FILE = '.env';
const ENV_FILE_PREFIX = '.env';
const FILE_ENCODING = 'utf8';


class TransformConfigToEnvPlugin {
  defaultFileExt = 'js';
  defaultConfigMappings = {
    dev: 'development',
    prod: 'production',
    test: 'test'
  };

  constructor(options) {
    this.options = options || {};
    this.currentEnv = process.env.NODE_CONFIG_ENV;
  }

  apply(compiler) {
    compiler.hooks.done.tapPromise('TransformJsToEnvPlugin', async (compilation) => {
      // Only run once
      if (hasRun) return;
      await this.run(compilation);
    });
  }

  async run(compilation) {
    try {
      await this.cleanEnvFiles();
      await this.generateEnvFiles();
      hasRun = true;
    } catch (error) {
      compilation.errors.push(error);
    }
  }

  async cleanEnvFiles() {
    const { outputDirPath } = this.getDirectories();
    const filesToClean = [
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      '.env.development',
      '.env.production',
      '.env.test'
    ]

    await Promise.all(filesToClean.map(async file => {
      const filePath = path.join(outputDirPath, file);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        if (err.code === 'ENOENT') {
          // Do nothing
          // console.log(`File not found: ${ file }`);
        } else {
          console.error('Error:', err);
          throw err;
        }
      }
    }));
  }

  async generateEnvFiles() {
    const { sourceDirPath, outputDirPath } = this.getDirectories();
    const files = await this.getFiles();
    await Promise.all(files.map(file => this.processFile(file, sourceDirPath, outputDirPath)));
  }

  getDirectories() {
    const { sourceDir, outputDir } = this.options;
    const sourceDirPath = path.resolve(sourceDir);
    const outputDirPath = path.resolve(outputDir);
    return { sourceDirPath, outputDirPath };
  }

  async getFiles() {
    const fileExt = (this.options.fileExt || this.defaultFileExt).replace('.', '');
    const { sourceDirPath } = this.getDirectories();
    const defaultConfigFile = `${ DEFAULT_CONFIG }.${ fileExt }`;
    const currentConfigFile = this.currentEnv ? `${ this.currentEnv }.${ fileExt }` : null;
    const localConfigExists = await this.fileExists(`${ LOCAL_CONFIG }.${ fileExt }`, sourceDirPath);
    const localConfigFile = localConfigExists  ? `${ LOCAL_CONFIG }.${ fileExt }` : null;

    if (!this.currentEnv) {
      console.log("NODE_CONFIG_ENV variable not set, using default configuration only");
    }
    // Filter out currentConfigFile if the NODE_CONFIG_ENV has not been set
    return [defaultConfigFile, currentConfigFile, localConfigFile].filter(x => !!x);
  }

  async fileExists(configFile, sourceDirPath) {
    const filePath = path.join(sourceDirPath, configFile);
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async processFile(configFile, sourceDirPath, outputDirPath) {
    const filePath = path.join(sourceDirPath, configFile);
    const pathname = path.basename(filePath).split('.')[ 0 ];
    const configMappings = this.options.configMappings || this.defaultConfigMappings;

    const envConfig = await this.loadConfig(filePath);

    if (envConfig) {
      const envContent = this.transformConfigToEnv(envConfig);
      if (pathname === DEFAULT_CONFIG) {
        const envFilePath = path.join(outputDirPath, DEFAULT_ENV_FILE);
        await fs.writeFile(envFilePath, envContent, FILE_ENCODING);
      } else if (pathname === this.currentEnv) {
        const mappedNodeEnv = configMappings[ pathname ];
        const envFilePath = path.join(outputDirPath, `${ ENV_FILE_PREFIX }.${ mappedNodeEnv }`);
        await fs.writeFile(envFilePath, envContent, FILE_ENCODING);
      } else if (pathname === LOCAL_CONFIG) {
        const envFilePath = path.join(outputDirPath, `${ ENV_FILE_PREFIX }.${ LOCAL_CONFIG}`);
        await fs.writeFile(envFilePath, envContent, FILE_ENCODING);
      } else {
        throw new Error('Pathname not recognized');
      }
    }
  }

  async loadConfig(filePath) {

    try {
      const config = require(filePath);

      if (typeof config === 'object' && config !== null) {
        return config;
      }
    } catch (e) {
      console.error('Error loading config', e);
      throw new Error('Error loading config', e);
    }
  }

  transformConfigToEnv(config, prefix = '') {
    return Object.entries(config)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          const newPrefix = prefix ? `${ prefix }_${ key }` : key;
          return this.transformConfigToEnv(value, newPrefix);
        }
        return `${ prefix ? `${ prefix }_` : '' }${ key }=${ value }`;
      })
      .join('\n');
  }
}

module.exports = TransformConfigToEnvPlugin;