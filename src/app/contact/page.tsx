export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">

      {/* HEADER */}
      <section className="py-24 border-b">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Contact <span className="text-amber-600">Infysmart Solutions</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Get in touch with us for CCTV, Solar or Automation requirements.
            Our team will respond promptly.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

          {/* LEFT – CONTACT DETAILS */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Reach Us
            </h2>

            <div className="space-y-6 text-slate-700">
              <div>
                <p className="font-semibold">Company</p>
                <p>Infysmart Solutions</p>
                <p className="text-sm text-slate-600">
                  (A brand of Infygru Private Limited)
                </p>
              </div>

              <div>
                <p className="font-semibold">Location</p>
                <p>Chennai, Tamil Nadu</p>
                <p className="text-sm text-slate-600">
                  Serving clients across Tamil Nadu
                </p>
              </div>

              <div>
                <p className="font-semibold">Phone</p>
                <p>
                  <a
                    href="tel:+918300290019"
                    className="text-amber-600 font-medium"
                  >
                    +91 8300290019
                  </a>
                </p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p>
                  <a
                    href="mailto:sales@infysmart.com"
                    className="text-amber-600 font-medium"
                  >
                    sales@infysmart.com
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-semibold mb-3">Business Hours</p>
              <p className="text-slate-600">
                Monday – Saturday<br />
                9:30 AM – 6:30 PM
              </p>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Send Us an Enquiry
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Service Interested In
                </label>
                <select
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>CCTV Surveillance</option>
                  <option>Solar Power Installation</option>
                  <option>Automation Solutions</option>
                  <option>General Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-amber-400"
              >
                Submit Enquiry
              </button>

              <p className="text-sm text-slate-500">
                * We respect your privacy. Your information will not be shared.
              </p>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}
