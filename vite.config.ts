import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    // Inline (empty) PostCSS config stops Vite from walking up and loading
    // the parent MyStree website's postcss.config.js / Tailwind v3 setup.
    postcss: {},
  },
})
