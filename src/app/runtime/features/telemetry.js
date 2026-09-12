export const mountTelemetry = ({ t }) => {
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
};
