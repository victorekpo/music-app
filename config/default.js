const path = require("path");

const projectDir = process.cwd();
const defaultPort = 3000;

module.exports = {
  defaultPort,
  MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority`,
  graphQLServer: `http://localhost:${defaultPort}/api/v1/graphql`,
  dev: process.env.NODE_ENV !== 'production',
  hostname: 'localhost',
  musicFile: path.resolve(projectDir, 'json', 'MUSIC.JSON'),
  bkMusicFile: path.resolve(projectDir, 'json', 'BKMUSIC.JSON'),
  authenticatedUsers: [
    {
      user1: 'user',
      user2: 'user'
    }
  ],
  mappedPaths: {},
  NEXT: {
    PUBLIC: {
      graphQLServer: `http://localhost:${defaultPort}/api/v1/graphql`,
      VICTOR: 'vic',
      MYVAR: 'myvariable',
      myvariable:' myvar'
    }
  },
}