export const mountTeam = ({ appearance, finePointer, updateScroll }) => {
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
    updateScroll?.();
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
};
