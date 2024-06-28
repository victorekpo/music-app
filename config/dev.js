const defaultPort = 3000;

module.exports = {
  defaultPort,
  graphQLServer: `http://localhost:${defaultPort}/api/v1/graphql`,
  NEXT: {
    PUBLIC: {
      graphQLServer: `http://localhost:${defaultPort}/api/v1/graphql`,
      dataSet: '123vic'
    }
  }
}