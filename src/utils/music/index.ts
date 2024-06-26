import { searchMusicObject } from "@/utils/search";
import type { SearchQuery } from "@/@types/SearchQuery";
import { readMusic } from "@/utils/music/read";

export const searchQuery = (searchObj: SearchQuery) => {
  const music = readMusic();
  return searchMusicObject(music.songs, searchObj);
}
