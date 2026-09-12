export const mountEstimator = ({ t }) => {
  const estimateType = document.querySelector('#estimate-type');
  const estimateScope = document.querySelector('#estimate-scope');
  const estimatePace = document.querySelector('#estimate-pace');
  const estimateTitle = document.querySelector('#estimate-title');
  const estimateCopy = document.querySelector('#estimate-copy');
  const estimateWeeks = document.querySelector('#estimate-weeks');
  const estimateTeam = document.querySelector('#estimate-team');
  const estimateCta = document.querySelector('#estimate-cta');
  if (estimateType && estimateScope && estimatePace) {
    const estimates = {
      web: { start: ['Сайт / стартовый этап', 'Погружение, структура и визуальная гипотеза.', '3–5 недель', '2–3 роли'], full: ['Сайт / полный цикл', 'Стратегия, дизайн, разработка и QA в одной команде.', '8–14 недель', '4–6 ролей'], support: ['Сайт / развитие', 'Новые сценарии, аналитика и точечные улучшения.', '2–4 недели', '2–4 роли'] },
      app: { start: ['Приложение / стартовый этап', 'Карта сценариев, прототип и техническая рамка.', '4–7 недель', '3–4 роли'], full: ['Приложение / полный цикл', 'Продуктовая логика, iOS / Android, backend и QA.', '12–20 недель', '5–8 ролей'], support: ['Приложение / развитие', 'Новые функции, проверка гипотез и выпуск итераций.', '3–6 недель', '3–5 ролей'] },
      design: { start: ['Визуальная система / стартовый этап', 'Идея, направление и базовые правила языка.', '2–4 недели', '1–3 роли'], full: ['Визуальная система / полный цикл', 'Айдентика, интерфейс и motion в единой системе.', '5–9 недель', '2–4 роли'], support: ['Визуальная система / развитие', 'Масштабирование языка на новые носители и продукты.', '2–4 недели', '1–3 роли'] }
    };
    const syncEstimate = () => {
      const current = estimates[estimateType.value][estimateScope.value];
      const pace = estimatePace.value === 'fast' ? ' Ускоренный темп уточним после оценки рисков.' : '';
      estimateTitle.textContent = current[0];
      estimateCopy.textContent = current[1] + pace;
      estimateWeeks.textContent = current[2];
      estimateTeam.textContent = current[3];
      estimateCta.href = `/contact?type=${estimateType.value}`;
    };
    [estimateType, estimateScope, estimatePace].forEach((control) => control.addEventListener('change', syncEstimate));
    window.addEventListener('acor:locale-change', syncEstimate);
    syncEstimate();
  }
};
