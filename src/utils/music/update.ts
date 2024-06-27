import { readMusic } from "@/utils/music/read";
import { Song, SongInfo } from "@/@types/Music";
import { writeMusic } from "@/utils/music/write";

export const updateMusic = (oldSongId: String, song: SongInfo) => {
  const musicObj = readMusic();

  // Filter out old songId in music object
  const arrayWithoutSong = musicObj.songs.filter((song: Song) => song.song !== oldSongId);

  // Add new song to music object
  const newSong = {
    song: `${song.artist} -- ${song.song}`,
    songInfo: { ...song }
  };

  const newMusicObj = {
    ...musicObj,
    songs: [
      ...arrayWithoutSong,
      newSong
    ]
  }

  // Write files with new music object
  writeMusic(musicObj, newMusicObj)

  return newSong;
};
