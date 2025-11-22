"use client";

import { useState, useEffect } from "react";
import { PortfolioSection } from "@/lib/types";

type FloatingNavProps = {
  sections: PortfolioSection[];
};

export const FloatingNav = ({ sections }: FloatingNavProps) => {
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [showWorkMenu, setShowWorkMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show nav only when scrolled down from top
      setShowNav(scrollY > 100);

      const windowHeight = window.innerHeight;
      const viewportMiddle = scrollY + windowHeight / 3;
      
      // Check which section is in view
      let currentSection = "";
      
      // Check hero
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const top = heroElement.offsetTop;
        const bottom = top + heroElement.offsetHeight;
        if (viewportMiddle >= top && viewportMiddle < bottom) {
          currentSection = 'hero';
        }
      }

      // Check intro
      const introElement = document.getElementById('intro');
      if (introElement) {
        const top = introElement.offsetTop;
        const bottom = top + introElement.offsetHeight;
        if (viewportMiddle >= top && viewportMiddle < bottom) {
          currentSection = 'intro';
        }
      }

      // Check skills
      const skillsElement = document.getElementById('skills');
      if (skillsElement) {
        const top = skillsElement.offsetTop;
        const bottom = top + skillsElement.offsetHeight;
        if (viewportMiddle >= top && viewportMiddle < bottom) {
          currentSection = 'skills';
        }
      }

      // Check portfolio sections
      sections.filter(s => s.is_published).forEach((section) => {
        const element = document.getElementById(`section-${section.slug}`);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;
          if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
            currentSection = `section-${section.slug}`;
          }
        }
      });

      // Check contact
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const top = contactElement.offsetTop;
        const bottom = top + contactElement.offsetHeight;
        if (viewportMiddle >= top && viewportMiddle < bottom) {
          currentSection = 'contact';
        }
      }
      
      console.log('Active section:', currentSection);
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isWorkActive = sections.filter(s => s.is_published).some(section => activeSection === `section-${section.slug}`);

  return (
    <>
      {/* Work sections dropdown menu - Mobile only */}
      {showWorkMenu && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowWorkMenu(false)}
        >
          <div className="absolute bottom-20 left-0 right-0 px-4">
            <div className="p-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {sections.filter(s => s.is_published).map((section) => {
                  const isActive = activeSection === `section-${section.slug}`;
                  return (
                    <button
                      key={section.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(`section-${section.slug}`);
                        setShowWorkMenu(false);
                      }}
                      className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                        isActive
                          ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)]'
                          : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                      }`}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation bar */}
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out
          bottom-0 md:top-6
          ${
          showNav 
            ? 'opacity-100 translate-y-0 md:translate-y-0' 
            : 'opacity-0 translate-y-full md:-translate-y-full pointer-events-none'
        }`}
      >
        <div className="w-full">
          <div className="px-2 py-2 md:max-w-fit md:mx-auto">
            {/* Mobile Navigation - 4 buttons at bottom */}
            <div className="flex md:hidden flex-col gap-2 px-2">
              {/* Active work section shown above main nav */}
              {isWorkActive && (
                <div className="flex justify-center">
                  {sections.filter(s => s.is_published).map((section) => {
                    if (activeSection === `section-${section.slug}`) {
                      return (
                        <button
                          key={section.id}
                          onClick={() => handleClick(`section-${section.slug}`)}
                          className="relative overflow-hidden rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)]"
                        >
                          {section.title}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* Main navigation buttons */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    handleClick('hero');
                    setShowWorkMenu(false);
                  }}
                  className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    activeSection === 'hero'
                      ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)]'
                      : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                  }`}
                >
                  Top
                </button>

                <button
                  onClick={() => setShowWorkMenu(!showWorkMenu)}
                  className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    showWorkMenu
                      ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)]'
                      : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                  }`}
                >
                  Work
                </button>

                <button
                  onClick={() => {
                    handleClick('skills');
                    setShowWorkMenu(false);
                  }}
                  className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    activeSection === 'skills'
                      ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)]'
                      : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                  }`}
                >
                  Skills
                </button>

                <button
                  onClick={() => {
                    handleClick('contact');
                    setShowWorkMenu(false);
                  }}
                  className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    activeSection === 'contact'
                      ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)]'
                      : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Desktop Navigation - All buttons */}
            <div className="hidden md:flex flex-wrap gap-2 justify-center px-2">
              <button
                onClick={() => handleClick('hero')}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeSection === 'hero'
                    ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)] scale-110'
                    : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                }`}
              >
                Top
              </button>

              {sections.filter(s => s.is_published).map((section) => {
                const isActive = activeSection === `section-${section.slug}`;

                return (
                  <button
                    key={section.id}
                    onClick={() => handleClick(`section-${section.slug}`)}
                    className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)] scale-110'
                        : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                    }`}
                  >
                    {section.title}
                  </button>
                );
              })}

              <button
                onClick={() => handleClick('skills')}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeSection === 'skills'
                    ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)] scale-110'
                    : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                }`}
              >
                Skills
              </button>

              <button
                onClick={() => handleClick('contact')}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeSection === 'contact'
                    ? 'backdrop-blur-xl bg-linear-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border-2 border-pink-300/60 text-white shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(255,255,255,0.2)] scale-110'
                    : 'backdrop-blur-lg bg-white/15 border border-white/30 text-white/70 hover:bg-white/20 hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
