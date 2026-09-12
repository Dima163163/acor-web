export const mountFeedbackEffects = ({ t, appearance, pageKey }) => {
  // A tactile ripple confirms taps on primary actions, especially on touch
  // screens where hover feedback is unavailable.
  document.addEventListener('pointerdown', (event) => {
    if (appearance.isMotionDisabled() || event.target.closest('input,textarea,select,[data-compare-range]')) return;
    const target = event.target.closest('button,.dark-button,.light-button,.round-link,.text-link');
    if (!target || target.closest('.mobile-nav')) return;
    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }, { passive: true });

  // Page entry and non-View-Transition browsers still get a quiet handoff.
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => document.body.classList.remove('page-enter'));

  // The 404 page doubles as a tiny studio experiment: catch the moving arrow
  // five times to reveal a route back to the work.
  const offlinePage = document.querySelector('.offline-page');
  if (offlinePage && pageKey() === '404.html') {
    const game = document.createElement('button');
    game.type = 'button';
    game.className = 'error-orbit';
    game.setAttribute('aria-label', t('Поймать форму'));
    game.innerHTML = '<span class="error-orbit-core">↗︎</span><span class="error-orbit-label">Поймать форму</span>';
    const status = document.createElement('p');
    status.className = 'error-orbit-status';
    status.setAttribute('role', 'status');
    let catches = 0;
    const move = () => {
      game.style.setProperty('--orbit-x', `${Math.round((Math.random() - .5) * 100)}px`);
      game.style.setProperty('--orbit-y', `${Math.round((Math.random() - .5) * 70)}px`);
      game.style.setProperty('--orbit-r', `${Math.round((Math.random() - .5) * 18)}deg`);
    };
    game.addEventListener('click', () => {
      catches += 1;
      if (catches >= 5) {
        status.textContent = t('Форма найдена. Открываем проекты.');
        game.classList.add('is-complete');
        window.setTimeout(() => { location.href = '/cases'; }, appearance.isMotionDisabled() ? 0 : 520);
      } else {
        status.textContent = `${t('Поймано')} ${catches}/5`;
        move();
      }
    });
    offlinePage.append(game, status);
    move();
  }
};
