import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/adilhassan85.github.io/', // 🚀 Exact repository name slash ke sath taaki assets sahi load hon!
})