import { defineConfig } from '@vezham/config/playwright'

export default defineConfig(__filename, {
  webServer: {
    command: 'pnpm exec nx run d1-cdn:preview'
  }
})
