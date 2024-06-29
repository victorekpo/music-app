import { MusicCollections } from "@/db/models/Music";

export const readMusic = async (user: string = '667ced56d3ac2d92c0fa5326') => {
  try {
    // Step 1:  Find the music collection by user's ID
    const musicCollection = await MusicCollections.findOne({ user });

    if (!musicCollection) {
      throw new Error('Music collection not found for user');
    }

    // Step 2: Return the music collection
    // console.log(JSON.stringify(musicCollection, null, 2))
    return musicCollection;
  } catch (error) {
    console.error('Error reading music collection:', error);
    return null;
  }
};
