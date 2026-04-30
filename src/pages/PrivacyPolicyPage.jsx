import Header from "../components/Header.jsx";
import { PageShell } from "../components/Ui.jsx";
import { site } from "../data/siteData.js";

const sections = [
  {
    title: "私たちについて",
    body: [
      `当サイト「${site.name}」のサイトURLは ${site.url}/ です。エアコン修理・取付に関する工具選び、商品比較、レビュー要約、関連コンテンツを提供しています。`,
      "運営者表記は「エアコン工具ギア編集部」とします。連絡先は公開リポジトリまたは今後設置する問い合わせ窓口にて案内します。",
    ],
  },
  {
    title: "広告ポリシーとアフィリエイト開示",
    body: [
      "当サイトでは、読者に無料で情報を提供し続けるため、Amazonアソシエイトを含むアフィリエイトリンクを使用します。",
      "リンク経由で商品が購入された場合、運営者が紹介料を受け取ることがあります。掲載順位やおすすめ表記は、価格だけではなく、用途、スペック、信頼性、初心者への扱いやすさ、プロ用途での将来性を総合して判断します。",
      "当サイトはAmazon.co.jpを宣伝しリンクすることにより紹介料を獲得できるAmazonアソシエイト・プログラムの参加者です。",
    ],
  },
  {
    title: "免責事項",
    body: [
      "当サイトに掲載する価格、在庫、仕様、レビュー件数、評価、対応冷媒などの情報は、調査時点の情報をもとにしています。最新情報は必ずAmazon商品ページおよびメーカー公式情報をご確認ください。",
      "工具の購入、施工、点検、冷媒の取り扱い、フロン回収等は、利用者自身の責任で行ってください。法令、資格、登録、メーカー指定手順に従わない作業を推奨するものではありません。",
      "掲載内容に誤りや古い情報がある場合は、GitHubリポジトリ等を通じてご連絡ください。",
    ],
  },
  {
    title: "個人情報の利用目的",
    body: [
      "当サイトでは、問い合わせ対応等のために、名前、メールアドレス、問い合わせ内容などの個人情報をご提供いただく場合があります。",
      "取得した個人情報は、問い合わせへの回答、必要な連絡、サイト改善のために利用し、目的外利用は行いません。",
    ],
  },
  {
    title: "個人情報の第三者提供",
    body: [
      "当サイトは、本人の同意がある場合、法令に基づく場合、または不正行為や安全上の問題に対応するために必要な場合を除き、個人情報を第三者に提供しません。",
    ],
  },
  {
    title: "Cookieとアクセス解析",
    body: [
      "当サイトでは、アクセス解析や広告配信、利便性向上のためにCookieを使用する場合があります。Cookieはブラウザ設定により無効化できます。",
      "Google Analytics等のアクセス解析ツールを導入する場合、トラフィックデータは匿名で収集され、個人を特定するものではありません。",
    ],
  },
  {
    title: "外部リンク・埋め込みコンテンツ",
    body: [
      "当サイトにはAmazon等の外部サイトへのリンクが含まれます。外部サイトでの個人情報の取り扱い、Cookie、購入手続き、価格、在庫、配送、返品等については、各外部サイトの規約をご確認ください。",
    ],
  },
  {
    title: "プライバシーポリシーの変更",
    body: [
      "当サイトは、必要に応じて本ポリシーを変更することがあります。変更後の内容は当ページに掲載した時点で有効になるものとします。",
      "制定日: 2026年4月30日",
    ],
  },
];

export default function PrivacyPolicyPage({ activePage = "privacy", onNavigate }) {
  return (
    <PageShell>
      <Header activePage={activePage} onNavigate={onNavigate} />
      <article className="px-5 py-8 md:py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg border border-metal-300 bg-white p-5 shadow-metal md:p-8">
          <p className="text-sm font-black text-steel">Policy</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-navy md:text-5xl">
            利用規約・プライバシーポリシー
          </h1>
          <p className="mt-4 text-sm font-bold leading-7 text-metal">
            当サイトの広告、アフィリエイト、個人情報、Cookie、免責事項についての基本方針です。
          </p>

          <div className="mt-8 space-y-6">
            {sections.map((section) => (
              <section className="rounded-lg border border-metal-200 bg-paper p-5" key={section.title}>
                <h2 className="text-xl font-black text-navy">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm font-bold leading-7 text-charcoal">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
