//Title: Music Database 
//Author: Victor E.
//Description: This app will be used to organize music for all uses.

//BEGIN CODE
//define constants and variables
const dir = '/home/ubuntu/projects/music/music-app'
const fs = require('fs');
const csv = require('papaparse');
const yargs = require('yargs');
const musicFile = `${dir}/MUSIC.JSON`
const importFile = `${dir}/MUSIC.CSV`;
var music, music2;
//const { songs, ...musicList } = music

//define functions
const cloneObj = () => {
// music2 = JSON.parse(JSON.stringify(music))
 music2 = Object.assign(music) //new method
}
const objtoArrObj = (data) => {
 return Object.values(data)
}
const getSongs = (obj) => {
 allSongsArr = (obj) => Object.keys(obj.songs);
 return allSongsArr(obj);
}
const updateAllSongs = (obj, newkey, newval) => {
 for (song in getSongs(obj)) {obj.songs[(getSongs(obj)[song])][newkey] = newval };
 return obj;
}
const getProps = (data, method, func) => {
  var songsInfo = [];
  Object.keys(data).forEach(function(prop) {
    songsInfo.push(data[prop]);
    if (func === undefined) {
    //check method for logs
     if (method == 1) { console.log(data); }
     else { for (p in data) { console.log(p) }; };
    }
    else { songInfo = data[prop]; func();}
  });
  //check method for return
  if (method == 1) { return songsInfo; }
  else { return "All values listed"; };
  /* Usage:
  getProps(music.songs,1)   //view object
  getProps(music.songs,0)   //view titles
  func = () => {console.log(songInfo)}  // if you need a  function
  getProps(music.songs,0,func)
  */
};
const readMusic = () => {
 let rawdata = fs.readFileSync(musicFile);
 music = JSON.parse(rawdata);
 return music;
};
const writeMusic = () => {
 let dataNew = JSON.stringify(music);
 fs.writeFileSync(musicFile, dataNew);
 return music;
};
const addMusic = (obj) => {
 const {artist, song, album, genre, BPM, speed, mood, tags, quotes} = obj;
 music.songs[artist+' - '+song]={};  
 music.songs[artist+' - '+song].artist=artist;
 music.songs[artist+' - '+song].song=song;
 music.songs[artist+' - '+song].album=album;
 music.songs[artist+' - '+song].genre=genre;
 music.songs[artist+' - '+song].BPM=BPM;
 music.songs[artist+' - '+song].speed=speed;
 music.songs[artist+' - '+song].mood=mood;
 music.songs[artist+' - '+song].tags=tags;
 music.songs[artist+' - '+song].quotes=quotes;
 return music;
};
const readCSV = async (filePath, mode) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()
  return new Promise(resolve => {
    csv.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.trim(),
      complete: results => {
	music2 = results;
	for (i in music2.data) {
		let m = music2.data[i]
		//m.BPM = parseInt(m.BPM, 10);
		if (mode == 1) { console.log(m); }
		addMusic(m);
	};
        resolve(results.data);
	if (mode == 1) { console.log('Complete', results.data.length, 'records.'); };
      }
    });
  });
};
const writeCSV = () => {
 var objects = objtoArrObj(music.songs)
 var fields = ['artist', 'song', 'album', 'genre', 'BPM', 'speed', 'mood', 'tags', 'quotes'];
 var data = objects.map(obj => [
   obj.artist,
   obj.song,
   obj.album,
   obj.genre,
   obj.BPM,
   obj.speed,
   obj.mood,
   obj.tags,
   obj.quotes
 ]);
 var csvExport = csv.unparse({ fields, data });
 return csvExport;
};
const bulkImportSongs = async (mode) => {
  music = {}; // clear the music object
  music.songs = {}; // create songs object
  let parsedData = await readCSV(importFile, mode);
};
const filterSongs = (value) => {
 obj = music.songs; // set object
 let getPath = [];
 const getParentAndGrandParent = (getPath, obj, value) => {
     for (var key in obj) {
         if (typeof obj[key] === 'object') {
             getPath.push(key.toString());
             getParentAndGrandParent(getPath, obj[key], value);
             getPath.pop();
         } else {
             let regex = new RegExp( value, 'i' );
             if (obj[key].match(regex)) {
                 console.log(getPath.toString());
             };
         };
     };
 };
 getParentAndGrandParent(getPath, obj, value);
 return "#djAlgoriddim.V";
 /* Usage: filterSongs('any key's value') */
};
const argv = yargs
    .command('read', 'View current songs')
    .command('import', 'Import songs from Google Sheets database')
    .command('filter', 'Search for songs', {
        all: {
            description: 'Search by any attribute',
            alias: 'all',
            type: 'string',
        }
    })
    .option('time', {
        alias: 't',
        description: 'Tell the present Time',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

//MAIN 
if (argv._.includes('read')) {
        readMusic(); console.log(music);
}
if (argv._.includes('import')) {
        bulkImportSongs(1); writeMusic(); console.log(music);
}
if (argv._.includes('filter')) {
        readMusic(); filterSongs(argv.all);console.log("#djAlgoriddim.V");
}
