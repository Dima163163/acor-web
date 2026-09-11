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
import { pageSeo, type PageSeo } from '../shared/config/seo';

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

export const resolvePage = (pathname: string): RouteDefinition =>
  routeDefinitions.find((page) => page.paths.includes(pathname)) || notFoundPage;
