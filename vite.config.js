import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Servidor em porta fixa (strictPort) para o webServer do Playwright saber
// exatamente onde a aplicação sobe durante os testes E2E.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
