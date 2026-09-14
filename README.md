# Acor Web — Form & Focus

Светлый сайт digital-студии: крупная типографика, кобальтовый акцент, скульптурный знак и проекты как отдельные визуальные сцены.

## Запуск

```sh
npm install
npm run dev
```

Открыть http://127.0.0.1:5173. Production-проверка: `npm run typecheck`, `npm run build`, `npm run preview`.

Проверки качества:

```sh
npm run typecheck    # TypeScript для приложения и E2E-конфигурации
npm run build        # Vite-сборка и SEO-пререндер маршрутов
npm run audit:seo    # title, canonical, Open Graph, JSON-LD, sitemap и robots
npm run test:e2e     # smoke-сценарии в Chrome, Firefox, Safari и мобильных профилях
```

`npm run test:e2e` собирает production-версию, запускает локальный preview и проверяет все публичные маршруты, навигацию, локализацию, тему, командную палитру, фильтры, галерею, бриф и карточки команды. Матрица Playwright включает desktop Chrome/Firefox/Safari и mobile Chrome/Safari. В GitHub Actions эти проверки запускаются на каждый pull request и push в `main`; отчёт Playwright сохраняется при ошибке.

## Архитектура

Инструкция для нового участника проекта и порядок проверки изменений находятся
в [`CONTRIBUTING.md`](CONTRIBUTING.md).

Приложение собрано на Vite и React Router 7. В исходниках остаётся один `index.html` как HTML-shell; маршруты, страницы, шапка и футер живут в React/FSD-слоях:

- `src/app` — точка входа, BrowserRouter и runtime-модули интерактивов;
- `src/pages/*/ui` — самостоятельные JSX-экраны маршрутов;
- `src/widgets` — общие React-виджеты шапки и футера;
- `src/shared` — навигация, SEO-метаданные, типы страниц и глобальные настройки.

Разметка страниц описана JSX-компонентами без `String.raw` и `dangerouslySetInnerHTML`. Глобальные стили подключаются через `src/shared/styles/index.css` и разделены на слои `base`, `header-hero`, `home`, `pages`, `responsive`, `enhancements` и `case-studies`. Интерактивный runtime собирается Vite из небольшого оркестратора `src/app/runtime/runtime.ts` и feature-модулей в `src/app/runtime/features`; локализация вынесена в типизированный `src/app/runtime/locale.ts`, общие SVG-иконки — в `src/shared/ui/Icon.tsx`, адреса языков — в `src/shared/config/locales.ts`. Runtime перезапускается после перехода по маршруту и очищает свои обработчики через AbortController.

Подробная карта runtime, правила связей между feature-модулями и инструкция для нового участника проекта находятся в [`src/app/runtime/README.md`](src/app/runtime/README.md).

Основные URL используют чистые пути: `/`, `/cases`, `/services`, `/about`, `/team`, `/careers`, `/lab`, `/contact`, `/cases/arden`, `/cases/greenflow`, `/cases/orbit`, `/privacy`. Для английского, польского и белорусского доступны те же пути с префиксами `/en`, `/pl` и `/be`; каждая версия получает собственные title, description, canonical, hreflang и JSON-LD. Старые `.html`-адреса сохраняются для совместимости и на Vercel перенаправляются на чистые URL.

Существующие сценарии (фильтры, бриф, Lab, галерея, карточки команды, локализация, тема и доступность) подключаются через runtime-слой. При расширении продукта отдельные сценарии можно переносить в React-фичи без изменения роутинга и SEO-пререндеринга.

## SEO и деплой

Клиентский роутер обновляет `title` и meta-описания при переходе. `npm run build` дополнительно пререндерит каждый публичный маршрут в `dist/<route>/index.html`, а Vercel оставляет эти файлы доступными по чистым URL через `vercel.json`. В результате роботы получают контент и мета-теги сразу, а клиент после загрузки продолжает работать как SPA.

Service worker обновлён под единый shell и возвращает `index.html` как offline fallback. Медиа доступны через `public/assets`, поэтому пути к изображениям не зависят от хешей Vite.

## Интерактив и доступность

Появление типографики, параллакс знака, магнитный отклик CTA, раскрытие услуг, фильтры портфолио, пошаговый бриф, сравнение до/после, мини-демо в кейсах с дизайнерскими пояснениями, сохранение кейсов в бриф, Lab с ползунками, жестом, случайной формой и PNG-экспортом, мобильное меню с Escape и focus trap, командная палитра `⌘K` / `Ctrl+K`, View Transitions, четыре языка и `prefers-reduced-motion`.

Для подключения серверной отправки брифа задайте `VITE_BRIEF_ENDPOINT`. Runtime отправит JSON через адаптер `src/app/runtime/features/brief-submit.ts`; при недоступном endpoint автоматически остаётся mailto и скачивание `.txt`.

Демонстрационные данные команды и портреты вымышлены и обозначены как материалы макета. Адрес `hello@acorweb.ru` требует проверки владельцем перед публикацией.
