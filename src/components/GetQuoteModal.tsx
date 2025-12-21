'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Service = 'CCTV' | 'Solar' | 'Automation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: Service;
}

export default function GetQuoteModal({
  isOpen,
  onClose,
  serviceName = 'CCTV',
}: Props) {
  const [service, setService] = useState<Service>(serviceName);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔒 Lock background scroll + ESC close
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', esc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service,
        source: 'Get Quote Modal',
        ...data,
      }),
    });

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-5 flex justify-between items-start text-white">
          <div>
            <h2 className="text-2xl font-semibold">Request a Proposal</h2>
            <p className="text-sm text-slate-300 mt-1">
              Tailored estimation for {service} solutions.
            </p>
          </div>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-slate-300 hover:text-white" />
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900"
        >
          {/* SERVICE SELECT */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-3">
              Select Service Required <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {(['CCTV', 'Solar', 'Automation'] as Service[]).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setService(s)}
                  className={`flex-1 py-3 rounded-xl border font-semibold transition ${
                    service === s
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CCTV FIELDS */}
          {service === 'CCTV' && (
            <>
              <div>
                <label className="label">Approx. No. of Cameras</label>
                <select name="cameras" className="input">
                  <option>1 – 4 (Home / Small Office)</option>
                  <option>5 – 8</option>
                  <option>9 – 16</option>
                  <option>16+</option>
                </select>
              </div>
              <div>
                <label className="label">Storage Required (Days)</label>
                <input
                  name="storage_days"
                  placeholder="e.g. 15, 30, 90"
                  className="input"
                />
              </div>
            </>
          )}

          {/* COMMON FIELDS */}
          <div>
            <label className="label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input name="name" required placeholder="Your Name" className="input" />
          </div>

          <div>
            <label className="label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              required
              pattern="[0-9]{10}"
              placeholder="+91"
              className="input"
            />
          </div>

          <div>
            <label className="label">Organization / Building Name</label>
            <input name="company" placeholder="Company Name" className="input" />
          </div>

          <div>
            <label className="label">Site Location</label>
            <input
              name="location"
              placeholder="Area (e.g. Guindy, Velachery)"
              className="input"
            />
          </div>

          {/* CTA */}
          <button
            disabled={loading}
            className={`md:col-span-2 mt-4 py-4 rounded-xl text-white text-lg font-semibold transition ${
              loading
                ? 'bg-emerald-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {loading ? 'Submitting…' : 'Get Free Quote'}
          </button>

          <p className="md:col-span-2 text-center text-sm text-slate-500 mt-2">
            Our engineers from Saidapet will contact you within 2 hours.
          </p>

          {success && (
            <p className="md:col-span-2 text-center text-green-600 font-medium">
              Request submitted successfully.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
