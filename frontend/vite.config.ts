import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Any fetch request starting with /api will be forwarded to your Express backend
      '/api': {
        target: 'http://localhost:5000', // Make sure this matches your Express server port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
