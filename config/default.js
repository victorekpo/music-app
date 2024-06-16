const path = require("path");

const projectDir = process.cwd();

module.exports = {
  defaultPort: 3000,
  dev: process.env.NODE_ENV !== 'production',
  hostname: 'localhost',
  musicFile: path.resolve(projectDir, 'MUSIC.JSON'),
  bkMusicFile: path.resolve(projectDir, 'BKMUSIC.JSON'),
  NEXT: {
    PUBLIC: {
      // add client side environment variables here
      VICTOR: 'vic',
      MYVAR: 'myvariable',
      myvariable:' myvar'
    }
  },
}