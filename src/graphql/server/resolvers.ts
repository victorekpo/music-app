import { music, readMusic } from "@/utils/music/read";
import { searchQuery } from "@/utils/music";
import { addMusic } from "@/utils/music/add";
import { writeMusic } from "@/utils/music/write";
import type { Song } from "@/@types/Music";
import type { SearchQuery } from "@/@types/SearchQuery";

export const resolvers = {
  Query: {
    getAllMusic: () => {
      readMusic();
      return music;
    },
    searchMusic: (_, args: SearchQuery) => {
      const { songQuery, artistQuery } = args;
      readMusic();
      return searchQuery({
        songQuery,
        artistQuery
      });
    }
  },

  Mutation: {
    addMusic: (_, args: { song: Song }) => {
      const { song } = args;
      const music = readMusic();
      const newSong = addMusic(song)
      const newMusic = [
        ...music,
        {
          song: `${newSong.artist} -- ${newSong.song}`,
          songInfo: newSong
        }
      ];
      writeMusic(newMusic);
    }
  }
};