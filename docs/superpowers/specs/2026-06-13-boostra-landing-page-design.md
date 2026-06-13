# Boostra Landing Page — Design Spec

**Date:** 2026-06-13
**Repo:** `boostravn.github.io`
**Goal:** Implement marketing landing page for Boostra (Vietnamese herbal tea brand combining Trà Dây Tây Bắc + Hồng Sâm). Static site, deployed to GitHub Pages.

---

## 1. Stack

- **Astro 5** — static site generator, SSG output
- **Tailwind CSS v4** — utility styling with CSS-var theme tokens
- **React 19** — only for the two interactive islands (TeaTimer, ProblemSelector)
- **TypeScript** — strict, used in islands and content data
- **lucide-react** + **lucide-astro** — icon set (consistent stroke icons)
- **Google Fonts: Be Vietnam Pro** — Vietnamese diacritics, weights 400/500/600/700

No backend. No database. No analytics in v1. All copy embedded in a typed data module.

## 2. Repo layout

```
/
├── astro.config.mjs                      # output:'static', integrations: react, tailwind vite
├── package.json
├── tsconfig.json
├── .gitignore                            # node_modules, dist, .astro
├── public/
│   ├── favicon.svg
│   └── images/                           # logo + product art (user drops later)
├── src/
│   ├── content/landing.ts                # all copy + data (single typed export)
│   ├── layouts/Base.astro                # html shell, head, fonts, OG meta
│   ├── pages/index.astro                 # composes section components
│   ├── components/
│   │   ├── TopBanner.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ProductCard.astro
│   │   ├── ProblemSelectorSection.astro  # wraps ProblemSelector island
│   │   ├── BrandPositioning.astro
│   │   ├── Benefits.astro
│   │   ├── BrewingSteps.astro            # left column + wraps TeaTimer island
│   │   ├── Activities.astro
│   │   └── Footer.astro
│   ├── islands/
│   │   ├── ProblemSelector.tsx
│   │   └── TeaTimer.tsx
│   └── styles/global.css                 # @import "tailwindcss"; @theme { ... }
└── .github/workflows/deploy.yml          # replaces existing static.yml
```

`serve/` directory and its `index.html` are deleted. Old `static.yml` workflow is replaced.

## 3. Theme tokens

Defined in `src/styles/global.css` via Tailwind v4 `@theme`:

| Token | Hex | Purpose |
|---|---|---|
| `--color-cream` | `#FAF6E8` | page bg |
| `--color-cream-soft` | `#F5EFD9` | card bg (benefits, activities) |
| `--color-forest` | `#1E3024` | dark green panels, primary text |
| `--color-forest-deep` | `#162018` | deepest green (footer, timer) |
| `--color-moss` | `#2D4A2B` | section eyebrow badge bg |
| `--color-gold` | `#F4D35E` | yellow accent, CTA, sticker |
| `--color-gold-soft` | `#FBE89A` | soft yellow callout boxes |
| `--color-rust` | `#C2410C` | "Hồng Sâm 6 Năm Tuổi" highlight |
| `--color-leaf` | `#7BA05B` | leaf decorations |
| Activity tag green | `#5A7A4E` | tag chip |
| Activity tag orange | `#D97757` | tag chip |
| Activity tag blue | `#7B9DBA` | tag chip |
| Activity tag gold | `#D4A93E` | tag chip |

**Type scale** (Be Vietnam Pro):

| Role | Desktop | Mobile | Weight |
|---|---|---|---|
| H1 hero | 56 / 64 | 36 / 44 | 700 |
| H2 section | 36 / 44 | 28 / 36 | 700 |
| H3 card | 18 / 26 | 18 / 26 | 600 |
| Body | 16 / 26 | 16 / 26 | 400 |
| Eyebrow badge | 13 / uppercase / tracking 0.05em | same | 500 |
| Stats number | 32 | 28 | 700 |

**Spacing rhythm:** section vertical padding `py-20` desktop, `py-12` mobile. Container `max-w-[1200px] mx-auto px-6`.

**Radius:** `rounded-lg` 8px, `rounded-xl` 14px, `rounded-2xl` 20px (product card, timer panel), `rounded-full` for pills.

## 4. Sections (top to bottom)

### 4.1 TopBanner
Full-width forest bar. Centered cream text with bolt emoji. Copy: "⚡ Tặng ngay Bình Thể Thao Cao Cấp khi mua Combo 2 Hộp Boostra hôm nay!"

### 4.2 Header
Sticky on scroll (`position: sticky; top: 0`). Cream bg, thin bottom border.
- Left: logo (SVG placeholder).
- Center: 7 nav links anchoring to section IDs (`#gioi-thieu`, `#thanh-phan`, `#doi-tac`, `#loi-ich`, `#cach-u`, `#cua-hang`, `#hoat-dong`). Hidden < `lg`.
- Right: cart icon button (decorative in v1 — `<button aria-label="Giỏ hàng">`, no-op click) + gold pill "Mua Ngay" → external URL.
- Mobile (< `lg`): hamburger button → slide-down nav drawer.

Section ID mapping:
- `#gioi-thieu` → BrandPositioning
- `#thanh-phan` → Benefits (placeholder; closest existing section)
- `#doi-tac` → Activities (placeholder)
- `#loi-ich` → Benefits
- `#cach-u` → BrewingSteps
- `#cua-hang` → external Mua Ngay link (could open a modal in future; for v1, jumps to Hero CTA)
- `#hoat-dong` → Activities

### 4.3 Hero
Two-column grid (`grid-cols-1 lg:grid-cols-[1.1fr_1fr]`), leaf SVG decorations top-left & bottom-right of the section (hidden < `lg`).

**Left column:**
- Pill badge: "✨ Xu Hướng Tỉnh Táo Lành Mạnh Mới"
- H1 two lines: "Tỉnh Thức Tự Nhiên" / "Bảo Vệ Dạ Dầy" (line 2 in forest color)
- Descriptor paragraph with HTML accents: `<strong>Trà Dây Tây Bắc</strong>` and rust-colored `<span class="text-rust font-semibold">Hồng Sâm 6 Năm Tuổi</span>`
- Button row: forest filled "Mua Thử Ngay" + cream outline "Xem Câu Chuyện"
- Horizontal divider
- Stats row (3 stats): big number + small uppercase label below

**Right column:** `<ProductCard />` — see 4.4.

### 4.4 ProductCard (component)
Dark forest rounded-2xl card with 2px gold border, internal padding 32px.
- Top row: small gold uppercase "PREMIUM HERB BLEND" left + gold pill "20 GÓI LỌC" right
- Center: large logo SVG
- Below logo: gold pill "Trà Dây Hồng Sâm Thượng Hạng"
- Footer line: cream small text "Tỉnh thức tự nhiên • Êm dịu dạ dày"
- Absolute-positioned gold sticker rotated `-8deg` at bottom-right: "💬 Vị ngọt sâm thanh mát, cực ngon!"

### 4.5 ProblemSelectorSection (wraps ProblemSelector island)
Centered layout.
- Eyebrow badge "LỰA CHỌN GIẢI PHÁP" (moss bg, cream text)
- H2 "Bạn Gặp Rắc Rối Gì Khi Cần Giữ Tỉnh Táo?"
- React island `<ProblemSelector client:visible />`:
  - 4-chip grid (cream-soft cards, rounded-xl): forest circle icon bg + label
  - Selected chip: gold ring + bolder bg
  - Below grid: dark forest rounded-xl panel with 2px gold border
    - Default state: "👆 Bấm chọn một vấn đề ở trên để xem giải pháp" + descriptor body
    - Selected state: gold heading (matched solution title) + cream body

### 4.6 BrandPositioning
Two-column (`grid-cols-1 lg:grid-cols-2 gap-12`).

**Left:** dark forest rounded-2xl card, padding 40px.
- Gold uppercase badge "ĐỊNH VỊ THƯƠNG HIỆU"
- H3 cream "BOOSTRA = BOOST + TRÀ"
- Body paragraph cream
- Gold left-border (4px) italic quote block

**Right:** light bg, no card.
- Moss badge "THẤU HIỂU KHÁCH HÀNG"
- H2 forest "Năng Lượng Sạch Cho Nhịp Sống Hiện Đại"
- Body paragraph
- Gold-soft callout box (rounded-xl, padding 16px): "🍵 **Tiện dụng tối đa:** Quy cách đóng hộp 20 gói tiện dụng..."

### 4.7 Benefits
Center-aligned header (badge + H2). Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`. Each card cream-soft, rounded-xl, padding 28px:
- Forest circle icon container (48px, bg `--color-forest`, gold icon)
- H3 title forest
- Body paragraph

4 items with lucide icons: `Brain` (Tập trung bền bỉ), `HeartPulse` (Bảo vệ bao tử êm ái), `Shield` (Ổn định huyết áp), `Coffee` (Hương vị ngọt dịu).

### 4.8 BrewingSteps (wraps TeaTimer island)
Two-column (`grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12`).

**Left:**
- Moss badge "HƯỚNG DẪN PHA CHẾ"
- H2 forest "3 Bước Ủ Trà Nhanh Chóng"
- Numbered list, 3 items:
  - Forest circle (32px, gold number)
  - Bold title + body inline (`<strong>Thả túi lọc:</strong> Đặt 1 túi lọc...`)

**Right:** React island `<TeaTimer client:visible />` — see 4.9.

### 4.9 TeaTimer (React island)
Props: `{ defaultSeconds, labels: { badge, heading, idle, running, done, start, pause, reset } }`.

Layout: dark forest-deep rounded-2xl, gold 2px border, padding 40px, center-aligned.
- Gold uppercase pill badge ("Ủ THỬ TRÀ TRỰC QUAN")
- Cream H3 ("Trình Mô Phỏng Thời Gian Chờ Trà")
- Tea bag SVG, ~80px tall. CSS class `.tea-bag` with `@keyframes bob` (translateY 0 ↔ 6px). Animation paused when `status !== 'running'` or `prefers-reduced-motion: reduce`.
- Big mono digits `MM:SS`, font-size 64px, weight 700, cream
- Status text below digits (small uppercase moss-cream)
- Button row: gold filled (Start / Pause toggle) + cream outline (Reset)

State machine:
- `idle` → click Start → `running`, set interval 1000ms decrementing `secondsLeft`
- `running` → click Pause → `idle` (interval cleared, secondsLeft preserved)
- `running` → secondsLeft hits 0 → `done`, clear interval, optional beep (Web Audio API short sine 880Hz × 200ms; skip if `prefers-reduced-motion`)
- any → click Reset → `idle`, secondsLeft = defaultSeconds (240)

Cleanup interval on unmount (effect return).

### 4.10 Activities
Centered header (badge + H2). Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`. Each card cream-soft, rounded-xl, padding 24px:
- Colored tag chip pill at top (color per index: green/orange/blue/gold)
- H3 title forest
- Body paragraph
- Bottom hairline divider
- Footer row: small label + lucide icon (leaf/utensils/users/sprout)

4 items: Chiến Dịch Sinh Thái, Hội Chợ F&B, Workshop & Talkshow, Hỗ Trợ Sinh Kế Nông Hộ.

### 4.11 Footer
Dark forest-deep bg, cream text. Padding `py-16`.

**Top grid** (`grid-cols-1 md:grid-cols-3 gap-12`):

- **Col 1:** logo (light variant) + tagline paragraph + 3 social icon buttons (Facebook, Instagram, TikTok via lucide).
- **Col 2:** uppercase "KHÁM PHÁ" heading + 6-link list.
- **Col 3:** uppercase "LIÊN HỆ" heading + 4 items (chat, web, phone, email) each with lucide icon prefix.

**Bottom:** hairline divider + copyright line + small disclaimer paragraph centered.

## 5. Data model (`src/content/landing.ts`)

```ts
export const landing = {
  banner: { emoji: string; text: string };
  nav: {
    logo: { src: string; alt: string };
    links: Array<{ label: string; href: string }>;
    cta: { label: string; href: string };
  };
  hero: {
    badge: string;
    title: { line1: string; line2: string };
    bodyHtml: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: Array<{ value: string; label: string }>;
    product: {
      tagTop: string;
      tagRight: string;
      title: string;
      footer: string;
      sticker: string;
    };
  };
  problems: {
    badge: string;
    heading: string;
    items: Array<{
      id: string;
      icon: string;          // lucide name
      label: string;
      solution: { title: string; body: string };
    }>;
    defaultPrompt: { title: string; body: string };
  };
  brand: {
    leftBadge: string;
    leftHeading: string;
    leftBody: string;
    leftQuote: string;
    rightBadge: string;
    rightHeading: string;
    rightBody: string;
    callout: { emoji: string; lead: string; body: string };
  };
  benefits: {
    badge: string;
    heading: string;
    items: Array<{ icon: string; title: string; body: string }>;  // 4
  };
  brewing: {
    badge: string;
    heading: string;
    steps: Array<{ n: number; title: string; body: string }>;     // 3
    timer: {
      badge: string;
      heading: string;
      defaultSeconds: number;
      idleLabel: string;
      runningLabel: string;
      doneLabel: string;
      startLabel: string;
      pauseLabel: string;
      resetLabel: string;
    };
  };
  activities: {
    badge: string;
    heading: string;
    items: Array<{
      tag: { label: string; color: "green" | "orange" | "blue" | "gold" };
      title: string;
      body: string;
      footer: { label: string; icon: string };
    }>;  // 4
  };
  footer: {
    tagline: string;
    socials: Array<{ icon: string; href: string; label: string }>;
    columns: [
      { heading: string; links: Array<{ label: string; href: string }> },
      { heading: string; items: Array<{ icon: string; text: string }> },
    ];
    copyright: string;
    disclaimer: string;
  };
} as const;
```

Vietnamese copy populated verbatim from mockup images. All `href` values for external destinations default to `"#"` placeholders until the user provides real URLs. Logo `src` defaults to `/images/logo.svg` (placeholder SVG shipped in `public/images/`).

## 6. Responsive

| Breakpoint | Behavior |
|---|---|
| `< md` (< 768px) | Single column. Nav → hamburger drawer. All 4-col grids → 1-col. Hero stacks (text then product). Brewing stacks (steps then timer). Footer cols stack. |
| `md` (768–1024) | 4-col grids → 2-col. Hero still single col. Footer 3-col. |
| `lg` (≥ 1024) | Full desktop per mockups. Hero 2-col. Brewing 2-col. Benefits/Activities 4-col. |

Container: `max-w-[1200px] mx-auto px-6`. Hero leaf decorations only `lg` and up. Header sticky always.

## 7. Accessibility

- All interactive elements are `<button>` or `<a>` — never clickable `<div>`
- HTML `lang="vi"` on `<html>`
- Landmarks: `<header>`, `<main>`, `<footer>`. Each section gets `aria-labelledby` pointing at its visible heading.
- ProblemSelector: chips marked `role="tab"` + `aria-selected`; panel `role="tabpanel"` + `aria-live="polite"`
- TeaTimer: digits are visible but `aria-hidden="true"` (avoid screen-reader screaming every second); status text uses `aria-live="polite"`. Beep optional, skipped under `prefers-reduced-motion: reduce`.
- Focus rings: 2px gold outline on dark surfaces, 2px forest outline on light surfaces, offset 2px.
- Color contrast: forest on cream and cream on forest both ≥ AAA.
- `prefers-reduced-motion: reduce` disables tea-bag bob and `scroll-behavior: smooth`.

## 8. SEO / Meta

In `Base.astro`:
- `<title>Boostra — Trà Dây Hồng Sâm Thượng Hạng</title>`
- `<meta name="description" content="…">` (from `landing.ts` `hero.bodyHtml` stripped)
- Open Graph: `og:title`, `og:description`, `og:image` (placeholder `/images/og.png`), `og:url`
- Twitter card: `summary_large_image`
- `<link rel="canonical" href="https://boostravn.github.io/">`
- `favicon.svg` (leaf glyph)

## 9. Build & deploy

### `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://boostravn.github.io',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
```

### `package.json` scripts
- `dev`: `astro dev`
- `build`: `astro build`
- `preview`: `astro preview`

### `.github/workflows/deploy.yml`
Replaces existing `static.yml`. Steps:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` with `node-version: 20`, `cache: npm`
3. `npm ci`
4. `npm run build`
5. `actions/configure-pages@v5`
6. `actions/upload-pages-artifact@v3` with `path: dist`
7. `actions/deploy-pages@v5`

Trigger: push to `main` + `workflow_dispatch`. Permissions and concurrency identical to existing workflow.

### `.gitignore`
`node_modules/`, `dist/`, `.astro/`, `.DS_Store`.

### Cleanup
Delete `serve/index.html` and the `serve/` directory. Delete `.github/workflows/static.yml` (replaced by `deploy.yml`).

## 10. Testing (manual checklist)

1. `npm run build` succeeds with zero warnings
2. `npm run preview` — page loads, fonts arrive, no console errors
3. All 7 nav anchors scroll to expected section
4. ProblemSelector: each chip selectable; panel content updates; keyboard Tab + Enter selects
5. TeaTimer: Start counts down from 4:00; Pause holds; Reset returns to 4:00; reaching 0 transitions to done state
6. Tea-bag SVG bobs only when running; respects `prefers-reduced-motion`
7. Mobile viewport 375px (Chrome devtools): no horizontal scroll, hamburger opens/closes nav, all sections render correctly
8. Tablet viewport 768px: 2-col grids render
9. Lighthouse mobile: performance ≥ 90, accessibility ≥ 95, best-practices ≥ 95
10. Vietnamese diacritics render with no tofu boxes (visual check on all section text)
11. GitHub Actions workflow runs green on push to `main`
12. Deployed site loads at `https://boostravn.github.io/` and matches local preview

## 11. Out of scope (v1)

- Real cart / checkout flow
- CMS or admin interface
- i18n / English version
- Dark mode
- Animations beyond the tea-bag bob and CSS hover transitions
- Analytics, cookie banner, consent UI
- Backend forms or newsletter signup
- Per-product detail pages
- Blog or content collections

## 12. Open items requiring user input post-build

- Final logo SVG (replaces placeholder in `public/images/logo.svg`)
- Final product card art (or keep CSS mockup)
- Real "Mua Ngay" external URL (Shopee/Lazada/Facebook)
- Real social media URLs (Facebook, Instagram, TikTok)
- OG share image
- Final phone/email contact details (mockup uses `1900 68xx` and `lienhe@boostra.vn`)
