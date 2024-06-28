// import fs from "fs";
// import { parse, unparse } from "papaparse/papaparse";
//
// export const readCSV = async (filePath, mode) => {
//   const csvFile = fs.readFileSync(filePath)
//   const csvData = csvFile.toString()
//
//   return new Promise(resolve => {
//     parse(csvData, {
//       header: true,
//       skipEmptyLines: true,
//       transformHeader: (header: string) => header.trim(),
//       complete: (results: any) => {
//         for (let i in results.data) {
//           let m = results.data[i]
//           //m.BPM = parseInt(m.BPM, 10);
//           if (mode == 1) { console.log(m); }
//           music(m);
//         }
//         resolve(results.data);
//
//         if (mode == 1) {
//           console.log('Complete', results.data.length, 'records.');
//         }
//       }
//     });
//   });
// };
//
// export const writeCSV = () => {
//   const objects = Object.values(music.songs);
//   const fields = ['artist', 'song', 'album', 'genre', 'BPM', 'speed', 'mood', 'tags', 'quotes'];
//   const data = objects.map((obj: any) => fields.map(field => obj[field]));
//   return unparse({ fields, data });
// };
//
// const importFile = `${__dirname}/MUSIC.CSV`;
//
// export const importCSV = async (mode) => {
//   delete music.songs; // clear the music object
//   music.songs = {}; // create songs object
//   let parsedData = await readCSV(importFile, mode);
// };
