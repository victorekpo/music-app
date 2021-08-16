#!/bin/bash
dir="/home/ubuntu/projects/music/music-app"
DOCUMENT="1IcBU5LJmLSmIQe1j0TpJnQKDcw8lnVzrbCXcy8BpoMQ"
SHEET="1109832368"
FILE="$dir/MUSIC.CSV"
wget "https://docs.google.com/spreadsheets/d/$DOCUMENT/export?format=csv&gid=$SHEET" -O $FILE
dos2unix $FILE
/home/ubuntu/.nvm/versions/node/v14.15.1/bin/node $dir/App.js import > $dir/tmp/log
