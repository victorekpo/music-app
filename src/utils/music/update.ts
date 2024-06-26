import { readMusic } from "@/utils/music/read";

export const updateSong = (song, key, newval) => {
  const music = readMusic();
  music.songs[song][key] = newval;
  return music;
};
