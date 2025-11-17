"use client";

import { useEffect } from "react";

import { Hero } from "./Hero";
import { SectionGrid } from "./SectionGrid";
import { DataStatusBadge } from "./DataStatusBadge";
import { PortfolioDataPayload } from "@/lib/types";

type Props = {
  data: PortfolioDataPayload;
  highlightSlug?: string;
};

export const PortfolioShell = ({ data, highlightSlug }: Props) => {
  useEffect(() => {
    if (!highlightSlug) return;
    const el = document.getElementById(`section-${highlightSlug}`);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const previousShadow = el.style.boxShadow;
    el.style.boxShadow =
      "0 0 0 2px rgba(236, 72, 153, 0.7), 0 15px 45px rgba(236,72,153,0.25)";
    const timeout = setTimeout(() => {
      el.style.boxShadow = previousShadow;
    }, 2000);

    return () => {
      clearTimeout(timeout);
      el.style.boxShadow = previousShadow;
    };
  }, [highlightSlug]);

  return (
    <div className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.3),transparent_55%)]" />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 md:px-10 md:py-20">
        <Hero totalSections={data.sections.length} />
        <DataStatusBadge sourcedFromSupabase={data.sourcedFromSupabase} />
        <SectionGrid sections={data.sections} />
        <footer className="mt-16 rounded-4xl border border-white/10 bg-slate-900/60 p-8 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Contact
          </p>
          <div className="mt-3 flex flex-wrap gap-6 text-base text-white">
            <a
              href="mailto:soumya@example.com"
              className="underline decoration-dotted underline-offset-4"
            >
              soumya@example.com
            </a>
            <span>NIFT Chennai — Fashion Communication</span>
            <span>Based in India · Available for internships & collabs</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

