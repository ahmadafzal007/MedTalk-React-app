import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Enable fallback for all routes, allowing React Router to handle client-side routing
    historyApiFallback: true,
  },
})
