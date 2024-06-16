export const updateAllSongs = (obj, key, newval) => {
  const allSongs =  Object.keys(obj);

  for (let song in allSongs) {
    obj.songs[song][key] = newval;
  }

  return obj;
};
