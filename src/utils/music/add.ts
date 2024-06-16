import { music } from "@/utils/music/read";

export const addMusic = (obj) => {
  const {
    artist,
    song,
    album = '',
    genre = '',
    BPM = '',
    speed = '',
    mood = '',
    tags = [],
    quotes = []
  } = obj;

  const key = `${artist} -- ${song}`;

  music.songs[key] = {
    artist,
    song,
    album,
    genre,
    BPM,
    speed,
    mood,
    tags,
    quotes
  };

  return music;
};
