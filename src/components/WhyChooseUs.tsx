'use client';

import { CheckCircle2, Clock, Award, Users } from 'lucide-react';

const features = [
  {
    icon: <Award className="h-6 w-6 text-orange-500" />,
    title: "Authorized Partner",
    description: "Official dealer for Hikvision & Dahua. We guarantee 100% genuine products with manufacturer warranty."
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: "Certified Engineers",
    description: "No freelancers. Our in-house engineering team handles everything from structured cabling to server configuration."
  },
  {
    icon: <Clock className="h-6 w-6 text-green-500" />,
    title: "24/7 AMC Support",
    description: "Security never sleeps. We provide rapid on-site support and 1-year free maintenance with every installation."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-purple-500" />,
    title: "Smart Integration",
    description: "We don't just install cameras; we build ecosystems. Integrate CCTV with solar power and home automation."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            Why Partner With Infysmart?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Engineering Excellence for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              Critical Infrastructure.
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            We understand that security and power are the backbone of your operations. 
            That is why we bring certified expertise to every project, big or small.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}