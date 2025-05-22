import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-admin-index',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            req.url = '/admin/index.html';
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      // Shim for 'os' module
      'os': 'rollup-plugin-node-polyfills/polyfills/os',
      // Shim for 'path' module (can be an empty module or a more specific shim)
      'path': 'rollup-plugin-node-polyfills/polyfills/path'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
    }
  }
})
