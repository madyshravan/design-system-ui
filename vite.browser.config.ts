import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true
      }
    })
  ],
  build: {
    rollupOptions: {
      input: 'src/register.ts',
      output: {
        format: 'es',
        entryFileNames: 'bundle.js'
      }
    },
    outDir: 'dist-browser',
    emptyOutDir: true
  }
});
