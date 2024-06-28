import { searchMusicObject } from "@/utils/search";
import type { SearchQuery } from "@/@types/SearchQuery";
import { readMusic } from "@/utils/music/read";

export const searchQuery = async (user: string, searchObj: SearchQuery) => {
  const music = await readMusic(user);
  return searchMusicObject(music.songs, searchObj);
}
