import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const POST_CATEGORIES = ['symptoms', 'by-size', 'energy-saving', 'cleaning'] as const;

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(POST_CATEGORIES),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keyword: z.string().optional(),
    products: z.array(z.string()).default([]),
    requiresPro: z.boolean().default(false),
  }),
});

export const collections = { posts };

export const CATEGORY_LABEL: Record<(typeof POST_CATEGORIES)[number], string> = {
  symptoms: '症状から探す',
  'by-size': '畳数で選ぶ',
  'energy-saving': '電気代を抑える',
  cleaning: 'カビ・臭い対策',
};

export const CATEGORY_DESCRIPTION: Record<(typeof POST_CATEGORIES)[number], string> = {
  symptoms: '冷えない、水漏れ、ポコポコ音、リモコン不調。自分で確認できる範囲を、安全な順に整理しました。',
  'by-size': '6畳・8畳・10畳・14畳…部屋に合うエアコン本体の選び方と、買い替え時期の見極め方。',
  'energy-saving': '設定温度、サーキュレーター、フィルター掃除、断熱。月数百〜数千円の差が出る運用を整理。',
  cleaning: 'カビが増えない使い方、自分でできる掃除の範囲、業者を呼ぶ目安。臭いと結露の対策。',
};
