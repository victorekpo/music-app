import fs from "fs";
import { music } from "@/utils/music/read";

const musicFile = <string>process.env.musicFile;
const bkMusicFile = <string>process.env.bkMusicFile;

export const writeMusic = (newMusic: any) => {
  const oldMusicString = JSON.stringify(music, null, 2);
  const newMusicString = JSON.stringify(music, null, 2);
  fs.writeFileSync(bkMusicFile, oldMusicString);
  fs.writeFileSync(musicFile, newMusicString);
};