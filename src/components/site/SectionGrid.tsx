import { PortfolioSection } from "@/lib/types";
import { SectionCard } from "./SectionCard";

type SectionGridProps = {
  sections: PortfolioSection[];
};

export const SectionGrid = ({ sections }: SectionGridProps) => {
  return (
    <section id="sections" className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Core Work
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Research, image, and spatial stories
          </h2>
        </div>
        <p className="text-sm text-white/60 max-w-md">
          Each section syncs automatically with Supabase, so new uploads and
          copy updates through the admin dashboard appear in real-time.
        </p>
      </header>
      <div className="grid gap-6">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
};

