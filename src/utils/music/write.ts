import fs from "fs";
import { execSync } from "child_process";
import { Song } from "@/@types/Music";

const musicFile = <string>process.env.musicFile;
const bkMusicFile = <string>process.env.bkMusicFile;

export const writeMusic = (currentMusic: any, newMusic: any, newSong = "Default song") => {
  const oldMusicString = JSON.stringify(currentMusic, null, 2);
  const newMusicString = JSON.stringify(newMusic, null, 2);
  fs.writeFileSync(bkMusicFile, oldMusicString);
  fs.writeFileSync(musicFile, newMusicString);
  // Commit changes
  commitChanges(newSong);
};

const commitChanges = (newSong: String) => {
  const songBranch = newSong.replaceAll(" ", "").trim();
  try {
    execSync('git pull');
    try {
      execSync(`git checkout -b NewMusic-${songBranch}`);
    } catch (err) {
      console.log("Branch already exists")
      execSync(`git branch -D NewMusic-${songBranch}`);
      execSync('git stash -u');
      execSync(`git checkout -b -f NewMusic-${songBranch}`);
    }
    execSync('git add -A');
    execSync(`git commit -m "Automated commit to write music file - ${newSong}"`);
    execSync(`git push origin NewMusic-${songBranch}`);
    execSync('git checkout master');
    execSync('git pull');
  } catch (error) {
    console.error('Error committing changes to Git:', error);
    execSync('git checkout master');
    execSync('git pull');
  }
};
