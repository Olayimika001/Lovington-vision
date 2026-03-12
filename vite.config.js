import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages requires assets be referenced with the repo path.  We
// compute a base URL based on the environment; if you build locally the
// default will be '/', while when running a Pages workflow the
// GITHUB_PAGES variable should be set and the repo name provided via
// BASE_PATH.  This value is used by both Vite and the router.
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
