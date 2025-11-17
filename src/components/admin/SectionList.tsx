import Image from "next/image";
import { PortfolioSection } from "@/lib/types";

type Props = {
  sections: PortfolioSection[];
};

export const SectionList = ({ sections }: Props) => {
  return (
    <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/50 p-6 text-white">
      <p className="text-sm uppercase tracking-[0.4em] text-white/50">
        Sections
      </p>
      <ul className="space-y-3 text-sm">
        {sections.map((section) => {
          const thumbnails = section.images.slice(0, 3);
          return (
            <li
              key={section.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{section.title}</p>
                  {section.description && (
                    <p className="text-white/60">{section.description}</p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${section.is_published ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-100"}`}
                >
                  {section.is_published ? "Published" : "Draft"}
                </span>
              </div>
              {thumbnails.length ? (
                <div className="flex gap-2">
                  {thumbnails.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-14 w-20 overflow-hidden rounded-xl border border-white/15 bg-white/5"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt_text ?? section.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {section.images.length > thumbnails.length && (
                    <span className="flex h-14 w-20 items-center justify-center rounded-xl border border-dashed border-white/20 text-xs text-white/60">
                      +{section.images.length - thumbnails.length}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-white/50">
                  No images yet — upload to preview here.
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

