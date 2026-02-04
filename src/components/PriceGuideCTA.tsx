'use client';
import { Download, FileText } from "lucide-react";

export default function PriceGuideCTA() {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <FileText size={14} /> Free Resource
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            Planning a Project in 2026?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 max-w-lg">
                            Download our comprehensive <strong>2026 Price Guide</strong> for CCTV Installation & Industrial Security Systems in Tamil Nadu.
                        </p>
                        <ul className="space-y-3 mb-8 text-slate-400">
                            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Updated market rates for IP & Analog Cameras</li>
                            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Government Tender Compliance Checklist</li>
                            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Installation & AMC cost breakdown</li>
                        </ul>
                    </div>

                    {/* Form Card */}
                    <div className="lg:w-5/12 w-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Get the Price Guide</h3>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                                <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">WhatsApp Number</label>
                                <input type="tel" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">City / Location</label>
                                <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors" placeholder="e.g. Chennai, Hosur" />
                            </div>
                            <button type="submit" className="w-full py-4 bg-[#FF4500] hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                                Download Now <Download size={20} />
                            </button>
                        </form>
                        <p className="text-xs text-center text-slate-500 mt-4">
                            We respect your privacy. No spam.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
