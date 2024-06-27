import fs from "fs";

const musicFile = <string>process.env.musicFile;

export const readMusic = () => {
  let rawData: any = fs.readFileSync(musicFile);
  return JSON.parse(rawData);
};
