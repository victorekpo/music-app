import nodeConfig, { IUtil } from "config";

declare module 'config' {
  export interface IConfig {
    get<T>(setting: string): T;
    has(setting: string): boolean;
    util: IUtil;
    defaultPort: string;
    hostname: string;
    dev: boolean;
    mappedPaths: { [key: string]: string };
  }
}

const config = {
  defaultPort: nodeConfig.get<string>('defaultPort'),
  hostname: nodeConfig.get<string>('hostname'),
  dev: nodeConfig.get<boolean>('dev'),
  mappedPaths: nodeConfig.get<{ [key: string]: string }>('mappedPaths')
};

export default config;