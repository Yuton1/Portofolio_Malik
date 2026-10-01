import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { NewProjectForm } from "@/components/admin/NewProjectForm";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold">
          Add Project
        </h1>

        <p className="mt-3 text-white/50">
          Create a new portfolio project.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <NewProjectForm />
        </div>

        <Link
          href="/admin/projects"
          className="mt-8 inline-block text-sm text-white/50 hover:text-white"
        >
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}