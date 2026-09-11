import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { LegacyPage } from '../views/legacy-page/ui/LegacyPage';
import { SiteFooter } from '../widgets/site-footer/ui/SiteFooter';
import { SiteHeader } from '../widgets/site-header/ui/SiteHeader';
import { installNavigation, loadLegacyRuntime } from './router';

const routeRoot = document.querySelector<HTMLElement>('#route-root');
let reactRoot: Root | null = null;

const mountSharedWidgets = (): void => {
  const header = document.querySelector<HTMLElement>('.site-header');
  const footer = document.querySelector<HTMLElement>('.site-footer');
  if (!header || !footer) return;

  window.__acorRuntimeCleanup?.();
  const headerRoot = createRoot(header);
  const footerRoot = createRoot(footer);
  flushSync(() => {
    headerRoot.render(<SiteHeader />);
    footerRoot.render(<SiteFooter />);
  });
  loadLegacyRuntime();
};

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSharedWidgets, { once: true });
} else {
  mountSharedWidgets();
}
