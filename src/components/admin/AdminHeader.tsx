import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

type Props = {
  email: string;
};

export const AdminHeader = ({ email }: Props) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Admin Console
        </p>
        <h1 className="text-2xl font-semibold">Content & Assets</h1>
        <p className="text-sm text-white/60">Signed in as {email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white"
        >
          View Site
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
};

