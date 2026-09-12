import type { AppearanceRuntime } from './appearance';

export type Translator = (value: string) => string;

export interface RuntimeContext {
  readonly t: Translator;
  readonly pageKey: () => string;
  readonly applyLocale: () => void;
  readonly appearance: AppearanceRuntime;
  readonly reducedMotion: MediaQueryList;
  readonly finePointer: MediaQueryList;
  readonly cursor: HTMLElement | null;
  readonly updateScroll?: () => void;
}
