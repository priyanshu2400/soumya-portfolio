import { redirect } from "next/navigation";

import {
  getAllSections,
  getAuthenticatedUser,
} from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploadForm } from "@/components/admin/ImageUploadForm";
import { SectionList } from "@/components/admin/SectionList";
import { ImageManager } from "@/components/admin/ImageManager";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  const sections = await getAllSections();

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-16">
      <AdminHeader email={user.email ?? "admin"} />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <ImageUploadForm sections={sections} />
        <SectionList sections={sections} />
      </div>
      <ImageManager sections={sections} />
    </main>
  );
}

