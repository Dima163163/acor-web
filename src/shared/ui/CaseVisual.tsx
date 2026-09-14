import type { ReactElement } from 'react';

export type CaseVisualKind = 'architecture' | 'commerce' | 'product';

const WindowDots = (): ReactElement => <span className="case-ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>;

const ArchitectureVisual = (): ReactElement => (
  <div className="case-ui case-ui--architecture" aria-hidden="true">
    <header className="case-ui-bar"><span className="case-ui-blur">ARCHIVE</span><nav>Overview&nbsp;&nbsp;&nbsp;Spaces&nbsp;&nbsp;&nbsp;Materials</nav><b>↗︎</b></header>
    <div className="case-ui-architecture-hero">
      <div><small>RESIDENTIAL STUDY / 01</small><h3>Quiet<br /><em>geometry.</em></h3><p>A guided route through light, volume and material.</p><span className="case-ui-cta">Explore the layout&nbsp; ↗︎</span></div>
      <div className="case-ui-architecture-frame"><WindowDots /><div className="case-ui-grid-lines"></div><span>01 / 06</span><b>◼</b></div>
    </div>
    <footer className="case-ui-foot"><span>SCROLL TO EXPLORE</span><span>01—06</span></footer>
  </div>
);

const CommerceVisual = (): ReactElement => (
  <div className="case-ui case-ui--commerce" aria-hidden="true">
    <header className="case-ui-bar"><span className="case-ui-blur">STUDIO GOODS</span><nav>Objects&nbsp;&nbsp;&nbsp;Stories&nbsp;&nbsp;&nbsp;Journal</nav><b>Bag&nbsp;·&nbsp;02</b></header>
    <div className="case-ui-commerce-hero"><small>CURATED OBJECTS / 02</small><h3>Make room<br /><em>for texture.</em></h3><p>Objects selected for slower, more considered spaces.</p></div>
    <div className="case-ui-products"><article><div className="case-ui-product-image case-ui-product-image--stone"></div><span>01 / Stone</span><b>View object&nbsp; ↗︎</b></article><article><div className="case-ui-product-image case-ui-product-image--fabric"></div><span>02 / Textile</span><b>View object&nbsp; ↗︎</b></article><article><div className="case-ui-product-image case-ui-product-image--light"></div><span>03 / Light</span><b>View object&nbsp; ↗︎</b></article></div>
  </div>
);

const ProductVisual = (): ReactElement => (
  <div className="case-ui case-ui--product" aria-hidden="true">
    <header className="case-ui-bar"><span className="case-ui-blur">PERSONAL / 03</span><nav>Overview&nbsp;&nbsp;&nbsp;Activity&nbsp;&nbsp;&nbsp;Goals</nav><b>•••</b></header>
    <div className="case-ui-product-layout"><aside><span>OVERVIEW</span><span>ACTIVITY</span><span>GOALS</span><span>SETTINGS</span><small>SYNCED JUST NOW</small></aside><main><small>PERSONAL BALANCE</small><strong>284 650 <sup>₽</sup></strong><div className="case-ui-chart"><i></i><i></i><i></i><i></i><i></i></div><div className="case-ui-stats"><span>INCOMING <b>+86 400 ₽</b></span><span>OUTGOING <b>−32 780 ₽</b></span></div></main><div className="case-ui-phone"><span>THIS MONTH</span><strong>284 650 ₽</strong><div></div><small>Next goal&nbsp; ↗︎</small></div></div>
  </div>
);

export const CaseVisual = ({ kind }: { kind: CaseVisualKind }): ReactElement => {
  if (kind === 'architecture') return <ArchitectureVisual />;
  if (kind === 'commerce') return <CommerceVisual />;
  return <ProductVisual />;
};
