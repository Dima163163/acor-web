import type { RuntimeContext } from '../types';

export const mountTelemetry = ({ t }: RuntimeContext): void => {
  // Keep a short local interaction history. A future analytics adapter can
  // subscribe to `acor:interaction` without changing feature modules.
  const studioEvents: AcorStudioEvent[] = [];
  const trackStudioEvent = (name: string, detail: Record<string, unknown> = {}): void => {
    const event = { name, detail, at: new Date().toISOString() };
    studioEvents.push(event);
    if (studioEvents.length > 40) studioEvents.shift();
    window.dispatchEvent(new CustomEvent('acor:interaction', { detail: event }));
  };
  window.acorStudioEvents = studioEvents;
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const analyticsTarget = target.closest<HTMLElement>('[data-analytics]');
    if (analyticsTarget) trackStudioEvent(analyticsTarget.dataset.analytics || 'unknown', { label: analyticsTarget.textContent?.trim().slice(0, 80) || '' });
  }, { passive: true });

  const emailLink = document.querySelector<HTMLElement>('.email-link');
  if (!emailLink || emailLink.parentElement?.querySelector('.copy-email')) return;
  const copyEmail = document.createElement('button');
  copyEmail.type = 'button';
  copyEmail.className = 'copy-email';
  copyEmail.textContent = 'Скопировать email';
  const copyStatus = document.createElement('span');
  copyStatus.className = 'copy-email-status';
  copyStatus.setAttribute('role', 'status');
  copyEmail.addEventListener('click', async () => {
    const email = emailLink.textContent?.replace(/\s*↗︎\s*$/, '').trim() || '';
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = t('Email скопирован.');
    } catch {
      copyStatus.textContent = email;
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 2600);
  });
  emailLink.parentElement?.append(copyEmail, copyStatus);
};
