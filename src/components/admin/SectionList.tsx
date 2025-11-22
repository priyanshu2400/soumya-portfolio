import Image from "next/image";
import { PortfolioSection } from "@/lib/types";

type Props = {
  sections: PortfolioSection[];
};

export const SectionList = ({ sections }: Props) => {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-white sm:rounded-3xl sm:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm sm:tracking-[0.4em]">
          Section Overview
        </p>
        <p className="mt-1 text-xs text-white/40">Quick view of all sections</p>
      </div>
      <ul className="space-y-2 text-sm sm:space-y-3">
        {sections.map((section) => {
          const thumbnails = section.images.slice(0, 3);
          return (
            <li
              key={section.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 p-3 sm:rounded-2xl sm:p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">{section.title}</p>
                  {section.description && (
                    <p className="mt-1 text-xs text-white/60 line-clamp-2 sm:text-sm">{section.description}</p>
                  )}
                  <p className="mt-1 text-xs text-white/40">
                    {section.images.length} image{section.images.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${section.is_published ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-100"}`}
                >
                  {section.is_published ? "Published" : "Draft"}
                </span>
              </div>
              {thumbnails.length ? (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {thumbnails.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white/5 sm:h-14 sm:rounded-xl"
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
                    <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-white/20 text-xs font-medium text-white/60 sm:h-14 sm:rounded-xl">
                      +{section.images.length - thumbnails.length}
                    </span>
                  )}
                </div>
              ) : (
                <p className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50">
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

