import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music/read";
import { searchByKey } from "@/utils/music";

export const GET = (req: NextRequest, { params }) => {
  const { genre } = params;
  const key = 'genre';

  readMusic();

  const result = searchByKey(key, genre);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    result
  });
};
