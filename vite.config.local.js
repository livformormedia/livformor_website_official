import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Local dev config — bypasses the base44 plugin so the server starts immediately
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
})
