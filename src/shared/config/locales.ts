export const supportedLocales = ['ru', 'en', 'pl', 'be'] as const;

export type SiteLocale = (typeof supportedLocales)[number];

export const isSiteLocale = (value: string): value is SiteLocale =>
  supportedLocales.includes(value as SiteLocale);

export const localePrefix = (locale: SiteLocale): string => locale === 'ru' ? '' : `/${locale}`;

export const withLocalePrefix = (locale: SiteLocale, pathname: string): string => {
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  if (!cleanPath) return localePrefix(locale) || '/';
  return `${localePrefix(locale)}${cleanPath}`;
};

export const stripLocalePrefix = (pathname: string): { locale: SiteLocale; pathname: string } => {
  const [, maybeLocale, ...rest] = pathname.split('/');
  if (!isSiteLocale(maybeLocale || '')) return { locale: 'ru', pathname };
  const cleanPath = `/${rest.join('/')}`.replace(/\/$/, '') || '/';
    return { locale: maybeLocale as SiteLocale, pathname: cleanPath };
};
