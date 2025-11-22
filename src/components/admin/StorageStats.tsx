"use client";

import { useEffect, useState } from "react";
import { HardDrive, RefreshCw } from "lucide-react";

type StorageData = {
  totalSize: number;
  maxStorage: number;
  usedPercentage: number;
  remainingBytes: number;
  fileCount: number;
  formattedUsed: string;
  formattedMax: string;
  formattedRemaining: string;
};

export const StorageStats = () => {
  const [storage, setStorage] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/storage/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch storage stats");
      }
      const data = await response.json();
      setStorage(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load storage stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-white sm:rounded-3xl sm:p-6">
        <div className="flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-white/50" />
          <p className="text-sm text-white/50">Loading storage stats...</p>
        </div>
      </div>
    );
  }

  if (error || !storage) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-white sm:rounded-3xl sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-red-400" />
            <p className="text-sm text-red-300">{error || "Error loading storage stats"}</p>
          </div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/15 active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isWarning = storage.usedPercentage > 75;
  const isCritical = storage.usedPercentage > 90;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-white sm:rounded-3xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className={`rounded-lg p-2 ${isCritical ? "bg-red-500/20" : isWarning ? "bg-amber-500/20" : "bg-emerald-500/20"}`}>
            <HardDrive className={`h-5 w-5 ${isCritical ? "text-red-300" : isWarning ? "text-amber-300" : "text-emerald-300"}`} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm sm:tracking-[0.4em]">
              Storage Usage
            </p>
            <p className="mt-1 text-lg font-semibold sm:text-xl">
              {storage.formattedUsed} <span className="text-sm font-normal text-white/50">of {storage.formattedMax}</span>
            </p>
            <p className="mt-0.5 text-xs text-white/50">
              {storage.fileCount} file{storage.fileCount !== 1 ? "s" : ""} • {storage.formattedRemaining} remaining
            </p>
          </div>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 self-start rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/15 active:scale-95 sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <div className="mt-4">
        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full transition-all duration-500 ${
              isCritical
                ? "bg-linear-to-r from-red-500 to-red-600"
                : isWarning
                  ? "bg-linear-to-r from-amber-500 to-amber-600"
                  : "bg-linear-to-r from-emerald-500 to-emerald-600"
            }`}
            style={{ width: `${Math.min(storage.usedPercentage, 100)}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-white/50">
          <span>{storage.usedPercentage}% used</span>
          {isCritical && (
            <span className="font-medium text-red-300">⚠ Storage almost full</span>
          )}
          {isWarning && !isCritical && (
            <span className="font-medium text-amber-300">⚠ Consider cleaning up</span>
          )}
        </div>
      </div>

      <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/60">
        💡 Supabase free tier includes 1GB storage. Delete unused images to free up space.
      </p>
    </div>
  );
};
