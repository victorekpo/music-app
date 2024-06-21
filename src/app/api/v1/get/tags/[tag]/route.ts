import { NextRequest, NextResponse } from "next/server";
import { readMusic } from "@/utils/music/read";
import { searchByKey } from "@/utils/music";

export const GET = (req: NextRequest, { params }) => {
  const { tag } = params;
  const key = 'tags';

  readMusic();

  const result = searchByKey(key, tag);

  console.log("#djAlgoriddim.V");
  return NextResponse.json({
    result
  });
};
