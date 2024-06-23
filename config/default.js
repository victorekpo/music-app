const path = require("path");

const projectDir = process.cwd();
const defaultPort = 3000;

module.exports = {
  defaultPort,
  graphQLServer: `http://localhost:${defaultPort}/api/v1/graphql`,
  dev: process.env.NODE_ENV !== 'production',
  hostname: 'localhost',
  musicFile: path.resolve(projectDir, 'db', 'MUSIC.JSON'),
  bkMusicFile: path.resolve(projectDir, 'db', 'BKMUSIC.JSON'),
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