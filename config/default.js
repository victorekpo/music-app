module.exports = {
  defaultPort: 3000,
  dev: process.env.NODE_ENV !== 'production',
  hostname: 'localhost',
  mappedPaths: {
    test: 'testing',
    test2: 'another',
    test3: {
      test4: 'yoooo'
    }
  },
  NEXT: {
    PUBLIC: {
      // add client side environment variables here
      VICTOR: 'vic',
      MYVAR: 'myvariable',
      myvariable:' myvar'
    }
  },
}