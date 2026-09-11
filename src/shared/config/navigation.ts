export const primaryNavigation = [
  ['cases.html', 'Проекты'],
  ['services.html', 'Услуги'],
  ['about.html', 'Студия'],
  ['team.html', 'Команда'],
  ['careers.html', 'Карьера'],
  ['lab.html', 'Lab']
] as const;

export const footerNavigation = [
  ['cases.html', 'Проекты'],
  ['team.html', 'Команда'],
  ['careers.html', 'Карьера'],
  ['contact.html', 'Контакты'],
  ['privacy.html', 'Конфиденциальность']
] as const;

export const isCurrentPath = (href: string): boolean => {
  const currentPath = window.location.pathname === '/' ? '/index.html' : window.location.pathname;
  return new URL(href, window.location.origin).pathname === currentPath;
};
