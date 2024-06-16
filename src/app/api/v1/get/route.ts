import { music, readMusic } from "@/utils/music/read";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  readMusic();
  return NextResponse.json(music);
};
