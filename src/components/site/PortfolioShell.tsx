"use client";

import { useEffect } from "react";

import { Hero } from "./Hero";
import { SectionGrid } from "./SectionGrid";
import { DataStatusBadge } from "./DataStatusBadge";
import { MobileSkills } from "./MobileSkills";
import { FloatingNav } from "./FloatingNav";
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
    <div className="relative bg-slate-950 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.3),transparent_55%)]" />
      <FloatingNav sections={data.sections} />
      <main className="relative z-10 flex min-h-screen w-full flex-col gap-0">
        <Hero totalSections={data.sections.length} sections={data.sections} />
        
        {/* Intro/Badge - Desktop */}
        <div className="pt-24 md:pt-32 lg:pt-40 xl:pt-48">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
            <DataStatusBadge sourcedFromSupabase={data.sourcedFromSupabase} />
          </div>
        </div>
        
        {/* Work/Sections */}
        <div id="sections" className="mt-32 pt-24 md:mt-40 md:pt-28 lg:mt-48 lg:pt-32 xl:mt-56 xl:pt-36">
          <SectionGrid sections={data.sections} />
        </div>
        
        {/* Skills Section */}
        <div id="skills" className="mt-32 pt-24 md:mt-40 md:pt-28 lg:mt-48 lg:pt-32 xl:mt-56 xl:pt-36">
          <MobileSkills skills={data.skills} />
        </div>
        
        {/* Contact Section */}
        <div id="contact" className="mx-auto w-full max-w-6xl px-4 pb-40 pt-32 sm:px-6 sm:pt-36 md:px-10 md:pt-40 lg:pb-48 lg:pt-48 xl:pt-56">
          <footer className="mt-12 min-h-[400px] p-6 sm:p-8 md:mt-16 md:p-10 lg:p-12">
            <div className="space-y-5 sm:space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 sm:text-xs sm:tracking-[0.4em]">
                  <span className="h-px w-6 bg-white/30 sm:w-8" />
                  Get in Touch
                </h2>
                <p className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                  Let's Create
                  <span className="block bg-linear-to-r from-rose-400 via-pink-300 to-rose-500 bg-clip-text text-transparent">
                    Something Amazing
                  </span>
                </p>
                <p className="pt-2 text-sm font-medium text-rose-300/90 sm:text-base md:text-lg">
                  Available for work and internships
                </p>
              </div>

              {/* Contact Details */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {/* Email */}
                <a
                  href="mailto:Soumya.vatsa@nift.ac.in"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10 hover:scale-105"
                  title="Email"
                >
                  <svg className="h-5 w-5 text-white/70 group-hover:text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50">Email</div>
                    <div className="text-xs text-white/90 group-hover:text-white sm:text-sm">Soumya.vatsa@nift.ac.in</div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:8271503808"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10 hover:scale-105"
                  title="Phone"
                >
                  <svg className="h-5 w-5 text-white/70 group-hover:text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50">Phone</div>
                    <div className="text-xs text-white/90 group-hover:text-white sm:text-sm">8271503808</div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/Soumyavatsa25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:scale-105"
                  title="Instagram"
                >
                  <svg className="h-5 w-5 text-rose-300/70 group-hover:text-rose-300 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-rose-300/70">Instagram</div>
                    <div className="text-xs text-rose-200/90 group-hover:text-rose-200 sm:text-sm">@Soumyavatsa25</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/soumya-vatsa-371933328/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:scale-105"
                  title="LinkedIn"
                >
                  <svg className="h-5 w-5 text-blue-300/70 group-hover:text-blue-300 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-blue-300/70">LinkedIn</div>
                    <div className="text-xs text-blue-200/90 group-hover:text-blue-200 sm:text-sm">Soumya Vatsa</div>
                  </div>
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5 text-xs sm:gap-3 sm:pt-6 sm:text-sm">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5">
                  NIFT Chennai
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5">
                  Fashion Communication
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5">
                  Based in India
                </span>
                <span className="rounded-full border border-rose-500/20 bg-rose-500/5 px-3 py-1 text-rose-200/80 sm:px-4 sm:py-1.5">
                  Available for collabs
                </span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

