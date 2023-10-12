// @ts-ignore
import { parseEnv } from './src/utils/env'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

/**
 * Check env variables at build time.
 */
function envCheckVitePlugin(mode: string) {
  return {
    buildStart() {
      parseEnv(loadEnv(mode, process.cwd(), ''))
    },
    name: 'env-check-plugin',
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), envCheckVitePlugin(mode)],
}))
