import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
    name: 'react-ui',
    filename: 'remoteEntry.js',
    remotes: {
      components_ui: 'http://components-ui:4173/assets/remoteEntry.js',
      user_ui: 'http://user-ui:4174/assets/remoteEntry.js',
      product_ui: 'http://product-ui:4175/assets/remoteEntry.js'
    },
    shared: ['react']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    allowedHosts: ['react-ui']
  },
  preview: {
    cors: {
      origin: '*',
      methods: '*',
      allowedHeaders: '*'
    },
    allowedHosts: ['react-ui', 'react-ui.davidcamelo.com']
  }
})
