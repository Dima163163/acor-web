import type { PageSeo } from '../../../shared/config/seo';

export interface RoutePageProps {
  page: PageSeo & { markup: string };
}

export const RoutePage = ({ page }: RoutePageProps) => (
  <main id="main" className={page.key === 'notFound' ? 'wrap offline-page' : undefined}>
    <div id="route-root" data-route={page.key} dangerouslySetInnerHTML={{ __html: page.markup }} />
  </main>
);
