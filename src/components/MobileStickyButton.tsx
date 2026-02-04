'use client';
import { Phone } from "lucide-react";

export default function MobileStickyButton() {
    return (
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
            <a
                href="tel:+919445675619"
                className="flex items-center gap-2 text-white px-5 py-3 rounded-full shadow-lg shadow-green-600/40 font-bold animate-bounce-slow"
                style={{ backgroundColor: '#25D366' }} // WhatsApp Green
            >
                <Phone className="h-5 w-5 fill-current" />
                <span>Call Now</span>
            </a>
        </div>
    );
}
