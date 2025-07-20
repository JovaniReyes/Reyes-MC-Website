import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   // ✅ Force‑optimize the CJS helper so it gets a default export
  optimizeDeps: {
    include: [
      'warning',            // the bare import
      'warning/warning.js', // the deep path that react‑pdf resolves to
    ],
  },
})
