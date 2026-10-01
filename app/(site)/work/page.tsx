import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function WorkPage() {
  // Mengaktifkan dynamic rendering pada Cache Components
  await connection();

  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, description, category, year, role, cover_image"
    )
    .eq("status", "published")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const adminSupabase = createAdminClient();

  const projectsWithCovers = await Promise.all(
    (projects ?? []).map(async (project) => {
      if (!project.cover_image) {
        return {
          ...project,
          coverUrl: null,
        };
      }

      const { data, error } = await adminSupabase.storage
        .from("portfolio-media")
        .createSignedUrl(project.cover_image, 3600);

      if (error) {
        console.error(
          "Cover image error:",
          error.message
        );
      }

      return {
        ...project,
        coverUrl: data?.signedUrl ?? null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-[#1c1c1c] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
            Selected Work
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Projects that turn ideas
            <br />
            into visual experiences.
          </h1>

          <p className="mt-6 text-white/50">
            A collection of graphic design, motion design,
            and digital experiences.
          </p>
        </div>

        {/* Projects */}
        {projectsWithCovers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
            <p className="text-white/50">
              No published projects yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {projectsWithCovers.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.slug}`}
                className="group block"
              >
                {/* Cover */}
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  {project.coverUrl ? (
                    <img
                      src={project.coverUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-white/30">
                      <FolderOpen className="h-10 w-10" />

                      <span className="text-sm">
                        No cover image
                      </span>
                    </div>
                  )}

                  {/* Hover Icon */}
                  <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black opacity-0 transition duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Information */}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.15em] text-[#ff5a1f]">
                      {project.category ?? "Design"}
                    </p>

                    <h2 className="text-2xl font-semibold transition group-hover:text-[#ff5a1f]">
                      {project.title}
                    </h2>

                    {project.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-white/50">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 text-sm text-white/40">
                    {project.year ?? ""}
                  </span>
                </div>

                {/* Role */}
                {project.role && (
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/30">
                    {project.role}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}