import fs from "fs";
import path from "path";

export let music: any = {};

const projectDir = process.cwd();

export const musicFile = path.resolve(projectDir, 'MUSIC.JSON');

export const readMusic = () => {
  let rawData: any = fs.readFileSync(musicFile);
  music = JSON.parse(rawData);
  return music;
};
