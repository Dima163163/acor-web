export const siteOrigin = 'https://acor-web.vercel.app';
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
  home: { key: 'home', title: 'Дизайн, который обретает форму — Acor Web', description: defaultDescription },
  cases: { key: 'cases', title: 'Проекты — Acor Web', description: 'Избранные концепции Acor Web: сайты, цифровые продукты и визуальные системы.' },
  services: { key: 'services', title: 'Услуги — Acor Web', description: 'Стратегия, дизайн и разработка цифровых продуктов — от первой идеи до следующей версии.' },
  about: { key: 'about', title: 'Студия — Acor Web', description: 'Acor Web — независимая digital-студия, где дизайн и разработка работают как одна команда.' },
  team: { key: 'team', title: 'Команда — Acor Web', description: 'Познакомьтесь с аналитиками, дизайнерами, разработчиками и менеджерами Acor Web.' },
  careers: { key: 'careers', title: 'Карьера — Acor Web', description: 'Открытые роли, стажировка и контакты для тех, кто хочет создавать цифровые продукты вместе с Acor Web.' },
  lab: { key: 'lab', title: 'Lab — Acor Web', description: 'Интерактивные эксперименты Acor Lab с формой, движением и ощущением интерфейса.' },
  contact: { key: 'contact', title: 'Обсудить проект — Acor Web', description: 'Расскажите о задаче — соберём контекст, предложим маршрут и обсудим следующий шаг.' },
  caseArden: { key: 'caseArden', title: 'Arden — Acor Web', description: 'Концепция сайта для архитектурного проекта: масштаб, паузы и точная типографика.' },
  caseGreenflow: { key: 'caseGreenflow', title: 'GreenFlow — Acor Web', description: 'Концепция e-commerce для растений, где настроение помогает сделать понятный выбор.' },
  caseOrbit: { key: 'caseOrbit', title: 'Orbit — Acor Web', description: 'Концепция финансового продукта для web и mobile с ясным балансом и спокойным интерфейсом.' },
  privacy: { key: 'privacy', title: 'Конфиденциальность — Acor Web', description: 'Условия обработки данных и конфиденциальности на сайте Acor Web.' },
  notFound: { key: 'notFound', title: 'Страница не найдена — Acor Web', description: 'Запрошенная страница не найдена. Вернитесь на главную Acor Web.' }
};
