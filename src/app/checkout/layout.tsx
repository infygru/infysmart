import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Infysmart',
  description: 'Complete your purchase securely on Infysmart.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
