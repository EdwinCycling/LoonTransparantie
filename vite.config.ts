import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const redirectUri = env.REDIRECT_URI || process.env.REDIRECT_URI || '';
  const allowedHostsSet = new Set<string>([
    'localhost',
    '127.0.0.1',
    'unmerited-diuretically-angeline.ngrok-free.dev'
  ]);
  if (redirectUri) {
    try {
      const host = new URL(redirectUri).host;
      if (host) {
        allowedHostsSet.add(host);
      }
    } catch {
    }
  }
  return {
    server: {
      port: 3000,
      strictPort: true,
      host: '0.0.0.0',
      allowedHosts: Array.from(allowedHostsSet),
      proxy: {
        '/api': {
          target: 'http://localhost:3020',
          changeOrigin: true,
        },
        '/auth': {
          target: 'http://localhost:3020',
          changeOrigin: true,
        },
        '/callback': {
          target: 'http://localhost:3020',
          changeOrigin: true,
        },
      }
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  };
});
