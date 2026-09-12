import type { RuntimeContext } from '../types';

export const mountProcessTabs = ({ appearance }: RuntimeContext): void => {
  const stepTabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-step]'));
  const processTabs = document.querySelector<HTMLElement>('.process-tabs');
  const selectStep = (button: HTMLButtonElement): void => {
    stepTabs.forEach((tab) => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panelId = tab.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;
      panel.hidden = !selected;
      panel.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      if (selected && !appearance.isMotionDisabled()) panel.animate([{ opacity: .2, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, easing: 'ease-out' });
    });
    const index = Math.max(0, stepTabs.indexOf(button));
    processTabs?.style.setProperty('--process-progress', `${stepTabs.length > 1 ? (index / (stepTabs.length - 1)) * 100 : 0}%`);
  };

  stepTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectStep(button));
    button.addEventListener('keydown', (event) => {
      let target: number | undefined;
      if (event.key === 'ArrowRight') target = (index + 1) % stepTabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + stepTabs.length) % stepTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = stepTabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      selectStep(stepTabs[target]);
      stepTabs[target].focus();
    });
  });
  if (stepTabs.length) selectStep(stepTabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || stepTabs[0]);
};
