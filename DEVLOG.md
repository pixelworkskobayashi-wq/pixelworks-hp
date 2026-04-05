# Pixel Works HP 開発ログ

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| フレームワーク | Astro 6.1.2 / TypeScript |
| ホスティング | Netlify（sparkly-pixie-c59091.netlify.app） |
| リポジトリ | https://github.com/pixelworkskobayashi-wq/pixelworks-hp.git |
| フォーム | Web3Forms（access key: 4110fb94-6c7b-4fc4-9753-c58f6a3241aa） |

---

## 作業ログ

### VRコンテンツ

#### 追加
| ID | タイトル | 種別 | shape | パス |
|---|---|---|---|---|
| work-31 | VR Tour — Office | D5 XR Tour | square | /vr/d5tour5/index.html |

- ローカルディレクトリ: `D:\Pixel Works\HP2026\works\vr\D5VirtualTour_361d45\_Resource`
- サムネ: `samvr08.jpg` → `public/works/` にコピー済み
- `astro.config.mjs` に `/vr/d5tour5` ミドルウェア追加済み

#### 削除
- work-12（Hotel Lobby VR）
- work-18（Retail Showroom VR）

#### VRコンテンツ全一覧
| ID | タイトル | 種別 | shape | embedUrl / パス |
|---|---|---|---|---|
| work-5  | VR Tour — 1F Floor   | TwinMotion | landscape | https://twinmotion.unrealengine.com/panorama/oLts7w1tJ2qY9Vd_?embed |
| work-25 | VR Tour — Clinic     | D5 XR Tour | landscape | /vr/d5tour/index.html |
| work-26 | VR Tour — Auditorium | D5 XR Tour | square    | /vr/d5tour2/index.html |
| work-27 | VR Tour — Bathroom   | TwinMotion | landscape | https://twinmotion.unrealengine.com/panorama/ZzbArbX0rJsnuZwh?embed |
| work-28 | VR Tour — Lounge     | TwinMotion | square    | https://twinmotion.unrealengine.com/panorama/ohqgaFH-yeRQ_bSh?embed |
| work-29 | VR Tour — Teahouse   | D5 XR Tour | portrait  | /vr/d5tour3/index.html |
| work-30 | VR Tour — Dam        | D5 XR Tour | landscape | /vr/d5tour4/index.html |
| work-31 | VR Tour — Office     | D5 XR Tour | square    | /vr/d5tour5/index.html |

#### D5 XR Tour ローカルディレクトリ対応表
| URLパス | ローカルパス |
|---------|------------|
| /vr/d5tour/  | D:\Pixel Works\HP2026\works\vr\D5VirtualTour_473196\_Resource |
| /vr/d5tour2/ | D:\Pixel Works\HP2026\works\vr\D5VirtualTour_2adb17\_Resource |
| /vr/d5tour3/ | D:\Pixel Works\HP2026\works\vr\D5VirtualTour_545cb3\_Resource |
| /vr/d5tour4/ | D:\Pixel Works\HP2026\works\vr\D5VirtualTour_6512c2\_Resource |
| /vr/d5tour5/ | D:\Pixel Works\HP2026\works\vr\D5VirtualTour_361d45\_Resource |

---

### Rendering作品（静止画）

- **ファイル**: `w01.jpg` 〜 `w61.jpg`（`D:\Pixel Works\HP2026\works` に配置）
- **登録ID**: work-32 〜 work-93（work-93がW49、末尾に配置）
- **並び順**: ランダムシャッフル済み
- **shape**: landscape / portrait / square をランダム配分
- **title・description**: 空文字（意図的）
- **Unsplash素材**: 全削除済み

#### 個別調整
| ファイル | 変更内容 |
|---------|---------|
| W27（work-64） | `span: 6` で横幅大きめ表示 |
| W22（work-82） | shape を portrait に変更 |
| W49（work-93） | 末尾（最下部）に配置 |

---

### Photo作品（竣工写真）

- **登録ID**: work-94 〜 work-175（82件）
- **ファイル場所**: `D:\Pixel Works\HP2026\works\photo\{フォルダ名}\`
- **ファイル命名規則**: `{フォルダ名}-01.jpg`〜（リネーム済み）
- **title**: フォルダ名を使用
- **並び順**: ランダムシャッフル済み
- **shape**: landscape / portrait / square をランダム配分
- **ALLフィルター**: 非表示（PHOTOフィルター選択時のみ表示）
- **/photo/ ミドルウェア**: `astro.config.mjs` に追加済み（スペース入りフォルダ名対応のURLデコード処理あり）

#### Photoフォルダ一覧
Ophthalmology / bar / beauty clinic 1 / beauty clinic 2 / cafe / dining / houseA / houseB / houseC / laundry / officeA / officeB / pub / ramenA / ramenB / rheumatism clinic / salon / temple / warehouse

---

### Works ギャラリー UI 改修（Works.astro）

#### グリッドレイアウト（12カラム・縦ライン交互ずらし）

```
grid-template-columns: repeat(12, 1fr) / gap: 20px
```

JS `applyGridLayout()` で行ごとに列スパンを動的割り当て：

| 行 | spanパターン | ギャップ位置 |
|----|------------|------------|
| 奇数行 | [4, 4, 4] | 33% / 67% |
| 偶数行 | [3, 4, 5] | 25% / 58% |

- ギャップ位置が行ごとにずれるため、縦ラインが揃わない
- タブレット（≤1024px）: [6, 6] で2アイテム/行
- `data-span` 属性があるアイテムは優先スパンを使用（W27に適用）
- Work型に `span?: number` フィールド追加済み

#### テキスト配置（奇数行・偶数行で交互）

| 行 | テキスト位置 | 画像揃え |
|----|------------|---------|
| 奇数行 | サムネ上 | 下辺揃え（align-self: end） |
| 偶数行 | サムネ下 | 上辺揃え（align-self: start） |

#### サムネフェードイン
- `IntersectionObserver`（threshold: 0.15）でビューポート検出
- 各アイテムにランダム `0〜0.5秒` の遅延（CSS変数 `--fade-delay`）
- フェード速度: サムネ 1.2s / タイトル 0.8s（タイトルはさらに +0.65s 遅延）

---

### Hero セクション（Hero.astro）

- **キャッチコピー変更**:
  - 旧: 「建築とグラフィックを結ぶ / ビジュアライゼーション」
  - 新: 「空間を、伝える力に。/ ― Architectural Visualization -」
- **フォント**: `Helvetica Neue, Helvetica, Arial, sans-serif`
- **2行目スタイル**: 小さめ・細め・やや下に配置（margin-top: 8px）

---

### Footer（Footer.astro）

- **コピーライト年**: 2024 → 2026 に更新
- **社名クリック**: `PIXEL WORKS` をリンク化、クリックでページ最上部へスクロール

---

### 画像運用メモ

#### dev server での配信
`astro.config.mjs` の Vite ミドルウェアで以下のパスをローカルディレクトリにマッピング：

| URLパス | ローカルパス |
|---------|------------|
| /works/ | D:\Pixel Works\HP2026\works\ |
| /photo/ | D:\Pixel Works\HP2026\works\photo\ |
| /vr/d5tour〜d5tour5/ | 各D5XRツアーディレクトリ |

#### 本番（Netlify）デプロイ時の手順
1. `D:\Pixel Works\HP2026\works\w01.jpg〜` を `public/works/` にコピー
2. `D:\Pixel Works\HP2026\works\photo\` を `public/photo/` にコピー
3. VRコンテンツは各 `_Resource` の中身を `public/vr/d5tour〇/` にコピー
   - ⚠️ VRファイルは大容量のため Netlify 無料枠（100MB）超過の可能性あり

---

### ホスティング移行検討

| 項目 | 内容 |
|------|------|
| 現状 | Netlify 無料枠（デプロイ100MB・帯域100GB/月） |
| 課題 | VRコンテンツが大容量で無料枠では厳しい |
| 移行候補 | Cloudflare Pages（メインサイト）+ Cloudflare R2（VR・画像） |
| R2メリット | 無料10GB・転送費用なし |
| ドメイン | pixel-works.info（現在Jimdooで運用中） |

---

## 連絡先

- Tel: 090-9515-3461
- Email: kobayashi@pixel-works.info
