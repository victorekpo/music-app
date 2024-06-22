import { gql } from "@apollo/client";

export const SEARCH_MUSIC_QUERY = gql`
query($songQuery: String, $artistQuery: String) {
  searchMusic(songQuery: $songQuery, artistQuery: $artistQuery) {
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