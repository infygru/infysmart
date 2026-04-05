import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Free Gate & Building Automation Quote | Infysmart',
  description: 'Request a free quote for gate automation, rolling shutter motors, boom barriers, video door phones & building automation systems. Serving Tamil Nadu & Karnataka.',
  keywords: [
    'gate automation quote',
    'boom barrier installation quote',
    'rolling shutter motor price',
    'building automation quote',
    'video door phone installation quote',
    'sliding gate motor price Tamil Nadu',
    'automation system cost estimate',
  ],
  alternates: { canonical: 'https://infysmart.com/get-quote/automation' },
  openGraph: {
    title: 'Get Free Gate & Building Automation Quote | Infysmart',
    description: 'Free quote for gate motors, boom barriers, video door phones & building automation. Tamil Nadu & Karnataka.',
    url: 'https://infysmart.com/get-quote/automation',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Get Free Automation Quote — Infysmart' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Free Automation Quote | Infysmart',
    description: 'Free quote for gate motors, boom barriers & building automation.',
    images: ['/og-image.png'],
  },
};

export default function AutomationQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
