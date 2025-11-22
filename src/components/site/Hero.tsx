import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { PortfolioSection } from "@/lib/types";

type HeroProps = {
  totalSections: number;
  sections: PortfolioSection[];
};

export const Hero = ({ totalSections, sections }: HeroProps) => {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-rose-900/30">
      {/* Animated gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.08),transparent_50%)]" />
      
      {/* Decorative glow elements - Full hero section */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 h-56 w-56 rounded-full bg-pink-500/8 blur-3xl sm:h-72 sm:w-72" />
      
      <div className="relative flex flex-col lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-stretch lg:border-b lg:border-white/10 lg:min-h-screen">
        {/* Mobile: Image with overlaid heading */}
        <div className="relative flex min-h-screen flex-col justify-between lg:hidden">
          {/* Heading - Always at top */}
          <div className="relative z-10 w-full p-4 pt-24 sm:p-6 sm:pt-28">
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-6xl">
              Hi, I'm
              <span className="block bg-linear-to-r from-rose-400 via-pink-300 to-rose-500 bg-clip-text text-transparent drop-shadow-lg">
                Soumya Vatsa
              </span>
            </h1>
          </div>

          {/* Section Buttons - At bottom on tablet, below heading on mobile */}
          <div className="relative z-10 w-full p-4 pb-12 md:pb-16">
            <div className="w-full space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 sm:text-sm">
                  <span className="h-px w-6 bg-white/30 sm:w-8" />
                  Explore Work
                </h3>
                <div className="flex w-full flex-wrap gap-1.5 sm:gap-2">
                  {sections.filter(s => s.is_published).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        const element = document.getElementById(`section-${section.slug}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition active:scale-95 sm:px-5 sm:py-3 sm:text-base"
                    >
                      <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
                      <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-white/60 via-transparent to-white/20" />
                      <span className="relative">{section.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      const element = document.getElementById('skills');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition active:scale-95 sm:px-5 sm:py-3 sm:text-base"
                  >
                    <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
                    <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-white/60 via-transparent to-white/20" />
                    <span className="relative">Skills</span>
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="relative overflow-hidden rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-200 shadow-[0_2px_8px_rgba(244,114,182,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition active:scale-95 sm:px-5 sm:py-3 sm:text-base"
                  >
                    <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-rose-300/60 to-transparent" />
                    <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-rose-300/60 via-transparent to-rose-300/20" />
                    <span className="relative">Contact</span>
                  </button>
                </div>
            </div>
          </div>
          
          {/* Image - Full height, positioned below content */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative h-[110%] w-[110%]">
              <Image
                src={heroImage}
                alt="Soumya Vatsa smiling with pencil"
                priority
                fill
                className="pointer-events-none object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.15)) drop-shadow(0 0 40px rgba(244, 114, 182, 0.1))' }}
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* Content Section - Desktop */}
        <div className="relative z-10 hidden flex-col justify-end space-y-4 p-6 pb-8 pt-4 sm:space-y-5 sm:p-8 sm:pb-10 md:p-10 md:pb-12 lg:flex lg:justify-center lg:space-y-8 lg:p-12 xl:p-16">
          {/* Heading - hidden on mobile, shown on desktop */}
          <div className="hidden space-y-2 sm:space-y-3 lg:block">
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Hi, I'm
              <span className="block bg-linear-to-r from-rose-400 via-pink-300 to-rose-500 bg-clip-text text-transparent">
                Soumya Vatsa
              </span>
            </h1>
            <p className="max-w-xl text-sm text-white/70 sm:text-base md:text-lg lg:text-xl">
              Bachelor of Design student at NIFT Chennai specializing in Fashion Styling and Digital Communication.
            </p>
          </div>

          {/* Section Buttons */}
          <div className="hidden lg:block">
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50">
                <span className="h-px w-8 bg-white/30" />
                Explore Work
              </h3>
              <div className="flex flex-wrap gap-2">
                {sections.filter(s => s.is_published).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const element = document.getElementById(`section-${section.slug}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 hover:scale-105 hover:shadow-lg"
                  >
                    {/* Top gradient line */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
                    
                    {/* Left gradient line */}
                    <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-white/60 via-transparent to-white/20" />
                    
                    <span className="relative flex items-center gap-2">
                      {section.title}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    const element = document.getElementById('skills');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 hover:scale-105 hover:shadow-lg"
                >
                  {/* Top gradient line */}
                  <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
                  
                  {/* Left gradient line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-white/60 via-transparent to-white/20" />
                  
                  <span className="relative flex items-center gap-2">
                    Skills
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="group relative overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-200 shadow-[0_4px_16px_rgba(244,114,182,0.2),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition hover:border-rose-500/40 hover:bg-rose-500/20 hover:scale-105 hover:shadow-lg"
                >
                  {/* Top gradient line */}
                  <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-rose-300/60 to-transparent" />
                  
                  {/* Left gradient line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-rose-300/60 via-transparent to-rose-300/20" />
                  
                  <span className="relative flex items-center gap-2">
                    Contact
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section - Desktop only */}
        <div className="relative hidden items-end justify-center pb-0 lg:flex lg:items-stretch">
          {/* Image with transparent bg - full height */}
          <div className="relative z-10 h-full w-full">
            <Image
              src={heroImage}
              alt="Soumya Vatsa smiling with pencil"
              priority
              fill
              className="pointer-events-none object-contain object-center"
              style={{ filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.15)) drop-shadow(0 0 40px rgba(244, 114, 182, 0.1))' }}
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

