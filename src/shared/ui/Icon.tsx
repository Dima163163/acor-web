import type { ReactElement } from 'react';

export type IconName = 'arrow-up-right' | 'arrow-down' | 'arrow-left' | 'spark' | 'close';

const paths: Record<IconName, ReactElement> = {
  'arrow-up-right': <><path d="M5 19 19 5" /><path d="M8 5h11v11" /></>,
  'arrow-down': <><path d="M12 4v16" /><path d="m6 14 6 6 6-6" /></>,
  'arrow-left': <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  spark: <><path d="m12 2 1.7 7.3L21 11l-7.3 1.7L12 20l-1.7-7.3L3 11l7.3-1.7L12 2Z" /></>,
  close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>
};

export const Icon = ({ name, size = 16, className = '' }: { name: IconName; size?: number; className?: string }): ReactElement => (
  <svg className={`icon ${className}`.trim()} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {paths[name]}
  </svg>
);
