import Link from "next/link";
import { Plus, Pencil, Eye, FileText } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const supabase = await createClient();

  // Cek user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Cek admin
  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/");
  }

  // Ambil semua project
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
              Admin Panel
            </p>

            <h1 className="text-4xl font-bold">
              Manage Projects
            </h1>

            <p className="mt-3 text-white/50">
              Create and manage your portfolio projects.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a1f] px-5 py-3 font-semibold text-black transition hover:bg-[#ff713d]"
          >
            <Plus size={18} />
            Add Project
          </Link>
        </div>

        {/* Project List */}
        {projects && projects.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.04] text-white/50">
                  <tr>
                    <th className="px-5 py-4">Title</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Year</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-white/10 last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <FileText
                            size={18}
                            className="text-[#ff5a1f]"
                          />

                          <div>
                            <p className="font-medium">
                              {project.title}
                            </p>

                            <p className="mt-1 text-xs text-white/40">
                              {project.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {project.category}
                      </td>

                      <td className="px-5 py-5 text-white/60">
                        {project.year ?? "-"}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            project.status === "published"
                              ? "bg-green-500/15 text-green-400"
                              : "bg-yellow-500/15 text-yellow-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="inline-flex items-center gap-2 text-white/60 transition hover:text-[#ff5a1f]"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-20 text-center">
            <FileText
              size={40}
              className="mx-auto mb-5 text-white/30"
            />

            <h2 className="text-xl font-semibold">
              No projects yet
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Start by creating your first portfolio project.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff5a1f] px-5 py-3 font-semibold text-black"
            >
              <Plus size={18} />
              Create Project
            </Link>
          </div>
        )}

        {/* Back */}
        <Link
          href="/protected"
          className="mt-8 inline-block text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}