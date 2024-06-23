import { searchMusicObject } from "@/utils/search";
import { music } from "@/utils/music/read";
import type { SearchQuery } from "@/@types/SearchQuery";

export const searchQuery = (searchObj: SearchQuery) => searchMusicObject(music.songs, searchObj);
