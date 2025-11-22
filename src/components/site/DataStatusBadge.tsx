type DataStatusBadgeProps = {
  sourcedFromSupabase: boolean;
};

export const DataStatusBadge = ({
  sourcedFromSupabase,
}: DataStatusBadgeProps) => {
  if (sourcedFromSupabase) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-xs text-white/70">
      <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
      <p>
        Showing sample content — connect to database to pull the latest uploads.
      </p>
    </div>
  );
};

