import { gql } from "@apollo/client";

export const GET_ALL_MUSIC_QUERY = gql`
query {
  getAllMusic {
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