import { MetadataRoute } from 'next';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

const BASE_URL = 'https://infysmart.com';

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  // Core service pages
  {
    url: `${BASE_URL}/cctv`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.95,
  },
  {
    url: `${BASE_URL}/solar`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/automation`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/amc`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  {
    url: `${BASE_URL}/services/video-door-phones`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services/biometric-systems`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  // City-specific CCTV landing pages (high local SEO value)
  {
    url: `${BASE_URL}/cctv-installation-chennai`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.92,
  },
  {
    url: `${BASE_URL}/cctv-installation-hosur`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.92,
  },
  {
    url: `${BASE_URL}/cctv-installation-coimbatore`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/cctv-installation-bangalore`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/cctv-installation-dharmapuri`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  // Dynamic location CCTV pages
  ...([
    'chennai', 'hosur-krishnagiri', 'coimbatore', 'dharmapuri', 'karaikudi',
    'puducherry', 'cuddalore', 'madurai', 'salem', 'trichy', 'vellore',
    'ambattur-industrial-estate', 'guindy-industrial-estate', 'sriperumbudur-oragadam',
    'sipcot-irungattukottai', 'sipcot-siruseri', 'kanchipuram-vallam',
    'karnataka', 'bangalore', 'hosapete-tumkur',
  ].map((slug) => ({
    url: `${BASE_URL}/cctv-installation/${slug}`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly' as const,
    priority: 0.88,
  }))),
  // High-value informational pages
  {
    url: `${BASE_URL}/cctv-camera-price`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.88,
  },
  // E-commerce
  {
    url: `${BASE_URL}/shop`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'daily',
    priority: 0.85,
  },
  // Quote request pages
  {
    url: `${BASE_URL}/get-quote/cctv`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/get-quote/solar`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  {
    url: `${BASE_URL}/get-quote/automation`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  // Blog
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'daily',
    priority: 0.7,
  },
  // Legal
  {
    url: `${BASE_URL}/privacy`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/cookie-policy`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/refund-policy`,
    lastModified: new Date('2026-03-31'),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = [];
  let productPages: MetadataRoute.Sitemap = [];

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

  try {
    const products = await directus.request(
      readItems('products', {
        fields: ['slug', 'date_updated', 'date_created'],
        filter: { status: { _eq: 'published' } },
        sort: ['-date_created'],
        limit: 500,
      } as never)
    );

    productPages = (products as Array<{ slug: string; date_updated: string; date_created: string }>).map((product) => ({
      url: `${BASE_URL}/shop/${product.slug}`,
      lastModified: product.date_updated ? new Date(product.date_updated) : new Date(product.date_created),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));
  } catch {
    // CMS unavailable — product pages omitted from sitemap
  }

  return [...staticPages, ...blogPages, ...productPages];
}
