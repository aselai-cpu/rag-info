import { z, defineCollection } from 'astro:content';

const SectionEnum = z.enum([
  'foundation',
  'retrieval-strategies',
  'graph-rag',
  'synthesis',
]);

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(10).max(200),
    section: SectionEnum,
    order: z.number().int().positive(),
    prerequisites: z.array(z.string()).optional().default([]),
    relatedPages: z.array(z.string()).optional().default([]),
    prev: z.string().optional(),
    next: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { pages };
