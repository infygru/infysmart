import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart | Infysmart',
  description: 'Review your selected CCTV cameras, NVR, DVR and security equipment before checkout.',
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
