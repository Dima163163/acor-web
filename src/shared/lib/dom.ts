export const isModifiedClick = (event: MouseEvent): boolean => (
  event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
);

export const isInternalDocumentLink = (link: HTMLAnchorElement): boolean => {
  if (link.target && link.target !== '_self') return false;
  if (link.hasAttribute('download')) return false;
  if (link.dataset.noSpa !== undefined) return false;
  if (link.origin !== window.location.origin) return false;
  if (!link.pathname.endsWith('.html') && link.pathname !== '/') return false;
  return true;
};

export const copyPageHead = (nextDocument: Document): void => {
  document.title = nextDocument.title;
  document.documentElement.lang = nextDocument.documentElement.lang || 'ru';

  const nextDescription = nextDocument.querySelector<HTMLMetaElement>('meta[name="description"]');
  const currentDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (nextDescription && currentDescription) {
    currentDescription.content = nextDescription.content;
  }

  const nextThemeColor = nextDocument.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const currentThemeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (nextThemeColor && currentThemeColor) {
    currentThemeColor.content = nextThemeColor.content;
  }

  document.querySelectorAll('head script[type="application/ld+json"]').forEach((script) => script.remove());
  nextDocument.querySelectorAll('head script[type="application/ld+json"]').forEach((script) => {
    document.head.append(script.cloneNode(true));
  });
};

export const syncCurrentNavigation = (pathname: string): void => {
  const current = pathname === '/' ? '/index.html' : pathname;
  document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a, .mobile-nav a').forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    const isCurrent = linkPath === current || (current === '/index.html' && linkPath === '/');
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};
