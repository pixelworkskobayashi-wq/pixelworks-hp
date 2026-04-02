export interface Service {
  id: string;
  number: string;
  titleJa: string;
  titleEn: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'rendering',
    number: '01',
    titleJa: '建築パース制作',
    titleEn: 'Architectural Rendering',
    description: '外観・内観のフォトリアルCGパース。高品質なビジュアルで建築・土木プロジェクトのイメージを正確に伝えます。',
  },
  {
    id: 'movie',
    number: '02',
    titleJa: 'CGムービー制作',
    titleEn: 'CG Movie Production',
    description: '',
  },
  {
    id: 'vr',
    number: '03',
    titleJa: 'VR / インタラクティブ',
    titleEn: 'VR Visualization',
    description: '最新のソフトウェアを使用した高度な建築ビジュアライゼーション。インタラクティブな体験を提供します。',
  },
  {
    id: 'simulation',
    number: '04',
    titleJa: '設計支援シミュレーション',
    titleEn: 'Design Simulation',
    description: '建築物の形状・仕上げ・カラーをシミュレーション。プロジェクトのイメージ共有・業務円滑化を支援します。',
  },
  {
    id: 'photo',
    number: '05',
    titleJa: '竣工写真撮影',
    titleEn: 'Architectural Photography',
    description: '',
  },
];
