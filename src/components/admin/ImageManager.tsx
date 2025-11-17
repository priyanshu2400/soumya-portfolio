"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-white">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Library
          </p>
          <h2 className="text-xl font-semibold">Manage uploaded images</h2>
        </div>
        {status && (
          <p className="text-xs text-white/60">
            {status}
          </p>
        )}
      </div>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="rounded-2xl border border-white/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{section.title}</p>
                <p className="text-xs text-white/50">
                  {section.images.length} image{section.images.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            {section.images.length ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt_text ?? section.title}
                      width={800}
                      height={600}
                      className="h-48 w-full object-cover"
                    />
                    {image.caption && (
                      <p className="px-3 py-2 text-xs text-white/70">
                        {image.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between px-3 pb-3 text-xs text-white/50">
                      <span>Order {image.order}</span>
                      <button
                        onClick={() => handleDelete(image.id, image.url)}
                        disabled={deletingId === image.id}
                        className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === image.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-white/50">
                No uploads yet. Add images using the uploader on the left.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

