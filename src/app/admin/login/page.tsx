import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  const user = await getAuthenticatedUser();
  if (user) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="text-center text-white">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Supabase Auth
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Admin Access</h1>
        <p className="mt-2 text-white/60">
          Use the credentials created in Supabase Step 6 to manage content.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}

