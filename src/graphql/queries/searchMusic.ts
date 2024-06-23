import { gql } from "@apollo/client";

export const SEARCH_MUSIC_QUERY = gql`
query($songQuery: String, $artistQuery: String, $albumQuery: String, $genreQuery: String, $tagsQuery: String, $quotesQuery: String) {
  searchMusic(songQuery: $songQuery, artistQuery: $artistQuery, albumQuery: $albumQuery, genreQuery: $genreQuery, tagsQuery: $tagsQuery, quotesQuery: $quotesQuery) {
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