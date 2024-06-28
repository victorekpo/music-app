import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/server/typeDefs";
import { resolvers } from "@/graphql/server/resolvers";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});