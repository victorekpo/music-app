import type { Song } from "@/@types/Music";
import type { SearchQuery } from "@/@types/SearchQuery";
/**
 * Advanced Search Algorithm for searching database of songs using multiple query parameters
 * @param {Array} songs Array of song objects to search through.
 * @param {Object} searchObj Object containing query parameters.
 * @returns {Array} An array of matching song objects.
 */
export const searchMusicObject = (songs: Song[], searchObj: SearchQuery): Song[] => {
  // Create a list of query keys and their corresponding values
  const queries = Object.entries(searchObj).filter(([_, value]) => value);

  // If there are no queries, return all songs
  if (queries.length === 0) return songs;

  return songs.filter(song => {
    const songInfo = song.songInfo;
    if (songInfo && typeof songInfo === 'object') {
      // Check all queries against the songInfo
      return queries.every(([queryKey, queryValue]: any) => {
        const regex = new RegExp(queryValue, 'i');
        const key = queryKey.replace('Query',''); // clean up queryKey
        const value = songInfo[key];
        return value && regex.test(value);
      });
    }
    return false;
  });
};