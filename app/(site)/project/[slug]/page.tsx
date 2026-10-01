import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type MediaItem = {
  id: string;
  project_id: string;
  type: "image" | "video";
  url: string;
  title: string | null;
  display_order: number | null;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  year: number | null;
  role: string | null;
  tags: string[] | null;
};

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  await connection();

  const { slug } = await params;

  const supabase = await createClient();

  // Mengambil data project
  const {
    data: projectData,
    error: projectError,
  } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (projectError) {
    console.error("Project fetch error:", projectError);
    notFound();
  }

  if (!projectData) {
    notFound();
  }

  const project = projectData as Project;

  // Mengambil media project
  const {
    data: media,
    error: mediaError,
  } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", project.id)
    .order("display_order", {
      ascending: true,
    });

  if (mediaError) {
    console.error("Media fetch error:", mediaError);
  }

  // Membuat signed URL dari Storage private
  const adminSupabase = createAdminClient();

  const mediaWithUrls = await Promise.all(
    ((media ?? []) as MediaItem[]).map(async (item) => {
      const { data, error } = await adminSupabase.storage
        .from("portfolio-media")
        .createSignedUrl(item.url, 3600);

      if (error) {
        console.error("Signed URL error:", {
          mediaId: item.id,
          mediaPath: item.url,
          error: error.message,
        });
      }

      return {
        ...item,
        signedUrl: data?.signedUrl ?? null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-[#1c1c1c] px-5 pb-24 pt-32 text-white sm:px-8 md:px-12 md:pt-40">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/work"
          className="group mb-12 inline-flex items-center gap-3 text-sm text-white/50 transition hover:text-[#ff5a1f]"
        >
          <span className="text-lg transition-transform group-hover:-translate-x-1">
            ←
          </span>

          Back to Work
        </Link>

        {/* Project Header */}
        <header className="mb-16 max-w-5xl">
          {/* Category and Year */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
            {project.category && (
              <span>{project.category}</span>
            )}

            {project.category && project.year && (
              <span className="text-white/30">/</span>
            )}

            {project.year && <span>{project.year}</span>}
          </div>

          {/* Title */}
          <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
            {project.title}
          </h1>

          {/* Description */}
          {project.description && (
            <p className="mt-8 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
              {project.description}
            </p>
          )}

          {/* Project Information */}
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 md:grid-cols-3">
            {/* Role */}
            {project.role && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-white/40">
                  Role
                </p>

                <p className="text-sm font-medium text-white/90">
                  {project.role}
                </p>
              </div>
            )}

            {/* Category */}
            {project.category && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-white/40">
                  Category
                </p>

                <p className="text-sm font-medium text-white/90">
                  {project.category}
                </p>
              </div>
            )}

            {/* Year */}
            {project.year && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-white/40">
                  Year
                </p>

                <p className="text-sm font-medium text-white/90">
                  {project.year}
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Media Gallery */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Project Showcase
            </p>

            <p className="text-xs text-white/30">
              {mediaWithUrls.length}{" "}
              {mediaWithUrls.length === 1
                ? "Media"
                : "Media Files"}
            </p>
          </div>

          {mediaWithUrls.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 px-6 py-16 text-center">
              <p className="text-sm text-white/50">
                Belum ada gambar atau video untuk project ini.
              </p>
            </div>
          )}

          <div className="grid gap-6">
            {mediaWithUrls.map((item, index) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >
                {item.signedUrl &&
                  item.type === "image" && (
                    <div className="relative overflow-hidden">
                      <img
                        src={item.signedUrl}
                        alt={
                          item.title ||
                          `${project.title} image ${index + 1}`
                        }
                        loading={
                          index === 0 ? "eager" : "lazy"
                        }
                        className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.01]"
                      />
                    </div>
                  )}

                {item.signedUrl &&
                  item.type === "video" && (
                    <video
                      src={item.signedUrl}
                      controls
                      preload="metadata"
                      playsInline
                      className="h-auto w-full"
                    >
                      Browser kamu tidak mendukung
                      pemutaran video.
                    </video>
                  )}

                {!item.signedUrl && (
                  <div className="p-8 text-center text-sm text-red-400">
                    Media gagal dimuat. Periksa path
                    Storage.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-sm text-white/50 transition hover:text-[#ff5a1f]"
          >
            <span className="text-lg transition-transform group-hover:-translate-x-1">
              ←
            </span>

            View All Projects
          </Link>
        </div>
      </div>
    </main>
  );
}