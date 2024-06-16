import { readCSV } from "@/utils/csvUtils";
let music: any = {};

const importFile = `${__dirname}/MUSIC.CSV`;

export const bulkImportSongs = async (mode) => {
  music = {}; // clear the music object
  music.songs = {}; // create songs object
  let parsedData = await readCSV(importFile, mode);
};
