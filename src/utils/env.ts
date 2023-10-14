import { object, parse, string } from 'valibot'

export const envSchema = object({
  VITE_OMDB_API_KEY: string('Missing env variable OMDB API key'), // in real app API key would not be included in client bundle
})

export const parseEnv = (envVariables: Record<string, string>) =>
  parse(envSchema, parse(envSchema, envVariables))
