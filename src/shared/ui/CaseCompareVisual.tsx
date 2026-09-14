import type { ReactElement } from 'react';
import type { CaseVisualKind } from './CaseVisual';

const caseImages: Record<CaseVisualKind, string> = {
  architecture: 'field-01.webp',
  commerce: 'material-02.webp',
  product: 'vector-03.webp'
};

const BeforeArchitecture = (): ReactElement => (
  <div className="compare-before compare-before--architecture" aria-hidden="true">
    <header className="compare-before-sitebar"><b>FIELD.</b><nav>Projects&nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;Contact</nav><span>MENU</span></header>
    <div className="compare-before-architecture-hero">
      <div>
        <small>ARCHITECTURE / RESIDENTIAL</small>
        <strong>Spaces<br /><em>for living.</em></strong>
        <p>A simple route through rooms, light and material.</p>
        <span className="compare-before-link">View project&nbsp; ↗︎</span>
      </div>
      <div className="compare-before-architecture-photo"><span>01 / 03</span></div>
    </div>
    <footer className="compare-before-footer"><span>SCROLL TO EXPLORE</span><span>© 2026</span></footer>
  </div>
);

const BeforeCommerce = (): ReactElement => (
  <div className="compare-before compare-before--commerce" aria-hidden="true">
    <header className="compare-before-sitebar"><b>ATELIER / 02</b><nav>Shop&nbsp;&nbsp;&nbsp;Stories&nbsp;&nbsp;&nbsp;Journal</nav><span>Bag&nbsp;·&nbsp;0</span></header>
    <div className="compare-before-commerce-hero">
      <small>OBJECTS / CURATED EDITION</small>
      <strong>Made for <em>daily rituals.</em></strong>
      <span className="compare-before-link">Browse collection&nbsp; ↗︎</span>
    </div>
    <div className="compare-before-commerce-grid">
      <article><i></i><span>01 / Glass</span><b>Explore</b></article>
      <article><i></i><span>02 / Linen</span><b>Explore</b></article>
      <article><i></i><span>03 / Stone</span><b>Explore</b></article>
    </div>
  </div>
);

const BeforeProduct = (): ReactElement => (
  <div className="compare-before compare-before--product" aria-hidden="true">
    <header className="compare-before-sitebar"><b>VECTOR / DATA</b><nav>Overview&nbsp;&nbsp;&nbsp;Reports&nbsp;&nbsp;&nbsp;Team</nav><span>Export</span></header>
    <div className="compare-before-product-layout">
      <aside><span>Overview</span><span>Energy</span><span>Water</span><span>Sites</span><span>Reports</span></aside>
      <main>
        <small>RESOURCE DASHBOARD / LAST 30 DAYS</small>
        <strong>See your<br /><em>footprint.</em></strong>
        <div className="compare-before-product-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div className="compare-before-product-stats"><span>Total energy <b>284 MWh</b></span><span>Total water <b>1.42 Mm³</b></span></div>
      </main>
    </div>
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
