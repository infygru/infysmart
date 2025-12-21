export default function StatsStrip() {
  return (
    <section className="bg-[#244f4a]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4 md:divide-x md:divide-white/20">

          {/* 1 */}
          <div className="text-center md:px-6">
            <p className="text-4xl font-bold text-yellow-400">10+</p>
            <p className="mt-2 text-sm tracking-widest text-teal-200">
              YEARS EXPERIENCE
            </p>
          </div>

          {/* 2 */}
          <div className="text-center md:px-6">
            <p className="text-4xl font-bold text-yellow-400">500+</p>
            <p className="mt-2 text-sm tracking-widest text-teal-200">
              PROJECTS DONE
            </p>
          </div>

          {/* 3 */}
          <div className="text-center md:px-6">
            <p className="text-4xl font-bold text-yellow-400">38</p>
            <p className="mt-2 text-sm tracking-widest text-teal-200">
              TN DISTRICTS
            </p>
          </div>

          {/* 4 */}
          <div className="text-center md:px-6">
            <p className="text-4xl font-bold text-yellow-400">24/7</p>
            <p className="mt-2 text-sm tracking-widest text-teal-200">
              SUPPORT TEAM
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
