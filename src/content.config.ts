import { defineCollection, z } from 'astro:content';

const discography = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    releaseDate: z.string(),
    label: z.string(),
    type: z.enum(['solo', 'group', 'compilation', 'btnth', 'collab']),
    coverImage: z.string().optional(),
    description: z.string(),
    quote: z.string().optional(),
    quoteSong: z.string().optional(),
    buyLink: z.string().optional(),
    buyLinkType: z.enum(['official', 'amazon', 'discogs', 'ebay']).optional(),
    featured: z.boolean().optional().default(false),
    chartPeak: z.string().optional(),
    certification: z.string().optional(),
    tracks: z.array(z.object({
      number: z.number(),
      title: z.string(),
      spotifyId: z.string().optional(),
      disc: z.number().optional(),
      discTitle: z.string().optional(),
      producer: z.string().optional(),
      featuring: z.string().optional(),
    })).optional().default([]),
  }),
});

export const collections = { discography };
