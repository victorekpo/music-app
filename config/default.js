module.exports = {
  defaultPort: 3000,
  dev: process.env.NODE_ENV !== 'production',
  hostname: 'localhost',
  mappedPaths: {
    // Explicit mapping to certain pages
    // '/path-a': '/path-a'
  }
}