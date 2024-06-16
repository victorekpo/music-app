import fs from "fs";
import path from "path";

export let music: any = {};
const projectDir = process.cwd();
const musicFile = path.resolve(projectDir, 'MUSIC.JSON');
console.log("MUSIC FILE", musicFile);

export const addMusic = (obj) => {
  const {artist, song, album, genre, BPM, speed, mood, tags, quotes} = obj;
  music.songs[artist+' -- '+song]={};
  music.songs[artist+' -- '+song].artist=artist;
  music.songs[artist+' -- '+song].song=song;
  music.songs[artist+' -- '+song].album=album;
  music.songs[artist+' -- '+song].genre=genre;
  music.songs[artist+' -- '+song].BPM=BPM;
  music.songs[artist+' -- '+song].speed=speed;
  music.songs[artist+' -- '+song].mood=mood;
  music.songs[artist+' -- '+song].tags=tags;
  music.songs[artist+' -- '+song].quotes=quotes;
  return music;
};

export const readMusic = () => {
  let rawData: any = fs.readFileSync(musicFile);
  music = JSON.parse(rawData);
  return music;
};

export const writeMusic = () => {
  let dataNew = JSON.stringify(music);
  fs.writeFileSync(musicFile, dataNew);
  return music;
};

export const getSongs = (obj) =>  Object.keys(obj);

export const updateAllSongs = (obj, newkey, newval) => {
  for (let song in getSongs(obj)) {obj.songs[(getSongs(obj)[song])][newkey] = newval };
  return obj;
}