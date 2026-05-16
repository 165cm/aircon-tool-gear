import { SITE } from '../consts';

export type ProductCategory =
  | 'aircon-main'
  | 'circulator'
  | 'dehumidifier'
  | 'air-purifier'
  | 'universal-remote'
  | 'filter-care'
  | 'cleaning-spray'
  | 'drain-care'
  | 'outdoor-care';

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  summary: string;
  bestFor: string;
  cautions: string[];
  priceBand: string;
  amazonSearch: string;
  asin?: string;
};

export function getProductImageUrl(asin: string): string {
  return `https://m.media-amazon.com/images/P/${asin}.L.jpg`;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  'aircon-main': 'エアコン本体',
  circulator: 'サーキュレーター',
  dehumidifier: '除湿機',
  'air-purifier': '空気清浄機',
  'universal-remote': '汎用リモコン',
  'filter-care': 'フィルター掃除用品',
  'cleaning-spray': '洗浄スプレー',
  'drain-care': 'ドレン詰まり対策',
  'outdoor-care': '室外機まわり',
};

export const PRODUCTS: Product[] = [
  {
    slug: 'panasonic-eolia-eb-6',
    name: 'パナソニック エオリア EB シリーズ 6畳用',
    brand: 'パナソニック',
    category: 'aircon-main',
    summary:
      'ナノイーX 搭載で内部清浄・空気質コントロールが扱いやすい家庭向け定番モデル。寝室・子供部屋の入門候補。',
    bestFor: '木造6畳〜鉄筋10畳の寝室・子供部屋',
    cautions: [
      '取り付けは家電量販店または電気工事士が必要',
      '設置スペース・室外機の置き場所を購入前に確認',
    ],
    priceBand: '7〜10万円台',
    amazonSearch: 'パナソニック エオリア EB 6畳',
  },
  {
    slug: 'daikin-cx-10',
    name: 'ダイキン CX シリーズ 10畳用',
    brand: 'ダイキン',
    category: 'aircon-main',
    summary:
      'ストリーマ内部クリーン搭載のリビング向けスタンダード機。除湿性能と暖房立ち上がりに定評。',
    bestFor: '木造10畳〜鉄筋14畳のリビング',
    cautions: [
      'リビング設置は配管長と電源容量を要確認',
      '高断熱住宅では能力を1サイズ落とせる場合あり',
    ],
    priceBand: '10〜15万円台',
    amazonSearch: 'ダイキン CX 10畳',
  },
  {
    slug: 'mitsubishi-kirigamine-zw-14',
    name: '三菱電機 霧ヶ峰 Zシリーズ 14畳用',
    brand: '三菱電機',
    category: 'aircon-main',
    summary:
      'ムーブアイ mirA.I.+ でセンシング精度に強み。LDK 向けハイグレードで電気代と快適性の両立を狙うモデル。',
    bestFor: '14畳前後の LDK・主寝室',
    cautions: [
      '本体サイズが大きいため、設置壁面の幅を要確認',
      'コンセント形状（200V）の確認が必須',
    ],
    priceBand: '20〜30万円台',
    amazonSearch: '三菱電機 霧ヶ峰 Z 14畳',
  },
  {
    slug: 'iris-circulator-pcf-sc15t',
    name: 'アイリスオーヤマ サーキュレーター 上下左右首振り',
    brand: 'アイリスオーヤマ',
    category: 'circulator',
    summary:
      '冷暖房の空気を部屋全体に循環させる定番サーキュレーター。設定温度を上げ下げせずに体感温度を均一化したい時の補助。',
    bestFor: '6〜18畳の部屋で、エアコンの効きムラを減らしたい',
    cautions: [
      '直射日光が当たる場所には置かない',
      '小さな子どもがいる家庭ではガード付きを選ぶ',
    ],
    priceBand: '5,000〜8,000円台',
    amazonSearch: 'アイリスオーヤマ サーキュレーター PCF-SC15T',
    asin: 'B0CTTFRQ3V',
  },
  {
    slug: 'corona-dehumidifier-cd-h1023',
    name: 'コロナ 衣類乾燥除湿機 CDシリーズ',
    brand: 'コロナ',
    category: 'dehumidifier',
    summary:
      'コンプレッサー式で電気代が抑えられ、梅雨〜夏の部屋干しや結露対策に向く家庭向け除湿機。',
    bestFor: '木造11畳〜鉄筋23畳の部屋干し・除湿',
    cautions: [
      'タンク容量を超えると自動停止するため、長時間運転時はホース連続排水も検討',
      '冬季の低温時はデシカント式の方が向く場合あり',
    ],
    priceBand: '3〜5万円台',
    amazonSearch: 'コロナ 衣類乾燥除湿機 CD-H',
  },
  {
    slug: 'elpa-rc-ac38',
    name: 'ELPA エアコンリモコン RC-AC38（汎用）',
    brand: 'ELPA',
    category: 'universal-remote',
    summary:
      '国内主要メーカーに対応した汎用エアコンリモコン。純正リモコンの故障・紛失時の応急対応に。',
    bestFor: '純正リモコンが効かなくなった時の代替',
    cautions: [
      '対応メーカー・設定方式を購入前にパッケージで確認',
      '冷房・暖房・除湿の基本機能のみ。お掃除運転などメーカー固有機能は使えない',
    ],
    priceBand: '1,500〜3,000円台',
    amazonSearch: 'ELPA エアコンリモコン RC-AC38',
  },
  {
    slug: 'universal-remote-k1028e',
    name: 'エアコンリモコン 汎用 K-1028E',
    brand: '汎用',
    category: 'universal-remote',
    summary:
      '1,000円前後で手に入る汎用エアコンリモコン。仮復旧用・予備として 1 台持っておくと安心。',
    bestFor: 'リモコン故障の応急対応・予備',
    cautions: [
      '型番ごとの対応メーカー設定が必要',
      '長期使用は ELPA 等の正規ブランド品を推奨',
    ],
    priceBand: '1,000〜2,000円台',
    amazonSearch: 'エアコンリモコン 汎用 K-1028E',
    asin: 'B0CT8Z2B7F',
  },
  {
    slug: 'aircon-filter-cleaning-brush',
    name: 'エアコン フィルター掃除ブラシ',
    brand: '汎用',
    category: 'filter-care',
    summary:
      'フィルターの目に詰まったホコリをかき出すための専用ブラシ。月1回のフィルター掃除に。',
    bestFor: '2週間〜1か月に1回のフィルター掃除',
    cautions: [
      '強くこするとフィルター樹脂を傷める',
      '電装部・熱交換器のフィンはブラシで触らない',
    ],
    priceBand: '500〜2,000円台',
    amazonSearch: 'エアコン フィルター 掃除 ブラシ',
  },
  {
    slug: 'rakuhapi-aircon-spray-nextplus',
    name: 'らくハピ エアコン洗浄スプレー Nextplus',
    brand: 'アース製薬',
    category: 'cleaning-spray',
    summary:
      'フィン部の見える範囲を泡で洗浄するエアコンスプレー。フィルター掃除後も臭いや効きが回復しない時の候補。',
    bestFor: 'フィルター掃除後のフィン部清掃（家庭の範囲）',
    cautions: [
      '電装部・送風ファンには絶対に噴射しない',
      '養生カバーで水はね対策を必ず行う',
      '完全洗浄ではない。臭い・カビが取れない場合は分解洗浄業者へ',
    ],
    priceBand: '800〜1,500円',
    amazonSearch: 'らくハピ エアコン洗浄スプレー Nextplus',
    asin: 'B084RV3S23',
  },
  {
    slug: 'aircon-cleaning-cover',
    name: 'エアコン掃除用 養生カバー',
    brand: '汎用',
    category: 'cleaning-spray',
    summary:
      '洗浄スプレー・拭き掃除の際に、室内機まわりへの水はね・洗剤垂れを防ぐカバー。家庭掃除の必需品。',
    bestFor: '家庭でのエアコン掃除すべて',
    cautions: [
      'サイズが室内機より大きいものを選ぶ',
      '使い捨てタイプと再利用タイプがあるため、頻度で選ぶ',
    ],
    priceBand: '1,500〜3,000円台',
    amazonSearch: 'エアコン 掃除 養生カバー',
  },
  {
    slug: 'drain-suction-pump',
    name: 'ドレンホース用サクションポンプ',
    brand: '汎用',
    category: 'drain-care',
    summary:
      '室外側ドレンホースから水・汚れを吸引する手押しポンプ。エアコン水漏れで最初に疑うドレン詰まりに。',
    bestFor: '室内機から水漏れ・ポコポコ音が出ているときの最初の確認',
    cautions: [
      '室内機側の分解は不要。室外側ホースの出口で使う',
      '吸い込んだ汚水は屋外で処理する',
    ],
    priceBand: '1,500〜3,500円台',
    amazonSearch: 'エアコン ドレンホース クリーナー サクションポンプ',
  },
  {
    slug: 'drain-insect-cap',
    name: 'ドレンホース防虫キャップ',
    brand: '汎用',
    category: 'drain-care',
    summary:
      'ドレンホースの出口に取り付けて、虫やゴミの侵入を防ぐキャップ。再詰まり予防の定番。',
    bestFor: 'ドレン詰まり解消後の再発防止',
    cautions: [
      'ホース径に合ったサイズを選ぶ',
      '網が目詰まりするため、年1回点検する',
    ],
    priceBand: '500〜1,500円台',
    amazonSearch: 'エアコン ドレンホース 防虫キャップ',
  },
  {
    slug: 'tokyo-bouon-pad',
    name: '東京防音 防振ゴム ニューしずか',
    brand: '東京防音',
    category: 'outdoor-care',
    summary:
      '室外機の脚に挟む防振ゴム。架台や床への振動伝搬を抑え、ベランダ設置時の振動音対策の定番。',
    bestFor: 'ベランダ・木造2階に室外機を置いている場合の振動音対策',
    cautions: [
      '室外機の重量・脚の数に合ったサイズを選ぶ',
      '転倒防止のため平らな場所に設置する',
    ],
    priceBand: '1,500〜3,000円台',
    amazonSearch: '東京防音 防振ゴム ニューしずか',
    asin: 'B08CCNSSS4',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function getProductsByCategories(categories: readonly ProductCategory[]): Product[] {
  return PRODUCTS.filter((product) => categories.includes(product.category));
}

export function buildAmazonSearchUrl(keyword: string): string {
  const url = new URL('https://www.amazon.co.jp/s');
  url.searchParams.set('k', keyword);
  url.searchParams.set('tag', SITE.amazonTag);
  return url.toString();
}
