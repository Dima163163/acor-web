export const mountCaseFeatures = ({ t, appearance, finePointer, cursor, pageKey }) => {
  // The case link stays available; the gallery is a separate enhancement.
  const gallery = document.querySelector('#project-gallery');
  if (gallery) {
    const stage = gallery.querySelector('#gallery-stage');
    const previous = gallery.querySelector('#gallery-prev');
    const next = gallery.querySelector('#gallery-next');
    const galleryMeta = document.createElement('p');
    galleryMeta.className = 'gallery-meta';
    gallery.querySelector('.gallery-header > div').append(galleryMeta);
    const projectApproach = { Arden: 'масштаб и пауза', GreenFlow: 'ритм каталога', Orbit: 'ясная иерархия' };
    const categoryLabels = { web: 'Web', commerce: 'E-commerce', product: 'Продукт' };
    let galleryCards = [];
    let galleryIndex = 0;
    let galleryTrigger = null;
    const renderProject = (index) => {
      galleryIndex = (index + galleryCards.length) % galleryCards.length;
      const card = galleryCards[galleryIndex];
      const visual = card.querySelector('.project-visual').cloneNode(true);
      // SVG paint references must remain unique alongside the original card.
      visual.querySelectorAll('[id]').forEach((element) => {
        const oldId = element.id;
        element.id = `gallery-${oldId}`;
        visual.querySelectorAll('*').forEach((child) => {
          Array.from(child.attributes).forEach((attribute) => {
            if (attribute.value.includes(`url(#${oldId})`)) child.setAttribute(attribute.name, attribute.value.replaceAll(`url(#${oldId})`, `url(#gallery-${oldId})`));
          });
        });
      });
      stage.className = `gallery-stage ${Array.from(card.classList).filter((name) => name.startsWith('project--')).join(' ')}`;
      stage.replaceChildren(visual);
      gallery.querySelector('#gallery-title').textContent = card.querySelector('h3').textContent;
      const projectName = card.querySelector('h3').textContent.trim();
      galleryMeta.textContent = `${categoryLabels[card.dataset.category] || 'Концепция'}  /  ${projectApproach[projectName] || 'точная форма'}`;
      gallery.querySelector('#gallery-description').textContent = card.querySelector('.project-caption p').textContent;
      gallery.querySelector('#gallery-count').textContent = `${galleryIndex + 1} / ${galleryCards.length}`;
      gallery.querySelector('#gallery-case').href = card.querySelector('.project-link').href;
      previous.disabled = next.disabled = galleryCards.length < 2;
      if (!appearance.isMotionDisabled()) visual.animate([{ opacity: .35, transform: 'scale(.98)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
    };
    document.querySelectorAll('[data-gallery-open]').forEach((button) => {
      button.hidden = false;
      button.addEventListener('click', () => {
        galleryTrigger = button;
        galleryCards = Array.from(document.querySelectorAll('.project')).filter((card) => !card.hidden);
        renderProject(galleryCards.indexOf(button.closest('.project')));
        cursor?.classList.remove('visible');
        gallery.showModal();
        gallery.querySelector('.gallery-close').focus();
      });
    });
    previous.addEventListener('click', () => renderProject(galleryIndex - 1));
    next.addEventListener('click', () => renderProject(galleryIndex + 1));
    gallery.querySelector('.gallery-close').addEventListener('click', () => gallery.close());
    gallery.addEventListener('close', () => galleryTrigger?.focus({ preventScroll: true }));
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        renderProject(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let swipeStart = null;
    stage.addEventListener('pointerdown', (event) => { swipeStart = { x: event.clientX, y: event.clientY }; });
    stage.addEventListener('pointercancel', () => { swipeStart = null; });
    stage.addEventListener('pointerup', (event) => {
      if (!swipeStart) return;
      const dx = event.clientX - swipeStart.x;
      const dy = event.clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) renderProject(galleryIndex + (dx < 0 ? 1 : -1));
    });
    gallery.addEventListener('click', (event) => {
      if (event.target !== gallery) return;
      const rect = gallery.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) gallery.close();
    });
  }

  const caseScene = document.querySelector('.case-scene');
  const caseIntro = document.querySelector('.page-intro');
  if (caseScene && caseIntro) {
    const projectName = caseScene.classList.contains('project--arden') ? 'Arden' : caseScene.classList.contains('project--flora') ? 'GreenFlow' : 'Orbit';
    const crumbs = document.createElement('nav');
    crumbs.className = 'case-crumbs';
    crumbs.setAttribute('aria-label', 'Навигация по проекту');
    crumbs.innerHTML = `<a href="/cases">Проекты</a><span aria-hidden="true">/</span><span>${projectName}</span><span aria-hidden="true">/</span><span>Решение</span>`;
    caseIntro.prepend(crumbs);
  }
  if (!caseScene && caseIntro && !caseIntro.querySelector('.page-crumbs')) {
    const trail = document.createElement('nav');
    trail.className = 'page-crumbs';
    trail.setAttribute('aria-label', 'Навигация по сайту');
    const current = document.title.replace(' — Acor Web', '').trim();
    trail.innerHTML = `<a href="/">Acor Web</a><span aria-hidden="true">/</span><span>${current}</span>`;
    caseIntro.prepend(trail);
  }
  if (caseIntro && !caseIntro.querySelector('.reading-time')) {
    const intro = caseIntro.querySelector('.intro-description');
    const wordCount = document.querySelector('main')?.innerText.trim().split(/\s+/).filter(Boolean).length || 0;
    if (intro && wordCount > 80) {
      const readTime = document.createElement('span');
      readTime.className = 'reading-time';
      const minutes = Math.max(1, Math.round(wordCount / 180));
      const syncReadTime = () => { readTime.textContent = `≈ ${minutes} ${t('мин чтения')}`; };
      syncReadTime();
      window.addEventListener('acor:locale-change', syncReadTime);
      intro.insertAdjacentElement('afterend', readTime);
    }
  }

  const caseNext = document.querySelector('.case-next');
  if (caseNext && !caseNext.querySelector('.case-share')) {
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.className = 'pill-button case-share';
    shareButton.dataset.analytics = 'case_share';
    shareButton.innerHTML = 'Поделиться <span aria-hidden="true">↗︎</span>';
    const shareStatus = document.createElement('span');
    shareStatus.className = 'case-share-status';
    shareStatus.setAttribute('role', 'status');
    shareButton.addEventListener('click', async () => {
      const title = document.title.replace(' — Acor Web', '');
      try {
        if (navigator.share) await navigator.share({ title, text: `Проект Acor Web: ${title}`, url: location.href });
        else {
          await navigator.clipboard.writeText(location.href);
          shareStatus.textContent = t('Ссылка скопирована.');
        }
      } catch {
        shareStatus.textContent = t('Ссылку не удалось скопировать.');
      }
      if (shareStatus.textContent) setTimeout(() => { shareStatus.textContent = ''; }, 3000);
    });
    caseNext.append(shareButton, shareStatus);
    const printButton = document.createElement('button');
    printButton.type = 'button';
    printButton.className = 'pill-button case-print';
    printButton.dataset.analytics = 'case_print';
    printButton.innerHTML = 'Печатная версия <span aria-hidden="true">↧</span>';
    printButton.addEventListener('click', () => window.print());
    caseNext.append(printButton);
  }
};
