export interface Work {
  id: string;
  title: string;
  category: 'rendering' | 'movie' | 'vr' | 'photo';
  imageUrl: string;
  description: string;
}

export const works: Work[] = [
  { id: 'work-1', title: 'Modern Residence Exterior', category: 'rendering', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', description: '住宅外観パース。フォトリアルな仕上がりで竣工後のイメージを鮮明に表現。' },
  { id: 'work-2', title: 'Office Interior Visualization', category: 'rendering', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', description: 'オフィス内観パース。素材感・光の表現にこだわったビジュアライゼーション。' },
  { id: 'work-3', title: 'Residential Complex', category: 'rendering', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', description: '集合住宅の外観CGパース。周辺環境との調和を意識した構図。' },
  { id: 'work-4', title: 'Architectural Flythrough', category: 'movie', imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', description: 'GPUレンダリングによる建築CGアニメーション。空間の流れを動きで表現。' },
  { id: 'work-5', title: 'VR Walkthrough — Showroom', category: 'vr', imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80', description: 'TwinMotionクラウドを使用したインタラクティブな空間体験。' },
  { id: 'work-6', title: 'Completion Photography', category: 'photo', imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', description: '竣工写真撮影。建築の魅力を最大限に引き出す光と構図。' },
  { id: 'work-7', title: 'Luxury Apartment Rendering', category: 'rendering', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', description: '高級マンションのモデルルームCGパース。質感表現に注力。' },
  { id: 'work-8', title: 'Commercial Building', category: 'photo', imageUrl: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=800&q=80', description: '商業ビルの竣工写真。建築の力強さとデザインを表現。' },
];

export const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'rendering', label: 'RENDERING' },
  { id: 'movie', label: 'MOVIE' },
  { id: 'vr', label: 'VR' },
  { id: 'photo', label: 'PHOTO' },
] as const;
