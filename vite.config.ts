import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const pageNames = [
  'index',
  'cases',
  'services',
  'about',
  'team',
  'careers',
  'lab',
  'contact',
  'case-arden',
  'case-greenflow',
  'case-orbit',
  'privacy',
  '404',
  'offline'
] as const;

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pageNames.map((name) => [name, resolve(process.cwd(), `${name}.html`)]))
    }
  }
});
