'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Phone, Package, LogOut, Save, Loader2, CheckCircle2 } from 'lucide-react';
import type { Customer, Order } from '@/lib/directus';
import { formatPrice } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
  refunded:   'bg-slate-100 text-slate-700',
};

export default function AccountClient({
  customer,
  orders,
  sessionEmail,
}: {
  customer: Customer | null;
  orders: Order[];
  sessionEmail: string;
}) {
  const [name, setName] = useState(customer?.name ?? '');
  const [phone, setPhone] = useState(customer?.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setError(d.error ?? 'Failed to save');
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-5 px-6">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-slate-900">My Account</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-6 py-8 grid md:grid-cols-[280px_1fr] gap-6 items-start">

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col items-center text-center gap-3">
            {customer?.avatar ? (
              <Image
                src={customer.avatar}
                alt={name || 'User'}
                width={72}
                height={72}
                className="rounded-full object-cover border-2 border-slate-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <User className="w-8 h-8 text-brand-blue" />
              </div>
            )}
            <div>
              <p className="font-bold text-slate-900">{name || 'No name set'}</p>
              <p className="text-xs text-slate-500">{sessionEmail}</p>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                maxLength={10}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-blue text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> :
                <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{sessionEmail}</span>
            </div>
            {phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
            <Package className="w-5 h-5 text-brand-blue" />
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No orders yet</p>
              <Link
                href="/shop"
                className="mt-3 inline-block text-sm text-brand-blue font-semibold hover:underline"
              >
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{order.order_number}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(order.date_created).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                      {' · '}
                      {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
