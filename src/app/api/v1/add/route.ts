import { NextRequest, NextResponse } from "next/server";
import { music, writeMusic } from "@/utils/music";
import { bulkImportSongs } from "@/utils/importSongs";

const { defaultPort } = process.env;

export const GET = async (req: NextRequest) => {
  const { headers, url } = req;

  console.log("req", headers, url);
  console.log("route ENV", defaultPort)

  await bulkImportSongs(1);
  writeMusic();

  console.log(music);
  return NextResponse.json('yooo');
};

