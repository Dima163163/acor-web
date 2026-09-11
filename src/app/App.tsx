import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import type { MouseEvent as ReactMouseEvent, ReactElement, ReactNode } from 'react';
import {
  aboutMarkup,
  careersMarkup,
  caseArdenMarkup,
  caseGreenflowMarkup,
  caseOrbitMarkup,
  casesMarkup,
  contactMarkup,
  homeMarkup,
  labMarkup,
  notFoundMarkup,
  privacyMarkup,
  servicesMarkup,
  teamMarkup
} from '../pages/route-content';
import { RoutePage } from '../pages/route-page/ui/RoutePage';
import { defaultDescription, pageSeo, siteOrigin, type PageSeo } from '../shared/config/seo';
import { SiteFooter } from '../widgets/site-footer/ui/SiteFooter';
import { SiteHeader } from '../widgets/site-header/ui/SiteHeader';
import { loadLegacyRuntime } from './runtime/legacy';

export type RouteDefinition = PageSeo & { markup: string; paths: string[] };

export const routeDefinitions: RouteDefinition[] = [
  { ...pageSeo.home, markup: homeMarkup, paths: ['/', '/index.html'] },
  { ...pageSeo.cases, markup: casesMarkup, paths: ['/cases', '/cases.html'] },
  { ...pageSeo.services, markup: servicesMarkup, paths: ['/services', '/services.html'] },
  { ...pageSeo.about, markup: aboutMarkup, paths: ['/about', '/about.html'] },
  { ...pageSeo.team, markup: teamMarkup, paths: ['/team', '/team.html'] },
  { ...pageSeo.careers, markup: careersMarkup, paths: ['/careers', '/careers.html'] },
  { ...pageSeo.lab, markup: labMarkup, paths: ['/lab', '/lab.html'] },
  { ...pageSeo.contact, markup: contactMarkup, paths: ['/contact', '/contact.html'] },
  { ...pageSeo.caseArden, markup: caseArdenMarkup, paths: ['/cases/arden', '/case-arden.html'] },
  { ...pageSeo.caseGreenflow, markup: caseGreenflowMarkup, paths: ['/cases/greenflow', '/case-greenflow.html'] },
  { ...pageSeo.caseOrbit, markup: caseOrbitMarkup, paths: ['/cases/orbit', '/case-orbit.html'] },
  { ...pageSeo.privacy, markup: privacyMarkup, paths: ['/privacy', '/privacy.html'] }
];

export const notFoundPage: RouteDefinition = { ...pageSeo.notFound, markup: notFoundMarkup, paths: [] };

export const resolvePage = (pathname: string): RouteDefinition => routeDefinitions.find((page) => page.paths.includes(pathname)) || notFoundPage;

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
    loadLegacyRuntime();
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: document.body.classList.contains('motion-off') ? 'auto' : 'smooth', block: 'start' }), 0);
  }, [location.hash]);

  return null;
};

const handleLegacyLink = (event: ReactMouseEvent<HTMLDivElement>, navigate: ReturnType<typeof useNavigate>): void => {
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

const LegacyLinkBridge = ({ children }: { children: ReactNode }): ReactElement => {
  const navigate = useNavigate();
  return <div className="app-shell" onClickCapture={(event) => handleLegacyLink(event, navigate)}>{children}</div>;
};

export const AppShell = (): ReactElement => (
  <LegacyLinkBridge>
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
  </LegacyLinkBridge>
);

export const App = (): ReactElement => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);
