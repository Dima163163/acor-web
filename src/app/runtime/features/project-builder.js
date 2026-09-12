export const mountProjectBuilder = ({ t, appearance }) => {
  const projectTypes = {
    web: { heading: 'Впечатление с первого экрана.', description: 'От структуры и визуальной идеи до быстрого, адаптивного сайта.', team: ['Аналитик', 'Дизайнер', 'Frontend', 'Backend'], title: ['Есть идея.', 'Будет сайт.'], action: 'Обсудить сайт ↗︎' },
    app: { heading: 'Ваш продукт всегда рядом.', description: 'Понятные сценарии, нативные жесты и единая логика для iOS и Android.', team: ['UX/UI', 'iOS', 'Android', 'Backend', 'QA'], title: ['Ближе.', 'Каждый день.'], action: 'Обсудить приложение ↗︎' },
    design: { heading: 'Характер, который узнают.', description: 'Находим визуальную идею и собираем систему, которая растёт вместе с брендом.', team: ['Арт-директор', 'Дизайнер', 'Motion'], title: ['Свой взгляд.', 'Своя форма.'], action: 'Обсудить дизайн ↗︎' }
  };
  const builderOptions = document.querySelectorAll('[data-project-type]');
  const syncBuilder = (type, animate = false) => {
    const project = projectTypes[type];
    const scene = document.querySelector('.builder-preview');
    if (!project || !scene) return;
    builderOptions.forEach((option) => {
      const selected = option.dataset.projectType === type;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    scene.dataset.builderState = type;
    document.querySelector('#builder-heading').textContent = t(project.heading);
    document.querySelector('#builder-description').textContent = t(project.description);
    const title = scene.querySelector('.builder-art-title');
    title.replaceChildren(document.createTextNode(t(project.title[0])), document.createElement('br'), document.createTextNode(t(project.title[1])));
    document.querySelector('#builder-team').replaceChildren(...project.team.map((role) => {
      const chip = document.createElement('span'); chip.textContent = t(role); return chip;
    }));
    const cta = document.querySelector('#builder-cta');
    cta.href = `/contact?type=${type}`;
    cta.textContent = t(project.action);
    if (animate && !appearance.isMotionDisabled()) scene.querySelector('.builder-response').animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
  };
  builderOptions.forEach((button) => button.addEventListener('click', () => {
    const type = button.dataset.projectType;
    if (document.querySelector('.builder-preview')?.dataset.builderState === type) return;
    syncBuilder(type, true);
  }));
  if (builderOptions.length) {
    syncBuilder(document.querySelector('.builder-preview')?.dataset.builderState || builderOptions[0].dataset.projectType);
    window.addEventListener('acor:locale-change', () => syncBuilder(document.querySelector('.builder-preview')?.dataset.builderState || 'web'));
  }
};
