const defaultPort = 3000;

module.exports = {
  defaultPort,
  graphQLServer: `https://music-app-7nc5.onrender.com/api/v1/graphql`,
  NEXT: {
    PUBLIC: {
      graphQLServer: `https://music-app-7nc5.onrender.com/api/v1/graphql`,
    }
  }
}