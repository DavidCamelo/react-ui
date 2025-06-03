import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
    name: 'user-ui',
    filename: 'remoteEntry.js',
    remotes: {
      user_ui: 'https://user-ui.davidcamelo.com/assets/remoteEntry.js',
      product_ui: 'http://product-ui.davidcamelo.com/assets/remoteEntry.js'
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
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization']
    },
    allowedHosts: ['react-ui', 'react-ui.davidcamelo.com']
  }
})
