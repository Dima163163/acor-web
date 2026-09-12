import { mountAppearance } from './appearance';
import { mountBrief } from './brief';
import { mountCommandPalette } from './command-palette';
import { mountLab } from './lab';
import { mountNavigation } from './navigation';
import { createLocaleController } from './locale';
import { mountCaseFeatures } from './features/case-features';
import { mountCompareAndCards } from './features/compare-and-cards';
import { mountContactForm } from './features/contact-form';
import { mountEstimator } from './features/estimator';
import { mountFeedbackEffects } from './features/feedback-effects';
import { mountLabPalette } from './features/lab-palette';
import { mountMotionEffects } from './features/motion-effects';
import { mountProcessTabs } from './features/process-tabs';
import { mountProjects } from './features/projects';
import { mountScrollState } from './features/scroll-state';
import { mountServiceWorker } from './features/service-worker';
import { mountTeam } from './features/team';
import { mountTelemetry } from './features/telemetry';
import { mountProjectBuilder } from './features/project-builder';
import { createRuntimeScope } from './runtime-scope';
import type { RuntimeContext } from './types';

/** Mount all page interactions for the current React Router route. */
export const mountRuntime = (): void => {

  const { controller: runtimeController } = createRuntimeScope();
  const locale = createLocaleController();
  const { translate: t, pageKey, apply: applyLocale } = locale;
  const appearance = mountAppearance(locale);
  const { reducedMotion, finePointer, cursor } = appearance;
  const context: RuntimeContext = { t, pageKey, applyLocale, appearance, reducedMotion, finePointer, cursor };
  mountTelemetry(context);
  const { setMenu } = mountNavigation(t);

  // Each feature owns one interaction family and can safely be mounted again
  // after React Router swaps the page. The shared AbortController above
  // removes every listener when the next route starts.
  mountMotionEffects(context);
  mountEstimator(context);
  mountProjects(context);
  mountLab(t);
  mountContactForm(context);
  const { updateScroll } = mountScrollState(context);
  mountTeam({ ...context, updateScroll });
  mountProjectBuilder(context);
  mountCaseFeatures(context);
  mountBrief(t, reducedMotion);
  mountCompareAndCards(context);
  mountFeedbackEffects(context);
  mountLabPalette(context);
  mountCommandPalette(t, setMenu);
  mountProcessTabs(context);
  mountServiceWorker({ applyLocale, runtimeController });
};
