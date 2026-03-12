import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base URL is important for assets when deploying to a sub‑directory such as
// GitHub Pages.  We choose an explicit path when the GITHUB_PAGES flag is set
// in the environment; otherwise use root.  Hash history in router means we
// don't need a server rewrite, but asset URLs must still be correct.
const basePath = process.env.GITHUB_PAGES === 'true'
  ? `/${process.env.BASE_PATH || 'yoruba-farm-store-vite'}/`
  : '/'

export default defineConfig({
  base: basePath,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
