interface AcorStudioEvent {
  name: string;
  detail: Record<string, unknown>;
  at: string;
}

interface Window {
  __acorRuntimeCleanup?: () => void;
  __acorListenerPatch?: boolean;
  __acorRuntimeController?: AbortController | null;
  acorStudioEvents?: AcorStudioEvent[];
}
