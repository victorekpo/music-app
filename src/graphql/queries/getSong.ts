import { gql } from "@apollo/client";

export const GET_SONG_QUERY = gql`
query($song: String) {
  getSong(song: $song) {
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