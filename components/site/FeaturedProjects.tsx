import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  year: number | null;
  cover_image: string | null;
};

export async function FeaturedProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, description, category, year, cover_image"
    )
    .eq("status", "published")
    .order("year", {
      ascending: false,
    })
    .limit(6);

  if (error) {
    console.error(
      "Featured projects fetch error:",
      error
    );

    return null;
  }

  const projects = (data ?? []) as Project[];

  if (projects.length === 0) {
    return (
      <section
        className="
          bg-white
          px-6 py-24
          text-[#1c1c1c]
          transition-colors duration-300
          dark:bg-[#1c1c1c]
          dark:text-white
          md:px-10
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
              Selected Work
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              Featured Projects
            </h2>
          </div>

          <div
            className="
              rounded-3xl
              border border-dashed
              border-black/10
              px-6 py-16
              text-center
              dark:border-white/10
            "
          >
            <p className="text-black/40 dark:text-white/40">
              No published projects yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const adminSupabase = createAdminClient();

  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      if (!project.cover_image) {
        return {
          ...project,
          coverUrl: null,
        };
      }

      const {
        data: signedData,
        error: signedError,
      } = await adminSupabase.storage
        .from("portfolio-media")
        .createSignedUrl(
          project.cover_image,
          3600
        );

      if (signedError) {
        console.error(
          "Cover image signed URL error:",
          signedError.message
        );
      }

      return {
        ...project,
        coverUrl: signedData?.signedUrl ?? null,
      };
    })
  );

  return (
    <section
      id="work"
      className="
        bg-white
        px-6 py-24
        text-[#1c1c1c]
        transition-colors duration-300
        dark:bg-[#1c1c1c]
        dark:text-white
        md:px-10 md:py-32
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
              Selected Work
            </p>

            <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Featured Projects
            </h2>
          </div>

          <Link
            href="/work"
            className="
              group inline-flex w-fit
              items-center gap-2
              text-sm
              text-black/50
              transition-colors duration-300
              hover:text-black
              dark:text-white/50
              dark:hover:text-white
            "
          >
            View all projects

            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {projectsWithImages.map(
            (project, index) => (
              <Link
                key={project.id}
                href={`/project/${project.slug}`}
                className={`group block ${
                  index === 0
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`
                    relative overflow-hidden
                    rounded-3xl
                    border
                    border-black/10
                    bg-black/[0.03]
                    transition-colors duration-300
                    dark:border-white/10
                    dark:bg-white/[0.03]
                    ${
                      index === 0
                        ? "aspect-[16/8]"
                        : "aspect-[16/10]"
                    }
                  `}
                >
                  {project.coverUrl ? (
                    <img
                      src={project.coverUrl}
                      alt={project.title}
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                      className="
                        h-full w-full
                        object-cover
                        transition duration-700
                        group-hover:scale-[1.03]
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex h-full
                        items-center justify-center
                        bg-black/[0.03]
                        dark:bg-white/[0.03]
                      "
                    >
                      <span className="text-sm text-black/30 dark:text-white/30">
                        No cover image
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-black/0
                      transition duration-500
                      group-hover:bg-black/20
                    "
                  />

                  {/* Arrow */}
                  <div
                    className="
                      absolute right-5 top-5
                      flex h-12 w-12
                      translate-y-2
                      items-center justify-center
                      rounded-full
                      bg-white
                      text-black
                      opacity-0
                      transition duration-500
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="mt-5">
                  <div
                    className="
                      mb-2 flex flex-wrap
                      items-center gap-2
                      text-xs uppercase
                      tracking-[0.15em]
                      text-black/40
                      dark:text-white/40
                    "
                  >
                    {project.category && (
                      <span>
                        {project.category}
                      </span>
                    )}

                    {project.category &&
                      project.year && (
                        <span>•</span>
                      )}

                    {project.year && (
                      <span>
                        {project.year}
                      </span>
                    )}
                  </div>

                  <h3
                    className="
                      text-2xl font-semibold
                      tracking-tight
                      transition-colors duration-300
                      group-hover:text-[#ff5a1f]
                      md:text-3xl
                    "
                  >
                    {project.title}
                  </h3>

                  {project.description && (
                    <p
                      className="
                        mt-2 max-w-2xl
                        line-clamp-2
                        text-sm leading-6
                        text-black/40
                        dark:text-white/40
                      "
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              </Link>
            )
          )}
        </div>

        {/* Mobile Link */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href="/work"
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-black/10
              px-5 py-3
              text-sm
              text-black/70
              transition-all duration-300
              hover:border-[#ff5a1f]
              hover:text-black
              dark:border-white/10
              dark:text-white/70
              dark:hover:text-white
            "
          >
            View all projects

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}