const { defaultPort } = process.env;
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const { headers, url } = req;
  console.log("req", headers, url);
  console.log("route ENV", defaultPort)
  return NextResponse.json('yooo');
};
