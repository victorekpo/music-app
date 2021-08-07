//Title: Music Database 
//Author: Victor E.
//Description: This app will be used to organize music for all uses.

//BEGIN CODE
//define constants and variables
const fs = require('fs');
const csv = require('papaparse');
const yargs = require('yargs');
const musicFile = 'MUSIC.JSON'
const importFile='music-import.csv';
var music, music2;
//const { songs, ...musicList } = music

//define functions
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
 const {artist, song, genre, BPM, speed, mood, tags} = obj;
 music.songs[artist+' - '+song]={};  
 music.songs[artist+' - '+song].artist=artist;
 music.songs[artist+' - '+song].song=song;
 music.songs[artist+' - '+song].genre=genre;
 music.songs[artist+' - '+song].BPM=BPM;
 music.songs[artist+' - '+song].speed=speed;
 music.songs[artist+' - '+song].mood=mood;
 music.songs[artist+' - '+song].tags=tags;
 return music;
};
const readCSV = async (filePath) => {
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
		console.log(m);
		addMusic(m);
	};
        resolve(results.data);
	console.log('Complete', results.data.length, 'records.');
      }
    });
  });
};
const bulkImportSongs = async () => {
  music = {}; // clear the music object
  music.songs = {}; // create songs object
  let parsedData = await readCSV(importFile);
};
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
             if (obj[key].includes(value)) {
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
    .command('read', 'Tells whether an year is leap year or not')
    .command('filter', 'Tells whether an yasdfadear is leap year or not', {
        all: {
            description: 'the year to casdfheck for',
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
       console.log("test"); readMusic();console.log(music);
}
if (argv._.includes('filter')) {
        readMusic(); filterSongs(argv.all);console.log("#djAlgoriddim.V");
}
