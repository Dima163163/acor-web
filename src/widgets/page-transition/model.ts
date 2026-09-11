export type NavigationPhase = 'idle' | 'loading' | 'ready' | 'error';

export const withViewTransition = (update: () => void): Promise<void> => {
  const startViewTransition = (document as Document & {
    startViewTransition?: (callback: () => void) => { finished: Promise<unknown> };
  }).startViewTransition;

  if (!startViewTransition || document.body.classList.contains('motion-off')) {
    update();
    return Promise.resolve();
  }

  return startViewTransition(update).finished.catch((error: unknown) => {
    // React can replace the route surface before the browser finishes a
    // transition. The browser reports that expected interruption as an
    // AbortError; the new page is already rendered, so it is safe to swallow.
    if (error instanceof DOMException && error.name === 'AbortError') return;
    throw error;
  });
};
