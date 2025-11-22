import { redirect } from "next/navigation";

import {
  getAllSections,
  getAuthenticatedUser,
} from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StorageStats } from "@/components/admin/StorageStats";
import { AdminTabs } from "@/components/admin/AdminTabs";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  const sections = await getAllSections();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 md:gap-8">
      <AdminHeader email={user.email ?? "admin"} />
      <StorageStats />
      <AdminTabs sections={sections} />
    </main>
  );
}

