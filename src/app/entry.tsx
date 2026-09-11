import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { LegacyPage } from '../views/legacy-page/ui/LegacyPage';
import { installNavigation } from './router';
import { loadLegacyRuntime } from './router';

const routeRoot = document.querySelector<HTMLElement>('#route-root');
let reactRoot: Root | null = null;

const renderRoute = (markup: string, url: URL): void => {
  if (!routeRoot) return;
  reactRoot ??= createRoot(routeRoot);
  window.__acorRuntimeCleanup?.();
  flushSync(() => {
    reactRoot?.render(<LegacyPage key={url.href} html={markup} />);
  });
  loadLegacyRuntime();
};

installNavigation({ renderRoute });
