import type { SiteLocale } from './locales';

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
  caseArden: { key: 'caseArden', title: 'Architecture study — Acor Web', description: 'Обезличенное исследование архитектурного сайта: структура, маршрут и точная типографика.' },
  caseGreenflow: { key: 'caseGreenflow', title: 'Commerce study — Acor Web', description: 'Обезличенное исследование commerce-сайта: каталог, фактура и спокойный выбор.' },
  caseOrbit: { key: 'caseOrbit', title: 'Product study — Acor Web', description: 'Обезличенное исследование финансового интерфейса для web и mobile: обзор и контроль.' },
  privacy: { key: 'privacy', title: 'Конфиденциальность — Acor Web', description: 'Условия обработки данных и конфиденциальности на сайте Acor Web.' },
  notFound: { key: 'notFound', title: 'Страница не найдена — Acor Web', description: 'Запрошенная страница не найдена. Вернитесь на главную Acor Web.' }
};

const localizedSeo: Record<Exclude<SiteLocale, 'ru'>, Partial<Record<SitePageKey, PageSeo>>> = {
  en: {
    home: { key: 'home', title: 'Design that takes shape — Acor Web', description: 'Acor Web — an independent studio for digital products, interfaces and clear experiences.' },
    cases: { key: 'cases', title: 'Selected work — Acor Web', description: 'Selected Acor Web studies for websites, products and visual systems.' },
    services: { key: 'services', title: 'Services — Acor Web', description: 'Strategy, design and development for digital products, from first idea to next release.' },
    about: { key: 'about', title: 'Studio — Acor Web', description: 'Acor Web is an independent digital studio where design and development work as one team.' },
    team: { key: 'team', title: 'Team — Acor Web', description: 'Meet the analysts, designers, developers and producers behind Acor Web.' },
    careers: { key: 'careers', title: 'Careers — Acor Web', description: 'Open roles, internships and ways to build digital products with Acor Web.' },
    lab: { key: 'lab', title: 'Lab — Acor Web', description: 'Interactive Acor Lab experiments with form, motion and interface feel.' },
    contact: { key: 'contact', title: 'Discuss a project — Acor Web', description: 'Tell us about the task and we will shape the context, route and next step.' },
    caseArden: { key: 'caseArden', title: 'Architecture study — Acor Web', description: 'A conceptual architecture interface study about scale, pauses and precise typography.' },
    caseGreenflow: { key: 'caseGreenflow', title: 'Commerce study — Acor Web', description: 'A conceptual commerce interface study where mood helps people make a clear choice.' },
    caseOrbit: { key: 'caseOrbit', title: 'Product study — Acor Web', description: 'A conceptual financial product study for web and mobile with a calm, clear interface.' },
    privacy: { key: 'privacy', title: 'Privacy — Acor Web', description: 'Information about privacy and data processing on the Acor Web website.' },
    notFound: { key: 'notFound', title: 'Page not found — Acor Web', description: 'The requested page was not found. Return to Acor Web home.' }
  },
  pl: {
    home: { key: 'home', title: 'Design, który nabiera formy — Acor Web', description: 'Acor Web — niezależne studio produktów cyfrowych, interfejsów i klarownych doświadczeń.' },
    cases: { key: 'cases', title: 'Wybrane prace — Acor Web', description: 'Wybrane studia Acor Web dla stron, produktów i systemów wizualnych.' },
    services: { key: 'services', title: 'Usługi — Acor Web', description: 'Strategia, design i rozwój produktów cyfrowych od pierwszego pomysłu do kolejnej wersji.' },
    about: { key: 'about', title: 'Studio — Acor Web', description: 'Acor Web to niezależne studio digital, w którym design i rozwój działają jako jeden zespół.' },
    team: { key: 'team', title: 'Zespół — Acor Web', description: 'Poznaj analityków, projektantów, programistów i producentów Acor Web.' },
    careers: { key: 'careers', title: 'Kariera — Acor Web', description: 'Otwarte role, staże i sposoby na tworzenie produktów cyfrowych razem z Acor Web.' },
    lab: { key: 'lab', title: 'Lab — Acor Web', description: 'Interaktywne eksperymenty Acor Lab z formą, ruchem i odczuciem interfejsu.' },
    contact: { key: 'contact', title: 'Omówmy projekt — Acor Web', description: 'Opowiedz o zadaniu, a uporządkujemy kontekst, drogę i kolejny krok.' },
    caseArden: { key: 'caseArden', title: 'Studium architektury — Acor Web', description: 'Koncepcyjne studium interfejsu architektonicznego o skali, pauzach i precyzyjnej typografii.' },
    caseGreenflow: { key: 'caseGreenflow', title: 'Studium commerce — Acor Web', description: 'Koncepcyjne studium interfejsu commerce, w którym nastrój pomaga dokonać wyboru.' },
    caseOrbit: { key: 'caseOrbit', title: 'Studium produktu — Acor Web', description: 'Koncepcyjne studium produktu finansowego web i mobile z jasnym, spokojnym interfejsem.' },
    privacy: { key: 'privacy', title: 'Prywatność — Acor Web', description: 'Informacje o prywatności i przetwarzaniu danych na stronie Acor Web.' },
    notFound: { key: 'notFound', title: 'Nie znaleziono strony — Acor Web', description: 'Nie znaleziono żądanej strony. Wróć na stronę główną Acor Web.' }
  },
  be: {
    home: { key: 'home', title: 'Дызайн, які набывае форму — Acor Web', description: 'Acor Web — незалежная студыя лічбавых прадуктаў, інтэрфейсаў і ясных уражанняў.' },
    cases: { key: 'cases', title: 'Выбраныя працы — Acor Web', description: 'Выбраныя даследаванні Acor Web для сайтаў, прадуктаў і візуальных сістэм.' },
    services: { key: 'services', title: 'Паслугі — Acor Web', description: 'Стратэгія, дызайн і распрацоўка лічбавых прадуктаў ад ідэі да наступнага рэлізу.' },
    about: { key: 'about', title: 'Студыя — Acor Web', description: 'Acor Web — незалежная digital-студыя, дзе дызайн і распрацоўка працуюць адной камандай.' },
    team: { key: 'team', title: 'Каманда — Acor Web', description: 'Пазнаёмцеся з аналітыкамі, дызайнерамі, распрацоўшчыкамі і прадзюсарамі Acor Web.' },
    careers: { key: 'careers', title: 'Кар’ера — Acor Web', description: 'Адкрытыя ролі, стажыроўкі і магчымасць ствараць лічбавыя прадукты разам з Acor Web.' },
    lab: { key: 'lab', title: 'Lab — Acor Web', description: 'Інтэрактыўныя эксперыменты Acor Lab з формай, рухам і адчуваннем інтэрфейсу.' },
    contact: { key: 'contact', title: 'Абмеркаваць праект — Acor Web', description: 'Раскажыце пра задачу — мы збяром кантэкст, маршрут і наступны крок.' },
    caseArden: { key: 'caseArden', title: 'Даследаванне архітэктуры — Acor Web', description: 'Канцэптуальнае даследаванне архітэктурнага інтэрфейсу пра маштаб, паўзы і дакладную тыпаграфіку.' },
    caseGreenflow: { key: 'caseGreenflow', title: 'Даследаванне commerce — Acor Web', description: 'Канцэптуальнае даследаванне commerce-інтэрфейсу, дзе настрой дапамагае зрабіць выбар.' },
    caseOrbit: { key: 'caseOrbit', title: 'Даследаванне прадукту — Acor Web', description: 'Канцэптуальнае даследаванне фінансавага прадукту для web і mobile з ясным спакойным інтэрфейсам.' },
    privacy: { key: 'privacy', title: 'Канфідэнцыяльнасць — Acor Web', description: 'Інфармацыя пра канфідэнцыяльнасць і апрацоўку даных на сайце Acor Web.' },
    notFound: { key: 'notFound', title: 'Старонка не знойдзена — Acor Web', description: 'Запытаная старонка не знойдзена. Вярніцеся на галоўную Acor Web.' }
  }
};

export const getPageSeo = (page: PageSeo | SitePageKey, locale: SiteLocale = 'ru'): PageSeo => {
  const key = typeof page === 'string' ? page : page.key;
  if (locale === 'ru') return pageSeo[key];
  return localizedSeo[locale][key] || pageSeo[key];
};
