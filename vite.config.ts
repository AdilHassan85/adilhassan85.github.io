import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // 🚀 User repository (adilhassan85.github.io) ke liye single slash hi perfect standard hai
})