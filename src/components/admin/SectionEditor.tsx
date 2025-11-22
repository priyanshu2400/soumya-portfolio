"use client";

import { useState } from "react";
import { PortfolioSection } from "@/lib/types";
import { Pencil, Plus, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  sections: PortfolioSection[];
};

export const SectionEditor = ({ sections }: Props) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    content: Array<{ heading: string; body_text: string }>;
  }>({ title: "", description: "", content: [] });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const startEditing = (section: PortfolioSection) => {
    setEditingSection(section.id);
    setFormData({
      title: section.title,
      description: section.description || "",
      content: section.content.map(c => ({
        heading: c.heading || "",
        body_text: c.body_text || "",
      })),
    });
    setMessage(null);
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setFormData({ title: "", description: "", content: [] });
    setMessage(null);
  };

  const addContentBlock = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { heading: "", body_text: "" }],
    });
  };

  const removeContentBlock = (index: number) => {
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index),
    });
  };

  const updateContentBlock = (index: number, field: "heading" | "body_text", value: string) => {
    const updated = [...formData.content];
    updated[index][field] = value;
    setFormData({ ...formData, content: updated });
  };

  const handleSave = async () => {
    if (!editingSection) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/sections/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId: editingSection,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update section");
      }

      setMessage({ type: "success", text: "Section updated successfully!" });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to update section. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-white sm:rounded-3xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm sm:tracking-[0.4em]">
            Edit Sections
          </p>
          <p className="mt-1 text-xs text-white/40">Manage titles, descriptions, and content</p>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-500/20 text-emerald-200"
              : "bg-red-500/20 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <ul className="space-y-2 sm:space-y-3">
        {sections.map((section) => (
          <li key={section.id} className="rounded-xl border border-white/10 sm:rounded-2xl">
            {editingSection === section.id ? (
              <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
                <div>
                  <label className="mb-1 block text-xs text-white/70">Section Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    placeholder="Section title"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-white/70">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    placeholder="Brief description"
                    rows={3}
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs text-white/70">Content Blocks</label>
                    <button
                      onClick={addContentBlock}
                      className="flex items-center gap-1 rounded-lg bg-rose-500/20 px-3 py-2 text-xs font-medium text-rose-200 hover:bg-rose-500/30 active:scale-95"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Add Block</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {formData.content.map((block, index) => (
                      <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-2.5 sm:p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-white/50">Block {index + 1}</span>
                          <button
                            onClick={() => removeContentBlock(index)}
                            className="rounded p-1 text-red-400 hover:bg-red-500/10 hover:text-red-300 active:scale-95"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={block.heading}
                          onChange={(e) => updateContentBlock(index, "heading", e.target.value)}
                          className="mb-2 w-full rounded border border-white/20 bg-white/5 px-2.5 py-2 text-sm text-white placeholder-white/40"
                          placeholder="Heading (optional)"
                        />
                        <textarea
                          value={block.body_text}
                          onChange={(e) => updateContentBlock(index, "body_text", e.target.value)}
                          className="w-full rounded border border-white/20 bg-white/5 px-2.5 py-2 text-sm text-white placeholder-white/40"
                          placeholder="Body text"
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/30 active:scale-95 disabled:opacity-50 sm:flex-initial"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/15 active:scale-95 disabled:opacity-50 sm:flex-initial"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex w-full items-start justify-between gap-3 p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex flex-1 min-w-0 flex-col text-left hover:opacity-80"
                  >
                    <p className="font-semibold text-sm sm:text-base truncate">{section.title}</p>
                    {section.description && expandedSection !== section.id && (
                      <p className="mt-1 text-xs text-white/60 line-clamp-1 sm:text-sm">{section.description}</p>
                    )}
                    {section.content.length > 0 && (
                      <p className="mt-1 text-xs text-white/40">
                        {section.content.length} block{section.content.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(section)}
                      className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/15 active:scale-95"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="text-white/60 hover:text-white"
                    >
                      {expandedSection === section.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedSection === section.id && (
                  <div className="border-t border-white/10 p-3 sm:p-4">
                    {section.description && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-white/50 mb-1">Description:</p>
                        <p className="text-sm text-white/70">{section.description}</p>
                      </div>
                    )}
                    {section.content.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-white/50 mb-2">Content Blocks:</p>
                        <div className="space-y-2">
                          {section.content.map((block, idx) => (
                            <div key={block.id} className="rounded-lg bg-white/5 p-2.5 text-xs sm:text-sm">
                              {block.heading && (
                                <p className="font-semibold text-white mb-1">{block.heading}</p>
                              )}
                              {block.body_text && (
                                <p className="text-white/70">{block.body_text}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
