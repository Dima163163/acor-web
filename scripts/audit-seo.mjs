import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://acor-web.vercel.app';
const dist = path.resolve('dist');
const routes = [
  { url: '/', output: 'index.html', schema: 'WebPage' },
  { url: '/cases', output: 'cases/index.html', schema: 'WebPage' },
  { url: '/services', output: 'services/index.html', schema: 'WebPage' },
  { url: '/about', output: 'about/index.html', schema: 'WebPage' },
  { url: '/team', output: 'team/index.html', schema: 'WebPage' },
  { url: '/careers', output: 'careers/index.html', schema: 'WebPage' },
  { url: '/lab', output: 'lab/index.html', schema: 'WebPage' },
  { url: '/contact', output: 'contact/index.html', schema: 'ContactPage' },
  { url: '/privacy', output: 'privacy/index.html', schema: 'WebPage' },
  { url: '/cases/arden', output: 'cases/arden/index.html', schema: 'CreativeWork' },
  { url: '/cases/greenflow', output: 'cases/greenflow/index.html', schema: 'CreativeWork' },
  { url: '/cases/orbit', output: 'cases/orbit/index.html', schema: 'CreativeWork' }
];

const countMatches = (value, expression) => [...value.matchAll(expression)].length;
const readMeta = (html, attribute, value) => {
  const expression = new RegExp(`<meta[^>]+${attribute}=["']${value}["'][^>]*>`, 'i');
  const tag = html.match(expression)?.[0] || '';
  return tag.match(/content=["']([^"']*)["']/i)?.[1] || '';
};
const readCanonical = (html) => html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)?.[1] || '';
const readTitle = (html) => html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || '';

for (const route of routes) {
  const html = await readFile(path.join(dist, route.output), 'utf8');
  const title = readTitle(html);
  const description = readMeta(html, 'name', 'description');
  const canonical = readCanonical(html);
  assert.equal(countMatches(html, /<title>/gi), 1, `${route.url}: expected one title`);
  assert.ok(title, `${route.url}: title is empty`);
  assert.ok(description, `${route.url}: description is empty`);
  assert.equal(canonical, `${origin}${route.url}`, `${route.url}: canonical mismatch`);
  assert.equal(readMeta(html, 'property', 'og:title'), title, `${route.url}: og:title mismatch`);
  assert.equal(readMeta(html, 'property', 'og:description'), description, `${route.url}: og:description mismatch`);
  assert.equal(readMeta(html, 'property', 'og:url'), canonical, `${route.url}: og:url mismatch`);
  assert.match(readMeta(html, 'property', 'og:image'), new RegExp(`^${origin}/assets/`), `${route.url}: og:image is not absolute`);
  assert.equal(readMeta(html, 'name', 'twitter:title'), title, `${route.url}: twitter:title mismatch`);
  assert.equal(readMeta(html, 'name', 'twitter:description'), description, `${route.url}: twitter:description mismatch`);
  assert.match(readMeta(html, 'name', 'twitter:image'), new RegExp(`^${origin}/assets/`), `${route.url}: twitter:image is not absolute`);
  assert.match(html, new RegExp(`"@type":"${route.schema}"`), `${route.url}: JSON-LD schema mismatch`);
  assert.match(html, /<main[^>]*id=["']main["']|<main[^>]*>/i, `${route.url}: main content missing`);
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(new Set(sitemapUrls), new Set(routes.map(({ url }) => `${origin}${url}`)), 'sitemap URLs mismatch');

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
assert.match(robots, /User-agent:\s*\*/);
assert.match(robots, /Allow:\s*\//);
assert.match(robots, new RegExp(String.raw`Sitemap:\s*${origin}/sitemap\.xml`));

const shell = await readFile(path.join(dist, 'index.html'), 'utf8');
assert.doesNotMatch(shell, /\/styles\.css(?:["?])/);
assert.match(shell, /<link[^>]+rel=["']stylesheet["'][^>]+href=["']\/assets\/[^"']+\.css["']/i);

console.log(`SEO audit passed: ${routes.length} routes, sitemap and robots.txt are valid.`);
