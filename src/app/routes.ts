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

export type RouteDefinition = PageSeo & { component: PageComponent; paths: string[] };

export const routeDefinitions: RouteDefinition[] = [
  { ...pageSeo.home, component: HomePage, paths: ['/', '/index.html'] },
  { ...pageSeo.cases, component: CasesPage, paths: ['/cases', '/cases.html'] },
  { ...pageSeo.services, component: ServicesPage, paths: ['/services', '/services.html'] },
  { ...pageSeo.about, component: AboutPage, paths: ['/about', '/about.html'] },
  { ...pageSeo.team, component: TeamPage, paths: ['/team', '/team.html'] },
  { ...pageSeo.careers, component: CareersPage, paths: ['/careers', '/careers.html'] },
  { ...pageSeo.lab, component: LabPage, paths: ['/lab', '/lab.html'] },
  { ...pageSeo.contact, component: ContactPage, paths: ['/contact', '/contact.html'] },
  { ...pageSeo.caseArden, component: CaseArdenPage, paths: ['/cases/arden', '/case-arden.html'] },
  { ...pageSeo.caseGreenflow, component: CaseGreenflowPage, paths: ['/cases/greenflow', '/case-greenflow.html'] },
  { ...pageSeo.caseOrbit, component: CaseOrbitPage, paths: ['/cases/orbit', '/case-orbit.html'] },
  { ...pageSeo.privacy, component: PrivacyPage, paths: ['/privacy', '/privacy.html'] }
];

export const notFoundPage: RouteDefinition = { ...pageSeo.notFound, component: NotFoundPage, paths: [] };

export const normalizePathname = (pathname: string): string => {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
};

export const resolvePage = (pathname: string): RouteDefinition => {
  const normalizedPathname = normalizePathname(pathname);
  return routeDefinitions.find((page) => page.paths.includes(normalizedPathname)) || notFoundPage;
};
