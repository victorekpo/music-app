import { readMusic } from "@/utils/music/read";
import { searchQuery } from "@/utils/music";
import { addMusic } from "@/utils/music/add";
import { updateMusic } from "@/utils/music/update";
import type { SongInfo } from "@/@types/Music";
import type { SearchQuery } from "@/@types/SearchQuery";

export const resolvers = {
  Query: {
    // Not currently being used since it introduces latency, currently reading the file at initial load and passing into Provider
    getAllMusic: () => {
      const currentMusic = readMusic();
      return currentMusic.songs;
    },
    // Not currently being used since it introduces latency, currently getting song from State
    getSong: (_, args: { song: string }) => {
      const{ song } = args;
      const currentMusic = readMusic();
      return currentMusic.songs.find((s: SongInfo) => s.song === song)
    },
    searchMusic: (_, args: SearchQuery) => {
      const {
        songQuery,
        artistQuery,
        albumQuery,
        genreQuery,
        tagsQuery,
        quotesQuery
      } = args;
      return searchQuery({
        songQuery,
        artistQuery,
        albumQuery,
        genreQuery,
        tagsQuery,
        quotesQuery
      });
    }
  },

  Mutation: {
    addMusic: (_, args: { song: SongInfo }) => {
      const { song } = args;
      return addMusic(song);
    },
    updateMusic: (_, args: { oldSongId: String, song: SongInfo }) => {
      const { oldSongId, song } = args;
      return updateMusic(oldSongId, song);
    }
  }
};