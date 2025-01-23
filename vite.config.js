import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Enable hot reloading
    hmr: true,
    // Open browser on server start
    open: true
  },
  // Base public path when served in production
  base: '/',
}) 