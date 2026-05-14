export const SITE = {
  name: 'エアコン助かるラボ',
  shortName: 'エアコン助かるラボ',
  description:
    'エアコンが冷えない、水漏れ、臭い、リモコン不調…研修中のエアコン修理エンジニアが、家庭で安全にできる範囲と業者依頼の境界を整理します。',
  url: 'https://165cm.github.io',
  base: '/aircon-tool-gear',
  locale: 'ja',
  gtmId: 'GTM-52H347R8',
  ga4Id: 'G-WVJ8ZDR3HC',
  amazonTag: 'notestimatobe-22',
} as const;

export const NAV_ITEMS = [
  { label: '症状から探す', href: '/symptoms/' },
  { label: '畳数で選ぶ', href: '/by-size/' },
  { label: '電気代を抑える', href: '/energy-saving/' },
  { label: 'カビ・臭い対策', href: '/cleaning/' },
  { label: 'プロフィール', href: '/about/' },
] as const;
