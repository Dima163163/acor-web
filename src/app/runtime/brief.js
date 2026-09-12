export const mountBrief = (t, reducedMotion) => {
const briefBuilder = document.querySelector('#brief-builder');
if (briefBuilder) {
  const briefSteps = Array.from(briefBuilder.querySelectorAll('[data-brief-step]'));
  const briefOptions = Array.from(briefBuilder.querySelectorAll('[data-brief-option]'));
  const briefPrev = briefBuilder.querySelector('#brief-prev');
  const briefNext = briefBuilder.querySelector('#brief-next');
  const briefTitle = briefBuilder.querySelector('#brief-summary-title');
  const briefCopy = briefBuilder.querySelector('#brief-summary-copy');
  const briefTags = briefBuilder.querySelector('#brief-summary-tags');
  const briefKicker = briefBuilder.querySelector('.brief-summary-kicker');
  const briefNote = briefBuilder.querySelector('.brief-summary-note');
  const briefForm = document.querySelector('#brief-form');
  const briefProgress = document.createElement('div');
  briefProgress.className = 'brief-progress';
  briefProgress.setAttribute('role', 'progressbar');
  briefProgress.setAttribute('aria-label', 'Прогресс заполнения брифа');
  briefBuilder.querySelector('.brief-steps')?.prepend(briefProgress);
  const briefShare = document.createElement('button');
  briefShare.type = 'button';
  briefShare.className = 'brief-share';
  briefShare.dataset.analytics = 'brief_share';
  briefShare.textContent = 'Скопировать ссылку на этот бриф';
  briefShare.setAttribute('aria-label', 'Скопировать ссылку на выбранный бриф');
  briefBuilder.querySelector('.brief-summary')?.append(briefShare);
  const briefParams = new URLSearchParams(location.search);
  const briefState = {
    type: ['web', 'app', 'design', 'other'].includes(briefParams.get('type')) ? briefParams.get('type') : 'web',
    audience: ['clients', 'team', 'buyers', 'wide'].includes(briefParams.get('audience')) ? briefParams.get('audience') : 'clients',
    goal: ['launch', 'refresh', 'validate', 'grow'].includes(briefParams.get('goal')) ? briefParams.get('goal') : 'launch',
    tone: ['calm', 'bold', 'clear', 'alive'].includes(briefParams.get('tone')) ? briefParams.get('tone') : 'clear'
  };
  const briefText = {
    type: {
      web: ['Сайт с характером.', 'Соберём структуру, визуальную идею и понятный путь к действию.', 'Web'],
      app: ['Приложение, которым удобно пользоваться.', 'Продумываем ежедневные сценарии, состояния и связь между экранами.', 'Mobile'],
      design: ['Визуальная система, которую узнают.', 'Находим идею и превращаем её в устойчивый язык для продукта и команды.', 'Identity'],
      other: ['Задача, которой нужна форма.', 'Разберёмся в контексте и предложим маршрут, с которого удобно начать.', 'Custom']
    },
    audience: {
      clients: ['Люди выбирают с доверием.', 'Покажем ценность продукта до первого контакта.', 'Клиенты'],
      team: ['Команда видит общее.', 'Сделаем сложный внутренний сценарий прозрачнее.', 'Команда'],
      buyers: ['Выбор становится проще.', 'Соединим настроение, аргументы и понятный следующий шаг.', 'Покупатели'],
      wide: ['Первое впечатление работает.', 'Соберём язык, который быстро считывается разными людьми.', 'Аудитория']
    },
    goal: {
      launch: ['Новый продукт начинается уверенно.', 'От первого вопроса до сценария, который можно выпускать.', 'Запуск'],
      refresh: ['Существующее получает новую опору.', 'Найдём, что мешает продукту, и аккуратно пересоберём главное.', 'Обновление'],
      validate: ['Идея проходит проверку раньше.', 'Соберём прототип и проверим ключевой сценарий до большой разработки.', 'Проверка'],
      grow: ['Следующая версия становится точнее.', 'Смотрим на поведение пользователей и развиваем то, что действительно нужно.', 'Развитие']
    },
    tone: {
      calm: ['Спокойное ощущение.', 'Паузы, ясная иерархия и форма, которая помогает сосредоточиться.', 'Calm'],
      bold: ['Смелое ощущение.', 'Контраст, характер и визуальный жест, который сложно забыть.', 'Bold'],
      clear: ['Точное ощущение.', 'Каждая деталь отвечает на действие и не спорит с задачей.', 'Clear'],
      alive: ['Живое ощущение.', 'Движение, отклик и пространство для любопытства.', 'Alive']
    }
  };
  const briefEstimates = {
    web: { launch: 'Ориентир: 6–10 недель до первой версии.', refresh: 'Ориентир: 4–8 недель на пересборку главного.', validate: 'Ориентир: 2–4 недели на прототип и проверку.', grow: 'Ориентир: короткие итерации по 2–4 недели.' },
    app: { launch: 'Ориентир: 10–16 недель до первого релиза.', refresh: 'Ориентир: 6–12 недель на обновление ключевых сценариев.', validate: 'Ориентир: 3–5 недель на кликабельный прототип.', grow: 'Ориентир: спринты развития по 2–4 недели.' },
    design: { launch: 'Ориентир: 3–6 недель на базовую систему.', refresh: 'Ориентир: 2–5 недель на обновление языка.', validate: 'Ориентир: 1–3 недели на визуальную гипотезу.', grow: 'Ориентир: последовательные этапы по 2–3 недели.' },
    other: { launch: 'Срок зависит от формата — сначала уточним контекст.', refresh: 'Сначала найдём, что стоит сохранить и пересобрать.', validate: 'Начнём с небольшого прототипа и проверим идею.', grow: 'Соберём план развития под ваши ограничения.' }
  };
  let briefIndex = 0;
  const syncBriefUrl = () => {
    const url = new URL(location.href);
    Object.entries(briefState).forEach(([key, value]) => url.searchParams.set(key, value));
    history.replaceState(null, '', url);
  };
  const syncBrief = () => {
    briefSteps.forEach((step, index) => {
      step.hidden = index !== briefIndex;
      step.classList.toggle('is-active', index === briefIndex);
    });
    briefOptions.forEach((option) => option.classList.toggle('is-selected', briefState[option.dataset.briefOption] === option.dataset.briefValue));
    const key = ['type', 'audience', 'goal', 'tone'][briefIndex];
    const [title, copy] = briefText[key][briefState[key]];
    if (briefTitle) briefTitle.textContent = t(title);
    if (briefCopy) briefCopy.textContent = t(copy);
    if (briefKicker) briefKicker.textContent = `${t('Ваш контекст')} / ${String(briefIndex + 1).padStart(2, '0')} ${t('из')} ${String(briefSteps.length).padStart(2, '0')}`;
    if (briefTags) briefTags.innerHTML = Object.entries(briefState).map(([name, value]) => `<span>${t(briefText[name][value][2])}</span>`).join('');
    if (briefNote) briefNote.textContent = t(briefEstimates[briefState.type][briefState.goal]);
    if (briefProgress) {
      const progress = Math.round(((briefIndex + 1) / briefSteps.length) * 100);
      briefProgress.style.setProperty('--brief-progress', `${progress}%`);
      briefProgress.setAttribute('aria-valuenow', String(progress));
      briefProgress.setAttribute('aria-valuetext', `${progress}%`);
    }
    if (briefPrev) briefPrev.disabled = briefIndex === 0;
    if (briefNext) briefNext.innerHTML = briefIndex === briefSteps.length - 1 ? `${t('Заполнить заявку')} <span>↘︎</span>` : `${t('Следующий вопрос')} <span>↗︎</span>`;
    const typeChoice = briefForm?.querySelector(`input[name="type"][value="${briefState.type}"]`);
    if (typeChoice) typeChoice.checked = true;
    syncBriefUrl();
  };
  briefOptions.forEach((option) => option.addEventListener('click', () => {
    briefState[option.dataset.briefOption] = option.dataset.briefValue;
    syncBrief();
  }));
  briefPrev?.addEventListener('click', () => { briefIndex = Math.max(0, briefIndex - 1); syncBrief(); });
  briefNext?.addEventListener('click', () => {
    if (briefIndex < briefSteps.length - 1) {
      briefIndex += 1;
      syncBrief();
    } else {
      document.querySelector('#brief-form')?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
      briefForm?.elements.name?.focus({ preventScroll: true });
    }
  });
  briefShare.addEventListener('click', async () => {
    const shareUrl = location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      briefShare.textContent = t('Ссылка скопирована');
    } catch {
      briefShare.textContent = t('Скопируйте URL из адресной строки');
    }
    setTimeout(() => { briefShare.textContent = t('Скопировать ссылку на этот бриф'); }, 2600);
  });
  syncBrief();
  window.addEventListener('acor:locale-change', syncBrief);
}
};
