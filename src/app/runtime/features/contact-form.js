export const mountContactForm = ({ t }) => {
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
};
