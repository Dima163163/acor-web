import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../shared/styles/index.css';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('The app root is missing.');
}

createRoot(root).render(<App />);
