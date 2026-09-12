export const mountCompareAndCards = ({ t, appearance, finePointer, cursor }) => {
  document.querySelectorAll('[data-compare]').forEach((compare) => {
    const range = compare.querySelector('[data-compare-range]');
    const output = compare.querySelector('[data-compare-output]');
    range?.addEventListener('input', () => {
      compare.style.setProperty('--compare', `${range.value}%`);
      if (output) output.textContent = `${range.value}%`;
    });
    compare.addEventListener('pointerenter', () => {
      if (!cursor || appearance.isMotionDisabled() || !finePointer.matches) return;
      cursor.textContent = t('Сравнить ↔︎');
      cursor.classList.add('visible');
    });
    compare.addEventListener('pointermove', (event) => {
      if (!cursor || appearance.isMotionDisabled() || !finePointer.matches) return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
    compare.addEventListener('pointerleave', () => cursor?.classList.remove('visible'));
  });

  // A light 3D response gives the case cards a material feel without adding a
  // render loop. It stays on fine pointers where the gesture is predictable.
  if (finePointer.matches) {
    document.querySelectorAll('.project-link').forEach((target) => {
      let tiltFrame = null;
      target.addEventListener('pointermove', (event) => {
        if (appearance.isMotionDisabled()) return;
        if (tiltFrame) cancelAnimationFrame(tiltFrame);
        tiltFrame = requestAnimationFrame(() => {
          const rect = target.getBoundingClientRect();
          const x = (event.clientX - rect.left) / Math.max(1, rect.width) - .5;
          const y = (event.clientY - rect.top) / Math.max(1, rect.height) - .5;
          target.style.setProperty('--card-tilt-x', `${(y * -2.8).toFixed(2)}deg`);
          target.style.setProperty('--card-tilt-y', `${(x * 3.2).toFixed(2)}deg`);
          target.style.setProperty('--card-lift', `${Math.min(7, Math.max(0, (Math.abs(x) + Math.abs(y)) * 3)).toFixed(2)}px`);
        });
      });
      target.addEventListener('pointerleave', () => {
        if (tiltFrame) cancelAnimationFrame(tiltFrame);
        target.style.setProperty('--card-tilt-x', '0deg');
        target.style.setProperty('--card-tilt-y', '0deg');
        target.style.setProperty('--card-lift', '0px');
      });
    });
  }
};
