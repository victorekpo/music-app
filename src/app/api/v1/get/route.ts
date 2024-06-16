import { music, readMusic } from "@/utils/music";
const { defaultPort } = process.env;
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  // const { headers, url } = req;

  readMusic();
  console.log(music);
  return NextResponse.json(music);
};
