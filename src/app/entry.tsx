import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('The app root is missing.');
}

createRoot(root).render(<App />);
