type LegacyRuntimeModule = typeof import('./legacy-runtime.js');

let runtimeModule: Promise<LegacyRuntimeModule> | null = null;
let runtimeRequest = 0;

export const loadLegacyRuntime = (): void => {
  const request = ++runtimeRequest;
  runtimeModule ??= import('./legacy-runtime.js');
  void runtimeModule.then(({ mountLegacyRuntime }) => {
    if (request === runtimeRequest) mountLegacyRuntime();
  });
};
