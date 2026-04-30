# Developer Guide

このドキュメントは、エアコン工具ギアを開発・更新・公開運用するための開発者向けメモです。

一般向けのサイト概要は [README.md](./README.md) を参照してください。

## 技術スタック

- React 19
- Vite 6
- Tailwind CSS
- GitHub Pages
- GitHub Actions

公開URL:

```text
https://165cm.github.io/aircon-tool-gear/
```

Viteの公開ベースパス:

```text
/aircon-tool-gear/
```

## セットアップ

```bash
npm ci
npm run dev
```

ローカルで確認する場合:

```text
http://127.0.0.1:5173/aircon-tool-gear/
```

別ポートで起動する場合:

```bash
npm run dev -- --host 127.0.0.1 --port 5176
```

## 主要コマンド

```bash
npm run dev
npm run build
npm run preview
npm run content:generate
```

`npm run build` は、Viteのビルド後に `scripts/build-static.mjs` を実行します。

生成される主なファイル:

- `dist/index.html`
- `dist/sitemap.xml`
- `dist/robots.txt`
- `dist/rss.xml`
- 各ルートの `index.html`

## ディレクトリ構成

```text
src/
  components/        UIコンポーネント
  data/              商品データ、サイトデータ、予約記事データ
  pages/             各ページ
  utils/             ルーティング、SEO
  assets/generated/  生成画像、WebP化済み画像
content/scheduled/   予約記事Markdown
scripts/             静的HTML生成、記事生成
.github/workflows/   GitHub Pagesデプロイ
```

## 商品データ

商品ラインナップは主に以下で管理します。

```text
src/data/productCatalog.js
```

各商品は、ブランド、型番、価格帯、Amazon URL、スペック、レビュー要約、向いている人、代替候補、注意点などを持ちます。

Amazonアソシエイトタグは、コードに直書きする運用ではなく、原則として環境変数またはGitHub Actions Variablesで差し替えます。

```text
VITE_AMAZON_TAG
```

現在のフォールバック値:

```text
notestimatobe-22
```

## SEO実装

SEO関連は主に以下で管理します。

```text
src/utils/seo.js
scripts/build-static.mjs
```

実装済みの主な要素:

- ページ別 `title`
- ページ別 `description`
- canonical
- OGP
- `Product`
- `ItemList`
- `Article`
- `BreadcrumbList`
- `FAQPage`
- `HowTo`
- `Review`
- `Organization`
- 静的HTML内の `noscript` SEOコンテンツ
- `sitemap.xml`
- `robots.txt`
- `rss.xml`

Search Console確認タグは `index.html` の `<head>` に設定しています。

```html
<meta name="google-site-verification" content="KCrmsH6TCxCRmvOY8y0czMvPyZ2keG1Lh93qY_TS8lo" />
```

## 予約記事

予約記事は以下の2か所で管理します。

```text
content/scheduled/*.md
src/data/scheduledPosts.js
```

公開判定は `publishDate <= BUILD_DATE` です。

ローカルやGitHub Actionsで `BUILD_DATE` を指定しない場合は、ビルド当日の日付が使われます。

例:

```bash
BUILD_DATE=2026-05-25 npm run build
```

予約記事のデータ生成をまとめて行う場合:

```bash
npm run content:generate
```

## GitHub Pagesデプロイ

デプロイは以下で管理します。

```text
.github/workflows/deploy.yml
```

トリガー:

- `main` へのpush
- 手動実行
- cron実行: 月・水・金 00:00 UTC

日本時間では午前9時相当です。

GitHub Pagesで公開するには、リポジトリ設定で Pages の source を GitHub Actions にします。

## Search Console運用

推奨プロパティ:

```text
https://165cm.github.io/aircon-tool-gear/
```

サイトマップ:

```text
https://165cm.github.io/aircon-tool-gear/sitemap.xml
```

複数のGitHub Pagesプロジェクトを運用する場合は、将来的に `https://165cm.github.io/` をハブサイトにして、配下プロジェクトへの導線をまとめると管理しやすくなります。

## 画像最適化

ローカル生成画像は `src/assets/generated/` に配置しています。

アプリではWebP画像を参照しています。PNGは元画像として残しています。

WebP化対象例:

- `hero-tools.webp`
- `cta-tools.webp`
- `beginner-kit.webp`
- `intermediate-tools.webp`
- `pro-equipment.webp`
- `product-sheet.webp`

## 公開前チェック

```bash
npm run build
```

確認ポイント:

- ビルドが成功する
- `dist/sitemap.xml` が生成される
- `dist/robots.txt` が生成される
- `dist/rss.xml` が生成される
- canonicalが `https://165cm.github.io/aircon-tool-gear/...` になっている
- 商品リンクにAmazonタグが付く
- アフィリエイトリンクに `rel="sponsored nofollow noopener"` が付く
- 主要ページの表示が崩れていない

## 関連ドキュメント

- 一般向け: [README.md](./README.md)
- 開発者向け: [Developer.md](./Developer.md)
