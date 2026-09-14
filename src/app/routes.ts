import { AboutPage } from '../pages/about/ui/AboutPage';
import { CareersPage } from '../pages/careers/ui/CareersPage';
import { CaseArdenPage } from '../pages/case-arden/ui/CaseArdenPage';
import { CaseGreenflowPage } from '../pages/case-greenflow/ui/CaseGreenflowPage';
import { CaseOrbitPage } from '../pages/case-orbit/ui/CaseOrbitPage';
import { CasesPage } from '../pages/cases/ui/CasesPage';
import { ContactPage } from '../pages/contact/ui/ContactPage';
import { HomePage } from '../pages/home/ui/HomePage';
import { LabPage } from '../pages/lab/ui/LabPage';
import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage';
import { PrivacyPage } from '../pages/privacy/ui/PrivacyPage';
import { ServicesPage } from '../pages/services/ui/ServicesPage';
import { TeamPage } from '../pages/team/ui/TeamPage';
import { pageSeo } from '../shared/config/seo';
import type { PageSeo } from '../shared/config/seo';
import type { PageComponent } from '../shared/config/page';
import { stripLocalePrefix, supportedLocales } from '../shared/config/locales';

export type RouteDefinition = PageSeo & { component: PageComponent; paths: string[] };

const localizedPaths = (paths: string[]): string[] => [
  ...paths,
  ...supportedLocales
    .filter((locale) => locale !== 'ru')
    .flatMap((locale) => paths.map((path) => `/${locale}${path === '/' ? '' : path}`))
];

export const routeDefinitions: RouteDefinition[] = [
  { ...pageSeo.home, component: HomePage, paths: localizedPaths(['/', '/index.html']) },
  { ...pageSeo.cases, component: CasesPage, paths: localizedPaths(['/cases', '/cases.html']) },
  { ...pageSeo.services, component: ServicesPage, paths: localizedPaths(['/services', '/services.html']) },
  { ...pageSeo.about, component: AboutPage, paths: localizedPaths(['/about', '/about.html']) },
  { ...pageSeo.team, component: TeamPage, paths: localizedPaths(['/team', '/team.html']) },
  { ...pageSeo.careers, component: CareersPage, paths: localizedPaths(['/careers', '/careers.html']) },
  { ...pageSeo.lab, component: LabPage, paths: localizedPaths(['/lab', '/lab.html']) },
  { ...pageSeo.contact, component: ContactPage, paths: localizedPaths(['/contact', '/contact.html']) },
  { ...pageSeo.caseArden, component: CaseArdenPage, paths: localizedPaths(['/cases/arden', '/case-arden.html']) },
  { ...pageSeo.caseGreenflow, component: CaseGreenflowPage, paths: localizedPaths(['/cases/greenflow', '/case-greenflow.html']) },
  { ...pageSeo.caseOrbit, component: CaseOrbitPage, paths: localizedPaths(['/cases/orbit', '/case-orbit.html']) },
  { ...pageSeo.privacy, component: PrivacyPage, paths: localizedPaths(['/privacy', '/privacy.html']) }
];

export const notFoundPage: RouteDefinition = { ...pageSeo.notFound, component: NotFoundPage, paths: [] };

export const normalizePathname = (pathname: string): string => {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
};

export const resolvePage = (pathname: string): RouteDefinition => {
  const normalizedPathname = normalizePathname(stripLocalePrefix(pathname).pathname);
  return routeDefinitions.find((page) => page.paths.includes(normalizedPathname)) || notFoundPage;
};
