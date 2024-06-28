import { readMusic } from "@/utils/music/read";
import { searchQuery } from "@/utils/music";
import { addMusic } from "@/utils/music/add";
import { updateMusic } from "@/utils/music/update";
import type { SongInfo } from "@/@types/Music";
import type { SearchQuery } from "@/@types/SearchQuery";

export const resolvers = {
  Query: {
    getAllMusic: async (_, { user }) => {
      const currentMusic = await readMusic(user);
      console.log("music found", currentMusic.songs.length)
      return currentMusic;
    },

    // Not currently being used since it introduces latency, currently getting song from State
    getSong: async (_, { user, song }) => {
      const currentMusic = await readMusic(user);
      return currentMusic.songs.find((s: SongInfo) => s.song === song)
    },

    searchMusic: (_, args: SearchQuery & { user: string }) => {
      const {
        songQuery,
        artistQuery,
        albumQuery,
        genreQuery,
        tagsQuery,
        quotesQuery,
        user
      } = args;
      return searchQuery(user, {
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
    addMusic: (_, { song, user }) => {
      return addMusic(user, song);
    },

    updateMusic: (_, { user, oldSongId, song }) => {
      return updateMusic(user, oldSongId, song);
    }
  }
};