import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        news: resolve(__dirname, 'pages/news.html'),
        irata: resolve(__dirname, 'pages/irata.html'),
        gwo: resolve(__dirname, 'pages/gwo.html'),
        pti: resolve(__dirname, 'pages/pti.html'),
        ropetrip: resolve(__dirname, 'pages/articoli/ropetrip.html'),
        pixaLampadeFrontali: resolve(__dirname, 'pages/articoli/pixa-lampade-frontali.html'),
        astroImbracatura: resolve(__dirname, 'pages/articoli/astro-imbracatura.html'),
        // aggiungi qui ogni nuova pagina .html man mano che la crei
      },
    },
  },
})