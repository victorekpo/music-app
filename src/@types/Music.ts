export interface Song {
  song: string;
  songInfo: SongInfo
}

export interface SongInfo {
  artist: string;
  song: string;
  genre: string;
  album: string;
  BPM: string;
  speed: string;
  mood: string;
  tags: string;
  quotes: string;
}