const defaultPort = 3000;

module.exports = {
  defaultPort,
  graphQLServer: `http://music.teknixco.net/api/v1/graphql`,
  NEXT: {
    PUBLIC: {
      graphQLServer: `http://music.teknixco.net/api/v1/graphql`,
    }
  }
}