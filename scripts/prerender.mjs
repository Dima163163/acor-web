import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
const origin = 'https://acor-web.vercel.app';
const routes = [
  { url: '/', output: 'index.html' },
  { url: '/cases', output: 'cases/index.html' },
  { url: '/services', output: 'services/index.html' },
  { url: '/about', output: 'about/index.html' },
  { url: '/team', output: 'team/index.html' },
  { url: '/careers', output: 'careers/index.html' },
  { url: '/lab', output: 'lab/index.html' },
  { url: '/contact', output: 'contact/index.html' },
  { url: '/cases/arden', output: 'cases/arden/index.html' },
  { url: '/cases/greenflow', output: 'cases/greenflow/index.html' },
  { url: '/cases/orbit', output: 'cases/orbit/index.html' },
  { url: '/privacy', output: 'privacy/index.html' }
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const replaceMeta = (template, page, url) => {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description || 'Acor Web — дизайн и разработка цифровых продуктов.');
  const canonical = `${origin}${url === '/' ? '/' : url}`;
  return template
    .replace(/<html lang="[^"]*">/, '<html lang="ru">')
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`);
};

const renderDocument = (template, route, rendered) => replaceMeta(template, rendered.page, route.url)
  .replace(/<script id="route-schema" type="application\/ld\+json">.*?<\/script>/, `<script id="route-schema" type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['caseArden', 'caseGreenflow', 'caseOrbit'].includes(rendered.page.key) ? 'CreativeWork' : rendered.page.key === 'contact' ? 'ContactPage' : 'WebPage',
    name: rendered.page.title,
    description: rendered.page.description || 'Acor Web — дизайн и разработка цифровых продуктов.',
    url: `${origin}${route.url}`
  }).replaceAll('<', '\\u003c')}</script>`)
  .replace('<div id="app"></div>', `<div id="app">${rendered.markup}</div>`);

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'spa',
  resolve: { alias: { 'react-router-dom': 'react-router' } },
  ssr: { noExternal: ['react-router'] }
});

try {
  const { renderRoute } = await server.ssrLoadModule('/src/app/prerender.tsx');
  const template = await readFile(path.join(dist, 'index.html'), 'utf8');
  for (const route of routes) {
    const rendered = renderRoute(route.url);
    const outputPath = path.join(dist, route.output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderDocument(template, route, rendered));
  }
  console.log(`Prerendered ${routes.length} routes.`);
} finally {
  await server.close();
}
