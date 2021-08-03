//Title: Music Database 
//Author: Victor E.
//Description: This app will be used to organize music for all uses.

//BEGIN CODE
//define constants
const fs = require('fs');
const musicFile = 'MUSIC.JSON'
var music;
var inputFile='music-import.csv';

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
const addMusic = (artist, song, genre, BPM, speed, mood) => {
 music.songs[artist+' - '+song]={};  
 music.songs[artist+' - '+song].artist=artist;
 music.songs[artist+' - '+song].song=song;
 music.songs[artist+' - '+song].genre=genre;
 music.songs[artist+' - '+song].BPM=BPM;
 music.songs[artist+' - '+song].speed=speed;
 music.songs[artist+' - '+song].mood=mood;
 return music;
}

readMusic();
//console.log(JSON.stringify(music));
console.log(music);
