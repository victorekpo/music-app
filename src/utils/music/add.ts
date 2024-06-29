import { MusicCollections } from "@/db/models/Music";
import type { MusicCollection, Song, SongInfo } from "@/@types/Music";

export const addMusic = async (user: String, newSongData: SongInfo): Promise<Song | null> => {
  try {
    // Step 1: Get the MusicCollection
    const musicCollection: MusicCollection | null = await MusicCollections.findOne({ user });

    if (!musicCollection) {
      throw new Error('Music collection not found for user');
    }

    // Step 2: Create the song track and check if it already exists
    const songTrack = `${newSongData.artist} -- ${newSongData.song}`;
    const songExists = musicCollection.songs.some(song => song.song === songTrack);

    if (songExists) {
      console.info('Song already exists in the music collection.');
      throw new Error('Track already exists');
    }

    // Step 3: Add the new song to the MusicCollection
    const newSong = <Song>{
      song: songTrack,
      songInfo: { ...newSongData }
    };
    musicCollection.songs.push(newSong);

    // Step 4: Save the updated MusicCollection
    await musicCollection.save();
    console.info('New song added to music collection.');
    return newSong;
  } catch (error) {
    console.error('Error adding new song:', error);
    throw new Error(error);
  }
};