export const siteRoutes = [
  '/',
  '/index.html',
  '/cases.html',
  '/services.html',
  '/about.html',
  '/team.html',
  '/careers.html',
  '/lab.html',
  '/contact.html',
  '/case-arden.html',
  '/case-greenflow.html',
  '/case-orbit.html',
  '/privacy.html'
] as const;

export type SiteRoute = (typeof siteRoutes)[number];

export const isSiteRoute = (pathname: string): pathname is SiteRoute => {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return siteRoutes.includes(normalized as SiteRoute);
};
