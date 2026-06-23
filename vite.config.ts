import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/adil-hasan/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})