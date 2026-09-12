import { mountAppearance } from './appearance';
import { mountBrief } from './brief';
import { mountCommandPalette } from './command-palette';
import { mountLab } from './lab';
import { mountNavigation } from './navigation';
import { createLocaleController } from './locale';

export const mountLegacyRuntime = () => {

  'use strict';
  // The Vite navigation layer can swap page markup without a hard reload. Keep
  // one abortable listener scope so the legacy interaction layer can be
  // re-mounted safely after every client-side route change.
  window.__acorRuntimeCleanup?.();
  document.querySelectorAll('.connection-status, .command-palette, .tap-ripple').forEach((node) => node.remove());
  const runtimeController = new AbortController();
  if (!window.__acorListenerPatch) {
    const nativeAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function patchedAddEventListener(type, listener, options) {
      const controller = window.__acorRuntimeController;
      if (!controller?.signal || (typeof options === 'object' && options?.signal)) {
        return nativeAddEventListener.call(this, type, listener, options);
      }
      const normalizedOptions = typeof options === 'boolean' ? { capture: options } : { ...(options || {}) };
      normalizedOptions.signal = controller.signal;
      return nativeAddEventListener.call(this, type, listener, normalizedOptions);
    };
    window.__acorListenerPatch = true;
  }
  window.__acorRuntimeController = runtimeController;
  let runtimeCleaned = false;
  window.__acorRuntimeCleanup = () => {
    if (runtimeCleaned) return;
    runtimeCleaned = true;
    runtimeController.abort();
    if (window.__acorRuntimeController === runtimeController) window.__acorRuntimeController = null;
  };
  const locale = createLocaleController();
  const { translate: t, pageKey, apply: applyLocale } = locale;
  const appearance = mountAppearance(locale);
  const { reducedMotion, finePointer, cursor } = appearance;
  // Local event hooks make the prototype ready for analytics without sending
  // any data off-device. A future integration can subscribe to this event.
  const studioEvents = [];
  const trackStudioEvent = (name, detail = {}) => {
    const event = { name, detail, at: new Date().toISOString() };
    studioEvents.push(event);
    if (studioEvents.length > 40) studioEvents.shift();
    window.dispatchEvent(new CustomEvent('acor:interaction', { detail: event }));
  };
  window.acorStudioEvents = studioEvents;
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-analytics]');
    if (target) trackStudioEvent(target.dataset.analytics, { label: target.textContent.trim().slice(0, 80) });
  }, { passive: true });

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
        copyStatus.textContent = t('Email скопирован.');
      } catch {
        copyStatus.textContent = email;
      }
      setTimeout(() => { copyStatus.textContent = ''; }, 2600);
    });
    emailLink.parentElement.append(copyEmail, copyStatus);
  }

  const { setMenu } = mountNavigation(t);

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

  const estimateType = document.querySelector('#estimate-type');
  const estimateScope = document.querySelector('#estimate-scope');
  const estimatePace = document.querySelector('#estimate-pace');
  const estimateTitle = document.querySelector('#estimate-title');
  const estimateCopy = document.querySelector('#estimate-copy');
  const estimateWeeks = document.querySelector('#estimate-weeks');
  const estimateTeam = document.querySelector('#estimate-team');
  const estimateCta = document.querySelector('#estimate-cta');
  if (estimateType && estimateScope && estimatePace) {
    const estimates = {
      web: { start: ['Сайт / стартовый этап', 'Погружение, структура и визуальная гипотеза.', '3–5 недель', '2–3 роли'], full: ['Сайт / полный цикл', 'Стратегия, дизайн, разработка и QA в одной команде.', '8–14 недель', '4–6 ролей'], support: ['Сайт / развитие', 'Новые сценарии, аналитика и точечные улучшения.', '2–4 недели', '2–4 роли'] },
      app: { start: ['Приложение / стартовый этап', 'Карта сценариев, прототип и техническая рамка.', '4–7 недель', '3–4 роли'], full: ['Приложение / полный цикл', 'Продуктовая логика, iOS / Android, backend и QA.', '12–20 недель', '5–8 ролей'], support: ['Приложение / развитие', 'Новые функции, проверка гипотез и выпуск итераций.', '3–6 недель', '3–5 ролей'] },
      design: { start: ['Визуальная система / стартовый этап', 'Идея, направление и базовые правила языка.', '2–4 недели', '1–3 роли'], full: ['Визуальная система / полный цикл', 'Айдентика, интерфейс и motion в единой системе.', '5–9 недель', '2–4 роли'], support: ['Визуальная система / развитие', 'Масштабирование языка на новые носители и продукты.', '2–4 недели', '1–3 роли'] }
    };
    const syncEstimate = () => {
      const current = estimates[estimateType.value][estimateScope.value];
      const pace = estimatePace.value === 'fast' ? ' Ускоренный темп уточним после оценки рисков.' : '';
      estimateTitle.textContent = current[0];
      estimateCopy.textContent = current[1] + pace;
      estimateWeeks.textContent = current[2];
      estimateTeam.textContent = current[3];
      estimateCta.href = `/contact?type=${estimateType.value}`;
    };
    [estimateType, estimateScope, estimatePace].forEach((control) => control.addEventListener('change', syncEstimate));
    window.addEventListener('acor:locale-change', syncEstimate);
    syncEstimate();
  }

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
    if (!appearance.isMotionDisabled()) {
      requestAnimationFrame(() => {
        projects.forEach((project, index) => {
          if (project.hidden || typeof project.animate !== 'function') return;
          project.animate(
            [{ opacity: .2, transform: 'translateY(18px) scale(.985)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }],
            { duration: 460 + index * 45, delay: index * 35, easing: 'cubic-bezier(.22,1,.36,1)' }
          );
        });
      });
    }
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
    save.dataset.analytics = 'project_save';
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
    button.dataset.analytics = `project_view_${button.dataset.projectView}`;
    projectView = button.dataset.projectView;
    try { localStorage.setItem('acor-project-view', projectView); } catch { /* The control still works without storage. */ }
    syncProjectTools(); syncProjectUrl();
  }));
  projectSortButtons.forEach((button) => button.addEventListener('click', () => {
    button.dataset.analytics = `project_sort_${button.dataset.projectSort}`;
    projectSort = button.dataset.projectSort;
    sortProjects();
    try { localStorage.setItem('acor-project-sort', projectSort); } catch { /* The control still works without storage. */ }
    syncProjectTools(); syncProjectUrl();
  }));
  const projectParams = new URLSearchParams(location.search);
  if (projectParams.get('view') === 'list') projectView = 'list';
  if (projectParams.get('sort') === 'name') projectSort = 'alphabetical';
  sortProjects(); syncProjectTools();

  mountLab(t);

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
          const restoredValue = name === 'budget' ? (budgetLabels[value] || value) : value;
          const fields = Array.from(form.elements).filter((field) => field.name === name);
          if (fields[0]?.type === 'radio') fields.forEach((field) => { field.checked = field.value === restoredValue; });
          else if (fields[0]) fields[0].value = restoredValue;
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
    const clearDraft = document.createElement('button');
    clearDraft.type = 'button';
    clearDraft.className = 'pill-button clear-draft';
    clearDraft.dataset.analytics = 'brief_clear';
    clearDraft.textContent = 'Очистить черновик';
    clearDraft.addEventListener('click', () => {
      form.reset();
      try { sessionStorage.removeItem(draftKey); } catch { /* The form still resets locally. */ }
      const status = document.querySelector('#form-status');
      if (status) {
        status.textContent = t('Черновик очищен.');
        status.classList.remove('is-success');
        status.classList.add('is-visible');
      }
    });
    form.querySelector('.form-actions')?.append(clearDraft);
    if (restoredDraft) {
      const status = document.querySelector('#form-status');
      if (status) {
        status.textContent = t('Черновик восстановлен из этой сессии.');
        status.classList.add('is-visible');
      }
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
        `Бюджет: ${budgetLabels[data.get('budget')] || data.get('budget') || 'Пока обсуждаем'}`, `Сроки: ${data.get('timing') || 'Обсудим'}`,
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
      const status = document.querySelector('#form-status');
      if (status) {
        status.textContent = t('Бриф скачан. Его можно прикрепить к письму или сохранить для себя.');
        status.classList.remove('is-success');
        status.classList.add('is-visible');
      }
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
      const status = document.querySelector('#form-status');
      if (status) {
        status.textContent = t('Открываем почтовое приложение…');
        status.classList.remove('is-success');
        status.classList.add('is-visible');
      }
      window.location.href = `mailto:hello@acorweb.ru?subject=${subject}&body=${body}`;
      window.setTimeout(() => {
        if (submitButton) submitButton.disabled = false;
        const readyStatus = document.querySelector('#form-status');
        if (readyStatus) {
          readyStatus.textContent = `${t('Письмо подготовлено для')} ${data.get('email')}. ${t('Если приложение не открылось, скачайте .txt-файл ниже.')}`;
          readyStatus.classList.add('is-success', 'is-visible');
        }
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
      if (appearance.isMotionDisabled() || !finePointer.matches) return;
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
  const builderOptions = document.querySelectorAll('[data-project-type]');
  const syncBuilder = (type, animate = false) => {
    const project = projectTypes[type];
    const scene = document.querySelector('.builder-preview');
    if (!project || !scene) return;
    builderOptions.forEach((option) => {
      const selected = option.dataset.projectType === type;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    scene.dataset.builderState = type;
    document.querySelector('#builder-heading').textContent = t(project.heading);
    document.querySelector('#builder-description').textContent = t(project.description);
    const title = scene.querySelector('.builder-art-title');
    title.replaceChildren(document.createTextNode(t(project.title[0])), document.createElement('br'), document.createTextNode(t(project.title[1])));
    document.querySelector('#builder-team').replaceChildren(...project.team.map((role) => {
      const chip = document.createElement('span'); chip.textContent = t(role); return chip;
    }));
    const cta = document.querySelector('#builder-cta');
    cta.href = `/contact?type=${type}`;
    cta.textContent = t(project.action);
    if (animate && !appearance.isMotionDisabled()) scene.querySelector('.builder-response').animate([{ opacity: .25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
  };
  builderOptions.forEach((button) => button.addEventListener('click', () => {
    const type = button.dataset.projectType;
    if (document.querySelector('.builder-preview')?.dataset.builderState === type) return;
    syncBuilder(type, true);
  }));
  if (builderOptions.length) {
    syncBuilder(document.querySelector('.builder-preview')?.dataset.builderState || builderOptions[0].dataset.projectType);
    window.addEventListener('acor:locale-change', () => syncBuilder(document.querySelector('.builder-preview')?.dataset.builderState || 'web'));
  }
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

  mountBrief(t, reducedMotion);

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
      if (!appearance.isMotionDisabled()) labPageArt.animate([{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
    });
  }

  mountCommandPalette(t, setMenu);

  const stepTabs = Array.from(document.querySelectorAll('[data-step]'));
  const processTabs = document.querySelector('.process-tabs');
  const selectStep = (button) => {
    stepTabs.forEach((tab) => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
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
  if (stepTabs.length) selectStep(stepTabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || stepTabs[0]);

  // Translate static and progressively-created interface text after all page
  // modules have mounted their controls.
  applyLocale();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    const registerServiceWorker = () => navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // The studio stays fully usable when service workers are disabled.
    });
    if (document.readyState === 'complete') registerServiceWorker();
    else window.addEventListener('load', registerServiceWorker, { once: true });
  }
  queueMicrotask(() => {
    if (window.__acorRuntimeController === runtimeController) window.__acorRuntimeController = null;
  });

};
