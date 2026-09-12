import type { RuntimeContext } from '../types';

type ProjectType = 'web' | 'app' | 'design';
interface ProjectCopy {
  heading: string;
  description: string;
  team: string[];
  title: [string, string];
  action: string;
}

const projectTypes: Record<ProjectType, ProjectCopy> = {
  web: { heading: 'Впечатление с первого экрана.', description: 'От структуры и визуальной идеи до быстрого, адаптивного сайта.', team: ['Аналитик', 'Дизайнер', 'Frontend', 'Backend'], title: ['Есть идея.', 'Будет сайт.'], action: 'Обсудить сайт ↗︎' },
  app: { heading: 'Ваш продукт всегда рядом.', description: 'Понятные сценарии, нативные жесты и единая логика для iOS и Android.', team: ['UX/UI', 'iOS', 'Android', 'Backend', 'QA'], title: ['Ближе.', 'Каждый день.'], action: 'Обсудить приложение ↗︎' },
  design: { heading: 'Характер, который узнают.', description: 'Находим визуальную идею и собираем систему, которая растёт вместе с брендом.', team: ['Арт-директор', 'Дизайнер', 'Motion'], title: ['Свой взгляд.', 'Своя форма.'], action: 'Обсудить дизайн ↗︎' }
};

export const mountProjectBuilder = ({ t, appearance }: RuntimeContext): void => {
  const builderOptions = document.querySelectorAll<HTMLButtonElement>('[data-project-type]');
  const scene = document.querySelector<HTMLElement>('.builder-preview');
  if (!builderOptions.length || !scene) return;

  const syncBuilder = (type: string, animate = false): void => {
    const project = projectTypes[type as ProjectType];
    if (!project) return;
    builderOptions.forEach((option) => {
      const selected = option.dataset.projectType === type;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    scene.dataset.builderState = type;
    document.querySelector<HTMLElement>('#builder-heading')?.replaceChildren(document.createTextNode(t(project.heading)));
    document.querySelector<HTMLElement>('#builder-description')?.replaceChildren(document.createTextNode(t(project.description)));
    const title = scene.querySelector<HTMLElement>('.builder-art-title');
    title?.replaceChildren(document.createTextNode(t(project.title[0])), document.createElement('br'), document.createTextNode(t(project.title[1])));
    document.querySelector<HTMLElement>('#builder-team')?.replaceChildren(...project.team.map((role) => {
      const chip = document.createElement('span');
      chip.textContent = t(role);
      return chip;
    }));
    const cta = document.querySelector<HTMLAnchorElement>('#builder-cta');
    if (cta) {
      cta.href = `/contact?type=${type}`;
      cta.textContent = t(project.action);
    }
    if (animate && !appearance.isMotionDisabled()) scene.querySelector<HTMLElement>('.builder-response')?.animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
  };

  builderOptions.forEach((button) => button.addEventListener('click', () => {
    const type = button.dataset.projectType || 'web';
    if (scene.dataset.builderState === type) return;
    syncBuilder(type, true);
  }));
  syncBuilder(scene.dataset.builderState || builderOptions[0].dataset.projectType || 'web');
  window.addEventListener('acor:locale-change', () => syncBuilder(scene.dataset.builderState || 'web'));
};
