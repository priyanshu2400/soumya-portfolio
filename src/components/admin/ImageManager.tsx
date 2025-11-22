"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { PortfolioSection } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  sections: PortfolioSection[];
};

const getStoragePath = (url: string) => {
  const marker = "/object/public/portfolio-images/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
};

export const ImageManager = ({ sections }: Props) => {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleDelete = async (imageId: string, url: string) => {
    const storagePath = getStoragePath(url);
    if (!storagePath) {
      setStatus("Unable to determine storage path.");
      return;
    }

    setDeletingId(imageId);
    setStatus(null);

    const { error: storageError } = await supabase.storage
      .from("portfolio-images")
      .remove([storagePath]);

    if (storageError) {
      setDeletingId(null);
      setStatus(storageError.message);
      return;
    }

    const { error: deleteError } = await supabase
      .from("images")
      .delete()
      .eq("id", imageId);

    if (deleteError) {
      setDeletingId(null);
      setStatus(deleteError.message);
      return;
    }

    setDeletingId(null);
    setStatus("Image deleted.");
    router.refresh();
  };

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-white sm:rounded-3xl sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm sm:tracking-[0.4em]">
            Image Library
          </p>
          <h2 className="text-base font-semibold sm:text-xl">Manage & delete images</h2>
        </div>
        {status && (
          <p className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70">
            {status}
          </p>
        )}
      </div>
      <div className="space-y-4 sm:space-y-6">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <div key={section.id} className="rounded-xl border border-white/10 sm:rounded-2xl">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between gap-3 p-3 text-left hover:bg-white/5 sm:p-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold sm:text-base truncate">{section.title}</p>
                  <p className="text-xs text-white/50">
                    {section.images.length} image{section.images.length === 1 ? "" : "s"}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-white/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-white/60" />
                )}
              </button>
              {isExpanded && (
                <div className="border-t border-white/10 p-3 sm:p-4">
                  {section.images.length ? (
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                      {section.images.map((image) => (
                        <div
                          key={image.id}
                          className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:rounded-2xl"
                        >
                          <Image
                            src={image.url}
                            alt={image.alt_text ?? section.title}
                            width={800}
                            height={600}
                            className="h-40 w-full object-cover sm:h-48"
                          />
                          {image.caption && (
                            <p className="px-2.5 py-2 text-xs text-white/70 sm:px-3">
                              {image.caption}
                            </p>
                          )}
                          <div className="flex items-center justify-between px-2.5 pb-2.5 text-xs text-white/50 sm:px-3 sm:pb-3">
                            <span className="text-xs">Order {image.order}</span>
                            <button
                              onClick={() => handleDelete(image.id, image.url)}
                              disabled={deletingId === image.id}
                              className="rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200 transition hover:border-red-400/60 hover:bg-red-500/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === image.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-white/5 p-4 text-center text-sm text-white/50">
                      No images yet. Use the upload form above to add images.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

