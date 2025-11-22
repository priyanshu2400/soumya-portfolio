"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { PortfolioSection } from "@/lib/types";

type SectionCardProps = {
  section: PortfolioSection;
};

export const SectionCard = ({ section }: SectionCardProps) => {
  const galleryImages = useMemo(() => section.images.slice(0, 5), [section]);
  const [activeIndex, setActiveIndex] = useState(0);
  const boundedIndex =
    galleryImages.length > 0 ? activeIndex % galleryImages.length : 0;

  useEffect(() => {
    if (!galleryImages.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <article
      id={`section-${section.slug}`}
      className="group relative flex scroll-mt-24 flex-col gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-slate-900/80 via-slate-950 to-slate-900/60 p-8 text-white shadow-[0_25px_80px_rgba(8,12,24,0.55)] transition hover:-translate-y-1 hover:border-white/30 hover:bg-slate-950/90"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/50">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-300" />
          {section.slug}
        </span>
        <span className="text-white/40">0{section.order}</span>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="space-y-6 lg:w-[42%]">
          <div>
            <h3 className="text-3xl font-semibold text-white">
              {section.title}
            </h3>
            {section.description && (
              <p className="mt-3 text-base text-white/75">
                {section.description}
              </p>
            )}
          </div>
          <div className="space-y-4 text-sm text-white/80">
            {section.content.slice(0, 3).map((block) => (
              <div
                key={block.id}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-[2px]"
              >
                {block.heading && (
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {block.heading}
                  </p>
                )}
                {block.body_text && (
                  <p className="mt-2 text-sm text-white/80">{block.body_text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-[58%]">
          {galleryImages.length ? (
            <div className="relative h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/40 shadow-[0_25px_60px_rgba(8,12,24,0.45)]">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${boundedIndex === index ? "opacity-100" : "opacity-0"}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt_text ?? section.title}
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                  {image.caption && (
                    <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-white">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 w-3 rounded-full transition ${boundedIndex === index ? "bg-white" : "bg-white/30 hover:bg-white/80"}`}
                    aria-label={`Show slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[360px] items-center justify-center rounded-[28px] border border-dashed border-white/25 bg-slate-900/60 text-center text-xs text-white/50">
              Upload visuals for {section.title} inside the admin console to
              unlock the gallery layout.
            </div>
          )}
        </div>
      </div>
    </article>
  );
};