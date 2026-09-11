import { isCurrentPath, primaryNavigation } from '../../../shared/config/navigation';

export const SiteHeader = () => (
  <>
    <a className="brand" href="index.html" aria-label="Acor Web — главная">
      acor<span className="brand-slash">/</span><small>web</small>
    </a>
    <span className="header-signal" aria-hidden="true"><i></i><span>Студия / online</span></span>
    <nav className="desktop-nav" aria-label="Основная навигация">
      {primaryNavigation.map(([href, label]) => (
        <a key={href} href={href} aria-current={isCurrentPath(href) ? 'page' : undefined}>{label}</a>
      ))}
    </nav>
    <a className="header-contact" href="contact.html">Обсудить проект <span aria-hidden="true">↗︎</span></a>
    <button type="button" className="command-trigger" aria-label="Открыть поиск по сайту" data-analytics="command_open">
      <span aria-hidden="true">⌘</span><small>K</small>
    </button>
    <select className="language-select" aria-label="Язык сайта" data-analytics="language_change">
      <option value="ru" title="Русский">RU</option>
      <option value="en" title="English">EN</option>
      <option value="pl" title="Polski">PL</option>
      <option value="be" title="Беларуская">BE</option>
    </select>
    <button type="button" className="theme-toggle" aria-label="Переключить цветовую тему" aria-pressed="false" data-analytics="theme_toggle">
      <span className="theme-toggle-label">Светлая</span><span aria-hidden="true">◐</span>
    </button>
    <button className="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span>
    </button>
    <nav className="mobile-nav" id="mobile-nav" aria-label="Мобильная навигация" hidden>
      {primaryNavigation.map(([href, label]) => <a key={href} href={href} aria-current={isCurrentPath(href) ? 'page' : undefined}>{label}</a>)}
      <a href="contact.html" aria-current={isCurrentPath('contact.html') ? 'page' : undefined}><span>Обсудить проект</span> <span aria-hidden="true">↗︎</span></a>
    </nav>
  </>
);
