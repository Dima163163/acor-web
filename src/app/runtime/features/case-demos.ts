import type { RuntimeContext } from '../types';

type DemoKey = 'architecture' | 'commerce' | 'finance';

const messages: Record<DemoKey, Record<string, string>> = {
  architecture: {
    panorama: 'Панорама задаёт ощущение места до деталей.',
    plan: 'План переводит впечатление в понятный маршрут.',
    material: 'Материал даёт тактильное подтверждение решения.'
  },
  commerce: {
    stone: 'Камень — фактура и спокойный контраст для первого экрана.',
    textile: 'Текстиль — мягкий ритм, который помогает задержаться.',
    light: 'Свет — лёгкая подсказка для следующего выбора.'
  },
  finance: {
    month: 'Месяц — быстрый срез для ежедневных решений.',
    quarter: 'Квартал — спокойный горизонт для приоритетов.',
    year: 'Год — общий вектор без перегруза деталями.'
  }
};

export const mountCaseDemos = ({ appearance }: RuntimeContext): void => {
  document.querySelectorAll<HTMLElement>('[data-case-demo]').forEach((scene) => {
    const key = scene.dataset.caseDemo as DemoKey | undefined;
    if (!key || !messages[key]) return;
    const demo = scene.closest('main')?.querySelector<HTMLElement>('.case-demo');
    if (!demo || demo.dataset.demoReady) return;
    demo.dataset.demoReady = 'true';
    const output = demo.querySelector<HTMLOutputElement>('[data-demo-output]');
    const buttons = Array.from(demo.querySelectorAll<HTMLButtonElement>('[data-demo-value]'));
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.demoValue || '';
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        if (output && messages[key][value]) {
          output.textContent = messages[key][value];
          if (!appearance.isMotionDisabled()) output.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, easing: 'ease-out' });
        }
        scene.dataset.demoState = value;
      });
    });
  });
};
