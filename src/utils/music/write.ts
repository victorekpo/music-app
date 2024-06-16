import fs from "fs";
import { music, musicFile } from "@/utils/music/read";

export const writeMusic = () => {
  const dataNew = JSON.stringify(music);
  fs.writeFileSync(musicFile, dataNew);
  return music;
};