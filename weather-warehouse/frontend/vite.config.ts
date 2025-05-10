import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4000, 
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    {
      name: "strip-if-none-match",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          delete req.headers['if-none-match'];
          next();
        });
      },
    },
  ],
});