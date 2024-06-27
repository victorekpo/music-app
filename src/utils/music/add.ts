import { readMusic } from "@/utils/music/read";
import { SongInfo } from "@/@types/Music";
import { writeMusic } from "@/utils/music/write";

// Todo: Convert to database operations for transaction locks
export const addMusic = (song: SongInfo) => {
  const currentMusic = readMusic();
  const newSong = {
    song: `${ song.artist } -- ${ song.song }`,
    songInfo: song
  };
  // Get new music from current music plus new song
  const newMusic = {
    ...currentMusic,
    songs: [
      ...currentMusic.songs,
      newSong
    ]
  };

  // Save to file
  writeMusic(currentMusic, newMusic);
  return newSong;
};
