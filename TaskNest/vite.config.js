import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '_dist' // Change 'output' to your desired folder name
  },
  plugins: [react()],
})
