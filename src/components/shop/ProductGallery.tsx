'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ShoppingCart } from 'lucide-react';
import { getAssetUrl } from '@/lib/directus';
import type { ProductImage } from '@/lib/directus';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-300 border border-slate-200">
        <ShoppingCart className="w-16 h-16" />
        <p className="text-sm font-medium">No image available</p>
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const mainSrc = getAssetUrl(activeImage.image, { width: '800', height: '800', fit: 'contain', quality: '85' });

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative aspect-square bg-white rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={mainSrc}
          alt={activeImage.alt_text || productName}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4 text-slate-600" />
        </div>

        {/* Arrow nav (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-slate-200 rounded-full p-1.5 shadow-sm transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-slate-200 rounded-full p-1.5 shadow-sm transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-slate-900/60 text-white text-xs px-2 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const thumbSrc = getAssetUrl(img.image, { width: '100', height: '100', fit: 'cover' });
            return (
              <button
                key={img.id ?? idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-white ${
                  idx === activeIndex
                    ? 'border-brand-blue shadow-sm shadow-brand-blue/20'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt={img.alt_text || `${productName} image ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={getAssetUrl(activeImage.image, { width: '1200', height: '1200', fit: 'contain' })}
              alt={activeImage.alt_text || productName}
              width={1200}
              height={1200}
              className="w-full h-full object-contain rounded-xl"
              style={{ maxHeight: '85vh' }}
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            >
              ✕
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
