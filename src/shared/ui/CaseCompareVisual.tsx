import type { ReactElement } from 'react';
import type { CaseVisualKind } from './CaseVisual';

const caseImages: Record<CaseVisualKind, string> = {
  architecture: 'field-01.webp',
  commerce: 'material-02.webp',
  product: 'vector-03.webp'
};

const BeforeArchitecture = (): ReactElement => (
  <div className="compare-before compare-before--architecture" aria-hidden="true">
    <div className="compare-before-toolbar"><i></i><i></i><i></i><span>MENU</span></div>
    <small>ARCHITECTURE / HOME</small>
    <strong>spaces<br />for everyone</strong>
    <div className="compare-before-blocks"><i></i><i></i><i></i></div>
  </div>
);

const BeforeCommerce = (): ReactElement => (
  <div className="compare-before compare-before--commerce" aria-hidden="true">
    <div className="compare-before-toolbar"><span>OBJECTS</span><span>MENU</span><span>BAG (0)</span></div>
    <small>COLLECTION / 02</small>
    <strong>All<br />objects.</strong>
    <div className="compare-before-blocks"><i></i><i></i><i></i></div>
    <em>choose one →</em>
  </div>
);

const BeforeProduct = (): ReactElement => (
  <div className="compare-before compare-before--product" aria-hidden="true">
    <div className="compare-before-toolbar"><span>DATA / 03</span><span>EXPORT</span></div>
    <small>OVERVIEW / LAST 30 DAYS</small>
    <strong>Dashboard</strong>
    <div className="compare-before-table"><i></i><i></i><i></i><i></i><i></i></div>
    <div className="compare-before-blocks"><i></i><i></i></div>
  </div>
);

const beforeVisuals: Record<CaseVisualKind, () => ReactElement> = {
  architecture: BeforeArchitecture,
  commerce: BeforeCommerce,
  product: BeforeProduct
};

export const CaseCompareVisual = ({ kind }: { kind: CaseVisualKind }): ReactElement => {
  const Before = beforeVisuals[kind];
  return (
    <>
      <div className="case-compare-base">
        <span>Собранная форма</span>
        <img src={`/images/cases/${caseImages[kind]}`} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={`case-compare-overlay compare-overlay--${kind}`}>
        <span>Черновая структура</span>
        <Before />
      </div>
    </>
  );
};
