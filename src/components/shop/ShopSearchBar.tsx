'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function ShopSearchBar({ initialValue = '' }: { initialValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(initialValue);

  const submit = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    if (value.trim()) {
      params.set('q', value.trim());
    } else {
      params.delete('q');
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); submit(query); }}
      className="relative flex items-center"
    >
      <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cameras, NVR, DVR, switches…"
        className="w-full pl-9 pr-10 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition-all text-sm shadow-sm"
      />
      {query && (
        <button
          type="button"
          onClick={() => { setQuery(''); submit(''); }}
          className="absolute right-3 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
