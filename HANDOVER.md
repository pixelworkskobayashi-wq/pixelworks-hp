# Pixel Works HP 引き継ぎ文書

最終更新: 2026-04-05

---

## プロジェクト概要

Pixel Works（建築ビジュアライゼーションスタジオ）の会社ホームページ。

| 項目 | 内容 |
|------|------|
| フレームワーク | Astro 6.1.2 / TypeScript |
| ホスティング | Cloudflare Pages |
| リポジトリ | https://github.com/pixelworkskobayashi-wq/pixelworks-hp.git |
| 本番URL | https://pixelworks-hp.pages.dev |
| フォーム | Web3Forms（access key: 4110fb94-6c7b-4fc4-9753-c58f6a3241aa） |

---

## ディレクトリ構成

```
company-hp/
├── src/
│   ├── components/
│   │   ├── Hero.astro        # トップページHero（動画背景）
│   │   ├── Works.astro       # 作品ギャラリー
│   │   ├── Services.astro    # サービス紹介
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ContactForm.astro
│   ├── data/
│   │   └── works.ts          # 全作品データ（Rendering/VR/Photo）
│   ├── pages/
│   │   ├── index.astro       # トップページ
│   │   ├── about.astro       # 会社概要
│   │   └── contact.astro     # お問い合わせ
│   ├── layouts/
│   │   └── Layout.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── works/                # Rendering画像（w01〜w61）・VRサムネイル・Hero動画
│   │   └── movie/
│   │       └── hero-m.mp4
│   └── photo/                # Photo作品（フォルダ別）
└── astro.config.mjs          # Viteミドルウェア設定（開発環境用）
```

---

## ホスティング構成

### Cloudflare Pages（メインサイト）
- GitHubのmainブランチにpushすると自動デプロイ
- Astro / Build command: `npm run build` / Output: `dist`

### Cloudflare R2（VRコンテンツ）
- バケット名: `pixelworks-vr`
- 公開URL: `https://pub-15c592812d3843cea33567d5c29b3bc5.r2.dev`
- アップロード済みフォルダ:

| パス | ローカル元 |
|------|-----------|
| /d5tour/ | D5VirtualTour_473196/_Resource |
| /d5tour2/ | D5VirtualTour_2adb17/_Resource |
| /d5tour3/ | D5VirtualTour_545cb3/_Resource |
| /d5tour4/ | D5VirtualTour_6512c2/_Resource |
| /d5tour5/ | D5VirtualTour_361d45/_Resource |

VRコンテンツを更新する場合は rclone を使用：
```bash
rclone copy "D:/Pixel Works/HP2026/works/vr/D5VirtualTour_XXXXXX/_Resource" r2:pixelworks-vr/d5tourX --progress
```

---

## 画像・動画の管理

### 開発環境
Viteミドルウェア（`astro.config.mjs`）でローカルフォルダを配信：

| URLパス | ローカルフォルダ |
|---------|----------------|
| /works/ | D:\Pixel Works\HP2026\works\ |
| /photo/ | D:\Pixel Works\HP2026\works\photo\ |

### 本番環境
`public/` フォルダに配置してpushする。

| 配置先 | 内容 |
|--------|------|
| public/works/ | w01〜w61.jpg、samvr01〜08.jpg |
| public/works/movie/ | hero-m.mp4 |
| public/photo/ | Photo作品（フォルダ別） |

**新しい作品画像を追加する手順：**
1. ローカルの `D:\Pixel Works\HP2026\works\` に画像を配置
2. `public/works/` にもコピー
3. `src/data/works.ts` に作品データを追加
4. commit & push

---

## Hero セクション

- 背景: 動画（`/works/movie/hero-m.mp4`）
  - 1280×720 / 7.2MB / 20秒 / H.264
- サイズ: `height: 67svh`（min-height: 400px）
- キャッチコピー: 「空間を、伝える力に。― Architectural Visualization -」
- フォント: Plus Jakarta Sans

---

## Works ギャラリー

### 作品データ（src/data/works.ts）

| 種別 | ID範囲 | 件数 | 備考 |
|------|--------|------|------|
| VR | work-5, work-25〜31 | 8件 | TwinMotion + D5 XR Tour |
| Rendering | work-32〜work-93 | 62件 | w01〜w61 |
| Photo | work-94〜work-175 | 82件 | ALLフィルター非表示 |

### フィルター
- ALL / VR / RENDERING / PHOTO
- MOVIEは現在コメントアウト（復活時はworks.tsのcategories配列を編集）
- ALLにPhotoは含まれない

### グリッドレイアウト
- 12カラムグリッド
- 奇数行: [4,4,4] / 偶数行: [3,4,5]（縦ラインをずらすデザイン）
- タブレット（≤1024px）: [6,6]

---

## フォント

| 用途 | フォント |
|------|---------|
| 本文 | Noto Sans JP（Google Fonts） |
| 英字・見出し | Plus Jakarta Sans（Google Fonts） |

---

## 各ページ

### トップページ（index.astro）
- Hero → Works → Services → ContactForm の順

### 会社概要（about.astro）
- CONCEPT / COMPANY INFO / PROFILE の3セクション
- COMPANY INFO: 会社名・所在地・事業内容（TEL・メールは非掲載）

### お問い合わせ（contact.astro）
- Web3Forms経由で送信

---

## 今後の作業（未完了）

- [ ] **カスタムドメイン設定**: `pixel-works.info`（現在Jimdooで運用中）をCloudflareに移管

---

## 連絡先

- Tel: 090-9515-3461
- Email: kobayashi@pixel-works.info
