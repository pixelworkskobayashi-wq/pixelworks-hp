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
    description: '外観・内観のフォトリアルCGパース。高品質なビジュアルで建築プロジェクトのイメージを正確に伝えます。',
  },
  {
    id: 'movie',
    number: '02',
    titleJa: 'CGムービー制作',
    titleEn: 'CG Movie Production',
    description: 'GPUレンダリングによる建築CGアニメーション。空間の魅力を動きで表現します。',
  },
  {
    id: 'vr',
    number: '03',
    titleJa: 'VR / インタラクティブ',
    titleEn: 'VR Visualization',
    description: 'TwinMotionクラウドを活用した高度な建築ビジュアライゼーション。インタラクティブな体験を提供します。',
  },
  {
    id: 'composite',
    number: '04',
    titleJa: '画像合成・加工',
    titleEn: 'Image Compositing',
    description: '竣工写真へのCG合成や写真加工。リアルな完成イメージを効果的に演出します。',
  },
  {
    id: 'simulation',
    number: '05',
    titleJa: '設計支援シミュレーション',
    titleEn: 'Design Simulation',
    description: '建築プロジェクトのイメージ共有・業務円滑化を支援するシミュレーション制作。',
  },
  {
    id: 'photo',
    number: '06',
    titleJa: '竣工写真撮影',
    titleEn: 'Architectural Photography',
    description: '完成した建築物の魅力を最大限に引き出す竣工写真撮影。',
  },
];
