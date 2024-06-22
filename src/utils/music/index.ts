import { searchMusicObject } from "@/utils/search";
import { music } from "@/utils/music/read";

export const searchByType = (type: string, songQuery: string) => searchMusicObject(music.songs, type, songQuery);
