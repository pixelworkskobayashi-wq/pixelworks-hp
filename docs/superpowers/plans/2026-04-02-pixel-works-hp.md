# Pixel Works HP リニューアル 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pixel Works の会社ホームページをAstroで構築し、Netlifyにデプロイする

**Architecture:** シングルページスクロール（HERO → SERVICES → WORKS）＋ ABOUT・CONTACT は別ページ遷移。固定ヘッダーによるナビゲーション。作品はモーダル表示。Playwrightでインタラクションをテスト。

**Tech Stack:** Astro 4.x, TypeScript, Vanilla CSS（フレームワークなし）, Playwright（E2Eテスト）, Netlify Forms

---

## ファイル構成

```
company-hp/
├── src/
│   ├── components/
│   │   ├── Header.astro          # 固定ナビゲーション
│   │   ├── Footer.astro          # フッター
│   │   ├── Hero.astro            # フルスクリーンヒーロー
│   │   ├── Services.astro        # サービス一覧セクション
│   │   ├── Works.astro           # ギャラリー＋フィルター＋モーダル
│   │   └── ContactForm.astro     # Netlify Forms フォーム
│   ├── layouts/
│   │   └── Layout.astro          # 共通レイアウト（Head・Header・Footer）
│   ├── pages/
│   │   ├── index.astro           # トップページ（Hero + Services + Works）
│   │   ├── about.astro           # 会社概要ページ
│   │   └── contact.astro         # お問い合わせページ
│   ├── styles/
│   │   └── global.css            # デザイントークン・リセット・共通スタイル
│   └── data/
│       ├── services.ts           # サービスデータ（6件）
│       └── works.ts              # 作品データ（Unsplash画像URL含む）
├── public/
│   └── favicon.svg
├── tests/
│   ├── navigation.spec.ts        # ナビゲーション・スクロールテスト
│   ├── works.spec.ts             # ギャラリー・フィルター・モーダルテスト
│   └── contact.spec.ts           # フォームバリデーションテスト
├── astro.config.mjs
├── netlify.toml
├── playwright.config.ts
└── package.json
```

---

## Task 1: Astroプロジェクトのセットアップ

**Files:**
- Create: `astro.config.mjs`
- Create: `package.json`
- Create: `netlify.toml`
- Create: `playwright.config.ts`

- [ ] **Step 1: Astroプロジェクトを初期化する**

```bash
cd C:/Users/root_/company-hp
npm create astro@latest . -- --template minimal --typescript strict --no-git --install
```

- [ ] **Step 2: Playwrightをインストールする**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 3: `playwright.config.ts` を作成する**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 4: `netlify.toml` を作成する**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 5: 開発サーバーが起動することを確認する**

```bash
npm run dev
```

Expected: `http://localhost:4321` でデフォルトページが表示される

- [ ] **Step 6: コミットする**

```bash
git add astro.config.mjs package.json package-lock.json netlify.toml playwright.config.ts tsconfig.json
git commit -m "feat: initialize Astro project with Playwright"
```

---

## Task 2: グローバルスタイルとデザイントークン

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: `src/styles/global.css` を作成する**

```css
/* Design Tokens */
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-sub: #888888;
  --color-border: #eeeeee;
  --color-accent: #2c4a7c; /* 後日変更可。ここ1行だけ変えれば全体に反映 */

  --font-sans: 'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif;
  --letter-spacing-wide: 0.15em;
  --letter-spacing-wider: 0.25em;

  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  max-width: 100%;
}

/* Utility */
.section-label {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-sub);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.text-link {
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text);
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: opacity var(--transition-base);
}

.text-link:hover {
  opacity: 0.5;
}

/* Fade-in animation (scroll trigger) */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}
```

- [ ] **Step 2: コミットする**

```bash
git add src/styles/global.css
git commit -m "feat: add global styles and design tokens"
```

---

## Task 3: 共通レイアウトとHeader・Footer

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `tests/navigation.spec.ts`

- [ ] **Step 1: ナビゲーションの失敗テストを書く**

```typescript
// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('固定ヘッダーが表示される', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  await expect(header).toBeVisible();
});

test('ロゴ PIXEL WORKS が表示される', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toContainText('PIXEL WORKS');
});

test('ABOUT クリックで /about に遷移する', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL('/about');
});

test('CONTACT クリックで /contact に遷移する', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/contact"]');
  await expect(page).toHaveURL('/contact');
});

test('スクロールするとヘッダーが見える位置に固定されている', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 500));
  const header = page.locator('header');
  const box = await header.boundingBox();
  expect(box?.y).toBe(0); // 固定されているので y=0
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npx playwright test tests/navigation.spec.ts
```

Expected: 全テスト FAIL（ページが存在しない）

- [ ] **Step 3: `src/components/Header.astro` を作成する**

```astro
---
---
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a href="/" class="logo">PIXEL WORKS</a>
    <nav class="nav">
      <a href="/#services" class="nav-link">SERVICES</a>
      <a href="/#works" class="nav-link">WORKS</a>
      <a href="/about" class="nav-link">ABOUT</a>
      <a href="/contact" class="nav-link">CONTACT</a>
    </nav>
  </div>
</header>

<style>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
  height: 64px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-accent);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 40px;
}

.nav-link {
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity var(--transition-base);
}

.nav-link:hover {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .nav {
    gap: 20px;
  }
  .nav-link {
    font-size: 10px;
  }
}
</style>
```

- [ ] **Step 4: `src/components/Footer.astro` を作成する**

```astro
---
---
<footer class="site-footer">
  <div class="container footer-inner">
    <span class="footer-logo">PIXEL WORKS</span>
    <span class="footer-copy">© 2024 Pixel Works. All rights reserved.</span>
  </div>
</footer>

<style>
.site-footer {
  border-top: 1px solid var(--color-border);
  padding: 40px 0;
  margin-top: 120px;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-logo {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-accent);
}

.footer-copy {
  font-size: 11px;
  color: var(--color-text-sub);
  letter-spacing: 0.05em;
}
</style>
```

- [ ] **Step 5: `src/layouts/Layout.astro` を作成する**

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = '建築ビジュアライゼーション・建築CGパース制作・竣工写真撮影 | 札幌' } = Astro.props;
---
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | PIXEL WORKS</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <Header />
    <main style="padding-top: 64px;">
      <slot />
    </main>
    <Footer />
    <script>
      // Scroll fade-in
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 6: `src/pages/index.astro` を最小構成で作成する（後のタスクで追記）**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="建築ビジュアライゼーション・CGパース">
  <p>Under construction</p>
</Layout>
```

- [ ] **Step 7: `src/pages/about.astro` を最小構成で作成する**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="会社概要">
  <div class="container" style="padding-top: 80px;">
    <p class="section-label">About</p>
    <h1>会社概要</h1>
  </div>
</Layout>
```

- [ ] **Step 8: `src/pages/contact.astro` を最小構成で作成する**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="お問い合わせ">
  <div class="container" style="padding-top: 80px;">
    <p class="section-label">Contact</p>
    <h1>お問い合わせ</h1>
  </div>
</Layout>
```

- [ ] **Step 9: テストが通ることを確認する**

```bash
npx playwright test tests/navigation.spec.ts
```

Expected: 全テスト PASS

- [ ] **Step 10: コミットする**

```bash
git add src/
git commit -m "feat: add Layout, Header, Footer components"
```

---

## Task 4: Heroセクション

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: `src/components/Hero.astro` を作成する**

```astro
---
---
<section class="hero" id="hero">
  <div class="hero-bg">
    <!-- サンプル画像（後から差し替え可能） -->
    <img
      src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
      alt="建築ビジュアライゼーション"
      class="hero-image"
    />
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content container">
    <p class="hero-label">ARCHITECTURAL VISUALIZATION — SAPPORO</p>
    <h1 class="hero-title">
      建築とグラフィックを結ぶ<br />
      ビジュアライゼーション
    </h1>
    <div class="hero-links">
      <a href="#works" class="text-link">VIEW WORKS →</a>
      <a href="/contact" class="text-link hero-link-secondary">CONTACT</a>
    </div>
  </div>
</section>

<style>
.hero {
  position: relative;
  height: 100svh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-bottom: 80px;
}

.hero-label {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  margin-bottom: 32px;
}

.hero-links {
  display: flex;
  gap: 40px;
  align-items: center;
}

.hero-links .text-link {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.hero-link-secondary {
  opacity: 0.6;
}
</style>
```

- [ ] **Step 2: `src/pages/index.astro` にHeroを組み込む**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---
<Layout title="建築ビジュアライゼーション・CGパース">
  <Hero />
</Layout>
```

- [ ] **Step 3: ブラウザで確認する**

```bash
npm run dev
```

`http://localhost:4321` を開き、フルスクリーンのヒーロー画像・テキスト・リンクが表示されることを確認する。

- [ ] **Step 4: コミットする**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero section with fullscreen visual"
```

---

## Task 5: Servicesセクション

**Files:**
- Create: `src/data/services.ts`
- Create: `src/components/Services.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: `src/data/services.ts` を作成する**

```typescript
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
```

- [ ] **Step 2: `src/components/Services.astro` を作成する**

```astro
---
import { services } from '../data/services';
---
<section class="services" id="services">
  <div class="container">
    <p class="section-label fade-in">SERVICES</p>
    <div class="services-grid">
      {services.map((service) => (
        <div class="service-item fade-in">
          <span class="service-number">{service.number}</span>
          <h3 class="service-title-ja">{service.titleJa}</h3>
          <p class="service-title-en">{service.titleEn}</p>
          <p class="service-description">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
.services {
  padding: 120px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 48px;
}

.service-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-number {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-sub);
}

.service-title-ja {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}

.service-title-en {
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-sub);
  text-transform: uppercase;
}

.service-description {
  font-size: 13px;
  color: var(--color-text-sub);
  line-height: 1.8;
  margin-top: 8px;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
```

- [ ] **Step 3: `src/pages/index.astro` を更新する**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
---
<Layout title="建築ビジュアライゼーション・CGパース">
  <Hero />
  <Services />
</Layout>
```

- [ ] **Step 4: ブラウザで確認する**

`http://localhost:4321` をスクロールし、6つのサービスが3カラムのグリッドで表示されることを確認する。

- [ ] **Step 5: コミットする**

```bash
git add src/data/services.ts src/components/Services.astro src/pages/index.astro
git commit -m "feat: add Services section"
```

---

## Task 6: Worksギャラリー（ホバーエフェクト＋モーダル）

**Files:**
- Create: `src/data/works.ts`
- Create: `src/components/Works.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/works.spec.ts`

- [ ] **Step 1: Worksの失敗テストを書く**

```typescript
// tests/works.spec.ts
import { test, expect } from '@playwright/test';

test('WORKSセクションが表示される', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  await expect(page.locator('#works')).toBeVisible();
});

test('作品画像が表示される', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  const items = page.locator('.work-item');
  await expect(items.first()).toBeVisible();
});

test('作品をクリックするとモーダルが開く', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  await page.locator('.work-item').first().click();
  await expect(page.locator('#work-modal')).toBeVisible();
});

test('モーダルを閉じるボタンで閉じる', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  await page.locator('.work-item').first().click();
  await expect(page.locator('#work-modal')).toBeVisible();
  await page.locator('.modal-close').click();
  await expect(page.locator('#work-modal')).not.toBeVisible();
});

test('フィルター ALL 以外を選択すると絞り込まれる', async ({ page }) => {
  await page.goto('/');
  await page.locator('#works').scrollIntoViewIfNeeded();
  const allCount = await page.locator('.work-item').count();
  await page.locator('[data-filter="rendering"]').click();
  const filteredCount = await page.locator('.work-item:not(.hidden)').count();
  expect(filteredCount).toBeLessThanOrEqual(allCount);
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npx playwright test tests/works.spec.ts
```

Expected: 全テスト FAIL

- [ ] **Step 3: `src/data/works.ts` を作成する**

```typescript
export interface Work {
  id: string;
  title: string;
  category: 'rendering' | 'movie' | 'vr' | 'photo';
  imageUrl: string;
  description: string;
}

export const works: Work[] = [
  {
    id: 'work-1',
    title: 'Modern Residence Exterior',
    category: 'rendering',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: '住宅外観パース。フォトリアルな仕上がりで竣工後のイメージを鮮明に表現。',
  },
  {
    id: 'work-2',
    title: 'Office Interior Visualization',
    category: 'rendering',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'オフィス内観パース。素材感・光の表現にこだわったビジュアライゼーション。',
  },
  {
    id: 'work-3',
    title: 'Residential Complex',
    category: 'rendering',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    description: '集合住宅の外観CGパース。周辺環境との調和を意識した構図。',
  },
  {
    id: 'work-4',
    title: 'Architectural Flythrough',
    category: 'movie',
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: 'GPUレンダリングによる建築CGアニメーション。空間の流れを動きで表現。',
  },
  {
    id: 'work-5',
    title: 'VR Walkthrough — Showroom',
    category: 'vr',
    imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80',
    description: 'TwinMotionクラウドを使用したインタラクティブな空間体験。',
  },
  {
    id: 'work-6',
    title: 'Completion Photography',
    category: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    description: '竣工写真撮影。建築の魅力を最大限に引き出す光と構図。',
  },
  {
    id: 'work-7',
    title: 'Luxury Apartment Rendering',
    category: 'rendering',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    description: '高級マンションのモデルルームCGパース。質感表現に注力。',
  },
  {
    id: 'work-8',
    title: 'Commercial Building',
    category: 'photo',
    imageUrl: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=800&q=80',
    description: '商業ビルの竣工写真。建築の力強さとデザインを表現。',
  },
];

export const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'rendering', label: 'RENDERING' },
  { id: 'movie', label: 'MOVIE' },
  { id: 'vr', label: 'VR' },
  { id: 'photo', label: 'PHOTO' },
] as const;
```

- [ ] **Step 4: `src/components/Works.astro` を作成する**

```astro
---
import { works, categories } from '../data/works';
---

<section class="works" id="works">
  <div class="container">
    <p class="section-label fade-in">WORKS</p>

    <!-- フィルター -->
    <div class="works-filter fade-in">
      {categories.map((cat) => (
        <button
          class={`filter-btn ${cat.id === 'all' ? 'active' : ''}`}
          data-filter={cat.id}
        >
          {cat.label}
        </button>
      ))}
    </div>

    <!-- グリッド -->
    <div class="works-grid">
      {works.map((work) => (
        <div
          class="work-item fade-in"
          data-category={work.category}
          data-id={work.id}
          data-title={work.title}
          data-description={work.description}
          data-image={work.imageUrl}
          role="button"
          tabindex="0"
        >
          <div class="work-image-wrap">
            <img src={work.imageUrl} alt={work.title} class="work-image" loading="lazy" />
          </div>
          <p class="work-title">{work.title}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<!-- モーダル -->
<div id="work-modal" class="modal" role="dialog" aria-modal="true" style="display:none;">
  <div class="modal-backdrop"></div>
  <div class="modal-inner">
    <button class="modal-close" aria-label="閉じる">✕</button>
    <img id="modal-image" src="" alt="" class="modal-image" />
    <div class="modal-body">
      <h2 id="modal-title" class="modal-title"></h2>
      <p id="modal-description" class="modal-description"></p>
    </div>
  </div>
</div>

<style>
.works {
  padding: 120px 0;
  background: #fafafa;
}

/* Filter */
.works-filter {
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
}

.filter-btn {
  background: none;
  border: none;
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-sub);
  cursor: pointer;
  padding: 0;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: color var(--transition-base), border-color var(--transition-base);
  text-transform: uppercase;
}

.filter-btn.active,
.filter-btn:hover {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

/* Grid */
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

/* Work Item */
.work-item {
  cursor: pointer;
  overflow: hidden;
}

.work-image-wrap {
  overflow: hidden;
  aspect-ratio: 4/3;
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.work-item:hover .work-image {
  transform: scale(1.06);
}

.work-title {
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--color-text-sub);
  margin-top: 10px;
  padding: 0 2px;
}

.work-item.hidden {
  display: none;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
}

.modal-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 90%;
  background: #fff;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
}

.modal-image {
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  display: block;
}

.modal-body {
  padding: 24px 28px;
}

.modal-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.modal-description {
  font-size: 13px;
  color: var(--color-text-sub);
  line-height: 1.8;
}

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
  // フィルター
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const workItems = document.querySelectorAll<HTMLElement>('.work-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter!;

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      workItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // モーダル
  const modal = document.getElementById('work-modal')!;
  const modalImage = document.getElementById('modal-image') as HTMLImageElement;
  const modalTitle = document.getElementById('modal-title')!;
  const modalDescription = document.getElementById('modal-description')!;

  function openModal(item: HTMLElement) {
    modalImage.src = item.dataset.image!;
    modalImage.alt = item.dataset.title!;
    modalTitle.textContent = item.dataset.title!;
    modalDescription.textContent = item.dataset.description!;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  workItems.forEach((item) => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(item);
    });
  });

  document.querySelector('.modal-close')!.addEventListener('click', closeModal);
  document.querySelector('.modal-backdrop')!.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
</script>
```

- [ ] **Step 5: `src/pages/index.astro` を更新する**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Works from '../components/Works.astro';
---
<Layout title="建築ビジュアライゼーション・CGパース">
  <Hero />
  <Services />
  <Works />
</Layout>
```

- [ ] **Step 6: テストが通ることを確認する**

```bash
npx playwright test tests/works.spec.ts
```

Expected: 全テスト PASS

- [ ] **Step 7: コミットする**

```bash
git add src/data/works.ts src/components/Works.astro src/pages/index.astro tests/works.spec.ts
git commit -m "feat: add Works gallery with hover effect, filter, and modal"
```

---

## Task 7: Aboutページ

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: `src/pages/about.astro` を実装する**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="会社概要">
  <div class="about-page">
    <div class="container">

      <!-- ページヘッダー -->
      <div class="page-header fade-in">
        <p class="section-label">ABOUT</p>
        <h1 class="page-title">Pixel Works について</h1>
      </div>

      <!-- コンセプト -->
      <section class="about-section fade-in">
        <p class="about-label">CONCEPT</p>
        <p class="about-lead">
          建築とグラフィックを結び、<br />
          建築プロジェクトに関わるすべての方の<br />
          業務円滑化・イメージ共有を支援する
        </p>
        <p class="about-text">
          Pixel Worksは、札幌を拠点とする建築ビジュアライゼーションスタジオです。
          建築CGパース・CGムービー・VRビジュアライゼーション・竣工写真撮影を通じて、
          設計事務所・ゼネコン・不動産デベロッパーの皆様の業務を支援します。
        </p>
      </section>

      <!-- 区切り線 -->
      <hr class="divider fade-in" />

      <!-- 会社情報 -->
      <section class="about-section fade-in">
        <p class="about-label">COMPANY INFO</p>
        <dl class="info-list">
          <div class="info-row">
            <dt>会社名</dt>
            <dd>Pixel Works（ピクセルワークス）</dd>
          </div>
          <div class="info-row">
            <dt>所在地</dt>
            <dd>北海道札幌市</dd>
          </div>
          <div class="info-row">
            <dt>事業内容</dt>
            <dd>建築ビジュアライゼーション / 建築CGパース制作 / 竣工写真撮影</dd>
          </div>
          <div class="info-row">
            <dt>ウェブサイト</dt>
            <dd>pixel-works.info</dd>
          </div>
        </dl>
      </section>

      <hr class="divider fade-in" />

      <!-- 使用ツール -->
      <section class="about-section fade-in">
        <p class="about-label">TOOLS & SOFTWARE</p>
        <ul class="tools-list">
          <li>3ds Max / V-Ray</li>
          <li>Unreal Engine / TwinMotion</li>
          <li>Adobe Photoshop / Lightroom</li>
          <li>DaVinci Resolve</li>
        </ul>
      </section>

    </div>
  </div>
</Layout>

<style>
.about-page {
  padding: 80px 0 120px;
}

.page-header {
  margin-bottom: 80px;
}

.page-title {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 700;
  margin-top: 16px;
  line-height: 1.3;
}

.about-section {
  padding: 60px 0;
}

.about-label {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-sub);
  text-transform: uppercase;
  margin-bottom: 32px;
}

.about-lead {
  font-size: clamp(18px, 2.5vw, 26px);
  font-weight: 700;
  line-height: 1.6;
  margin-bottom: 24px;
}

.about-text {
  font-size: 14px;
  color: var(--color-text-sub);
  line-height: 1.9;
  max-width: 680px;
}

.divider {
  border: none;
  border-top: 1px solid var(--color-border);
}

/* Info list */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.info-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
}

.info-row dt {
  color: var(--color-text-sub);
  letter-spacing: 0.05em;
}

.info-row dd {
  color: var(--color-text);
}

/* Tools */
.tools-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 48px;
}

.tools-list li {
  font-size: 13px;
  color: var(--color-text);
  padding-left: 16px;
  position: relative;
}

.tools-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-text-sub);
}

@media (max-width: 640px) {
  .info-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .tools-list {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: ブラウザで `/about` を確認する**

`http://localhost:4321/about` を開き、会社概要・コンセプト・使用ツールが表示されることを確認する。

- [ ] **Step 3: コミットする**

```bash
git add src/pages/about.astro
git commit -m "feat: implement About page"
```

---

## Task 8: Contactページ（Netlify Forms）

**Files:**
- Create: `src/components/ContactForm.astro`
- Modify: `src/pages/contact.astro`
- Create: `tests/contact.spec.ts`

- [ ] **Step 1: Contactの失敗テストを書く**

```typescript
// tests/contact.spec.ts
import { test, expect } from '@playwright/test';

test('お問い合わせフォームが表示される', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('form')).toBeVisible();
});

test('必須項目が空のとき送信できない', async ({ page }) => {
  await page.goto('/contact');
  await page.click('button[type="submit"]');
  // HTML5 バリデーションによりページ遷移しない
  await expect(page).toHaveURL('/contact');
});

test('名前・メール・内容を入力するとsubmitボタンが有効になる', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('input[name="name"]', 'テスト 太郎');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'テストメッセージです。');
  const submit = page.locator('button[type="submit"]');
  await expect(submit).toBeEnabled();
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npx playwright test tests/contact.spec.ts
```

Expected: 全テスト FAIL

- [ ] **Step 3: `src/components/ContactForm.astro` を作成する**

```astro
---
---
<!-- Netlify Forms: data-netlify="true" が必須 -->
<form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  class="contact-form"
  action="/contact?success=true"
>
  <!-- Netlify用の隠しフィールド -->
  <input type="hidden" name="form-name" value="contact" />
  <p style="display:none;">
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>

  <div class="form-row">
    <label class="form-label" for="name">
      お名前 <span class="required">*</span>
    </label>
    <input
      id="name"
      type="text"
      name="name"
      required
      class="form-input"
      placeholder="山田 太郎"
    />
  </div>

  <div class="form-row">
    <label class="form-label" for="company">会社名</label>
    <input
      id="company"
      type="text"
      name="company"
      class="form-input"
      placeholder="株式会社〇〇"
    />
  </div>

  <div class="form-row">
    <label class="form-label" for="email">
      メールアドレス <span class="required">*</span>
    </label>
    <input
      id="email"
      type="email"
      name="email"
      required
      class="form-input"
      placeholder="your@email.com"
    />
  </div>

  <div class="form-row">
    <label class="form-label" for="message">
      お問い合わせ内容 <span class="required">*</span>
    </label>
    <textarea
      id="message"
      name="message"
      required
      rows="6"
      class="form-input form-textarea"
      placeholder="ご依頼の内容・ご予算・スケジュール等をお聞かせください。"
    ></textarea>
  </div>

  <div class="form-row">
    <label class="form-label" for="attachment">添付ファイル</label>
    <input
      id="attachment"
      type="file"
      name="attachment"
      class="form-file"
      accept=".pdf,.jpg,.jpeg,.png,.zip"
    />
    <p class="form-hint">PDF / JPG / PNG / ZIP（10MB以内）</p>
  </div>

  <div class="form-submit">
    <button type="submit" class="text-link submit-btn">SEND MESSAGE →</button>
  </div>
</form>

<style>
.contact-form {
  max-width: 640px;
}

.form-row {
  margin-bottom: 40px;
}

.form-label {
  display: block;
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-sub);
  margin-bottom: 10px;
}

.required {
  color: var(--color-accent);
}

.form-input {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-border);
  padding: 10px 0;
  font-size: 14px;
  color: var(--color-text);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--transition-base);
}

.form-input:focus {
  border-bottom-color: var(--color-text);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.7;
}

.form-file {
  font-size: 12px;
  color: var(--color-text-sub);
}

.form-hint {
  font-size: 11px;
  color: var(--color-text-sub);
  margin-top: 6px;
}

.form-submit {
  margin-top: 48px;
}
</style>
```

- [ ] **Step 4: `src/pages/contact.astro` を実装する**

```astro
---
import Layout from '../layouts/Layout.astro';
import ContactForm from '../components/ContactForm.astro';

const success = Astro.url.searchParams.get('success') === 'true';
---
<Layout title="お問い合わせ">
  <div class="contact-page">
    <div class="container">

      <div class="page-header fade-in">
        <p class="section-label">CONTACT</p>
        <h1 class="page-title">お問い合わせ</h1>
        <p class="page-lead">
          建築ビジュアライゼーションに関するご相談・お見積りはお気軽にどうぞ。<br />
          通常2営業日以内にご返信いたします。
        </p>
      </div>

      {success ? (
        <div class="success-message fade-in">
          <p>お問い合わせを受け付けました。ありがとうございます。</p>
          <p>2営業日以内にご連絡いたします。</p>
          <a href="/" class="text-link" style="display:inline-block;margin-top:24px;">BACK TO HOME →</a>
        </div>
      ) : (
        <div class="fade-in">
          <ContactForm />
        </div>
      )}

    </div>
  </div>
</Layout>

<style>
.contact-page {
  padding: 80px 0 120px;
}

.page-header {
  margin-bottom: 64px;
}

.page-title {
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 700;
  margin: 16px 0 20px;
}

.page-lead {
  font-size: 14px;
  color: var(--color-text-sub);
  line-height: 1.9;
}

.success-message {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text);
}
</style>
```

- [ ] **Step 5: テストが通ることを確認する**

```bash
npx playwright test tests/contact.spec.ts
```

Expected: 全テスト PASS

- [ ] **Step 6: コミットする**

```bash
git add src/components/ContactForm.astro src/pages/contact.astro tests/contact.spec.ts
git commit -m "feat: implement Contact page with Netlify Forms"
```

---

## Task 9: 全テスト実行・最終確認・ビルド

**Files:**
- 変更なし（確認のみ）

- [ ] **Step 1: 全テストを実行する**

```bash
npx playwright test
```

Expected: 全テスト PASS（navigation / works / contact）

- [ ] **Step 2: 本番ビルドを実行する**

```bash
npm run build
```

Expected: エラーなしで `dist/` が生成される

- [ ] **Step 3: ビルド結果をプレビューする**

```bash
npm run preview
```

`http://localhost:4321` を開き、各ページ・機能が正常に動作することを確認する：
- トップ：Hero → Services → Works のスクロール
- Works：ホバーエフェクト・フィルター・モーダル
- About：ページ遷移・コンテンツ表示
- Contact：フォーム表示・バリデーション

- [ ] **Step 4: コミットする**

```bash
git add .
git commit -m "chore: verify build and all tests pass"
```

---

## Task 10: Netlifyデプロイ

**Files:**
- 変更なし（Netlify設定のみ）

- [ ] **Step 1: GitHubリポジトリを作成してpushする**

```bash
gh repo create pixel-works-hp --public --source=. --remote=origin --push
```

または GitHub上で新規リポジトリを作成し：

```bash
git remote add origin https://github.com/<username>/pixel-works-hp.git
git push -u origin main
```

- [ ] **Step 2: Netlifyにサイトを作成する**

1. [netlify.com](https://netlify.com) にログイン
2. "Add new site" → "Import an existing project"
3. GitHubと連携し `pixel-works-hp` リポジトリを選択
4. Build command: `npm run build`、Publish directory: `dist` を確認
5. "Deploy site" をクリック

- [ ] **Step 3: Netlify Formsを有効化する**

Netlifyダッシュボードで `Forms` タブを開き、`contact` フォームが検出されていることを確認する。

- [ ] **Step 4: カスタムドメイン（pixel-works.info）を接続する**

1. Netlifyダッシュボード → Domain management → Add custom domain
2. `pixel-works.info` を入力
3. 現在のドメインレジストラのDNS設定でNetlifyのネームサーバーまたはCNAMEを設定する

- [ ] **Step 5: デプロイされたサイトを確認する**

本番URLを開き、全機能が正常に動作することを確認する。
