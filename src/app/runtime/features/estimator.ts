import type { RuntimeContext } from '../types';

type EstimateScope = 'start' | 'full' | 'support';
type EstimateType = 'web' | 'app' | 'design';
type Estimate = [title: string, copy: string, weeks: string, team: string];

const estimates: Record<EstimateType, Record<EstimateScope, Estimate>> = {
  web: {
    start: ['Сайт / стартовый этап', 'Погружение, структура и визуальная гипотеза.', '3–5 недель', '2–3 роли'],
    full: ['Сайт / полный цикл', 'Стратегия, дизайн, разработка и QA в одной команде.', '8–14 недель', '4–6 ролей'],
    support: ['Сайт / развитие', 'Новые сценарии, аналитика и точечные улучшения.', '2–4 недели', '2–4 роли']
  },
  app: {
    start: ['Приложение / стартовый этап', 'Карта сценариев, прототип и техническая рамка.', '4–7 недель', '3–4 роли'],
    full: ['Приложение / полный цикл', 'Продуктовая логика, iOS / Android, backend и QA.', '12–20 недель', '5–8 ролей'],
    support: ['Приложение / развитие', 'Новые функции, проверка гипотез и выпуск итераций.', '3–6 недель', '3–5 ролей']
  },
  design: {
    start: ['Визуальная система / стартовый этап', 'Идея, направление и базовые правила языка.', '2–4 недели', '1–3 роли'],
    full: ['Визуальная система / полный цикл', 'Айдентика, интерфейс и motion в единой системе.', '5–9 недель', '2–4 роли'],
    support: ['Визуальная система / развитие', 'Масштабирование языка на новые носители и продукты.', '2–4 недели', '1–3 роли']
  }
};

export const mountEstimator = (_context: RuntimeContext): void => {
  const estimateType = document.querySelector<HTMLSelectElement>('#estimate-type');
  const estimateScope = document.querySelector<HTMLSelectElement>('#estimate-scope');
  const estimatePace = document.querySelector<HTMLSelectElement>('#estimate-pace');
  const estimateTitle = document.querySelector<HTMLElement>('#estimate-title');
  const estimateCopy = document.querySelector<HTMLElement>('#estimate-copy');
  const estimateWeeks = document.querySelector<HTMLElement>('#estimate-weeks');
  const estimateTeam = document.querySelector<HTMLElement>('#estimate-team');
  const estimateCta = document.querySelector<HTMLAnchorElement>('#estimate-cta');
  if (!estimateType || !estimateScope || !estimatePace) return;

  const syncEstimate = (): void => {
    const type = (estimateType.value in estimates ? estimateType.value : 'web') as EstimateType;
    const scope = (estimateScope.value in estimates[type] ? estimateScope.value : 'start') as EstimateScope;
    const current = estimates[type][scope];
    const pace = estimatePace.value === 'fast' ? ' Ускоренный темп уточним после оценки рисков.' : '';
    if (estimateTitle) estimateTitle.textContent = current[0];
    if (estimateCopy) estimateCopy.textContent = current[1] + pace;
    if (estimateWeeks) estimateWeeks.textContent = current[2];
    if (estimateTeam) estimateTeam.textContent = current[3];
    if (estimateCta) estimateCta.href = `/contact?type=${type}`;
  };

  [estimateType, estimateScope, estimatePace].forEach((control) => control.addEventListener('change', syncEstimate));
  window.addEventListener('acor:locale-change', syncEstimate);
  syncEstimate();
};
