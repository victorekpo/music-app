import { searchMusicObject } from "@/utils/search";
import { music } from "@/utils/music/read";

export const searchByKey = (key, songQuery: any) => searchMusicObject([], music.songs, key, songQuery);
