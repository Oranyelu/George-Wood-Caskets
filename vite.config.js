import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['Favicon.svg'],
      devOptions: {
        enabled: false
      },
      manifest: {
        name: 'George Wood Casket',
        short_name: 'George Wood',
        description: 'Established in 1984 - Premium Caskets & Funeral Services',
        theme_color: '#135B3A',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'Favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'Favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'Favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: true, // Expose server to the network
  },
});
