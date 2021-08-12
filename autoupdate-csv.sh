#!/bin/bash
DOCUMENT="1IcBU5LJmLSmIQe1j0TpJnQKDcw8lnVzrbCXcy8BpoMQ"
SHEET="1109832368"
FILE="/home/ubuntu/projects/music/music-app/MUSIC.CSV"
wget "https://docs.google.com/spreadsheets/d/$DOCUMENT/export?format=csv&gid=$SHEET" -O $FILE
dos2unix $FILE
