import { gql } from "@apollo/client";

export const ADD_MUSIC_QUERY = gql`
mutation($song: String, $artist: String, $album: String, $genre: String, $tags: String, $quotes: String) {
  addMusic(song: $song, artist: $artist, album: $album, genre: $genre, tags: $tags, quotes: $quotes) {
    song
    songInfo {
      artist
      song
      genre
      album
      BPM
      speed
      mood
      tags
      quotes
    }
  }
}
`;