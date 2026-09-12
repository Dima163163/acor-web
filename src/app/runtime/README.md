# Runtime-слой

React отвечает за разметку страниц, а этот слой подключает поведение после
каждого перехода React Router. Точка входа — `bootstrap.ts`: она лениво
загружает `runtime.ts`, чтобы интерактивы не блокировали первый экран.

## Жизненный цикл

1. `App.tsx` вызывает `loadRuntime()` после смены маршрута.
2. `runtime.ts` завершает предыдущий экземпляр, создаёт `AbortController` и
   собирает общий `RuntimeContext`.
3. Feature-модули монтируются один раз для текущей разметки.
4. Все слушатели получают общий `AbortSignal`. При следующем переходе один
   вызов `window.__acorRuntimeCleanup()` снимает их автоматически.

## Где искать поведение

- `appearance.ts` — тема, язык, reduced motion и курсор;
- `navigation.ts` — мобильное меню и focus trap;
- `features/motion-effects.js` — параллакс, reveal, magnetic CTA и hover-курсор;
- `features/projects.js` — фильтры, сортировка, список и избранные проекты;
- `features/contact-form.js` — черновик формы, скачивание брифа и mailto;
- `features/scroll-state.js` — прогресс чтения, chapter dock и online/offline;
- `features/team.js` — поиск команды, фильтры и диалог профиля;
- `features/case-features.js` — галерея, breadcrumbs, share и печать кейса;
- `features/compare-and-cards.js` — compare slider и tilt карточек;
- `features/project-builder.js` — интерактивный выбор типа проекта;
- `features/lab-palette.js` и `lab.js` — сцена Lab и её пресеты;
- `features/process-tabs.js` — вкладки этапов процесса;
- `features/feedback-effects.js` — ripple, entry animation и 404-эксперимент;
- `brief.js` — пошаговый бриф;
- `command-palette.js` — поиск по разделам;
- `telemetry.js` — локальный журнал interaction-событий без отправки данных;
- `service-worker.js` — локализация после динамического добавления элементов и
  регистрация service worker.

## Как добавить новую интерактивность

1. Создать отдельный модуль в `features/` с функцией `mount...`.
2. Получить зависимости через аргумент контекста, а не читать переменные из
   другого feature-модуля. Если модулю нужно сообщить состояние наружу,
   вернуть небольшой API (пример — `updateScroll` в `scroll-state.js`).
3. Добавить декларацию `.d.ts` рядом с JavaScript-модулем, чтобы оркестратор
   оставался типобезопасным.
4. Подключить модуль в `runtime.ts` и добавить сценарий в `e2e/site.spec.ts`.
5. Проверить `npm run typecheck`, `npm run build` и `npm run test:e2e`.

DOM-модули намеренно не содержат JSX: так разметка остаётся в `src/pages` и
`src/widgets`, а поведение можно менять независимо от структуры экрана.
