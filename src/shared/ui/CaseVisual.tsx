import type { ReactElement } from 'react';

export type CaseVisualKind = 'architecture' | 'commerce' | 'product';

interface CaseVisualAsset {
  readonly file: string;
  readonly alt: string;
}

const caseVisualAssets: Record<CaseVisualKind, CaseVisualAsset> = {
  architecture: {
    file: 'field-01.webp',
    alt: 'Оригинальный макет сайта архитектурной студии FIELD / 01'
  },
  commerce: {
    file: 'material-02.webp',
    alt: 'Оригинальный макет интернет-магазина предметов MATERIAL / 02'
  },
  product: {
    file: 'vector-03.webp',
    alt: 'Оригинальный макет климатической платформы VECTOR / 03'
  }
};

export const CaseVisual = ({ kind }: { kind: CaseVisualKind }): ReactElement => {
  const asset = caseVisualAssets[kind];
  return (
    <img
      src={`/images/cases/${asset.file}`}
      alt={asset.alt}
      loading="lazy"
      decoding="async"
    />
  );
};
