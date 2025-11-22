import { PortfolioSection } from "@/lib/types";
import { SectionCard } from "./SectionCard";
import { IntroCard } from "./IntroCard";

type SectionGridProps = {
  sections: PortfolioSection[];
};

export const SectionGrid = ({ sections }: SectionGridProps) => {
  return (
    <section id="sections" className="space-y-20 md:space-y-32">
      <div className="space-y-20 md:space-y-32">
        {sections.map((section, index) => (
          index === 0 ? (
            <IntroCard key={section.id} section={section} />
          ) : (
            <SectionCard key={section.id} section={section} />
          )
        ))}
      </div>
    </section>
  );
};

