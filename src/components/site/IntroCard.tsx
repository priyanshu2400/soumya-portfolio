"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PortfolioSection } from "@/lib/types";

type IntroCardProps = {
  section: PortfolioSection;
};

export const IntroCard = ({ section }: IntroCardProps) => {
  const allImages = useMemo(() => section.images, [section]);
  const [offset, setOffset] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate the width of one set of images (approximate)
  const imageWidth = 360 + 12; // max width + gap
  const oneSetWidth = allImages.length * imageWidth;

  useEffect(() => {
    if (!allImages.length) return;
    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = prev - 300;
        // Reset when first set of images has scrolled completely off screen
        if (Math.abs(newOffset) >= oneSetWidth) {
          return 0;
        }
        return newOffset;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [allImages.length, oneSetWidth, isMobile]);

  // Duplicate images for infinite scroll effect
  const images = [...allImages, ...allImages, ...allImages];

  return (
    <article
      id={`section-${section.slug}`}
      className="scroll-mt-24 w-screen overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10 mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight">
          {section.title}
        </h2>
        {section.description && (
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
            {section.description}
          </p>
        )}
        {section.content.length > 0 && (
          <div className="space-y-4">
            {section.content.map((block) => (
              <div key={block.id}>
                {block.heading && (
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {block.heading}
                  </h3>
                )}
                {block.body_text && (
                  <p className="text-base md:text-lg text-white/75 leading-relaxed">
                    {block.body_text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {allImages.length ? (
        <div className="relative h-[350px] sm:h-[400px] md:h-[540px] overflow-hidden">
          <div 
            className="flex gap-3 items-center h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {images.map((image, index) => {
              const isTall = index % 2 === 0;
              return (
                <div
                  key={`${image.id}-${index}`}
                  className={`relative shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)] ${
                    isTall 
                      ? 'w-52 sm:w-64 md:w-[360px] h-80 sm:h-[380px] md:h-[520px]' 
                      : 'w-52 sm:w-64 md:w-[360px] h-72 sm:h-[340px] md:h-[480px]'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt_text ?? section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 360px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex h-[480px] items-center justify-center rounded-3xl border border-dashed border-white/25 bg-slate-900/60 text-center text-xs text-white/50 mx-6 md:mx-10">
          Upload visuals for {section.title} inside the admin console.
        </div>
      )}
    </article>
  );
};
