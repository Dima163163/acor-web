import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppShell, resolvePage } from './App';

export interface PrerenderedRoute {
  page: ReturnType<typeof resolvePage>;
  markup: string;
}

export const renderRoute = (url: string): PrerenderedRoute => ({
  page: resolvePage(new URL(url, 'https://acor-web.vercel.app').pathname),
  markup: renderToStaticMarkup(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  )
});
