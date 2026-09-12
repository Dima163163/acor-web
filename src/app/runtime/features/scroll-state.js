export const mountScrollState = ({ t, appearance, finePointer, reducedMotion }) => {
  const hero = document.querySelector('.hero');
  // Ambient CSS motion runs only while the relevant artwork is in view.
  if ('IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
    });
    document.querySelectorAll('.hero, .team-art').forEach((element) => motionObserver.observe(element));
  }
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  progress?.removeAttribute('aria-hidden');
  progress?.setAttribute('role', 'progressbar');
    progress?.setAttribute('aria-label', 'Прогресс чтения страницы');
  const connectionStatus = document.createElement('div');
  connectionStatus.className = 'connection-status';
  connectionStatus.setAttribute('role', 'status');
  connectionStatus.hidden = true;
  document.body.append(connectionStatus);
  const syncConnection = () => {
    connectionStatus.hidden = navigator.onLine;
    connectionStatus.textContent = navigator.onLine ? '' : t('Офлайн-режим: сохранённые материалы доступны, формы можно заполнить позже.');
  };
  window.addEventListener('online', syncConnection);
  window.addEventListener('offline', syncConnection);
  window.addEventListener('acor:locale-change', syncConnection);
  syncConnection();
  const chapterDock = document.querySelector('.chapter-dock');
  const chapters = Array.from(document.querySelectorAll('[data-chapter]'));
  const footer = document.querySelector('.site-footer');
  let scrollFrame = null;
  let previousScrollY = scrollY;
  let previousScrollAt = performance.now();
  const updateScroll = () => {
    scrollFrame = null;
    const now = performance.now();
    const elapsed = Math.max(16, now - previousScrollAt);
    const velocity = Math.max(-18, Math.min(18, ((scrollY - previousScrollY) / elapsed) * 14));
    previousScrollY = scrollY;
    previousScrollAt = now;
    document.body.style.setProperty('--scroll-velocity', appearance.isMotionDisabled() ? '0' : velocity.toFixed(2));
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty('--reading', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
    progress?.setAttribute('aria-valuenow', String(Math.round((distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0) * 100)));
    header?.classList.toggle('is-scrolled', scrollY > 20);
    if (chapterDock) {
      const focused = chapterDock.contains(document.activeElement);
      chapterDock.hidden = !focused && ((hero?.getBoundingClientRect().bottom ?? 0) > 100 || (footer?.getBoundingClientRect().top ?? Infinity) < innerHeight);
      let current = chapters[0];
      chapters.forEach((link) => {
        if (document.getElementById(link.dataset.chapter).getBoundingClientRect().top < innerHeight * .4) current = link;
      });
      chapters.forEach((link) => {
        if (link === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    if (hero && !appearance.isMotionDisabled() && finePointer.matches && hero.getBoundingClientRect().bottom > 0) {
      hero.style.setProperty('--scroll-art', `${-Math.min(scrollY * .09, 60)}px`);
      hero.style.setProperty('--scroll-copy', `${Math.min(scrollY * .035, 20)}px`);
    }
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  });
  chapterDock?.querySelector('.dock-top').addEventListener('click', () => {
    document.querySelector('.brand')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
  chapterDock?.addEventListener('focusout', () => requestAnimationFrame(updateScroll));
  updateScroll();

  return { updateScroll };
};
