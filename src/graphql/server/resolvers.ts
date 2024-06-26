import { music, readMusic } from "@/utils/music/read";
import { searchQuery } from "@/utils/music";
import { addMusic } from "@/utils/music/add";
import { writeMusic } from "@/utils/music/write";
import type { SongInfo } from "@/@types/Music";
import type { SearchQuery } from "@/@types/SearchQuery";

export const resolvers = {
  Query: {
    getAllMusic: () => {
      readMusic();
      return music;
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
      readMusic();
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
    }
  }
};