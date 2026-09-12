export interface RuntimeScope {
  readonly controller: AbortController;
}

type ListenerOptions = boolean | AddEventListenerOptions | undefined;

/**
 * Creates the listener scope for one rendered route.
 *
 * Every feature module registers ordinary DOM listeners. The small patch below
 * adds the active AbortSignal automatically, so route changes can clean up all
 * listeners in one place without repeating `{ signal }` in every module.
 */
export const createRuntimeScope = (): RuntimeScope => {
  window.__acorRuntimeCleanup?.();
  document.querySelectorAll('.connection-status, .command-palette, .tap-ripple').forEach((node) => node.remove());

  const controller = new AbortController();
  if (!window.__acorListenerPatch) {
    const nativeAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function patchedAddEventListener(
      this: EventTarget,
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: ListenerOptions
    ): void {
      const activeController = window.__acorRuntimeController;
      if (!activeController?.signal || (typeof options === 'object' && options?.signal)) {
        nativeAddEventListener.call(this, type, listener, options);
        return;
      }

      const normalizedOptions: AddEventListenerOptions = typeof options === 'boolean'
        ? { capture: options, signal: activeController.signal }
        : { ...(options || {}), signal: activeController.signal };
      nativeAddEventListener.call(this, type, listener, normalizedOptions);
    };
    window.__acorListenerPatch = true;
  }

  window.__acorRuntimeController = controller;
  let cleaned = false;
  window.__acorRuntimeCleanup = (): void => {
    if (cleaned) return;
    cleaned = true;
    controller.abort();
    if (window.__acorRuntimeController === controller) window.__acorRuntimeController = null;
  };

  return { controller };
};
