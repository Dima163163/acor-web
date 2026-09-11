const runtimeScriptSelector = 'script[data-acor-spa-runtime]';

export const loadLegacyRuntime = (): void => {
  document.querySelector(runtimeScriptSelector)?.remove();
  document.querySelectorAll('.connection-status, .command-palette, .tap-ripple').forEach((node) => node.remove());
  const script = document.createElement('script');
  script.src = `/script.js?v=20260911-31&spa=${Date.now()}`;
  script.defer = true;
  script.async = false;
  script.dataset.acorSpaRuntime = 'true';
  document.head.append(script);
};
