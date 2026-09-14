import type { ReactElement } from 'react';
import type { CaseVisualKind } from './CaseVisual';

const caseImages: Record<CaseVisualKind, string> = {
  architecture: 'field-01.webp',
  commerce: 'material-02.webp',
  product: 'vector-03.webp'
};

const beforeImages: Record<CaseVisualKind, string> = {
  architecture: 'before-field-01.webp',
  commerce: 'before-material-02.webp',
  product: 'before-vector-03.webp'
};

export const CaseCompareVisual = ({ kind }: { kind: CaseVisualKind }): ReactElement => (
  <>
    <div className="case-compare-base">
      <span>Собранная форма</span>
      <img src={`/images/cases/${caseImages[kind]}`} alt="" loading="lazy" decoding="async" />
    </div>
    <div className={`case-compare-overlay compare-overlay--${kind}`}>
      <span>Черновая структура</span>
      <img className="compare-before-image" src={`/images/cases/${beforeImages[kind]}`} alt="" loading="lazy" decoding="async" />
    </div>
  </>
);
