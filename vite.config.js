// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
    plugins: [ vue() ],
    resolve: {
        alias: {
            // __dirname isn’t available in ESM, so use URL:
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
})
