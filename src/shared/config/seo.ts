export const defaultDescription = 'Acor Web — дизайн и разработка цифровых продуктов.';

export type SitePageKey =
  | 'home'
  | 'cases'
  | 'services'
  | 'about'
  | 'team'
  | 'careers'
  | 'lab'
  | 'contact'
  | 'caseArden'
  | 'caseGreenflow'
  | 'caseOrbit'
  | 'privacy'
  | 'notFound';

export interface PageSeo {
  key: SitePageKey;
  title: string;
  description?: string;
}

export const pageSeo: Record<SitePageKey, PageSeo> = {
  home: { key: 'home', title: 'Дизайн, который обретает форму — Acor Web' },
  cases: { key: 'cases', title: 'Проекты — Acor Web' },
  services: { key: 'services', title: 'Услуги — Acor Web' },
  about: { key: 'about', title: 'Студия — Acor Web' },
  team: { key: 'team', title: 'Команда — Acor Web' },
  careers: { key: 'careers', title: 'Карьера — Acor Web' },
  lab: { key: 'lab', title: 'Lab — Acor Web' },
  contact: { key: 'contact', title: 'Обсудить проект — Acor Web' },
  caseArden: { key: 'caseArden', title: 'Arden — Acor Web' },
  caseGreenflow: { key: 'caseGreenflow', title: 'GreenFlow — Acor Web' },
  caseOrbit: { key: 'caseOrbit', title: 'Orbit — Acor Web' },
  privacy: { key: 'privacy', title: 'Конфиденциальность — Acor Web' },
  notFound: { key: 'notFound', title: 'Страница не найдена — Acor Web' }
};
