/** @type {import("next").NextConfig} */
import path from "path";
// import TransformJsToEnvPlugin from './plugins/TransformConfigEnv';
import fs from "node:fs";

const nextConfig = {
  webpack: (config, {isServer}) => {
    // Add custom plugin only on the server side build
    if (isServer) {
      config.plugins.push(
        new TransformJsToEnvPlugin({
          sourceDir: path.resolve(".", "config"), // Path to your config directory
          outputDir: path.resolve(".", ".") // Path where .env files should be generated
        })
      );
    }

    return config;
  }
};


class TransformJsToEnvPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('TransformJsToEnvPlugin', async (compilation, callback) => {
      try {
        await this.generateEnvFiles();
        callback();
      } catch (error) {
        compilation.errors.push(error);
        callback();
      }
    });
  }

  async generateEnvFiles() {
    const dirPath = path.resolve(this.options.sourceDir);
    const outputDir = path.resolve(this.options.outputDir);

    const files = await fs.promises.readdir(dirPath);
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

        await fs.promises.writeFile(envFilePath, envContent, 'utf8');
        console.log('WRITING FILE', envFilePath);
      }
    }
  }

  async loadConfig(filePath) {
    console.log('LOADING CONFIG', filePath);
    try {
      const configModule = await import(filePath);
      const config = configModule.default;
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


export default nextConfig;
