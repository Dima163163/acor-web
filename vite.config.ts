import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // React Router owns every application route. The deployed server rewrites
    // clean URLs to this single shell, while Vite keeps assets fingerprinted.
    rollupOptions: {
      input: 'index.html'
    }
  }
});
