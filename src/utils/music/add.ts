import { MusicCollections } from "@/db/models/Music";
import { SongInfo } from "@/@types/Music";

export const addMusic = async (user: String, newSongData: SongInfo) => {
  try {
    // Step 1: Get the MusicCollection
    const musicCollection = await MusicCollections.findOne({ user });

    if (!musicCollection) {
      throw new Error('Music collection not found for user');
    }

    // Step 2: Add the new song to the MusicCollection
    const songTrack = `${ newSongData.artist } -- ${ newSongData.song }`;
    const newSong = {
      song: songTrack,
      songInfo: { ...newSongData }
    };
    musicCollection.songs.push(newSong);

    // Step 3: Save the updated MusicCollection
    await musicCollection.save();
    console.log('New song added to music collection.');
    return newSong;
  } catch (error) {
    console.error('Error adding new song:', error);
  }
};