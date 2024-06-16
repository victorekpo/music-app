import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music/read";
import { writeMusic } from "@/utils/music/write";
import { addMusic } from "@/utils/music/add";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { song } = body;

  const music = readMusic();

  const newSong = addMusic(song)

  const newMusic = {
    ...music,
    newSong
  };

  writeMusic(newMusic);

  return NextResponse.json({
    message: 'new music added',
    song
  });
};

