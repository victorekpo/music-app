import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music";
import { searchSongs } from "@/utils/searchSongs";

export const GET = (req: NextRequest, { params }) => {
  const { headers, url } = req;
  const { song } = params;

  console.log("req", headers, url, song);

  readMusic();
  const result = searchSongs(song);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    result
  });
};
