(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let motionDisabled = reducedMotion.matches;
  let savedMotion = null;
  try { savedMotion = sessionStorage.getItem('acor-motion'); } catch { /* Storage may be unavailable in private contexts. */ }
  if (savedMotion === 'off') motionDisabled = true;
  const motionButton = document.querySelector('.motion-toggle');
  const cursor = document.querySelector('.cursor-caption');
  const syncMotion = () => {
    document.body.classList.toggle('motion-off', motionDisabled);
    motionButton?.setAttribute('aria-pressed', String(motionDisabled));
    if (motionButton) motionButton.innerHTML = `Анимация: ${motionDisabled ? 'выкл' : 'вкл'} <span aria-hidden="true">◉</span>`;
    if (motionDisabled) cursor?.classList.remove('visible');
  };
  syncMotion();
  motionButton?.addEventListener('click', () => {
    motionDisabled = !motionDisabled;
    savedMotion = motionDisabled ? 'off' : 'on';
    try { sessionStorage.setItem('acor-motion', savedMotion); } catch { /* The control still works without storage. */ }
    syncMotion();
  });
  reducedMotion.addEventListener('change', (event) => {
    motionDisabled = event.matches || savedMotion === 'off';
    syncMotion();
  });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const setMenu = (open, restoreFocus = false) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', (event) => {
    if (menuButton?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });

  // Event-driven transforms: no permanent animation loop and no scroll interception.
  const art = document.querySelector('[data-parallax]');
  const hero = document.querySelector('.hero');
  let frame = null;
  if (art && hero) {
    hero.addEventListener('pointermove', (event) => {
      if (motionDisabled || !finePointer.matches) return;
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
  }
  const animatedElements = document.querySelectorAll('[data-reveal], .project, .process-grid article, .role-card, .person-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!motionDisabled) entry.target.classList.add('seen');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    animatedElements.forEach((element) => observer.observe(element));
  }
  document.querySelectorAll('[data-cursor]').forEach((link) => {
    link.addEventListener('pointermove', (event) => {
      if (!cursor || motionDisabled || !finePointer.matches) return;
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

  const filters = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');
  filters.forEach((filter) => filter.addEventListener('click', () => {
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach((project) => {
      const visible = filter.dataset.filter === 'all' || project.dataset.category === filter.dataset.filter;
      project.hidden = !visible;
      if (visible) count++;
    });
    const status = document.querySelector('#filter-status');
    if (status) status.textContent = `Показано проектов: ${count}`;
  }));

  const rotation = document.querySelector('#lab-rotation');
  const scale = document.querySelector('#lab-scale');
  const labObject = document.querySelector('#lab-object');
  const updateLab = () => {
    if (!rotation || !scale || !labObject) return;
    labObject.style.setProperty('--angle', `${rotation.value}deg`);
    labObject.style.setProperty('--scale', String(Number(scale.value) / 100));
    document.querySelector('#lab-angle').value = `${rotation.value}°`;
    document.querySelector('#lab-size').value = `${scale.value}%`;
  };
  rotation?.addEventListener('input', updateLab);
  scale?.addEventListener('input', updateLab);
  document.querySelector('#lab-reset')?.addEventListener('click', () => {
    rotation.value = '0'; scale.value = '90'; updateLab();
  });

  const form = document.querySelector('#brief-form');
  if (form) {
    const typeLabels = { web: 'Сайт', app: 'Приложение', design: 'Дизайн', other: 'Другое' };
    const initialType = new URLSearchParams(location.search).get('type');
    if (Object.hasOwn(typeLabels, initialType)) {
      const choice = Array.from(form.elements.type).find((input) => input.value === initialType);
      if (choice) choice.checked = true;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const text = [
        'ACOR WEB — БРИФ ПРОЕКТА', '',
        `Имя: ${data.get('name')}`, `Компания: ${data.get('company') || 'Не указана'}`,
        `Email: ${data.get('email')}`, `Проект: ${typeLabels[data.get('type')]}`,
        `Бюджет: ${data.get('budget')}`, `Сроки: ${data.get('timing') || 'Обсудим'}`,
        '', 'ЗАДАЧА', String(data.get('message')), '',
        'Этот файл подготовлен локально. Отправьте его на hello@acorweb.ru, чтобы обсудить проект.'
      ].join('\n');
      const blob = new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = url; download.download = 'acor-project-brief.txt';
      document.body.append(download); download.click(); download.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      document.querySelector('#form-status').textContent = 'Бриф подготовлен к скачиванию. Отправьте файл на hello@acorweb.ru — данные из формы никуда не передавались.';
    });
  }
  // Ambient CSS motion runs only while the relevant artwork is in view.
  if ('IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
    });
    document.querySelectorAll('.hero, .team-art').forEach((element) => motionObserver.observe(element));
  }
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  let scrollFrame = null;
  const updateScroll = () => {
    scrollFrame = null;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty('--reading', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
    header?.classList.toggle('is-scrolled', scrollY > 20);
    if (hero && !motionDisabled && finePointer.matches && hero.getBoundingClientRect().bottom > 0) {
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
  updateScroll();

  const people = Array.from(document.querySelectorAll('.person-card'));
  const teamFilters = document.querySelectorAll('[data-team-filter]');
  const teamSearch = document.querySelector('#team-search');
  let teamCategory = 'all';
  const normalize = (value) => value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
  const filterPeople = () => {
    const query = normalize(teamSearch?.value || '');
    let found = 0;
    people.forEach((card) => {
      const person = card.querySelector('[data-person]');
      const matchesGroup = teamCategory === 'all' || card.dataset.personGroup === teamCategory;
      const matchesText = normalize(`${person.dataset.name} ${person.dataset.role} ${person.dataset.skills}`).includes(query);
      card.hidden = !(matchesGroup && matchesText);
      if (!card.hidden) found++;
    });
    document.querySelectorAll('[data-team-group]').forEach((group) => {
      group.hidden = !Array.from(group.querySelectorAll('.person-card')).some((card) => !card.hidden);
    });
    const result = document.querySelector('#team-result');
    if (result) result.textContent = `Найдено: ${found}`;
    const empty = document.querySelector('#team-empty');
    if (empty) empty.hidden = found !== 0;
    updateScroll();
  };
  teamFilters.forEach((button) => button.addEventListener('click', () => {
    teamCategory = button.dataset.teamFilter;
    teamFilters.forEach((filter) => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    filterPeople();
  }));
  teamSearch?.addEventListener('input', filterPeople);

  const personDialog = document.querySelector('#person-dialog');
  let lastPersonButton = null;
  document.querySelectorAll('[data-person]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!personDialog) return;
      lastPersonButton = button;
      const person = button.dataset;
      personDialog.querySelector('#person-dialog-name').textContent = person.name;
      personDialog.querySelector('.dialog-role').textContent = person.role;
      personDialog.querySelector('.dialog-quote').textContent = person.quote;
      personDialog.querySelector('.dialog-bio').textContent = person.bio;
      personDialog.querySelector('.dialog-skills').textContent = person.skills;
      const sourcePortrait = button.querySelector('.person-portrait');
      const portrait = personDialog.querySelector('.dialog-portrait');
      portrait.style.backgroundImage = sourcePortrait.style.backgroundImage;
      portrait.style.backgroundPosition = sourcePortrait.style.backgroundPosition;
      portrait.setAttribute('aria-label', `Сгенерированный портрет: ${person.name}`);
      personDialog.showModal();
    });
    const card = button.closest('.person-card');
    let tiltFrame = null;
    button.addEventListener('pointermove', (event) => {
      if (motionDisabled || !finePointer.matches) return;
      if (tiltFrame) cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        card.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
        card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      });
    });
    button.addEventListener('pointerleave', () => {
      if (tiltFrame) cancelAnimationFrame(tiltFrame);
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
  personDialog?.querySelector('.dialog-close').addEventListener('click', () => personDialog.close());
  personDialog?.addEventListener('click', (event) => {
    if (event.target !== personDialog) return;
    const rect = personDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) personDialog.close();
  });
  personDialog?.addEventListener('close', () => lastPersonButton?.focus());

  const projectTypes = {
    web: { heading: 'Впечатление с первого экрана.', description: 'От структуры и визуальной идеи до быстрого, адаптивного сайта.', team: ['Аналитик', 'Дизайнер', 'Frontend', 'Backend'], title: ['Есть идея.', 'Будет сайт.'], action: 'Обсудить сайт ↗' },
    app: { heading: 'Ваш продукт всегда рядом.', description: 'Понятные сценарии, нативные жесты и единая логика для iOS и Android.', team: ['UX/UI', 'iOS', 'Android', 'Backend', 'QA'], title: ['Ближе.', 'Каждый день.'], action: 'Обсудить приложение ↗' },
    design: { heading: 'Характер, который узнают.', description: 'Находим визуальную идею и собираем систему, которая растёт вместе с брендом.', team: ['Арт-директор', 'Дизайнер', 'Motion'], title: ['Свой взгляд.', 'Своя форма.'], action: 'Обсудить дизайн ↗' }
  };
  document.querySelectorAll('[data-project-type]').forEach((button) => button.addEventListener('click', () => {
    const type = button.dataset.projectType;
    const project = projectTypes[type];
    const scene = document.querySelector('.builder-preview');
    if (!project || !scene || scene.dataset.builderState === type) return;
    document.querySelectorAll('[data-project-type]').forEach((option) => {
      option.classList.toggle('active', option === button);
      option.setAttribute('aria-pressed', String(option === button));
    });
    scene.dataset.builderState = type;
    document.querySelector('#builder-heading').textContent = project.heading;
    document.querySelector('#builder-description').textContent = project.description;
    const title = scene.querySelector('.builder-art-title');
    title.replaceChildren(document.createTextNode(project.title[0]), document.createElement('br'), document.createTextNode(project.title[1]));
    document.querySelector('#builder-team').replaceChildren(...project.team.map((role) => {
      const chip = document.createElement('span'); chip.textContent = role; return chip;
    }));
    const cta = document.querySelector('#builder-cta');
    cta.href = `contact.html?type=${type}`;
    cta.textContent = project.action;
    if (!motionDisabled) scene.querySelector('.builder-response').animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
  }));
})();
