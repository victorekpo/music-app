//Title: Music Database 
//Author: Victor E.
//Description: This app will be used to organize music for all uses.

//BEGIN CODE
//define constants and variables
const fs = require('fs');
const csv = require('csv-parser');
const musicFile = 'MUSIC.JSON'
const importFile='music-import.csv';
var music, music2;
//const { songs, ...musicList } = music

//define functions
const readMusic = () => {
 let rawdata = fs.readFileSync(musicFile);
 music = JSON.parse(rawdata);
 return music;
}
const writeMusic = () => {
 let dataNew = JSON.stringify(music);
 fs.writeFileSync(musicFile, dataNew);
 return music;
}
const addMusic = (artist, song, genre, BPM, speed, mood, tags) => {
 music.songs[artist+' - '+song]={};  
 music.songs[artist+' - '+song].artist=artist;
 music.songs[artist+' - '+song].song=song;
 music.songs[artist+' - '+song].genre=genre;
 music.songs[artist+' - '+song].BPM=BPM;
 music.songs[artist+' - '+song].speed=speed;
 music.songs[artist+' - '+song].mood=mood;
 music.songs[artist+' - '+song].tags=tags;
 return music;
}
const cloneObj = () => {
// music2 = JSON.parse(JSON.stringify(music))
 music2 = Object.assign(music) //new method
}
const getSongs = (obj) => {
 allSongsArr = (obj) => Object.keys(obj.songs);
 return allSongsArr(obj);
}
const updateAllSongs = (obj, newkey, newval) => {
 for (song in getSongs(obj)) {obj.songs[(getSongs(obj)[song])][newkey] = newval };
 return obj;
}
const bulkImportSongs = (inputCSV=importFile) => {
 fs.createReadStream(inputCSV)
 .pipe(csv())
 .on('data', function(data){
     try {
	data.BPM = parseInt(data.BPM, 10);
	addMusic(data.artist, data.song, data.genre, data.BPM, data.speed, data.mood, data.tags)
         //perform the operation
     }
     catch(err) {
         //error handler
     }
 })
 .on('end',function(){
	console.log("All songs imported");
	music;
     //some final operation
 });
}

//MAIN 
readMusic();
//console.log(JSON.stringify(music));
console.log(music);
