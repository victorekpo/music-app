import { music, readMusic } from "@/utils/music/read";
import { searchByType } from "@/utils/music";
import { addMusic } from "@/utils/music/add";
import { writeMusic } from "@/utils/music/write";
import type { Song } from "@/@types/Music";

export const resolvers = {
  Query: {
    getAllMusic: () => {
      readMusic();
      return music;
    },
    searchMusic: (_, args) => {
      const { searchTerm, searchType } = args;
      readMusic();
      return searchByType(searchType, searchTerm);
    }
  },

  Mutation: {
    addMusic: (_, args: { song: Song }) => {
      const { song } = args;
      const music = readMusic();

      const newSong = addMusic(song)

      const newMusic = [
        ...music,
        newSong
      ];

      writeMusic(newMusic);
    }
  }
};