import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FolderKanban,
  Image,
  Plus,
  Settings,
  ArrowRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  // Memeriksa user yang sedang login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Memeriksa apakah user terdaftar sebagai admin
  const { data: admin } = await supabase
    .from("admin_users")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/");
  }

  // Mengambil jumlah project
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  // Mengambil jumlah media
  const { count: mediaCount } = await supabase
    .from("project_media")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-[#1c1c1c] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
              Admin Panel
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              Welcome, Ahsan.
            </h1>

            <p className="mt-3 text-white/50">
              Manage your portfolio projects and media.
            </p>
          </div>

          <div className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">
            {user.email}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <FolderKanban className="mb-5 text-[#ff5a1f]" size={28} />

            <p className="text-sm text-white/50">Total Projects</p>

            <h2 className="mt-2 text-4xl font-bold">
              {projectCount ?? 0}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Image className="mb-5 text-[#ff5a1f]" size={28} />

            <p className="text-sm text-white/50">Total Media</p>

            <h2 className="mt-2 text-4xl font-bold">
              {mediaCount ?? 0}
            </h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/admin/projects"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#ff5a1f]"
          >
            <FolderKanban size={28} className="mb-6 text-[#ff5a1f]" />

            <h3 className="text-lg font-semibold">Manage Projects</h3>

            <p className="mt-2 text-sm text-white/50">
              View and manage your portfolio projects.
            </p>

            <ArrowRight
              className="mt-6 transition-transform group-hover:translate-x-2"
              size={20}
            />
          </Link>

          <Link
            href="/admin/projects/new"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#ff5a1f]"
          >
            <Plus size={28} className="mb-6 text-[#ff5a1f]" />

            <h3 className="text-lg font-semibold">Add Project</h3>

            <p className="mt-2 text-sm text-white/50">
              Create a new portfolio project.
            </p>

            <ArrowRight
              className="mt-6 transition-transform group-hover:translate-x-2"
              size={20}
            />
          </Link>

          <Link
            href="/admin/media"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#ff5a1f]"
          >
            <Image size={28} className="mb-6 text-[#ff5a1f]" />

            <h3 className="text-lg font-semibold">Media Library</h3>

            <p className="mt-2 text-sm text-white/50">
              Manage images and videos.
            </p>

            <ArrowRight
              className="mt-6 transition-transform group-hover:translate-x-2"
              size={20}
            />
          </Link>
        </div>

        {/* Settings */}
        <Link
          href="/admin/settings"
          className="mt-10 flex items-center gap-3 text-sm text-white/50 transition hover:text-white"
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </div>
  );
}