import { readMusic } from "@/utils/music/read";
import { searchMusicObject } from "@/utils/search";
import type { SearchQuery } from "@/@types/SearchQuery";
import type { MusicCollection, Song } from "@/@types/Music";

export const searchQuery = async (user: string, searchObj: SearchQuery): Promise<Song[] | null> => {
  const music: MusicCollection | null = await readMusic(user);

  if (!music) {
    console.error("No music found to query");
    return null;
  }

  return searchMusicObject(music.songs, searchObj);
}
