import { MetadataRoute } from 'next';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

const BASE_URL = 'https://infysmart.com';

// Use today's date for all static pages so Google sees them as freshly validated
const SITE_UPDATED = new Date();

const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  // Core service pages
  {
    url: `${BASE_URL}/cctv`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.95,
  },
  {
    url: `${BASE_URL}/solar`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/automation`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/amc`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  {
    url: `${BASE_URL}/services/video-door-phones`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services/biometric-systems`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  // City-specific CCTV landing pages (high local SEO value)
  {
    url: `${BASE_URL}/cctv-installation-chennai`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.92,
  },
  {
    url: `${BASE_URL}/cctv-installation-hosur`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.92,
  },
  {
    url: `${BASE_URL}/cctv-installation-coimbatore`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/cctv-installation-bangalore`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/cctv-installation-dharmapuri`,
    lastModified: SITE_UPDATED,
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
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.88,
  }))),
  // High-value informational pages
  {
    url: `${BASE_URL}/cctv-camera-price`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.88,
  },
  // E-commerce
  {
    url: `${BASE_URL}/shop`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'daily',
    priority: 0.85,
  },
  // Quote request pages
  {
    url: `${BASE_URL}/get-quote/cctv`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/get-quote/solar`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  {
    url: `${BASE_URL}/get-quote/automation`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  // Blog
  {
    url: `${BASE_URL}/blog`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'daily',
    priority: 0.7,
  },
  // Legal
  {
    url: `${BASE_URL}/privacy`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/cookie-policy`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/refund-policy`,
    lastModified: SITE_UPDATED,
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
