export interface Work {
  id: string;
  title: string;
  category: 'rendering' | 'movie' | 'vr' | 'photo';
  imageUrl: string;
  description: string;
  shape: 'landscape' | 'portrait' | 'square';
  embedUrl?: string; // YouTube embed URL or Twinmotion Cloud iframe src
}

export const works: Work[] = [
  { id: 'work-1',  title: 'Modern Residence Exterior',      category: 'rendering', shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',  description: '住宅外観パース。フォトリアルな仕上がりで竣工後のイメージを鮮明に表現。' },
  { id: 'work-2',  title: 'Office Interior Visualization',  category: 'rendering', shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',  description: 'オフィス内観パース。素材感・光の表現にこだわったビジュアライゼーション。' },
  { id: 'work-3',  title: 'Residential Complex',            category: 'rendering', shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',  description: '集合住宅の外観CGパース。周辺環境との調和を意識した構図。' },
  { id: 'work-4',  title: 'Architectural Flythrough',       category: 'movie',     shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',  description: 'GPUレンダリングによる建築CGアニメーション。空間の流れを動きで表現。', embedUrl: 'https://www.youtube.com/embed/fNW5ZVp7aCM' },
  { id: 'work-5',  title: 'VR Walkthrough — Showroom',      category: 'vr',        shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80',  description: 'TwinMotionクラウドを使用したインタラクティブな空間体験。', embedUrl: 'https://twinmotion.unrealengine.com/panorama/oLts7w1tJ2qY9Vd_?embed' },
  { id: 'work-6',  title: 'Completion Photography',         category: 'photo',     shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',  description: '竣工写真撮影。建築の魅力を最大限に引き出す光と構図。' },
  { id: 'work-7',  title: 'Luxury Apartment Rendering',     category: 'rendering', shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',  description: '高級マンションのモデルルームCGパース。質感表現に注力。' },
  { id: 'work-8',  title: 'Commercial Building',            category: 'photo',     shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=800&q=80',  description: '商業ビルの竣工写真。建築の力強さとデザインを表現。' },
  { id: 'work-9',  title: 'Urban Mixed-Use Tower',          category: 'rendering', shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',  description: '都市型複合ビルの外観CGパース。夜景バリエーションも制作。' },
  { id: 'work-10', title: 'Minimalist Villa Interior',      category: 'rendering', shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',  description: 'ミニマルなヴィラの内観パース。素材の質感と自然光を精緻に再現。' },
  { id: 'work-11', title: 'Museum Walkthrough',             category: 'movie',     shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1565117231274-c1d62df3cc3e?w=800&q=80',  description: '美術館内部のフライスルームービー。光と影の演出にこだわった表現。' },
  { id: 'work-12', title: 'Hotel Lobby VR',                 category: 'vr',        shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',  description: 'ホテルロビーのVRウォークスルー。デザイン確認と販促に活用。' },
  { id: 'work-13', title: 'Facade Detail Study',            category: 'rendering', shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1486591038534-338828be4c8e?w=800&q=80',  description: '外壁素材・ディテールのクローズアップCGパース。素材選定の検討資料。' },
  { id: 'work-14', title: 'Residential Interior — Kitchen', category: 'rendering', shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',  description: 'キッチン・ダイニングの内観パース。生活感と高級感を両立したビジュアル。' },
  { id: 'work-15', title: 'Industrial Warehouse Conversion',category: 'photo',     shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',  description: '倉庫リノベーション竣工写真。既存構造の魅力を活かした撮影。' },
  { id: 'work-16', title: 'Clinic & Wellness Center',       category: 'rendering', shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',  description: 'クリニックのCGパース。清潔感と温かみを表現したビジュアル。' },
  { id: 'work-17', title: 'Skyscraper Massing Study',       category: 'rendering', shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',  description: '超高層ビルのマスタープランCGパース。都市スカイラインへの影響を可視化。' },
  { id: 'work-18', title: 'Retail Showroom VR',             category: 'vr',        shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',  description: 'ショールームのインタラクティブVR体験。顧客向けプレゼンに活用。' },
  { id: 'work-19', title: 'Flythrough — Resort Complex',    category: 'movie',     shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',  description: 'リゾート施設のCGフライスルームービー。全体像を俯瞰的に表現。' },
  { id: 'work-20', title: 'Cultural Center Exterior',       category: 'rendering', shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1523978591478-c753949ff840?w=800&q=80',  description: '文化施設の外観パース。周辺の緑と調和したランドスケープ表現。' },
  { id: 'work-21', title: 'Wooden House Photography',       category: 'photo',     shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',  description: '木造住宅の竣工写真。素材感と自然光を活かした丁寧な撮影。' },
  { id: 'work-22', title: 'Station District Masterplan',    category: 'rendering', shape: 'landscape', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',  description: '駅前再開発のマスタープランCGパース。都市計画の全体像を表現。' },
  { id: 'work-23', title: 'Spa & Wellness Interior',        category: 'rendering', shape: 'portrait',  imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',  description: 'スパ・ウェルネス施設の内観パース。静寂と開放感を演出したビジュアル。' },
  { id: 'work-24', title: 'Parking Structure Study',        category: 'rendering', shape: 'square',   imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80',  description: '立体駐車場のCGパース。構造美と機能性を両立したデザイン検討資料。' },
];

export const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'rendering', label: 'RENDERING' },
  { id: 'movie', label: 'MOVIE' },
  { id: 'vr', label: 'VR' },
  { id: 'photo', label: 'PHOTO' },
] as const;
