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
    compiler.hooks.emit.tapAsync("TransformJsToEnvPlugin", (compilation, callback) => {
      const dirPath = path.resolve(this.options.sourceDir);
      const outputDir = path.resolve(this.options.outputDir);

      fs.readdir(dirPath, async (err, files) => {
        if (err) {
          compilation.errors.push(err);
          callback();
          return;
        }

        const defaultConfigPath = path.join(dirPath, "default.js");

        console.log("DEFAULT CONFIG PATH", defaultConfigPath);

        // Read default configuration
        const defaultConfig = await this.loadConfig(defaultConfigPath);
        console.log("DEFAULT CONFIG", defaultConfig);

        if (!defaultConfig) {
          compilation.errors.push(new Error("Default configuration file not found or invalid."));
          callback();
          return;
        }

        files.forEach(file => {
          (async () => {
            const filePath = path.join(dirPath, file);
            if (file !== "default.js" && path.extname(file) === ".js") {
              const envConfig = await this.loadConfig(filePath);

              if (envConfig) {
                const mergedConfig = {...defaultConfig, ...envConfig};
                console.log("MERGED CONFIG", mergedConfig);
                const envContent = this.transformJsToEnv(mergedConfig);

                const envFileName = `.env.${path.basename(file, ".js")}`;
                const envFilePath = path.join(outputDir, envFileName);

                fs.writeFile(envFilePath, envContent, "utf8", (err) => {
                  console.log("WRITING FILE");
                  if (err) {
                    compilation.errors.push(err);
                  }
                });
              }
            }
          })();
        });

        callback();
      });
    });
  }

  async loadConfig(filePath) {
    console.log("LOADING CONFIG", filePath);
    try {
      const configModule = await import(filePath);
      const config = configModule.default;
      console.log("CONFIG", config.default);

      if (typeof config === "object" && config !== null) {
        return config;
      }
    } catch (e) {
      return null;
    }
  }

  transformJsToEnv(config, prefix) {
    console.log("CONFIG TO TRANSFORM", config);
    const objToEntries = Object.entries(config);
    console.log("OBJ TO ENTRIES", objToEntries);
    return objToEntries
      .map(([key, value]) => {
        let valueToReturn=value;
        if (typeof value === "object") {
          console.log("VALUE IS OBJ", value);
          const addPrefix = prefix ? prefix + '_' + key : key;
          const valueToReturn = this.transformJsToEnv(value, addPrefix);
          console.log("OBJVALUERETURN", valueToReturn);
          return valueToReturn;
        }
        return `${prefix ? prefix + '_' + key : '' + key}=${valueToReturn}`;
      })
      .join("\n");
  }
}


export default nextConfig;
