export const typeDefs = `
  type SongInfo {
    _iD: ID!
    artist: String!
    song: String!
    album: String
    genre: String
    BPM: String
    speed: String
    mood: String
    tags: String
    quotes: String
  }
  
  type Song {
    _iD: ID!
    song: String!
    songInfo: SongInfo!
  }
  
  type MusicCollection {
    _id: ID!
    user: String,
    songs: [Song]
    
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
    getAllMusic(user: String!): MusicCollection
    getSong(song: String!): Song
    searchMusic(songQuery: String, artistQuery: String, albumQuery: String, genreQuery: String, tagsQuery: String, quotesQuery: String): [Song]
  }
  
  type Mutation {
    addMusic(user: String!, song: SongInput!): Song
    updateMusic(user: String!, oldSongId: String!, song: SongInput!): Song
  }
`;