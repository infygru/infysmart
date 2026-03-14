'use client';

import { Phone } from 'lucide-react';

export default function MobileStickyButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50 md:hidden">
      <a
        href="tel:+919445675619"
        aria-label="Call Infysmart"
        className="flex items-center gap-2 text-white px-5 py-3 rounded-full shadow-lg shadow-green-600/40 font-bold bg-[#25D366] hover:bg-green-500 transition-all active:scale-95"
      >
        <Phone className="h-4 w-4 fill-current shrink-0" />
        <span className="text-sm">Call Now</span>
      </a>
    </div>
  );
}
