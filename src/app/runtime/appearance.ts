import type { LocaleController } from './locale';

export interface AppearanceRuntime {
  readonly reducedMotion: MediaQueryList;
  readonly finePointer: MediaQueryList;
  readonly cursor: HTMLElement | null;
  readonly isMotionDisabled: () => boolean;
}

export const mountAppearance = (locale: LocaleController): AppearanceRuntime => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let motionDisabled = reducedMotion.matches;
  let savedMotion: string | null = null;
  try {
    savedMotion = sessionStorage.getItem('acor-motion');
  } catch {
    // The motion control still works when storage is unavailable.
  }
  if (savedMotion === 'off') motionDisabled = true;

  const motionButton = document.querySelector<HTMLElement>('.motion-toggle');
  const cursor = document.querySelector<HTMLElement>('.cursor-caption');
  const syncMotion = (): void => {
    document.body.classList.toggle('motion-off', motionDisabled);
    motionButton?.setAttribute('aria-pressed', String(motionDisabled));
    if (motionButton) {
      motionButton.innerHTML = `${locale.translate('Анимация')}: ${motionDisabled ? locale.translate('выкл') : locale.translate('вкл')} <span aria-hidden="true">◉</span>`;
    }
    if (motionDisabled) cursor?.classList.remove('visible');
  };

  syncMotion();
  motionButton?.addEventListener('click', () => {
    motionDisabled = !motionDisabled;
    savedMotion = motionDisabled ? 'off' : 'on';
    try {
      sessionStorage.setItem('acor-motion', savedMotion);
    } catch {
      // The control still works without storage.
    }
    syncMotion();
  });
  reducedMotion.addEventListener('change', (event) => {
    motionDisabled = event.matches || savedMotion === 'off';
    syncMotion();
  });

  const themeHeader = document.querySelector<HTMLElement>('.site-header');
  let savedTheme: string | null = null;
  try {
    savedTheme = localStorage.getItem('acor-theme');
  } catch {
    // The theme defaults to light when storage is unavailable.
  }
  let theme = savedTheme === 'night' ? 'night' : 'light';
  const themeButton = themeHeader?.querySelector<HTMLButtonElement>('.theme-toggle') || document.createElement('button');
  themeButton.type = 'button';
  themeButton.className = 'theme-toggle';
  themeButton.setAttribute('aria-label', 'Переключить цветовую тему');
  themeButton.setAttribute('aria-pressed', String(theme === 'night'));
  themeButton.dataset.analytics = 'theme_toggle';
  if (!themeButton.parentElement && themeHeader) themeHeader.querySelector('.menu-toggle')?.insertAdjacentElement('beforebegin', themeButton);

  const languageSelect = themeHeader?.querySelector<HTMLSelectElement>('.language-select') || document.createElement('select');
  languageSelect.className = 'language-select';
  languageSelect.setAttribute('aria-label', 'Язык сайта');
  languageSelect.dataset.analytics = 'language_change';
  if (!languageSelect.options.length) {
    Object.entries(locale.info).forEach(([language, info]) => {
      const option = document.createElement('option');
      option.value = language;
      option.textContent = info.short;
      option.title = info.label;
      languageSelect.append(option);
    });
  }
  if (!languageSelect.parentElement && themeHeader) themeButton.insertAdjacentElement('beforebegin', languageSelect);
  locale.setLanguageSelect(languageSelect);
  languageSelect.addEventListener('change', () => locale.setLocale(languageSelect.value));

  if (themeHeader && !themeHeader.querySelector('.header-signal')) {
    const signal = document.createElement('span');
    signal.className = 'header-signal';
    signal.innerHTML = '<i aria-hidden="true"></i><span>Студия / online</span>';
    themeHeader.querySelector('.brand')?.insertAdjacentElement('afterend', signal);
  }
  const syncTheme = (): void => {
    document.body.classList.toggle('theme-night', theme === 'night');
    themeButton.setAttribute('aria-pressed', String(theme === 'night'));
    themeButton.innerHTML = `<span class="theme-toggle-label">${theme === 'night' ? locale.translate('Тёмная') : locale.translate('Светлая')}</span><span aria-hidden="true">${theme === 'night' ? '☾' : '◐'}</span>`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'night' ? '#15181d' : '#f3f4f1');
  };

  syncTheme();
  themeButton.addEventListener('click', () => {
    theme = theme === 'night' ? 'light' : 'night';
    try {
      localStorage.setItem('acor-theme', theme);
    } catch {
      // The control still works without storage.
    }
    syncTheme();
  });
  window.addEventListener('acor:locale-change', () => {
    syncMotion();
    syncTheme();
  });

  return {
    reducedMotion,
    finePointer,
    cursor,
    isMotionDisabled: () => motionDisabled
  };
};
