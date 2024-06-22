import { gql } from "@apollo/client";

export const SEARCH_MUSIC_QUERY = gql`
query($searchTerm: String!, $searchType: String!) {
  searchMusic(searchTerm: $searchTerm, searchType: $searchType) {
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