import { isSiteRoute } from '../../shared/config/routes';
import { copyPageHead, isInternalDocumentLink, isModifiedClick, syncCurrentNavigation } from '../../shared/lib/dom';
import { withViewTransition } from '../../widgets/page-transition/model';

const runtimeScriptSelector = 'script[data-acor-spa-runtime]';

export const loadLegacyRuntime = (): void => {
  document.querySelector(runtimeScriptSelector)?.remove();
  const script = document.createElement('script');
  script.src = `/script.js?v=20260911-31&spa=${Date.now()}`;
  script.defer = true;
  script.async = false;
  script.dataset.acorSpaRuntime = 'true';
  document.head.append(script);
};

export interface NavigationOptions {
  renderRoute: (markup: string, url: URL) => void;
}

const swapDocument = (nextDocument: Document, url: URL, renderRoute: NavigationOptions['renderRoute']): void => {
  const nextRoot = nextDocument.querySelector<HTMLElement>('#route-root');
  if (!nextRoot) throw new Error('The destination page has no route root.');

  copyPageHead(nextDocument);
  renderRoute(nextRoot.innerHTML, url);
  syncCurrentNavigation(url.pathname);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};

const scrollToHash = (url: URL): void => {
  if (!url.hash) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  target.scrollIntoView({ behavior: document.body.classList.contains('motion-off') ? 'auto' : 'smooth', block: 'start' });
};

const navigate = async (url: URL, renderRoute: NavigationOptions['renderRoute'], replace = false): Promise<void> => {
  if (!isSiteRoute(url.pathname)) return;
  // A popstate event fires after the browser has already updated the address
  // bar, so the target URL equals `location.href`. Keep the guard for regular
  // clicks while still re-rendering the destination during back/forward.
  if (url.href === window.location.href && !replace) return;

  const currentUrl = new URL(window.location.href);
  if (url.pathname === currentUrl.pathname && url.search === currentUrl.search && url.hash) {
    if (replace) window.history.replaceState({}, '', url.href);
    else window.history.pushState({}, '', url.href);
    scrollToHash(url);
    return;
  }

  document.documentElement.classList.add('is-route-loading');
  try {
    const response = await fetch(url.href, { headers: { Accept: 'text/html' } });
    if (!response.ok) throw new Error(`Navigation failed with ${response.status}`);
    const html = await response.text();
    const nextDocument = new DOMParser().parseFromString(html, 'text/html');
    await withViewTransition(() => swapDocument(nextDocument, url, renderRoute));
    if (replace) window.history.replaceState({}, '', url.href);
    else window.history.pushState({}, '', url.href);
    window.setTimeout(() => scrollToHash(url), 0);
    window.dispatchEvent(new CustomEvent('acor:navigation', { detail: { url: url.href } }));
  } catch (error) {
    window.dispatchEvent(new CustomEvent('acor:navigation-error', { detail: error }));
    window.location.assign(url.href);
  } finally {
    document.documentElement.classList.remove('is-route-loading');
  }
};

export const installNavigation = ({ renderRoute }: NavigationOptions): void => {
  document.addEventListener('click', (event) => {
    if (!(event instanceof MouseEvent) || isModifiedClick(event)) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>('a[href]');
    if (!link || !isInternalDocumentLink(link)) return;
    const url = new URL(link.href);
    if (!isSiteRoute(url.pathname)) return;
    event.preventDefault();
    void navigate(url, renderRoute);
  });

  window.addEventListener('popstate', () => {
    void navigate(new URL(window.location.href), renderRoute, true);
  });
};
