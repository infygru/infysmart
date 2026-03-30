'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { User, Package, LogOut } from 'lucide-react';

export default function AccountNav({ name, email }: { name: string; email: string }) {
  const path = usePathname();
  const isOrders = path.startsWith('/account/orders');

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
              <User className="w-4 h-4 text-[#FF4500]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{name || 'My Account'}</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          <Link
            href="/account"
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              !isOrders
                ? 'border-[#FF4500] text-[#FF4500]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Profile
          </Link>
          <Link
            href="/account/orders"
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              isOrders
                ? 'border-[#FF4500] text-[#FF4500]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
