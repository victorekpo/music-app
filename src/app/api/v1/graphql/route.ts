import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { resolvers } from "@/app/api/v1/graphql/resolvers";
import { typeDefs } from "@/app/api/v1/graphql/typeDefs";
import { contextMiddleware } from "@/app/api/v1/graphql/middleware";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: contextMiddleware,
});

export { handler as GET, handler as POST };