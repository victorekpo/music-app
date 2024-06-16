import { music } from "@/utils/music";

const getParentAndGrandParent = (path, obj, key, value) => {
  return Object.entries(obj).flatMap(([nestedKey, nestedVal]: any) => {
    if (typeof nestedVal === 'object' && nestedVal !== null) {
      // Recursively search nested objects
      return getParentAndGrandParent([...path, nestedKey], nestedVal, key, value);
    } else if (nestedKey === key) {
      // Perform substring matching on the specified key
      const regex = new RegExp(value, 'i');
      if (regex.test(nestedVal)) {
        const fullPath = [...path, nestedKey].join(' > ');
        console.log(fullPath);
        return obj;
      }
    }
    return [];
  });
};

export const searchSongs = (songQuery: any) => getParentAndGrandParent([], music.songs, 'song', songQuery);
