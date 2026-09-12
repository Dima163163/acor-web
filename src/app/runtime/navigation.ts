export interface NavigationRuntime {
  readonly setMenu: (open: boolean, restoreFocus?: boolean) => void;
}

export const mountNavigation = (translate: (value: string) => string): NavigationRuntime => {
  const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const mobileNav = document.querySelector<HTMLElement>('.mobile-nav');
  const setMenu = (open: boolean, restoreFocus = false): void => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? translate('Закрыть меню') : translate('Открыть меню'));
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) requestAnimationFrame(() => mobileNav.querySelector<HTMLAnchorElement>('a')?.focus());
    else if (restoreFocus) menuButton.focus();
  };

  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav?.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, true);
      return;
    }
    if (event.key !== 'Tab' || !mobileNav) return;
    const focusable = Array.from(mobileNav.querySelectorAll<HTMLAnchorElement>('a')).filter((element) => !element.hidden);
    if (!focusable.length) return;
    const current = focusable.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.shiftKey
      ? (current <= 0 ? focusable.length - 1 : current - 1)
      : (current === focusable.length - 1 ? 0 : current + 1);
    if (current === -1 || event.shiftKey && current === 0 || !event.shiftKey && current === focusable.length - 1) {
      event.preventDefault();
      focusable[next].focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (menuButton?.getAttribute('aria-expanded') === 'true' && !(event.target instanceof Element && event.target.closest('.site-header'))) setMenu(false);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  return { setMenu };
};
