import { music } from "@/utils/music/read";

export const updateSong = (song, key, newval) => {
  music.songs[song][key] = newval;
};
