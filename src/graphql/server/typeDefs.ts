export const typeDefs = `
  type SongInfo {
    artist: String
    song: String
    album: String
    genre: String
    BPM: String
    speed: String
    mood: String
    tags: String
    quotes: String
  }
  
  type Song {
    song: String
    songInfo: SongInfo
  }
  
  input SongInput {
    artist: String
    song: String
    album: String
    genre: String
    BPM: String
    speed: String
    mood: String
    tags: String
    quotes: String
  }
  
  type Query {
    getAllMusic: [Song]
    getSong(song: String): Song
    searchMusic(songQuery: String, artistQuery: String, albumQuery: String, genreQuery: String, tagsQuery: String, quotesQuery: String): [Song]
  }
  
  type Mutation {
    addMusic(song: SongInput): Song
  }
`;