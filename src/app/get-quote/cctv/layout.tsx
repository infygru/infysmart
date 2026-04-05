import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Free CCTV Installation Quote | Infysmart',
  description: 'Request a free, no-obligation CCTV installation quote. Tell us your property type, camera count, and city — our team responds within 2 hours. Serving Chennai, Hosur, Coimbatore, Bangalore & across Tamil Nadu.',
  keywords: [
    'CCTV installation quote',
    'free CCTV quote',
    'CCTV price estimate',
    'CCTV camera installation cost',
    'CCTV installation Chennai quote',
    'CCTV installation Hosur quote',
    'get CCTV quote online',
  ],
  alternates: { canonical: 'https://infysmart.com/get-quote/cctv' },
  openGraph: {
    title: 'Get Free CCTV Installation Quote | Infysmart',
    description: 'Free, no-obligation CCTV installation quote. Response within 2 hours. Serving Tamil Nadu & Karnataka.',
    url: 'https://infysmart.com/get-quote/cctv',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Get Free CCTV Quote — Infysmart' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Free CCTV Installation Quote | Infysmart',
    description: 'Free quote in 2 hours. CCTV installation across Tamil Nadu & Karnataka.',
    images: ['/og-image.png'],
  },
};

export default function CCTVQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
