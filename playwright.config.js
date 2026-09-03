import { defineConfig, devices } from '@playwright/test';

// Configuração base do Playwright para o treinamento.
// No Passo 4 você vai evoluir esta config (fixtures, projetos por navegador,
// trace e screenshots). O webServer sobe o Jogo da Memória automaticamente
// antes de rodar os testes.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // Sobe a aplicação-alvo antes dos testes e reaproveita um servidor já ativo
  // durante o desenvolvimento local.
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
