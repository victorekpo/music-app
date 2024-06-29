import { MusicCollections } from "@/db/models/Music";
import { MusicCollection, Song, SongInfo } from "@/@types/Music";

export const addMusic = async (user: String, newSongData: SongInfo): Promise<Song | null> => {
  try {
    // Step 1: Get the MusicCollection
    const musicCollection: MusicCollection | null = await MusicCollections.findOne({ user });

    if (!musicCollection) {
      throw new Error('Music collection not found for user');
    }

    // Step 2: Add the new song to the MusicCollection
    const songTrack = `${ newSongData.artist } -- ${ newSongData.song }`;
    // Assert Song type since mongoose will automatically add the _id
    const newSong = <Song>{
      song: songTrack,
      songInfo: { ...newSongData }
    };
    musicCollection.songs.push(newSong);

    // Step 3: Save the updated MusicCollection
    await musicCollection.save();
    console.info('New song added to music collection.');
    return newSong;
  } catch (error) {
    console.error('Error adding new song:', error);
    return null;
  }
};