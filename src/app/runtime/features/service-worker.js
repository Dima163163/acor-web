export const mountServiceWorker = ({ applyLocale, runtimeController }) => {
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
