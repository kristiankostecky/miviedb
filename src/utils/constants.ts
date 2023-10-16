import { parseEnv } from './env'

// Not in ./env.ts because utils are used in vite.config.ts and this would cause it to fail
// without providing any useful information.
export const ENV = parseEnv(import.meta.env)

export const PATHS = {
  FAVORITES: '/favorites',
  MOVIE: '/movies/:id',
  ROOT: '/',
  SEARCH: '/search',
} as const
