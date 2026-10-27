import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FolderOpen } from "lucide-react";
import { ProjectGallery } from "@/components/site/ProjectGallery";

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

type MediaWithUrl = MediaItem & {
  signedUrl: string | null;
};

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  await connection();

  const { slug } = await params;
  const supabase = await createClient();

  // Fetch published project
  const {
    data: projectData,
    error: projectError,
  } = await supabase
    .from("projects")
    .select(
      "id, title, slug, description, category, year, role, tags"
    )
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

  // Fetch project media
  const {
    data: media,
    error: mediaError,
  } = await supabase
    .from("project_media")
    .select(
      "id, project_id, type, url, title, display_order"
    )
    .eq("project_id", project.id)
    .order("display_order", {
      ascending: true,
    });

  if (mediaError) {
    console.error("Media fetch error:", mediaError);
  }

  // Generate signed URLs for private Storage
  const adminSupabase = createAdminClient();

  const mediaWithUrls: MediaWithUrl[] = await Promise.all(
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

  // Use the first successfully loaded media as the hero.
  const heroMediaIndex = mediaWithUrls.findIndex(
    (item) => item.signedUrl !== null
  );

  const heroMedia =
    heroMediaIndex >= 0
      ? mediaWithUrls[heroMediaIndex]
      : null;

  // Exclude hero media from the gallery.
  const galleryMedia = mediaWithUrls.filter(
    (_, index) => index !== heroMediaIndex
  );

  return (
    <main className="min-h-screen bg-white pb-24 pt-28 text-[#1c1c1c] dark:bg-[#1c1c1c] dark:text-white sm:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Back navigation */}
        <Link
          href="/work"
          className="group mb-12 inline-flex items-center gap-3 text-sm text-black/50 transition-colors hover:text-[#ff5a1f] dark:text-white/50"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>

        {/* Project header */}
        <header className="mb-12 md:mb-16">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]">
            {project.category && (
              <span className="text-[#ff5a1f]">
                {project.category}
              </span>
            )}

            {project.category && project.year && (
              <span className="text-black/20 dark:text-white/20">
                /
              </span>
            )}

            {project.year && (
              <span className="text-black/40 dark:text-white/40">
                {project.year}
              </span>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr] lg:items-end">
            <h1 className="max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
              {project.title}
              <span className="text-[#ff5a1f]">.</span>
            </h1>

            {project.description && (
              <p className="max-w-xl text-sm leading-7 text-black/60 dark:text-white/60 sm:text-base sm:leading-8 lg:justify-self-end">
                {project.description}
              </p>
            )}
          </div>

          {/* Project metadata */}
          <div className="mt-10 grid grid-cols-2 gap-6 border-y border-black/10 py-6 dark:border-white/10 md:grid-cols-3">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                Project Type
              </p>

              <p className="text-sm font-medium">
                {project.category ?? "Creative Project"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                My Role
              </p>

              <p className="text-sm font-medium">
                {project.role ?? "Creative"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                Year
              </p>

              <p className="text-sm font-medium">
                {project.year ?? "—"}
              </p>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-black/10 px-4 py-2 text-xs text-black/60 dark:border-white/10 dark:text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <ProjectGallery media={mediaWithUrls} projectTitle={project.title} />

        {/* Bottom navigation */}
        <footer className="mt-20 border-t border-black/10 pt-8 dark:border-white/10 md:mt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                Explore More
              </p>

              <p className="text-lg font-medium">
                Discover other projects.
              </p>
            </div>

            <Link
              href="/work"
              className="group inline-flex items-center justify-center gap-3 self-start rounded-full bg-[#ff5a1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff7040] sm:self-auto"
            >
              View All Projects

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}