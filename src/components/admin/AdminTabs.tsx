"use client";

import { useState } from "react";
import { Upload, FileText, LayoutGrid, Image as ImageIcon, Sparkles } from "lucide-react";
import { PortfolioSection } from "@/lib/types";
import { ImageUploadForm } from "./ImageUploadForm";
import { SectionEditor } from "./SectionEditor";
import { SectionList } from "./SectionList";
import { ImageManager } from "./ImageManager";
import { SkillsManager } from "./SkillsManager";

type Props = {
  sections: PortfolioSection[];
};

type TabId = "overview" | "edit" | "upload" | "library" | "skills";

const tabs: Array<{ id: TabId; label: string; icon: typeof LayoutGrid; description: string }> = [
  { id: "overview", label: "Overview", icon: LayoutGrid, description: "Section summary" },
  { id: "edit", label: "Edit Content", icon: FileText, description: "Titles & text" },
  { id: "skills", label: "Skills", icon: Sparkles, description: "Manage skills" },
  { id: "upload", label: "Upload", icon: Upload, description: "Add images" },
  { id: "library", label: "Library", icon: ImageIcon, description: "Manage files" },
];

export const AdminTabs = ({ sections }: Props) => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tab Navigation */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-2 sm:rounded-3xl sm:p-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl p-3 text-center transition sm:flex-row sm:gap-2 sm:rounded-2xl sm:p-4 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-lg"
                    : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 sm:h-5 sm:w-5 ${isActive ? "text-slate-900" : "text-current"}`} />
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-xs font-semibold sm:text-sm">{tab.label}</span>
                  <span className={`hidden text-xs sm:inline ${isActive ? "text-slate-600" : "text-white/50"}`}>
                    {tab.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="animate-fadeIn">
            <SectionList sections={sections} />
          </div>
        )}
        
        {activeTab === "edit" && (
          <div className="animate-fadeIn">
            <SectionEditor sections={sections} />
          </div>
        )}
        
        {activeTab === "skills" && (
          <div className="animate-fadeIn">
            <SkillsManager />
          </div>
        )}
        
        {activeTab === "upload" && (
          <div className="animate-fadeIn">
            <ImageUploadForm sections={sections} />
          </div>
        )}
        
        {activeTab === "library" && (
          <div className="animate-fadeIn">
            <ImageManager sections={sections} />
          </div>
        )}
      </div>
    </div>
  );
};
