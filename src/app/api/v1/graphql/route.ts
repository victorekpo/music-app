import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { resolvers } from "@/graphql/server/resolvers";
import { typeDefs } from "@/graphql/server/typeDefs";
import { contextMiddleware } from "@/graphql/server/middleware";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: contextMiddleware,
});

export { handler as GET, handler as POST };