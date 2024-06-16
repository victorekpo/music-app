import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music";
import { searchSongs } from "@/utils/searchSongs";

export const GET = (req: NextRequest, { params }) => {
  const { headers, url } = req;
  const { genre } = params;

  console.log("req", headers, url, genre);

  readMusic();
  searchSongs(genre);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    genre
  });
};
