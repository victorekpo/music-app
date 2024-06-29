import { gql } from "@apollo/client";

export const GET_ALL_MUSIC_QUERY = gql`
query($user: String!){
  getAllMusic(user: $user) {
    user
    songs {
      _id
      song
      songInfo {
        artist
        song
        genre
        BPM
        speed
        mood
        tags
        quotes
      }
    }
  }
}
`;