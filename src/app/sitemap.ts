import { MetadataRoute } from 'next';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

const BASE_URL = 'https://infysmart.com';

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/cctv`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/solar`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/automation`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/amc`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services/video-door-phones`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services/biometric-systems`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'daily',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/privacy`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/cookie-policy`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/refund-policy`,
    lastModified: new Date('2026-03-15'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const blogs = await directus.request(
      readItems('blogs', {
        fields: ['slug', 'date_published'],
        sort: ['-date_published'],
        limit: 200,
      })
    );

    blogPages = (blogs as Array<{ slug: string; date_published: string }>).map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.date_published ? new Date(blog.date_published) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // CMS unavailable — blog pages omitted from sitemap
  }

  return [...staticPages, ...blogPages];
}
