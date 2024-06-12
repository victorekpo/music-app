import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest, { params }) => {
  const { headers, url } = req;
  const { song } = params;

  console.log("req", headers, url, song);

  return NextResponse.json({
    song
  });
};
