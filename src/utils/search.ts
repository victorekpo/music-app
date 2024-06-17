/**
 * Search Algorithm for searching database of songs by queryKey and queryString
 * Key can be one of: artist, song, genre, bpm, quotes, tags, album
 * @param {Array} path Current path of nested object
 * @param {Object} obj Object to search through.
 * @param {String} queryKey The queryKey to use in the search.
 * @param {String} query The string to search for.
 */
export const searchMusicObject = (path: string[] | [], obj: Record<string, unknown>, queryKey: string, query: string) => {
  return Object.entries(obj).flatMap(([nestedKey, nestedVal]: any) => {
    if (typeof nestedVal === 'object' && nestedVal !== null) {
      // Recursively search nested objects
      return searchMusicObject([...path, nestedKey], nestedVal, queryKey, query);
    } else if (nestedKey === queryKey) {
      // Perform substring matching on the specified key
      const regex = new RegExp(query, 'i');

      if (regex.test(nestedVal)) {
        const fullPath = [...path, nestedKey].join(' > ');
        console.log(fullPath);
        return obj;
      }
    }
    return [];
  });
};