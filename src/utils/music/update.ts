import { MusicCollections } from "@/db/models/Music";
import { MusicCollection, Song, SongInfo } from "@/@types/Music";

export const updateMusic = async (user: string, songId: string, updatedSongData: Partial<SongInfo>): Promise<Song | null> => {
  try {
    // Step 1. Update specific attributes of the song in MusicCollections
    const musicCollection: MusicCollection | null = await MusicCollections.findOneAndUpdate(
      { user, 'songs._id': songId },
      {
        $set: { 'songs.$.songInfo': updatedSongData }, // Update specific fields of songInfo
      },
      { new: true }
    );

    // Step 2: Check if the update was successful and retrieve the updated song info
    if (!musicCollection) {
      throw new Error(`Failed to update song with ID '${songId}'`);
    }

    const updatedSong: Song | undefined = musicCollection.songs.find((song: Song) => song._id.toString() === songId);

    if (!updatedSong) {
      throw new Error(`Failed to find updated song with ID '${songId}'`);
    }

    console.info(`Song with ID '${songId}' updated successfully.`);
    return updatedSong;
  } catch (error) {
    console.error('Error updating song:', error);
    return null;
  }
};