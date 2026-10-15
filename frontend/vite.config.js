import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:5001",
        changeOrigin: true,
        secure: false
      },
      "/socket.io": {
        target: "http://0.0.0.0:5001",
        changeOrigin: true,
        ws: true
      },
    }
  }
})

//http://0.0.0.0:5001/api/v1/login