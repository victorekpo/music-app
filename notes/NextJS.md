- You can nest client components within server components. This allows server components to handle server-side logic (like data fetching) and pass the necessary data to client components, which then manage interactivity and state on the client side.
- You cannot nest server components within client components. Server components are rendered on the server, and trying to nest them within client components would break the rendering process and the separation of concerns.

[Routing, Linking, and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)

[Patterns and best practices](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)

Random Links:
https://github.com/vercel/next.js/pull/63140
https://github.com/safak/next14-tutorial/blob/main/src/middleware.js
https://react.dev/learn/react-compiler
https://tonyalicea.dev/blog/understanding-react-compiler/?utm_source=tldrwebdev
https://threadreaderapp.com/thread/1803824227704877236.html?utm_source=tldrwebdev
