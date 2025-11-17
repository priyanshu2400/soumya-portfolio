type DataStatusBadgeProps = {
  sourcedFromSupabase: boolean;
};

export const DataStatusBadge = ({
  sourcedFromSupabase,
}: DataStatusBadgeProps) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-xs text-white/70">
      <span
        className={`inline-block h-2 w-2 rounded-full ${sourcedFromSupabase ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
      />
      {sourcedFromSupabase ? (
        <p>Live data syncing from Supabase</p>
      ) : (
        <p>
          Showing sample content — connect Supabase to pull the latest uploads.
        </p>
      )}
    </div>
  );
};

