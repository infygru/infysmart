import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Free Solar Panel Installation Quote | Infysmart',
  description: 'Request a free solar installation quote for your home, factory, or farm. On-grid, off-grid, hybrid systems. Subsidy guidance included. Serving Tamil Nadu & Karnataka.',
  keywords: [
    'solar panel installation quote',
    'free solar quote India',
    'solar installation cost estimate',
    'solar panel price Tamil Nadu',
    'rooftop solar quote',
    'solar 4G CCTV quote',
    'solar subsidy application',
  ],
  alternates: { canonical: 'https://infysmart.com/get-quote/solar' },
  openGraph: {
    title: 'Get Free Solar Panel Installation Quote | Infysmart',
    description: 'Free solar installation quote. On-grid, off-grid & hybrid systems. Subsidy guidance. Tamil Nadu & Karnataka.',
    url: 'https://infysmart.com/get-quote/solar',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Get Free Solar Quote — Infysmart' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Free Solar Installation Quote | Infysmart',
    description: 'Free solar quote. On-grid, off-grid & hybrid. Subsidy guidance included.',
    images: ['/og-image.png'],
  },
};

export default function SolarQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
