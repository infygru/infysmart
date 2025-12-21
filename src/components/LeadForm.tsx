'use client';

import { useState } from 'react';

type ServiceType = 'cctv' | 'solar' | 'automation' | 'general';

interface LeadFormProps {
  service: ServiceType;
  source: string;
}

export default function LeadForm({ service, source }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        service,
        source
      })
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold">
        Get Quote for {service.toUpperCase()}
      </h3>

      <input name="name" required placeholder="Your Name" className="input" />
      <input name="phone" required placeholder="Phone Number" className="input" />

      {/* CONDITIONAL FIELDS */}
      {service === 'cctv' && (
        <input name="message" placeholder="No. of cameras required" className="input" />
      )}

      {service === 'solar' && (
        <input name="message" placeholder="Roof type / Power requirement" className="input" />
      )}

      {service === 'automation' && (
        <input name="message" placeholder="Automation type (Gate, Home, etc.)" className="input" />
      )}

      {service === 'general' && (
        <textarea name="message" placeholder="Your Message" className="input h-24" />
      )}

      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {success && (
        <p className="text-green-600 text-sm">
          Thanks! We will contact you shortly.
        </p>
      )}
    </form>
  );
}
