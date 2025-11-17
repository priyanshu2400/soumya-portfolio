import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import heroImage from "@/assets/hero-image.jpg";

type HeroProps = {
  totalSections: number;
};

export const Hero = ({ totalSections }: HeroProps) => {
  return (
    <section className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-900/50 shadow-[0_25px_120px_rgba(255,255,255,0.1)]">
      <div className="grid items-stretch gap-8 md:grid-cols-2">
        <div className="space-y-6 p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            <Sparkles className="h-3 w-3 text-rose-200" />
            Fashion Communication
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Soumya Vatsa shapes immersive stories across{" "}
            <span className="text-rose-200">design, image,</span> and trend
            research.
          </h1>
          <p className="text-lg text-white/80">
            Graphic identities, editorial photography, and spatial narratives
            crafted for culturally tuned fashion brands.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#sections"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:text-rose-700"
            >
              Explore Work
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/sections/photography"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
            >
              Jump to Photography
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-xs uppercase tracking-[0.4em] text-white/60">
            {totalSections} Sections · Supabase CMS
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-rose-500/30 to-slate-950/60" />
          <Image
            src={heroImage}
            alt="Soumya Vatsa smiling with pencil"
            priority
            className="pointer-events-none h-full w-full object-cover object-center"
          />
          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white backdrop-blur">
            Soumya Vatsa
          </div>
        </div>
      </div>
    </section>
  );
};

