export const mountProjects = ({ appearance }) => {
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

};
