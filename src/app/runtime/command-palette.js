export const mountCommandPalette = (t, setMenu) => {
const commandHeader = document.querySelector('.site-header');
if (commandHeader) {
  const commandTrigger = commandHeader.querySelector('.command-trigger') || document.createElement('button');
  commandTrigger.type = 'button';
  commandTrigger.className = 'command-trigger';
  commandTrigger.setAttribute('aria-label', 'Открыть поиск по сайту');
  commandTrigger.innerHTML = '<span aria-hidden="true">⌘</span><small>K</small>';
  if (!commandTrigger.parentElement) commandHeader.querySelector('.header-contact')?.insertAdjacentElement('afterend', commandTrigger);
  const commandDialog = document.createElement('dialog');
  commandDialog.className = 'command-palette';
  commandDialog.setAttribute('aria-labelledby', 'command-palette-title');
  commandDialog.innerHTML = '<div class="command-palette-inner"><div class="command-palette-head"><div><p class="eyebrow">Навигация / Acor Web</p><h2 id="command-palette-title">Куда дальше?</h2></div><button type="button" class="command-close" aria-label="Закрыть поиск">×</button></div><label class="command-search"><span aria-hidden="true">⌕</span><input type="search" autocomplete="off" placeholder="Найти раздел или действие" aria-label="Поиск по сайту"></label><div class="command-results" role="listbox"></div><p class="command-hint">Enter — открыть · Esc — закрыть</p></div>';
  (document.querySelector('.app-shell') || document.body).append(commandDialog);
  const commandSearch = commandDialog.querySelector('input');
  const commandResults = commandDialog.querySelector('.command-results');
  const commandItems = [
    ['Проекты', '/cases', 'Три концепции и разбор решений'], ['Услуги', '/services', 'Стратегия, дизайн и разработка'], ['Студия', '/about', 'Подход и наблюдения команды'], ['Команда', '/team', 'Люди и роли в проекте'], ['Карьера', '/careers', 'Вакансии, стажировка и контакты для отклика'], ['Lab', '/lab', 'Форма, движение и эксперименты'], ['Контакты', '/contact', 'Собрать задачу и начать разговор']
  ];
  const renderCommandResults = () => {
    const query = commandSearch.value.trim().toLocaleLowerCase('ru');
    commandResults.replaceChildren(...commandItems.filter(([label, , description]) => `${label} ${description}`.toLocaleLowerCase('ru').includes(query)).map(([label, href, description]) => {
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('role', 'option');
      link.innerHTML = `<span>${t(label)}</span><small>${t(description)}</small><b aria-hidden="true">↗︎</b>`;
      return link;
    }));
    if (!commandResults.children.length) {
      const empty = document.createElement('p');
      empty.className = 'command-empty';
      empty.textContent = t('Ничего не нашли. Попробуйте другое слово.');
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
  window.addEventListener('acor:locale-change', renderCommandResults);
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
};
