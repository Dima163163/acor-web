export type NavigationPhase = 'idle' | 'loading' | 'ready' | 'error';

export const withViewTransition = (update: () => void): Promise<void> => {
  const startViewTransition = (document as Document & {
    startViewTransition?: (callback: () => void) => { finished: Promise<unknown> };
  }).startViewTransition;

  if (!startViewTransition || document.body.classList.contains('motion-off')) {
    update();
    return Promise.resolve();
  }

  return startViewTransition(update).finished.then(() => undefined);
};
