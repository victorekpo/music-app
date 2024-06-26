import { gql } from "@apollo/client";

export const ADD_MUSIC_QUERY = gql`
mutation ($song: SongInput) {
  addMusic(song: $song) {
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
      __typename
    }
    __typename
  }
}
`;