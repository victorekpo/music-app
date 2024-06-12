import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const { headers, url } = req;
  console.log("req", headers, url);
  return NextResponse.json('yooo');
};
