# Movie DB App

Simple movie database SPA to search for movies and view details about them. User can also add movies to favorites and view them later.

[Live demo](https://miviedb.vercel.app)

## Dev Setup

1. Clone the repo
2. Run `npm install`
3. Run `npm run prepare` to install husky hooks
4. Setup your environment variables in `.env` file based on `.env.example`
5. Run `npm run dev` to start the development server or `npm run build` to build the app for production and then `npm run preview` to start the production server. Happy developing!

## Tech Stack

- [Vite](https://vitejs.dev/) - development server and bundling
- [React Router](https://reactrouter.com/en/main) - routing
- [shadcn/ui](https://ui.shadcn.com/docs) + [Tailwind CSS](https://tailwindcss.com/) - UI components and styling
- [Vercel](https://vercel.com) - hosting and deployment (automatic on push to `main` branch)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - unit testing and integration testing(not used yet)
- [eslint](https://eslint.org/) + [prettier](https://prettier.io/) - linting and formatting
- [valibot](https://valibot.dev/) - data validation

## Possible Improvements

- [ ] Migrate to [Remix.run](https://remix.run/) and use SSR for better SEO and performance. There are also other benefits like dealing with data fetching and caching, race conditions, shipping less JS to the client, running on the edge etc.
- [ ] Replace [valibot](https://valibot.dev/) with [zod](https://zod.dev/), valibot is okay but the documentation is still not complete and it's not as popular as zod. (I wanted to try it, that's why I used it).
- [ ] Use [axios](https://axios-http.com/) for data fetching instead of fetch API when more features would be needed.
- [ ] Do not include API key in the client bundle, instead use a proxy server to fetch data from the API.
