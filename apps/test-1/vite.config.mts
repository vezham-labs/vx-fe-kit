/// <reference types='vitest' />
import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/test-1',
  server: {
    port: 4200,
    host: 'localhost'
  },
  preview: {
    port: 4300,
    host: 'localhost'
  },
  plugins: [react(), nxReadySignal()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  test: {
    name: 'test-1',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const
    }
  }
}))
