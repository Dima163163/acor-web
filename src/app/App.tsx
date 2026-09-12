import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import type { MouseEvent as ReactMouseEvent, ReactElement, ReactNode } from 'react';
import { RoutePage } from '../pages/route-page/ui/RoutePage';
import { defaultDescription, siteOrigin, type PageSeo } from '../shared/config/seo';
import { SiteFooter } from '../widgets/site-footer/ui/SiteFooter';
import { SiteHeader } from '../widgets/site-header/ui/SiteHeader';
import { loadRuntime } from './runtime/bootstrap';
import { notFoundPage, resolvePage, routeDefinitions } from './routes';

const updateSeo = (page: PageSeo): void => {
  const canonicalPath = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '');
  const description = page.description || defaultDescription;
  const schemaType = ['caseArden', 'caseGreenflow', 'caseOrbit'].includes(page.key) ? 'CreativeWork' : page.key === 'contact' ? 'ContactPage' : 'WebPage';
  document.title = page.title;
  document.documentElement.lang = 'ru';
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', `${siteOrigin}${canonicalPath}`);
  document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', `${page.title} — Acor Web`);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', page.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', `${page.title} — Acor Web`);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${siteOrigin}${canonicalPath}`);
  const schema = document.querySelector('#route-schema');
  if (schema) {
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': schemaType, name: page.title, description, url: `${siteOrigin}${canonicalPath}` });
  }
};

const RuntimeBridge = (): null => {
  const location = useLocation();

  useEffect(() => {
    updateSeo(resolvePage(location.pathname));
    window.__acorRuntimeCleanup?.();
    loadRuntime();
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: document.body.classList.contains('motion-off') ? 'auto' : 'smooth', block: 'start' }), 0);
  }, [location.hash]);

  return null;
};

const handleSpaLink = (event: ReactMouseEvent<HTMLDivElement>, navigate: ReturnType<typeof useNavigate>): void => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download') || link.dataset.noSpa !== undefined) return;
  if (link.origin !== window.location.origin) return;
  const url = new URL(link.href);
  const isAppPath = url.pathname === '/' || url.pathname.startsWith('/cases') || !url.pathname.includes('.');
  if (!isAppPath) return;
  event.preventDefault();
  const destination = `${url.pathname}${url.search}${url.hash}`;
  navigate(destination, { viewTransition: !document.body.classList.contains('motion-off') });
};

const SpaLinkBridge = ({ children }: { children: ReactNode }): ReactElement => {
  const navigate = useNavigate();
  return <div className="app-shell" onClickCapture={(event) => handleSpaLink(event, navigate)}>{children}</div>;
};

export const AppShell = (): ReactElement => (
  <SpaLinkBridge>
    <div className="reading-progress" aria-hidden="true"></div>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="site-header"><SiteHeader /></header>
    <RuntimeBridge />
    <Routes>
      {routeDefinitions.flatMap((page) => page.paths.map((path) => <Route key={path} path={path} element={<RoutePage page={page} />} />))}
      <Route path="*" element={<RoutePage page={notFoundPage} />} />
    </Routes>
    <footer className="site-footer"><SiteFooter /></footer>
    <div className="cursor-caption" aria-hidden="true">Смотреть ↗︎</div>
  </SpaLinkBridge>
);

export const App = (): ReactElement => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);
