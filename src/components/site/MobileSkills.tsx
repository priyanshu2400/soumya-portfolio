import { Skill } from "@/lib/types";

type MobileSkillsProps = {
  skills: Skill[];
};

export const MobileSkills = ({ skills }: MobileSkillsProps) => {
  const coreSkills = skills.filter(s => s.category === 'core').sort((a, b) => a.order - b.order);
  const toolSkills = skills.filter(s => s.category === 'tool').sort((a, b) => a.order - b.order);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {/* Core Skills */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 sm:text-sm">
            <span className="h-px w-8 bg-white/30 sm:w-10" />
            Core Skills
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {coreSkills.map((skill) => (
              <span 
                key={skill.id} 
                className="rounded-full border border-white/30 bg-transparent px-3 py-1.5 text-xs font-normal text-white/80 sm:px-4 sm:py-2 sm:text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Tools & Software */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 sm:text-sm">
            <span className="h-px w-8 bg-rose-500/30 sm:w-10" />
            Tools & Software
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {toolSkills.map((skill) => (
              <span 
                key={skill.id} 
                className="rounded-full border border-rose-400/40 bg-transparent px-3 py-1.5 text-xs font-normal text-rose-200/90 sm:px-4 sm:py-2 sm:text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
