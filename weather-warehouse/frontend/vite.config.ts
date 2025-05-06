import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4000, // Change to your desired port
    host: 'localhost', // Optional: specify the host
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Replace with your backend server's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix if needed
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