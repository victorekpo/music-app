/** @type {import("next").NextConfig} */
import path from "path";
import TransformJsToEnvPlugin from './webpack/plugins/TransformJsToEnvPlugin.js';

const nextConfig = {
  webpack: (config, {isServer}) => {
    // // Add custom plugin only on the server side build
     if (isServer) {
      config.plugins.push(
        new TransformJsToEnvPlugin({
          sourceDir: path.resolve(".", "config"), // Path to your config directory
          outputDir: path.resolve(".", "."), // Path where .env files should be generated
          fileMappings: {
            dev: 'development',
            int: 'development',
            qa: 'production',
            prod: 'production',
            test: 'test'
          },
          fileExt: '.js'
        })
      );
     }
    return config;
  }
};

export default nextConfig;
