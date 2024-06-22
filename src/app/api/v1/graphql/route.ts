import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { contextMiddleware } from "@/graphql/server/middleware";
import { server } from "@/graphql/server/server";

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: contextMiddleware,
});

export { handler as GET, handler as POST };