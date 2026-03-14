'use client';

import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-brand-blue text-white text-center py-2 px-4 text-xs sm:text-sm font-medium z-50 relative">
      🔒 Government-Approved CCTV &amp; Security Vendor in Tamil Nadu &nbsp;·&nbsp;
      <Link href="/contact" className="underline underline-offset-2 font-bold hover:text-yellow-300 transition-colors">
        Book a Free Site Survey →
      </Link>
    </div>
  );
}
