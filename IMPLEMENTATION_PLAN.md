# エアコン工具ギア Webサイト実装計画

## 目的
生成済みUIモックを基準に、エアコン修理工具に特化した日本向けアフィリエイトサイトを React + Tailwind CSS で実装する。トップLPと、初期構築すべき主要ページの導線を含める。

## 参照画像
- LP精密参照: `/Users/somenotsuyoshi/.codex/generated_images/019ddc9e-a44c-72d2-b57a-808f4d30e5a7/ig_0e748149abf766ae0169f2da97b09c8191aec137f292c0afc6.png`
- 5ページ設計参照: `/Users/somenotsuyoshi/.codex/generated_images/019ddc9e-a44c-72d2-b57a-808f4d30e5a7/ig_0e748149abf766ae0169f2dc8b667c8191b1e5bf7db19625ab.png`

## 実装方針
- React + Tailwind CSS + Vite の静的SPAとして構築する。
- ユーザー指定の「Tailscale.css」は文脈上 Tailwind CSS と解釈する。
- 生成済みモックの配色、余白、角丸、カード構成、CTA、ランキング、比較表、硬派な工具カタログ感を再現する。
- 主要ページはSPA内の状態切り替えで表示する。
- 使用ページ:
  - トップLP
  - 初心者セット
  - カテゴリ別工具
  - 商品レビュー
  - 比較表
- 画像素材は image-gen の生成画像を `src/assets/generated/` に保存して使用する。
- アイコンは透明背景のSVGとして実装し、lucide風の線画に寄せる。
- アニメーションは表示品質を壊さない範囲で、ヒーロー、カード、比較表、CTAに付与する。

## 品質基準
- 1440px前後のデスクトップ表示でLP参照画像に近い構成・比率・配色になること。
- 日本語テキストがボタン・カード・表内で溢れないこと。
- レスポンシブ時にナビ、カード、比較表が破綻しないこと。
- 実在ブランド名やロゴを使わないこと。
- 画像が参照モックの工具写真らしい質感を持つこと。
- Browser UseでトップLPと各ページのスクリーンショットを確認すること。

## TODO
1. プロジェクト土台作成
   - `package.json`, Vite, React, Tailwind CSS, PostCSS 設定を作成する。
   - `src/`, `public/`, `src/assets/generated/` を用意する。
2. 画像素材生成
   - ヒーロー工具写真
   - 初心者セット写真
   - 中級者工具写真
   - プロ装備写真
   - 必須工具TOP5用商品写真
   - 下部CTA用横長工具写真
3. デザイントークン実装
   - 色、影、角丸、罫線、背景、タイポグラフィをTailwind拡張・CSS変数で定義する。
4. 共通UI実装
   - Header
   - CTA button
   - Trust strip
   - Tool card
   - Ranking card
   - Spec chip
   - Comparison table
   - SVG icon set
5. トップLP実装
   - ヒーロー
   - レベル別カード
   - 必須工具TOP5
   - 比較ポイント表
   - 下部CTA
6. 追加4ページ実装
   - 初心者セット
   - カテゴリ別工具
   - 商品レビュー
   - 比較表
7. アニメーション実装
   - 初期表示のフェード/スライド
   - カードホバー
   - CTAの微細な光沢/押下感
   - 表の推奨行ハイライト
8. Browser Use確認と修正
   - トップLPのスクリーンショット確認
   - 各ページの崩れ確認
   - 画面幅を変えた確認
9. 最終検証
   - `npm run build`
   - 起動URL共有

## worker分担
- Worker A: プロジェクト土台とTailwind設定
- Worker B: 共通UI/デザイントークン
- Worker C: トップLP実装
- Worker D: 追加4ページとページ切り替え
- Worker E: アニメーションとレスポンシブ調整

