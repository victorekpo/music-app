const path = require("path");

const projectDir = process.cwd();

module.exports = {
  defaultPort: 3000,
  graphQLServer: `http://localhost:${this.defaultPort}/api/v1/graphql`,
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
      // add client side environment variables here
      VICTOR: 'vic',
      MYVAR: 'myvariable',
      myvariable:' myvar'
    }
  },
}