type RuntimeModule = typeof import('./runtime');

let runtimeModule: Promise<RuntimeModule> | null = null;
let runtimeRequest = 0;

export const loadRuntime = (): void => {
  const request = ++runtimeRequest;
  runtimeModule ??= import('./runtime');
  void runtimeModule.then(({ mountRuntime }) => {
    if (request === runtimeRequest) mountRuntime();
  });
};
