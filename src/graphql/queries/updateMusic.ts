import { gql } from "@apollo/client";

export const UPDATE_MUSIC_QUERY = gql`
mutation ($oldSongId: String, $song: SongInput) {
  updateMusic(oldSongId: $oldSongId, song: $song) {
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