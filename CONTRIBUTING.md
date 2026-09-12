# Как работать с проектом

## Быстрый старт

Нужен Node.js 22 или новее.

```sh
npm install
npm run dev
```

Для проверки production-состояния есть одна команда:

```sh
npm run check
```

Она выполняет TypeScript-проверку, production-сборку с SEO-пререндерингом и
аудит метаданных. Перед pull request дополнительно запускайте `npm run test:e2e`.

Playwright проверяет desktop Chromium, Firefox и Safari (WebKit), а также
мобильные Chrome и Safari (WebKit). Локально можно передать путь к уже
установленному Chromium
через `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`; в CI все движки устанавливаются
автоматически.

## Карта проекта

- `src/app` — BrowserRouter, реестр маршрутов, SEO и runtime bootstrap;
- `src/pages/<page>/ui` — разметка отдельного экрана;
- `src/widgets` — повторно используемые крупные блоки (header, footer);
- `src/shared/styles` — глобальные CSS-слои, подключённые из `index.css`;
- `src/shared/config` — навигация, SEO-данные и общие типы;
- `src/app/runtime/features` — интерактивы, которые монтируются поверх React-разметки;
- `public/assets` — изображения и другие стабильные публичные ресурсы;
- `scripts` — пререндер маршрутов и SEO-аудит;
- `e2e` — пользовательские smoke-сценарии Playwright.

Разметка не должна возвращаться в runtime-скрипты. Если экрану нужна новая
структура, изменяйте JSX в `src/pages` или `src/widgets`, а поведение держите в
отдельном feature-модуле. Подробный жизненный цикл runtime описан в
[`src/app/runtime/README.md`](src/app/runtime/README.md).

## Типичный pull request

1. Выберите существующую страницу или создайте новую запись в `src/app/routes.ts`.
2. Для визуальных изменений обновите нужный CSS-слой, а не добавляйте стили в
   случайный файл.
3. Для интерактивности создайте `mount...` в `src/app/runtime/features` и его
   `.d.ts`-контракт, затем подключите модуль в `runtime.ts`.
4. Добавьте E2E-сценарий для пользовательского результата, а не для деталей
   реализации.
5. Запустите `npm run check` и `npm run test:e2e`.

Переходы между страницами идут через React Router без полной перезагрузки.
Если меняется публичный URL, проверьте title, description, canonical и запись
в `scripts/prerender.mjs`. Старые `.html`-адреса поддерживаются намеренно для
совместимости.
