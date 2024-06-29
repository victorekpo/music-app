import { readMusic } from "@/utils/music/read";
import { searchQuery } from "@/utils/music";
import { addMusic } from "@/utils/music/add";
import { updateMusic } from "@/utils/music/update";
import type { Song } from "@/@types/Music";
import type { SearchQuery } from "@/@types/SearchQuery";

export const resolvers = {
  Query: {
    getAllMusic: async (_, { user }) => {
      return await readMusic(user);
    },

    // Not currently being used since it introduces latency, currently getting song from State
    getSong: async (_, { user, song }) => {
      const currentMusic = await readMusic(user);
      if (!currentMusic) {
        console.error('No music retrieved');
        return null;
      }
      return currentMusic.songs.find((s: Song) => s.song === song)
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
    addMusic: (_, { user, song }) => {
      return addMusic(user, song);
    },

    updateMusic: (_, { user, oldSongId, song }) => {
      return updateMusic(user, oldSongId, song);
    }
  }
};