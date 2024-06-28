import fs from "fs";

const musicFile = <string>process.env.musicFile;
const bkMusicFile = <string>process.env.bkMusicFile;

export const writeMusic = (currentMusic: any, newMusic: any) => {
  const oldMusicString = JSON.stringify(currentMusic, null, 2);
  const newMusicString = JSON.stringify(newMusic, null, 2);
  fs.writeFileSync(bkMusicFile, oldMusicString);
  fs.writeFileSync(musicFile, newMusicString);
};