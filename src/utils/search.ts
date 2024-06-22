import { Song } from "@/@types/Music";
/**
 * Search Algorithm for searching database of songs by queryKey and queryString
 * Key can be one of: artist, song, genre, bpm, quotes, tags, album
 * @param {Array} songs Array of songs to search through.
 * @param {String} queryKey The queryKey to use in the search.
 * @param {String} query The string to search for.
 */
export const searchMusicObject = (songs: Song[], queryKey: string, query: string) => {
  const regex = new RegExp(query, 'i');

  return songs.filter(song => {
    const songInfo = song.songInfo;
    if (songInfo && typeof songInfo === 'object') {
      const value = songInfo[queryKey];
      if (value && regex.test(value)) {
        return true;
      }
    }
    return false;
  });
};