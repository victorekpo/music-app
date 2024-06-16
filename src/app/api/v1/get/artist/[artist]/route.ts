import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music";
import { searchSongs } from "@/utils/searchSongs";

export const GET = (req: NextRequest, { params }) => {
  const { headers, url } = req;
  const { artist } = params;

  console.log("req", headers, url, artist);
  readMusic();
  searchSongs(artist);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    artist
  });
};
