interface Window {
  __acorRuntimeCleanup?: () => void;
  __acorListenerPatch?: boolean;
  __acorRuntimeController?: AbortController | null;
}
