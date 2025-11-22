import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

type Props = {
  email: string;
};

export const AdminHeader = ({ email }: Props) => {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:rounded-3xl sm:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 sm:tracking-[0.4em]">
          Admin Console
        </p>
        <h1 className="text-xl font-semibold sm:text-2xl">Content & Assets</h1>
        <p className="mt-1 text-xs text-white/60 sm:text-sm">Signed in as {email}</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white sm:tracking-[0.2em]"
        >
          View Site
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
};

