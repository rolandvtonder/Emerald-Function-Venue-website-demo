import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

// Each section is its own real page (its own URL and HTML file), so the site
// works on any static host without rewrite rules.
const page = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: page('./index.html'),
        weddings: page('./weddings/index.html'),
        functions: page('./functions/index.html'),
        venue: page('./venue/index.html'),
        contact: page('./contact/index.html'),
      },
    },
  },
});
