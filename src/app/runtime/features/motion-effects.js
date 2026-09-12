export const mountMotionEffects = ({ appearance, finePointer, reducedMotion, cursor }) => {
  // Event-driven transforms: no permanent animation loop and no scroll interception.
  const art = document.querySelector('[data-parallax]');
  const hero = document.querySelector('.hero');
  let frame = null;
  if (art && hero) {
    hero.addEventListener('pointermove', (event) => {
      if (appearance.isMotionDisabled() || !finePointer.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        art.style.setProperty('--mx', `${x * 20}px`);
        art.style.setProperty('--my', `${y * 14}px`);
        art.style.setProperty('--mr', `${x * 3}deg`);
      });
    });
    hero.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      art.style.setProperty('--mx', '0px'); art.style.setProperty('--my', '0px'); art.style.setProperty('--mr', '0deg');
    });
    const heroLink = hero.querySelector('.round-link');
    heroLink?.addEventListener('pointerenter', () => hero.classList.add('hero-intent'));
    heroLink?.addEventListener('pointerleave', () => hero.classList.remove('hero-intent'));
    heroLink?.addEventListener('focus', () => hero.classList.add('hero-intent'));
    heroLink?.addEventListener('blur', () => hero.classList.remove('hero-intent'));
  }
  if (finePointer.matches) {
    document.querySelectorAll('.round-link, .dark-button, .light-button, .footer-contact').forEach((target) => {
      target.classList.add('magnetic');
      target.addEventListener('pointermove', (event) => {
        if (appearance.isMotionDisabled()) return;
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) / Math.max(1, rect.width);
        const y = (event.clientY - (rect.top + rect.height / 2)) / Math.max(1, rect.height);
        target.style.setProperty('--mag-x', `${x * 8}px`);
        target.style.setProperty('--mag-y', `${y * 6}px`);
      });
      target.addEventListener('pointerleave', () => {
        target.style.setProperty('--mag-x', '0px');
        target.style.setProperty('--mag-y', '0px');
      });
    });
    document.addEventListener('pointermove', (event) => {
      if (appearance.isMotionDisabled()) return;
      document.body.style.setProperty('--spot-x', `${event.clientX}px`);
      document.body.style.setProperty('--spot-y', `${event.clientY}px`);
    }, { passive: true });
  }
  const animatedElements = document.querySelectorAll('[data-reveal], .project, .process-grid article, .role-card, .person-card, .insight-card, .after-brief-grid article, .case-info-grid article, .case-timeline li');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!appearance.isMotionDisabled()) entry.target.classList.add('seen');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    animatedElements.forEach((element) => observer.observe(element));
  }
  document.querySelectorAll('[data-cursor]').forEach((link) => {
    link.addEventListener('pointermove', (event) => {
      if (!cursor || appearance.isMotionDisabled() || !finePointer.matches) return;
      cursor.textContent = link.dataset.cursor;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('visible');
    });
    link.addEventListener('pointerleave', () => cursor?.classList.remove('visible'));
  });
  window.addEventListener('scroll', () => cursor?.classList.remove('visible'), { passive: true });

  // Native disclosures keep their keyboard and no-script behaviour.
  const disclosures = document.querySelectorAll('.service-item');
  disclosures.forEach((item) => item.addEventListener('toggle', () => {
    if (item.open) disclosures.forEach((other) => { if (other !== item) other.open = false; });
  }));

  // Animate the actual details height so the first open does not jump the layout.
  // The summary click remains keyboard accessible; without JavaScript, native details still work.
  const smoothDisclosures = document.querySelectorAll('.service-item, .insight-card, .faq-list details');
  smoothDisclosures.forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    let animating = false;
    let finishTimer = 0;
    let afterFinish = null;
    const closedHeight = () => {
      const computed = getComputedStyle(details);
      const padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
      const borders = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
      return Math.ceil(summary.getBoundingClientRect().height + padding + borders);
    };
    const finish = (event) => {
      if (event?.propertyName && event.propertyName !== 'height') return;
      window.clearTimeout(finishTimer);
      const callback = afterFinish;
      afterFinish = null;
      callback?.();
      details.classList.remove('disclosure-height-animating');
      details.style.removeProperty('height');
      details.style.removeProperty('overflow');
      animating = false;
    };
    details.addEventListener('transitionend', finish);
    const animateOpen = () => {
      if (details.open || animating) return;
      if (appearance.isMotionDisabled() || reducedMotion.matches) {
        details.open = true;
        return;
      }
      animating = true;
      details.open = true;
      details.classList.add('disclosure-height-animating');
      details.style.height = `${closedHeight()}px`;
      void details.offsetHeight;
      requestAnimationFrame(() => {
        details.style.height = `${details.scrollHeight}px`;
        finishTimer = window.setTimeout(() => finish(), 700);
      });
    };
    const animateClose = () => {
      if (!details.open || animating) return;
      if (appearance.isMotionDisabled() || reducedMotion.matches) {
        details.open = false;
        return;
      }
      animating = true;
      details.classList.add('disclosure-height-animating');
      details.style.height = `${details.offsetHeight}px`;
      details.style.overflow = 'hidden';
      void details.offsetHeight;
      afterFinish = () => { details.open = false; };
      requestAnimationFrame(() => {
        details.style.height = `${closedHeight()}px`;
        finishTimer = window.setTimeout(() => finish(), 700);
      });
    };
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      if (animating) return;
      if (details.open) animateClose();
      else animateOpen();
    });
  });
};
