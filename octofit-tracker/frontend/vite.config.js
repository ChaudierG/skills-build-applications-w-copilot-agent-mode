import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

const frontendRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, frontendRoot, 'VITE_')
  const codespaceName =
    process.env.VITE_CODESPACE_NAME ?? env.VITE_CODESPACE_NAME ?? process.env.CODESPACE_NAME ?? ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
  }
})
