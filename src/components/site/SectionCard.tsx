"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PortfolioSection } from "@/lib/types";

type SectionCardProps = {
  section: PortfolioSection;
};

export const SectionCard = ({ section }: SectionCardProps) => {
  const allImages = useMemo(() => section.images, [section]);
  
  // Split images: keep 5 for static display (skip first for slideshow)
  const staticImages = useMemo(() => allImages.slice(1, 6), [allImages]);
  
  // Main slideshow cycles through ALL images
  const [activeIndex, setActiveIndex] = useState(0);
  const boundedIndex =
    allImages.length > 0 ? activeIndex % allImages.length : 0;

  useEffect(() => {
    if (!allImages.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <article
      id={`section-${section.slug}`}
      className="scroll-mt-16 md:scroll-mt-68 lg:scroll-mt-96 overflow-hidden min-h-[150vh] flex flex-col justify-center py-16 md:py-20"
    >
      {/* Content Section */}
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 mb-10 md:mb-16">
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

      {/* Gallery - Collage Layout */}
      {allImages.length ? (
        <div className="w-full space-y-3">
          {/* Single image - simple display */}
          {allImages.length === 1 && (
            <div className="relative h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)]">
              <Image
                src={allImages[0].url}
                alt={allImages[0].alt_text ?? section.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          )}

          {/* Two images - side by side */}
          {allImages.length === 2 && (
            <div className="grid h-[300px] md:h-[400px] lg:h-[480px] grid-cols-2 gap-3">
              {allImages.map((image) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]"
                >
                  <Image
                    src={image.url}
                    alt={image.alt_text ?? section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 600px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Three to five images - Two row collage */}
          {allImages.length >= 3 && allImages.length <= 5 && (
            <div className="space-y-3">
              {/* Top row - 2 columns */}
              <div className="grid h-[300px] md:h-[400px] lg:h-[480px] grid-cols-2 gap-3">
                {/* Left: Main slideshow cycling through ALL images */}
                <div className="relative col-span-1 overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)]">
                  {allImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        boundedIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt_text ?? section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 600px"
                      />
                    </div>
                  ))}
                  
                  {/* Slideshow indicator */}
                  <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {boundedIndex + 1}/{allImages.length}
                  </div>
                </div>

                {/* Right: Grid of smaller images */}
                <div className="col-span-1 flex flex-col gap-3">
                  {staticImages[0] && (
                    <div className="relative h-[48%] overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                      <Image
                        src={staticImages[0].url}
                        alt={staticImages[0].alt_text ?? section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 600px"
                      />
                    </div>
                  )}

                  <div className="flex h-[48%] gap-3">
                    {staticImages[1] && (
                      <div className="relative w-1/2 overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                        <Image
                          src={staticImages[1].url}
                          alt={staticImages[1].alt_text ?? section.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 300px"
                        />
                      </div>
                    )}

                    {staticImages[2] && (
                      <div className="relative w-1/2 overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                        <Image
                          src={staticImages[2].url}
                          alt={staticImages[2].alt_text ?? section.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 300px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Six or more images - Two row collage with bottom 3-column row */}
          {allImages.length >= 6 && (
            <div className="space-y-3">
              {/* Top row - 2 columns */}
              <div className="grid h-[300px] md:h-[400px] lg:h-[480px] grid-cols-2 gap-3">
                {/* Left: Main slideshow cycling through ALL images */}
                <div className="relative col-span-1 overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)]">
                  {allImages.map((image, index) => (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        boundedIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt_text ?? section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 600px"
                      />
                    </div>
                  ))}
                  
                  {/* Slideshow indicator */}
                  <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {boundedIndex + 1}/{allImages.length}
                  </div>
                </div>

                {/* Right: Grid of smaller images */}
                <div className="col-span-1 flex flex-col gap-3">
                  {staticImages[0] && (
                    <div className="relative h-[48%] overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                      <Image
                        src={staticImages[0].url}
                        alt={staticImages[0].alt_text ?? section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 600px"
                      />
                    </div>
                  )}

                  <div className="flex h-[48%] gap-3">
                    {staticImages[1] && (
                      <div className="relative w-1/2 overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                        <Image
                          src={staticImages[1].url}
                          alt={staticImages[1].alt_text ?? section.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 300px"
                        />
                      </div>
                    )}

                    {staticImages[2] && (
                      <div className="relative w-1/2 overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                        <Image
                          src={staticImages[2].url}
                          alt={staticImages[2].alt_text ?? section.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 300px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom row - 3 columns */}
              <div className="grid h-[200px] md:h-[250px] lg:h-[300px] grid-cols-3 gap-3">
                {staticImages[3] && (
                  <div className="relative overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                    <Image
                      src={staticImages[3].url}
                      alt={staticImages[3].alt_text ?? section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 400px"
                    />
                  </div>
                )}
                {staticImages[4] && (
                  <div className="relative overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                    <Image
                      src={staticImages[4].url}
                      alt={staticImages[4].alt_text ?? section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 400px"
                    />
                  </div>
                )}
                {staticImages[5] && (
                  <div className="relative overflow-hidden  border border-white/10 shadow-[0_20px_60px_rgba(8,12,24,0.5)] transition hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(8,12,24,0.7)]">
                    <Image
                      src={staticImages[5].url}
                      alt={staticImages[5].alt_text ?? section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 400px"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[400px] items-center justify-center border border-dashed border-white/25 bg-slate-900/60 text-center text-xs leading-relaxed text-white/50 mx-6 md:mx-10 lg:mx-16 xl:mx-24">
          <p className="px-8">
            Upload visuals for {section.title} inside the admin console.
          </p>
        </div>
      )}
    </article>
  );
};