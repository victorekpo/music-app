import fs from "fs";

export let music: any = {};

const musicFile = <string>process.env.musicFile;

export const readMusic = () => {
  let rawData: any = fs.readFileSync(musicFile);
  music = JSON.parse(rawData);
  return music;
};
