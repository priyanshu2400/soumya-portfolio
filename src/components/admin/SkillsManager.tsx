"use client";

import { useState, useEffect } from "react";
import { Skill } from "@/lib/types";
import { Plus, Trash2, Save, X } from "lucide-react";

export const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", category: "core" as "core" | "tool", order: 0 });
  const [newSkillForm, setNewSkillForm] = useState({ name: "", category: "core" as "core" | "tool" });

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      const data = await response.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillForm.name.trim()) return;

    try {
      const maxOrder = Math.max(
        0,
        ...skills.filter(s => s.category === newSkillForm.category).map(s => s.order)
      );

      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSkillForm,
          order: maxOrder + 1,
        }),
      });

      if (response.ok) {
        setNewSkillForm({ name: "", category: "core" });
        fetchSkills();
      }
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  };

  const handleUpdateSkill = async (id: string) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setEditingId(null);
        fetchSkills();
      }
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  const startEditing = (skill: Skill) => {
    setEditingId(skill.id);
    setEditForm({ name: skill.name, category: skill.category, order: skill.order });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: "", category: "core", order: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/60">Loading skills...</div>
      </div>
    );
  }

  const coreSkills = (skills || []).filter(s => s.category === "core").sort((a, b) => a.order - b.order);
  const toolSkills = (skills || []).filter(s => s.category === "tool").sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Add New Skill Form */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:rounded-xl sm:p-6">
        <h3 className="mb-3 text-sm font-semibold text-white sm:mb-4 sm:text-lg">Add New Skill</h3>
        <form onSubmit={handleAddSkill} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <input
            type="text"
            placeholder="Skill name"
            value={newSkillForm.name}
            onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white placeholder-white/40 focus:border-rose-500/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 sm:px-4 sm:py-2 sm:text-base"
          />
          <select
            value={newSkillForm.category}
            onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value as "core" | "tool" })}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-rose-500/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 sm:px-4 sm:py-2 sm:text-base"
          >
            <option value="core">Core Skill</option>
            <option value="tool">Tool/Software</option>
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-200 transition hover:border-rose-500/40 hover:bg-rose-500/20 sm:px-4 sm:py-2 sm:text-base"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Add
          </button>
        </form>
      </div>

      {/* Core Skills */}
      <div className="space-y-2 sm:space-y-4">
        <h3 className="text-sm font-semibold text-white sm:text-lg">Core Skills</h3>
        {editingId && coreSkills.some(s => s.id === editingId) && (
          <div className="space-y-2 rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm sm:space-y-0">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="flex-1 rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:border-rose-500/50 focus:outline-none sm:py-1.5"
                placeholder="Skill name"
              />
              <input
                type="number"
                value={editForm.order}
                onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) })}
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:border-rose-500/50 focus:outline-none sm:w-20 sm:py-1.5"
                placeholder="Order #"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateSkill(editingId)}
                className="flex-1 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-200 transition hover:bg-green-500/20 sm:flex-none sm:py-1.5"
              >
                Save
              </button>
              <button
                onClick={cancelEditing}
                className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 sm:flex-none sm:py-1.5"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {coreSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
              <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-white/60 via-transparent to-white/20" />
              <span className="relative">{skill.name}</span>
              <span className="relative text-[10px] text-white/40">#{skill.order}</span>
              <button
                onClick={() => startEditing(skill)}
                className="relative ml-1 opacity-60 transition hover:opacity-100"
                title="Edit"
              >
                <Save className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              <button
                onClick={() => handleDeleteSkill(skill.id)}
                className="relative opacity-60 transition hover:text-red-300 hover:opacity-100"
                title="Delete"
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Software */}
      <div className="space-y-2 sm:space-y-4">
        <h3 className="text-sm font-semibold text-white sm:text-lg">Tools & Software</h3>
        {editingId && toolSkills.some(s => s.id === editingId) && (
          <div className="space-y-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 backdrop-blur-sm sm:space-y-0">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="flex-1 rounded border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm text-white focus:border-rose-500/50 focus:outline-none sm:py-1.5"
                placeholder="Tool name"
              />
              <input
                type="number"
                value={editForm.order}
                onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) })}
                className="w-full rounded border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm text-white focus:border-rose-500/50 focus:outline-none sm:w-20 sm:py-1.5"
                placeholder="Order #"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateSkill(editingId)}
                className="flex-1 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-200 transition hover:bg-green-500/20 sm:flex-none sm:py-1.5"
              >
                Save
              </button>
              <button
                onClick={cancelEditing}
                className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 sm:flex-none sm:py-1.5"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {toolSkills.map((skill) => (
            <div
              key={skill.id}
              className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200 shadow-[0_2px_8px_rgba(244,114,182,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-md transition hover:border-rose-500/40 hover:bg-rose-500/20 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-rose-300/60 to-transparent" />
              <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-rose-300/60 via-transparent to-rose-300/20" />
              <span className="relative">{skill.name}</span>
              <span className="relative text-[10px] text-rose-200/40">#{skill.order}</span>
              <button
                onClick={() => startEditing(skill)}
                className="relative ml-1 opacity-60 transition hover:opacity-100"
                title="Edit"
              >
                <Save className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              <button
                onClick={() => handleDeleteSkill(skill.id)}
                className="relative opacity-60 transition hover:text-red-300 hover:opacity-100"
                title="Delete"
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
