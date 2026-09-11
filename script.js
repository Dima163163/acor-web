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

  // A quiet light/night mode gives the studio a second atmosphere without
  // changing the composition or asking the user to leave the page.
  const themeHeader = document.querySelector('.site-header');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('acor-theme'); } catch { /* Storage may be unavailable. */ }
  let theme = savedTheme === 'night' ? 'night' : 'light';
  const themeButton = document.createElement('button');
  themeButton.type = 'button';
  themeButton.className = 'theme-toggle';
  themeButton.setAttribute('aria-label', 'Переключить цветовую тему');
  themeButton.setAttribute('aria-pressed', String(theme === 'night'));
  if (themeHeader) themeHeader.querySelector('.menu-toggle')?.insertAdjacentElement('beforebegin', themeButton);
  const syncTheme = () => {
    document.body.classList.toggle('theme-night', theme === 'night');
    themeButton.setAttribute('aria-pressed', String(theme === 'night'));
    themeButton.innerHTML = `<span class="theme-toggle-label">${theme === 'night' ? 'Тёмная' : 'Светлая'}</span><span aria-hidden="true">${theme === 'night' ? '☾' : '◐'}</span>`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'night' ? '#15181d' : '#f3f4f1');
  };
  syncTheme();
  themeButton.addEventListener('click', () => {
    theme = theme === 'night' ? 'light' : 'night';
    try { localStorage.setItem('acor-theme', theme); } catch { /* The control still works without storage. */ }
    syncTheme();
  });

  const emailLink = document.querySelector('.email-link');
  if (emailLink && !emailLink.parentElement.querySelector('.copy-email')) {
    const copyEmail = document.createElement('button');
    copyEmail.type = 'button';
    copyEmail.className = 'copy-email';
    copyEmail.textContent = 'Скопировать email';
    const copyStatus = document.createElement('span');
    copyStatus.className = 'copy-email-status';
    copyStatus.setAttribute('role', 'status');
    copyEmail.addEventListener('click', async () => {
      const email = emailLink.textContent.replace(/\s*↗︎\s*$/, '').trim();
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = 'Email скопирован.';
      } catch {
        copyStatus.textContent = email;
      }
      setTimeout(() => { copyStatus.textContent = ''; }, 2600);
    });
    emailLink.parentElement.append(copyEmail, copyStatus);
  }

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const setMenu = (open, restoreFocus = false) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) requestAnimationFrame(() => mobileNav.querySelector('a')?.focus());
    else if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, true);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(mobileNav.querySelectorAll('a')).filter((element) => !element.hidden);
    if (!focusable.length) return;
    const current = focusable.indexOf(document.activeElement);
    const next = event.shiftKey
      ? (current <= 0 ? focusable.length - 1 : current - 1)
      : (current === focusable.length - 1 ? 0 : current + 1);
    if (current === -1 || event.shiftKey && current === 0 || !event.shiftKey && current === focusable.length - 1) {
      event.preventDefault();
      focusable[next].focus();
    }
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
        if (motionDisabled) return;
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
      if (motionDisabled) return;
      document.body.style.setProperty('--spot-x', `${event.clientX}px`);
      document.body.style.setProperty('--spot-y', `${event.clientY}px`);
    }, { passive: true });
  }
  const animatedElements = document.querySelectorAll('[data-reveal], .project, .process-grid article, .role-card, .person-card, .insight-card, .after-brief-grid article, .case-info-grid article, .case-timeline li');
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
  const applyProjectFilter = (filter, { updateUrl = true } = {}) => {
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
    if (updateUrl && filter.dataset.filter !== 'all') {
      const url = new URL(location.href);
      url.searchParams.set('category', filter.dataset.filter);
      history.replaceState(null, '', url);
    } else if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.delete('category');
      history.replaceState(null, '', url);
    }
  };
  filters.forEach((filter) => filter.addEventListener('click', () => applyProjectFilter(filter)));
  const initialCategory = new URLSearchParams(location.search).get('category');
  const initialFilter = Array.from(filters).find((filter) => filter.dataset.filter === initialCategory);
  if (initialFilter) applyProjectFilter(initialFilter, { updateUrl: false });

  const projectGrid = document.querySelector('.project-grid');
  const projectViewButtons = document.querySelectorAll('[data-project-view]');
  const projectSortButtons = document.querySelectorAll('[data-project-sort]');
  const savedProjectsStatus = document.querySelector('#saved-projects');
  const projectOrder = Array.from(projects);
  const projectNames = new Map(projectOrder.map((project) => [project, project.querySelector('h3')?.textContent.trim() || 'Проект']));
  let projectView = 'grid';
  let projectSort = 'curated';
  let savedProjects = [];
  try {
    projectView = localStorage.getItem('acor-project-view') === 'list' ? 'list' : 'grid';
    projectSort = localStorage.getItem('acor-project-sort') === 'alphabetical' ? 'alphabetical' : 'curated';
    savedProjects = JSON.parse(localStorage.getItem('acor-project-favorites') || '[]');
    if (!Array.isArray(savedProjects)) savedProjects = [];
  } catch { /* Preferences remain session-local when storage is unavailable. */ }
  const syncProjectTools = () => {
    projectGrid?.classList.toggle('is-list-view', projectView === 'list');
    projectViewButtons.forEach((button) => {
      const selected = button.dataset.projectView === projectView;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    projectSortButtons.forEach((button) => {
      const selected = button.dataset.projectSort === projectSort;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (savedProjectsStatus) savedProjectsStatus.textContent = savedProjects.length ? `Сохранено проектов: ${savedProjects.length}` : '';
  };
  const syncProjectUrl = () => {
    if (!projectGrid) return;
    const url = new URL(location.href);
    if (projectView === 'list') url.searchParams.set('view', 'list'); else url.searchParams.delete('view');
    if (projectSort === 'alphabetical') url.searchParams.set('sort', 'name'); else url.searchParams.delete('sort');
    history.replaceState(null, '', url);
  };
  const sortProjects = () => {
    if (!projectGrid) return;
    const order = projectSort === 'alphabetical'
      ? Array.from(projects).sort((a, b) => projectNames.get(a).localeCompare(projectNames.get(b), 'ru'))
      : projectOrder;
    order.forEach((project) => projectGrid.append(project));
  };
  projects.forEach((project) => {
    const projectName = projectNames.get(project);
    const save = document.createElement('button');
    save.type = 'button';
    save.className = 'project-save';
    save.setAttribute('aria-label', `Сохранить проект ${projectName}`);
    save.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      savedProjects = savedProjects.includes(projectName) ? savedProjects.filter((name) => name !== projectName) : [...savedProjects, projectName];
      save.classList.toggle('is-saved', savedProjects.includes(projectName));
      save.setAttribute('aria-pressed', String(savedProjects.includes(projectName)));
      save.textContent = savedProjects.includes(projectName) ? '★' : '☆';
      try { localStorage.setItem('acor-project-favorites', JSON.stringify(savedProjects)); } catch { /* Saving still works for the current page. */ }
      syncProjectTools();
    });
    save.setAttribute('aria-pressed', String(savedProjects.includes(projectName)));
    save.classList.toggle('is-saved', savedProjects.includes(projectName));
    save.textContent = savedProjects.includes(projectName) ? '★' : '☆';
    project.append(save);
  });
  projectViewButtons.forEach((button) => button.addEventListener('click', () => {
    projectView = button.dataset.projectView;
    try { localStorage.setItem('acor-project-view', projectView); } catch { /* The control still works without storage. */ }
    syncProjectTools(); syncProjectUrl();
  }));
  projectSortButtons.forEach((button) => button.addEventListener('click', () => {
    projectSort = button.dataset.projectSort;
    sortProjects();
    try { localStorage.setItem('acor-project-sort', projectSort); } catch { /* The control still works without storage. */ }
    syncProjectTools(); syncProjectUrl();
  }));
  const projectParams = new URLSearchParams(location.search);
  if (projectParams.get('view') === 'list') projectView = 'list';
  if (projectParams.get('sort') === 'name') projectSort = 'alphabetical';
  sortProjects(); syncProjectTools();

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
  const labArt = document.querySelector('.lab-art');
  const labControls = document.querySelector('.lab-controls');
  if (labArt && labControls && rotation && scale) {
    const createLabSet = (label, name, options) => {
      const set = document.createElement('div');
      set.className = 'lab-preset-set';
      set.setAttribute('role', 'group');
      set.setAttribute('aria-label', label);
      const caption = document.createElement('span');
      caption.className = 'lab-preset-label';
      caption.textContent = label;
      set.append(caption);
      options.forEach(([value, text]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'lab-preset';
        button.dataset.labChoice = value;
        button.textContent = text;
        button.setAttribute('aria-pressed', String(value === options[0][0]));
        button.addEventListener('click', () => {
          set.querySelectorAll('.lab-preset').forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
          labArt.dataset[name] = value;
        });
        set.append(button);
      });
      return set;
    };
    labArt.dataset.material = 'chrome';
    labArt.dataset.shape = 'ribbon';
    labArt.dataset.palette = 'studio';
    labControls.append(createLabSet('Материал', 'material', [['chrome', 'Chrome'], ['cobalt', 'Cobalt'], ['paper', 'Paper']]));
    labControls.append(createLabSet('Форма', 'shape', [['ribbon', 'Ribbon'], ['orb', 'Orb'], ['letter', 'Letter']]));
    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'pill-button lab-copy';
    copyButton.textContent = 'Скопировать параметры';
    const copyStatus = document.createElement('span');
    copyStatus.className = 'lab-copy-status';
    copyStatus.setAttribute('role', 'status');
    const copyParams = async () => {
      const value = `Acor Lab — ${labArt.dataset.material}, ${labArt.dataset.shape}, ${labArt.dataset.palette || 'studio'}, поворот ${rotation.value}°, масштаб ${scale.value}%`;
      try {
        await navigator.clipboard.writeText(value);
        copyStatus.textContent = 'Параметры скопированы.';
      } catch {
        copyStatus.textContent = 'Выделите и скопируйте параметры вручную.';
        copyStatus.dataset.value = value;
      }
    };
    copyButton.addEventListener('click', copyParams);
    labControls.append(copyButton, copyStatus);
    document.querySelector('#lab-reset')?.addEventListener('click', () => {
      labArt.dataset.material = 'chrome';
      labArt.dataset.shape = 'ribbon';
      labControls.querySelectorAll('.lab-preset-set').forEach((set) => set.querySelector('.lab-preset')?.click());
      copyStatus.textContent = '';
    });
  }

  const form = document.querySelector('#brief-form');
  if (form) {
    const typeLabels = { web: 'Сайт', app: 'Приложение', design: 'Дизайн', other: 'Другое' };
    const budgetLabels = { undecided: 'Пока обсуждаем', 'under-500': 'До 500 тыс. ₽', '500-1000': '500 тыс. – 1 млн ₽', '1-3m': '1–3 млн ₽', 'over-3m': 'Более 3 млн ₽' };
    const draftKey = 'acor-brief-draft';
    const draftFields = ['name', 'company', 'email', 'type', 'message', 'budget', 'timing'];
    let restoredDraft = false;
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) || 'null');
      if (draft && typeof draft === 'object') {
        draftFields.forEach((name) => {
          const value = draft[name];
          if (!value) return;
          const fields = Array.from(form.elements).filter((field) => field.name === name);
          if (fields[0]?.type === 'radio') fields.forEach((field) => { field.checked = field.value === value; });
          else if (fields[0]) fields[0].value = value;
          restoredDraft = true;
        });
      }
    } catch { /* A private browsing context can reject sessionStorage. */ }
    const saveDraft = () => {
      const draft = {};
      draftFields.forEach((name) => {
        const radio = form.querySelector(`input[type="radio"][name="${name}"]`);
        const field = form.elements[name];
        if (radio) draft[name] = form.querySelector(`input[name="${name}"]:checked`)?.value || '';
        else if (field) draft[name] = field.value;
      });
      try { sessionStorage.setItem(draftKey, JSON.stringify(draft)); } catch { /* The form still works without storage. */ }
    };
    form.addEventListener('input', saveDraft);
    if (restoredDraft) {
      const status = document.querySelector('#form-status');
      if (status) status.textContent = 'Черновик восстановлен из этой сессии.';
    }
    const initialType = new URLSearchParams(location.search).get('type');
    if (Object.hasOwn(typeLabels, initialType)) {
      const choice = Array.from(form.elements.type).find((input) => input.value === initialType);
      if (choice) choice.checked = true;
    }
    const collectBrief = () => {
      const data = new FormData(form);
      const project = typeLabels[data.get('type')] || 'Другое';
      return {
        data,
        project,
        text: [
        'ACOR WEB — БРИФ ПРОЕКТА', '',
        `Имя: ${data.get('name')}`, `Компания: ${data.get('company') || 'Не указана'}`,
        `Email: ${data.get('email')}`, `Проект: ${project}`,
        `Бюджет: ${budgetLabels[data.get('budget')] || 'Пока обсуждаем'}`, `Сроки: ${data.get('timing') || 'Обсудим'}`,
        '', 'ЗАДАЧА', String(data.get('message')), '',
        'Письмо подготовлено на сайте Acor Web.'
        ].join('\n')
      };
    };
    const downloadBrief = () => {
      const { text } = collectBrief();
      const blob = new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const download = document.createElement('a');
      download.href = url; download.download = 'acor-project-brief.txt';
      document.body.append(download); download.click(); download.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      document.querySelector('#form-status').textContent = 'Бриф скачан. Его можно прикрепить к письму или сохранить для себя.';
    };
    document.querySelector('#download-brief')?.addEventListener('click', () => {
      if (form.reportValidity()) downloadBrief();
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const { data, project, text } = collectBrief();
      const subject = encodeURIComponent(`Новый проект Acor Web — ${project}`);
      const body = encodeURIComponent(text);
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      document.querySelector('#form-status').textContent = 'Открываем почтовое приложение…';
      window.location.href = `mailto:hello@acorweb.ru?subject=${subject}&body=${body}`;
      window.setTimeout(() => {
        if (submitButton) submitButton.disabled = false;
        document.querySelector('#form-status').textContent = `Письмо подготовлено для ${data.get('email')}. Если приложение не открылось, скачайте .txt-файл ниже.`;
      }, 900);
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
  const chapterDock = document.querySelector('.chapter-dock');
  const chapters = Array.from(document.querySelectorAll('[data-chapter]'));
  const footer = document.querySelector('.site-footer');
  let scrollFrame = null;
  const updateScroll = () => {
    scrollFrame = null;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty('--reading', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
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
  chapterDock?.querySelector('.dock-top').addEventListener('click', () => {
    document.querySelector('.brand')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
  chapterDock?.addEventListener('focusout', () => requestAnimationFrame(updateScroll));
  updateScroll();

  const people = Array.from(document.querySelectorAll('.person-card'));
  const teamFilters = document.querySelectorAll('[data-team-filter]');
  const teamTrackFilters = document.querySelectorAll('[data-team-track]');
  const teamSearch = document.querySelector('#team-search');
  const teamParams = new URLSearchParams(location.search);
  let teamCategory = teamParams.get('group') || 'all';
  let teamTrack = teamParams.get('track') || 'all';
  const trackGroups = { research: ['analysis'], design: ['design'], build: ['frontend', 'backend', 'mobile'], quality: ['qa'], direction: ['management'] };
  if (teamSearch && teamParams.get('q')) teamSearch.value = teamParams.get('q');
  const normalize = (value) => value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
  const filterPeople = () => {
    const query = normalize(teamSearch?.value || '');
    let found = 0;
    people.forEach((card) => {
      const person = card.querySelector('[data-person]');
      const matchesGroup = teamCategory === 'all' || card.dataset.personGroup === teamCategory;
      const matchesTrack = teamTrack === 'all' || (trackGroups[teamTrack] || []).includes(card.dataset.personGroup);
      const matchesText = normalize(`${person.dataset.name} ${person.dataset.role} ${person.dataset.skills}`).includes(query);
      card.hidden = !(matchesGroup && matchesTrack && matchesText);
      if (!card.hidden) found++;
    });
    document.querySelectorAll('[data-team-group]').forEach((group) => {
      group.hidden = !Array.from(group.querySelectorAll('.person-card')).some((card) => !card.hidden);
    });
    const result = document.querySelector('#team-result');
    if (result) result.textContent = `Найдено: ${found}`;
    const empty = document.querySelector('#team-empty');
    if (empty) empty.hidden = found !== 0;
    if (teamFilters.length) {
      const url = new URL(location.href);
      if (teamCategory === 'all') url.searchParams.delete('group');
      else url.searchParams.set('group', teamCategory);
      if (teamTrack === 'all') url.searchParams.delete('track');
      else url.searchParams.set('track', teamTrack);
      if (query) url.searchParams.set('q', query);
      else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
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
  teamTrackFilters.forEach((button) => button.addEventListener('click', () => {
    teamTrack = button.dataset.teamTrack;
    teamTrackFilters.forEach((filter) => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    filterPeople();
  }));
  teamSearch?.addEventListener('input', filterPeople);
  if (teamFilters.length) {
    const initialTeamFilter = Array.from(teamFilters).find((filter) => filter.dataset.teamFilter === teamCategory) || teamFilters[0];
    teamCategory = initialTeamFilter.dataset.teamFilter;
    teamFilters.forEach((filter) => {
      filter.classList.toggle('active', filter === initialTeamFilter);
      filter.setAttribute('aria-pressed', String(filter === initialTeamFilter));
    });
    const initialTrackFilter = Array.from(teamTrackFilters).find((filter) => filter.dataset.teamTrack === teamTrack) || teamTrackFilters[0];
    if (initialTrackFilter) {
      teamTrack = initialTrackFilter.dataset.teamTrack;
      teamTrackFilters.forEach((filter) => {
        filter.classList.toggle('active', filter === initialTrackFilter);
        filter.setAttribute('aria-pressed', String(filter === initialTrackFilter));
      });
    }
    filterPeople();
  }

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
    web: { heading: 'Впечатление с первого экрана.', description: 'От структуры и визуальной идеи до быстрого, адаптивного сайта.', team: ['Аналитик', 'Дизайнер', 'Frontend', 'Backend'], title: ['Есть идея.', 'Будет сайт.'], action: 'Обсудить сайт ↗︎' },
    app: { heading: 'Ваш продукт всегда рядом.', description: 'Понятные сценарии, нативные жесты и единая логика для iOS и Android.', team: ['UX/UI', 'iOS', 'Android', 'Backend', 'QA'], title: ['Ближе.', 'Каждый день.'], action: 'Обсудить приложение ↗︎' },
    design: { heading: 'Характер, который узнают.', description: 'Находим визуальную идею и собираем систему, которая растёт вместе с брендом.', team: ['Арт-директор', 'Дизайнер', 'Motion'], title: ['Свой взгляд.', 'Своя форма.'], action: 'Обсудить дизайн ↗︎' }
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
      if (!motionDisabled) visual.animate([{ opacity: .35, transform: 'scale(.98)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 350, easing: 'ease-out' });
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
    crumbs.innerHTML = `<a href="cases.html">Проекты</a><span aria-hidden="true">/</span><span>${projectName}</span><span aria-hidden="true">/</span><span>Решение</span>`;
    caseIntro.prepend(crumbs);
  }

  const caseNext = document.querySelector('.case-next');
  if (caseNext && !caseNext.querySelector('.case-share')) {
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.className = 'pill-button case-share';
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
          shareStatus.textContent = 'Ссылка скопирована.';
        }
      } catch {
        shareStatus.textContent = 'Ссылку не удалось скопировать.';
      }
      if (shareStatus.textContent) setTimeout(() => { shareStatus.textContent = ''; }, 3000);
    });
    caseNext.append(shareButton, shareStatus);
  }

  const briefBuilder = document.querySelector('#brief-builder');
  if (briefBuilder) {
    const briefSteps = Array.from(briefBuilder.querySelectorAll('[data-brief-step]'));
    const briefOptions = Array.from(briefBuilder.querySelectorAll('[data-brief-option]'));
    const briefPrev = briefBuilder.querySelector('#brief-prev');
    const briefNext = briefBuilder.querySelector('#brief-next');
    const briefTitle = briefBuilder.querySelector('#brief-summary-title');
    const briefCopy = briefBuilder.querySelector('#brief-summary-copy');
    const briefTags = briefBuilder.querySelector('#brief-summary-tags');
    const briefKicker = briefBuilder.querySelector('.brief-summary-kicker');
    const briefNote = briefBuilder.querySelector('.brief-summary-note');
    const briefForm = document.querySelector('#brief-form');
    const briefProgress = document.createElement('div');
    briefProgress.className = 'brief-progress';
    briefProgress.setAttribute('role', 'progressbar');
    briefProgress.setAttribute('aria-label', 'Прогресс заполнения брифа');
    briefBuilder.querySelector('.brief-steps')?.prepend(briefProgress);
    const briefShare = document.createElement('button');
    briefShare.type = 'button';
    briefShare.className = 'brief-share';
    briefShare.textContent = 'Скопировать ссылку на этот бриф';
    briefShare.setAttribute('aria-label', 'Скопировать ссылку на выбранный бриф');
    briefBuilder.querySelector('.brief-summary')?.append(briefShare);
    const briefParams = new URLSearchParams(location.search);
    const briefState = {
      type: ['web', 'app', 'design', 'other'].includes(briefParams.get('type')) ? briefParams.get('type') : 'web',
      audience: ['clients', 'team', 'buyers', 'wide'].includes(briefParams.get('audience')) ? briefParams.get('audience') : 'clients',
      goal: ['launch', 'refresh', 'validate', 'grow'].includes(briefParams.get('goal')) ? briefParams.get('goal') : 'launch',
      tone: ['calm', 'bold', 'clear', 'alive'].includes(briefParams.get('tone')) ? briefParams.get('tone') : 'clear'
    };
    const briefText = {
      type: {
        web: ['Сайт с характером.', 'Соберём структуру, визуальную идею и понятный путь к действию.', 'Web'],
        app: ['Приложение, которым удобно пользоваться.', 'Продумываем ежедневные сценарии, состояния и связь между экранами.', 'Mobile'],
        design: ['Визуальная система, которую узнают.', 'Находим идею и превращаем её в устойчивый язык для продукта и команды.', 'Identity'],
        other: ['Задача, которой нужна форма.', 'Разберёмся в контексте и предложим маршрут, с которого удобно начать.', 'Custom']
      },
      audience: {
        clients: ['Люди выбирают с доверием.', 'Покажем ценность продукта до первого контакта.', 'Клиенты'],
        team: ['Команда видит общее.', 'Сделаем сложный внутренний сценарий прозрачнее.', 'Команда'],
        buyers: ['Выбор становится проще.', 'Соединим настроение, аргументы и понятный следующий шаг.', 'Покупатели'],
        wide: ['Первое впечатление работает.', 'Соберём язык, который быстро считывается разными людьми.', 'Аудитория']
      },
      goal: {
        launch: ['Новый продукт начинается уверенно.', 'От первого вопроса до сценария, который можно выпускать.', 'Запуск'],
        refresh: ['Существующее получает новую опору.', 'Найдём, что мешает продукту, и аккуратно пересоберём главное.', 'Обновление'],
        validate: ['Идея проходит проверку раньше.', 'Соберём прототип и проверим ключевой сценарий до большой разработки.', 'Проверка'],
        grow: ['Следующая версия становится точнее.', 'Смотрим на поведение пользователей и развиваем то, что действительно нужно.', 'Развитие']
      },
      tone: {
        calm: ['Спокойное ощущение.', 'Паузы, ясная иерархия и форма, которая помогает сосредоточиться.', 'Calm'],
        bold: ['Смелое ощущение.', 'Контраст, характер и визуальный жест, который сложно забыть.', 'Bold'],
        clear: ['Точное ощущение.', 'Каждая деталь отвечает на действие и не спорит с задачей.', 'Clear'],
        alive: ['Живое ощущение.', 'Движение, отклик и пространство для любопытства.', 'Alive']
      }
    };
    const briefEstimates = {
      web: { launch: 'Ориентир: 6–10 недель до первой версии.', refresh: 'Ориентир: 4–8 недель на пересборку главного.', validate: 'Ориентир: 2–4 недели на прототип и проверку.', grow: 'Ориентир: короткие итерации по 2–4 недели.' },
      app: { launch: 'Ориентир: 10–16 недель до первого релиза.', refresh: 'Ориентир: 6–12 недель на обновление ключевых сценариев.', validate: 'Ориентир: 3–5 недель на кликабельный прототип.', grow: 'Ориентир: спринты развития по 2–4 недели.' },
      design: { launch: 'Ориентир: 3–6 недель на базовую систему.', refresh: 'Ориентир: 2–5 недель на обновление языка.', validate: 'Ориентир: 1–3 недели на визуальную гипотезу.', grow: 'Ориентир: последовательные этапы по 2–3 недели.' },
      other: { launch: 'Срок зависит от формата — сначала уточним контекст.', refresh: 'Сначала найдём, что стоит сохранить и пересобрать.', validate: 'Начнём с небольшого прототипа и проверим идею.', grow: 'Соберём план развития под ваши ограничения.' }
    };
    let briefIndex = 0;
    const syncBriefUrl = () => {
      const url = new URL(location.href);
      Object.entries(briefState).forEach(([key, value]) => url.searchParams.set(key, value));
      history.replaceState(null, '', url);
    };
    const syncBrief = () => {
      briefSteps.forEach((step, index) => {
        step.hidden = index !== briefIndex;
        step.classList.toggle('is-active', index === briefIndex);
      });
      briefOptions.forEach((option) => option.classList.toggle('is-selected', briefState[option.dataset.briefOption] === option.dataset.briefValue));
      const key = ['type', 'audience', 'goal', 'tone'][briefIndex];
      const [title, copy] = briefText[key][briefState[key]];
      if (briefTitle) briefTitle.textContent = title;
      if (briefCopy) briefCopy.textContent = copy;
      if (briefKicker) briefKicker.textContent = `Ваш контекст / ${String(briefIndex + 1).padStart(2, '0')} из ${String(briefSteps.length).padStart(2, '0')}`;
      if (briefTags) briefTags.innerHTML = Object.entries(briefState).map(([name, value]) => `<span>${briefText[name][value][2]}</span>`).join('');
      if (briefNote) briefNote.textContent = briefEstimates[briefState.type][briefState.goal];
      if (briefProgress) {
        const progress = Math.round(((briefIndex + 1) / briefSteps.length) * 100);
        briefProgress.style.setProperty('--brief-progress', `${progress}%`);
        briefProgress.setAttribute('aria-valuenow', String(progress));
        briefProgress.setAttribute('aria-valuetext', `${progress}%`);
      }
      if (briefPrev) briefPrev.disabled = briefIndex === 0;
      if (briefNext) briefNext.innerHTML = briefIndex === briefSteps.length - 1 ? 'Заполнить заявку <span>↘︎</span>' : 'Следующий вопрос <span>↗︎</span>';
      const typeChoice = briefForm?.querySelector(`input[name="type"][value="${briefState.type}"]`);
      if (typeChoice) typeChoice.checked = true;
      syncBriefUrl();
    };
    briefOptions.forEach((option) => option.addEventListener('click', () => {
      briefState[option.dataset.briefOption] = option.dataset.briefValue;
      syncBrief();
    }));
    briefPrev?.addEventListener('click', () => { briefIndex = Math.max(0, briefIndex - 1); syncBrief(); });
    briefNext?.addEventListener('click', () => {
      if (briefIndex < briefSteps.length - 1) {
        briefIndex += 1;
        syncBrief();
      } else {
        document.querySelector('#brief-form')?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
        briefForm?.elements.name?.focus({ preventScroll: true });
      }
    });
    briefShare.addEventListener('click', async () => {
      const shareUrl = location.href;
      try {
        await navigator.clipboard.writeText(shareUrl);
        briefShare.textContent = 'Ссылка скопирована';
      } catch {
        briefShare.textContent = 'Скопируйте URL из адресной строки';
      }
      setTimeout(() => { briefShare.textContent = 'Скопировать ссылку на этот бриф'; }, 2600);
    });
    syncBrief();
  }

  document.querySelectorAll('[data-compare]').forEach((compare) => {
    const range = compare.querySelector('[data-compare-range]');
    const output = compare.querySelector('[data-compare-output]');
    range?.addEventListener('input', () => {
      compare.style.setProperty('--compare', `${range.value}%`);
      if (output) output.textContent = `${range.value}%`;
    });
  });

  const labRandom = document.querySelector('#lab-random');
  const labPaletteChoices = document.querySelectorAll('[data-lab-palette]');
  const labPageArt = document.querySelector('.lab-art');
  if (labPageArt && labRandom) {
    const palettes = ['studio', 'night', 'moss'];
    const applyLabPalette = (value) => {
      const palette = palettes.includes(value) ? value : 'studio';
      labPageArt.dataset.palette = palette;
      labPaletteChoices.forEach((button) => {
        const selected = button.dataset.labPalette === palette;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      const url = new URL(location.href);
      url.searchParams.set('palette', palette);
      history.replaceState(null, '', url);
    };
    labPaletteChoices.forEach((button) => button.addEventListener('click', () => applyLabPalette(button.dataset.labPalette)));
    document.querySelector('#lab-reset')?.addEventListener('click', () => applyLabPalette('studio'));
    const labParams = new URLSearchParams(location.search);
    applyLabPalette(labParams.get('palette') || 'studio');
    labRandom.addEventListener('click', () => {
      const sets = Array.from(document.querySelectorAll('.lab-preset-set'));
      sets.forEach((set) => {
        const choices = Array.from(set.querySelectorAll('.lab-preset'));
        choices[Math.floor(Math.random() * choices.length)]?.click();
      });
      const rotationInput = document.querySelector('#lab-rotation');
      const scaleInput = document.querySelector('#lab-scale');
      if (rotationInput) rotationInput.value = String(Math.round(Math.random() * 50 - 25));
      if (scaleInput) scaleInput.value = String(Math.round(Math.random() * 45 + 70));
      rotationInput?.dispatchEvent(new Event('input', { bubbles: true }));
      scaleInput?.dispatchEvent(new Event('input', { bubbles: true }));
      applyLabPalette(palettes[Math.floor(Math.random() * palettes.length)]);
      if (!motionDisabled) labPageArt.animate([{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
    });
  }

  const commandHeader = document.querySelector('.site-header');
  if (commandHeader && !document.querySelector('.command-trigger')) {
    const commandTrigger = document.createElement('button');
    commandTrigger.type = 'button';
    commandTrigger.className = 'command-trigger';
    commandTrigger.setAttribute('aria-label', 'Открыть поиск по сайту');
    commandTrigger.innerHTML = '<span aria-hidden="true">⌘</span><small>K</small>';
    commandHeader.querySelector('.header-contact')?.insertAdjacentElement('afterend', commandTrigger);
    const commandDialog = document.createElement('dialog');
    commandDialog.className = 'command-palette';
    commandDialog.setAttribute('aria-labelledby', 'command-palette-title');
    commandDialog.innerHTML = '<div class="command-palette-inner"><div class="command-palette-head"><div><p class="eyebrow">Навигация / Acor Web</p><h2 id="command-palette-title">Куда дальше?</h2></div><button type="button" class="command-close" aria-label="Закрыть поиск">×</button></div><label class="command-search"><span aria-hidden="true">⌕</span><input type="search" autocomplete="off" placeholder="Найти раздел или действие" aria-label="Поиск по сайту"></label><div class="command-results" role="listbox"></div><p class="command-hint">Enter — открыть · Esc — закрыть</p></div>';
    document.body.append(commandDialog);
    const commandSearch = commandDialog.querySelector('input');
    const commandResults = commandDialog.querySelector('.command-results');
    const commandItems = [
      ['Проекты', 'cases.html', 'Три концепции и разбор решений'], ['Услуги', 'services.html', 'Стратегия, дизайн и разработка'], ['Студия', 'about.html', 'Подход и наблюдения команды'], ['Команда', 'team.html', 'Люди и роли в проекте'], ['Lab', 'lab.html', 'Форма, движение и эксперименты'], ['Контакты', 'contact.html', 'Собрать задачу и начать разговор']
    ];
    const renderCommandResults = () => {
      const query = commandSearch.value.trim().toLocaleLowerCase('ru');
      commandResults.replaceChildren(...commandItems.filter(([label, , description]) => `${label} ${description}`.toLocaleLowerCase('ru').includes(query)).map(([label, href, description]) => {
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('role', 'option');
        link.innerHTML = `<span>${label}</span><small>${description}</small><b aria-hidden="true">↗︎</b>`;
        return link;
      }));
      if (!commandResults.children.length) {
        const empty = document.createElement('p');
        empty.className = 'command-empty';
        empty.textContent = 'Ничего не нашли. Попробуйте другое слово.';
        commandResults.append(empty);
      }
    };
    const openCommand = () => {
      setMenu(false);
      commandSearch.value = '';
      renderCommandResults();
      commandDialog.showModal();
      commandSearch.focus();
    };
    commandTrigger.addEventListener('click', openCommand);
    commandDialog.querySelector('.command-close').addEventListener('click', () => commandDialog.close());
    commandSearch.addEventListener('input', renderCommandResults);
    commandDialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        commandDialog.close();
      }
    });
    commandDialog.addEventListener('click', (event) => { if (event.target === commandDialog) commandDialog.close(); });
    commandDialog.addEventListener('close', () => commandTrigger.focus({ preventScroll: true }));
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (commandDialog.open) commandDialog.close(); else openCommand();
      }
    });
    renderCommandResults();
  }

  const stepTabs = Array.from(document.querySelectorAll('[data-step]'));
  const selectStep = (button) => {
    stepTabs.forEach((tab) => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !selected;
      panel.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      if (selected && !motionDisabled) panel.animate([{ opacity: .2, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, easing: 'ease-out' });
    });
  };
  stepTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectStep(button));
    button.addEventListener('keydown', (event) => {
      let target;
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
})();
