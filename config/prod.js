const defaultPort = 3000;

module.exports = {
  defaultPort,
  graphQLServer: `http://music.teknixco.net:${defaultPort}/api/v1/graphql`,
  NEXT: {
    PUBLIC: {
      graphQLServer: `http://music.teknixco.net:${defaultPort}/api/v1/graphql`,
    }
  }
}