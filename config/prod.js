module.exports = {
  defaultPort: 3000,
  graphQLServer: `http://music.teknixco.net:${this.defaultPort}/api/v1/graphql`,
  NEXT: {
    PUBLIC: {
      // add client side environment variables here
    }
  }
}