import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        tailwindcss(),
        tsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',
            strategies: 'generateSW',
            manifest: {
                name: 'Cyberguard',
                short_name: 'Cyberguard',
                description: 'SECURITY',
                theme_color: '#ffffff',
                display: 'standalone',
                start_url: '/dashboard',
                background_color: '#ffffff',
                icons: [
                    {
                        src: 'icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: 'icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            injectRegister: 'auto',
        })
    ],
    server: {
        open: false,
        port: 5173,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    build: {
        outDir: 'build',
    }
});