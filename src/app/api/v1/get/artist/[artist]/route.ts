import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music/read";
import { searchByKey } from "@/utils/music";

export const GET = (req: NextRequest, { params }) => {
  const { artist } = params;
  const key = 'artist';

  readMusic();
  const result = searchByKey(key, artist);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    result
  });
};
