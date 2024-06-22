export const resolvers = {
  Query: {
    hello: (parent, args, ctx) => {
      // console.log("parent", parent);
      // console.log("args", args);
      // console.log("ctx", ctx);
      return "Hello world!"
    },
  },
};