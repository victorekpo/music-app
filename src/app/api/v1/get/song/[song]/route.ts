import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music/read";
import { searchByKey } from "@/utils/music";

export const GET = (req: NextRequest, { params }) => {
  const { song } = params;
  const key = 'song';

  readMusic();
  const result = searchByKey(key, song);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    result
  });
};
