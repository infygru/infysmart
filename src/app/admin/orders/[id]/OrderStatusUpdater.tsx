'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle } from 'lucide-react';

const ORDER_STATUSES = [
  { value: 'pending',    label: 'Pending',    color: 'text-yellow-700 bg-yellow-100' },
  { value: 'confirmed',  label: 'Confirmed',  color: 'text-blue-700 bg-blue-100' },
  { value: 'processing', label: 'Processing', color: 'text-purple-700 bg-purple-100' },
  { value: 'shipped',    label: 'Shipped',    color: 'text-orange-700 bg-orange-100' },
  { value: 'delivered',  label: 'Delivered',  color: 'text-green-700 bg-green-100' },
  { value: 'cancelled',  label: 'Cancelled',  color: 'text-red-700 bg-red-100' },
  { value: 'refunded',   label: 'Refunded',   color: 'text-gray-600 bg-gray-100' },
];

const PAYMENT_STATUSES = [
  { value: 'pending',  label: 'Pending' },
  { value: 'paid',     label: 'Paid' },
  { value: 'failed',   label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
];

interface Props {
  orderId: string;
  currentStatus: string;
  currentPaymentStatus: string;
  currentNotes: string;
}

export default function OrderStatusUpdater({ orderId, currentStatus, currentPaymentStatus, currentNotes }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, payment_status: paymentStatus, notes }),
      });
      if (!res.ok) { setError('Failed to save changes'); return; }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = status !== currentStatus || paymentStatus !== currentPaymentStatus || notes !== currentNotes;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800 text-sm">Update Order</h3>

      {/* Order Status */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Order Status</label>
        <div className="grid grid-cols-2 gap-1.5">
          {ORDER_STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatus(s.value)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                status === s.value
                  ? `${s.color} border-current`
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Status */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Payment Status</label>
        <div className="grid grid-cols-2 gap-1.5">
          {PAYMENT_STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setPaymentStatus(s.value)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                paymentStatus === s.value
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Internal Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Add notes about this order (tracking ID, courier name, etc.)..."
          className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-400 resize-none"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={handleSave}
        disabled={saving || !hasChanges}
        className={`w-full h-10 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
          saved
            ? 'bg-green-500 text-white'
            : hasChanges
            ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-sm shadow-orange-200'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {saving
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          : saved
          ? <><CheckCircle className="w-4 h-4" /> Saved!</>
          : 'Save Changes'
        }
      </button>
    </div>
  );
}
