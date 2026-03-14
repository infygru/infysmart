import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Infysmart | Get a Free CCTV & Security System Quote',
  description: 'Contact Infysmart for CCTV installation, Solar panels, Biometric systems & Automation in Tamil Nadu & Karnataka. Call +91-9445675619 or request a free site visit.',
  alternates: { canonical: 'https://infysmart.com/contact' },
  openGraph: {
    title: 'Contact Infysmart | Get a Free CCTV & Security System Quote',
    description: 'Contact us for CCTV, Solar, Biometric & Automation systems in Tamil Nadu & Karnataka.',
    url: 'https://infysmart.com/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Infysmart' }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
