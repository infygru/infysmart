'use client';
// Note: metadata is exported from layout at route level; client component cannot export metadata directly.
// SEO metadata for /contact is handled by the parent layout + page-level metadata file if needed.

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('CCTV Surveillance');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, service, message, source: 'ContactPage' }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us directly at +91 94456 75619.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white text-slate-900">

      {/* HEADER */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Contact <span className="text-brand-blue">Infysmart</span>
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Get in touch for CCTV, Solar, Biometric or Automation requirements. We respond within 2 hours on business days.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* LEFT – CONTACT DETAILS */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Reach Us Directly</h2>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
                  <Phone className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Phone / WhatsApp</p>
                  <a href="tel:+919445675619" className="text-brand-blue font-medium hover:underline">+91 94456 75619</a>
                  <p className="text-xs text-slate-500 mt-0.5">Mon–Sat, 9 AM – 7 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
                  <Mail className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <a href="mailto:sales@infysmart.com" className="text-brand-blue font-medium hover:underline">sales@infysmart.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Address</p>
                  <p className="text-slate-600 text-sm">16, Sarathi Nagar, Saidapet,<br />Chennai – 600 015, Tamil Nadu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
                  <Clock className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Business Hours</p>
                  <p className="text-slate-600 text-sm">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                  <p className="text-slate-500 text-xs">Emergency AMC support: 24/7</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="font-bold text-slate-800 mb-3">We serve across</p>
              <div className="flex flex-wrap gap-2">
                {['Chennai', 'Hosur', 'Coimbatore', 'Dharmapuri', 'Karaikudi', 'Bangalore', 'Madurai', 'Salem', 'Trichy', 'Vellore', 'Puducherry', 'Cuddalore'].map(city => (
                  <span key={city} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium">{city}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Send Us an Enquiry</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center bg-green-50 border border-green-200 rounded-2xl">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-xl font-bold text-slate-900">Thank you, {name}!</h3>
                <p className="text-slate-600 max-w-sm">
                  We received your enquiry and will call you back within 2 hours. For urgent needs, call <a href="tel:+919445675619" className="text-brand-blue font-semibold">+91 94456 75619</a>.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Service Interested In</label>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                  >
                    <option>CCTV Surveillance</option>
                    <option>Solar Panel Installation</option>
                    <option>Solar 4G CCTV Camera</option>
                    <option>Biometric Access Control</option>
                    <option>Video Door Phone</option>
                    <option>Gate Motor Automation</option>
                    <option>CCTV AMC Service</option>
                    <option>General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your requirement briefly..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition resize-none"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-60 transition-colors"
                >
                  {loading ? 'Submitting…' : 'Submit Enquiry'}
                </button>

                <p className="text-xs text-slate-500">
                  * We respect your privacy. Your information will not be shared.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

    </main>
  );
}
