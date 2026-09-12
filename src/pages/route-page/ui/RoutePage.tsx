import type { PageSeo } from '../../../shared/config/seo';
import type { PageComponent } from '../../../shared/config/page';

export interface RoutePageProps {
  page: PageSeo & { component: PageComponent };
}

export const RoutePage = ({ page }: RoutePageProps) => {
  const Page = page.component;
  return (
    <main id="main" className={page.key === 'notFound' ? 'wrap offline-page' : undefined}>
      <div id="route-root" data-route={page.key}><Page /></div>
    </main>
  );
};
