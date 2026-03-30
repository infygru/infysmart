'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import type { NotificationBar } from '@/lib/directus';

const BG: Record<string, string> = {
  orange: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
  blue:   'bg-brand-blue text-white',
  green:  'bg-emerald-600 text-white',
  red:    'bg-red-600 text-white',
  dark:   'bg-gray-900 text-white',
};

export default function AnnouncementBar({ bar }: { bar: NotificationBar | null }) {
  const [dismissed, setDismissed] = useState(false);

  if (!bar?.enabled || !bar.message || dismissed) return null;

  const colorCls = BG[bar.bg_color] ?? BG.orange;

  return (
    <div className={`relative w-full py-2 px-4 text-center text-xs sm:text-sm font-medium z-50 ${colorCls}`}>
      <span>{bar.message}</span>
      {bar.cta_label && bar.cta_url && (
        <Link
          href={bar.cta_url}
          className="inline-flex items-center gap-1 ml-2 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          {bar.cta_label} <ArrowRight className="w-3 h-3" />
        </Link>
      )}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:opacity-70 transition-opacity"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
