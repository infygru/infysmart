'use client';

import { MapPin, PenTool, Wrench, Headset } from 'lucide-react';

export default function ExecutionProcess() {
  const steps = [
    {
      id: 1,
      title: "Site Survey",
      description: "Our engineers visit your location (Chennai, Madurai, etc.) to assess requirements.",
      icon: <MapPin className="h-6 w-6 text-white" />
    },
    {
      id: 2,
      title: "Design & Quote",
      description: "We create a custom layout plan and provide a transparent, itemized quotation.",
      icon: <PenTool className="h-6 w-6 text-white" />
    },
    {
      id: 3,
      title: "Installation",
      description: "Professional deployment using STQC certified cables and heavy-duty conduits.",
      icon: <Wrench className="h-6 w-6 text-white" />
    },
    {
      id: 4,
      title: "AMC Support",
      description: "Dedicated maintenance team ensures your systems run with 99.9% uptime.",
      icon: <Headset className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Our Execution Process
          </h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From initial survey in Chennai to lifetime support, we follow a standardized 4-step protocol.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative grid md:grid-cols-4 gap-8">
          
          {/* Connector Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          {steps.map((step) => (
            <div key={step.id} className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              {/* Icon Box */}
              <div className="h-14 w-14 bg-teal-700 rounded-xl flex items-center justify-center mb-6 shadow-md shadow-teal-700/20 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.id}. {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}