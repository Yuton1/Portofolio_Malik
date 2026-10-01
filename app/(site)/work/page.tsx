import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function WorkPage() {
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
        console.error("Cover image error:", error.message);
      }

      return {
        ...project,
        coverUrl: data?.signedUrl ?? null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 text-[#1c1c1c] transition-colors duration-300 dark:bg-[#1c1c1c] dark:text-white md:px-10 md:pt-40">
      <div className="mx-auto max-w-7xl">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <header className="mb-20 max-w-4xl md:mb-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#ff5a1f]">
              Selected Work
            </p>
          </div>

          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.06em]">
            Projects that
            <br />
            turn ideas
            <br />
            <span className="text-black/25 dark:text-white/25">
              into experiences.
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-black/50 dark:text-white/50 md:text-lg">
              A collection of graphic design, motion design,
              UI/UX, and digital experiences created for
              different ideas, brands, and visual systems.
            </p>

            <span className="text-xs uppercase tracking-[0.18em] text-black/30 dark:text-white/30">
              {projectsWithCovers.length.toString().padStart(2, "0")} Projects
            </span>
          </div>
        </header>

        {/* =========================================================
            PROJECT GRID
        ========================================================= */}

        {projectsWithCovers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/15 p-16 text-center dark:border-white/15">
            <FolderOpen className="mx-auto mb-4 h-10 w-10 text-black/30 dark:text-white/30" />

            <p className="text-sm text-black/50 dark:text-white/50">
              No published projects yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-20 md:grid-cols-2 md:gap-y-28">

            {projectsWithCovers.map((project, index) => {
              const isFeatured = index === 0;

              return (
                <Link
                  key={project.id}
                  href={`/project/${project.slug}`}
                  className={`group block ${
                    isFeatured ? "md:col-span-2" : ""
                  }`}
                >
                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div
                    className={`
                      relative
                      mb-6
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-black/10
                      bg-black/[0.03]
                      dark:border-white/10
                      dark:bg-white/[0.03]
                      ${
                        isFeatured
                          ? "aspect-[16/8]"
                          : "aspect-[4/3]"
                      }
                    `}
                  >
                    {project.coverUrl ? (
                      <img
                        src={project.coverUrl}
                        alt={project.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.04]
                        "
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-black/30 dark:text-white/30">
                        <FolderOpen className="h-10 w-10" />

                        <span className="text-sm">
                          No cover image
                        </span>
                      </div>
                    )}

                    {/* Dark overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/0
                        transition-colors
                        duration-500
                        group-hover:bg-black/10
                        dark:group-hover:bg-black/20
                      "
                    />

                    {/* Arrow */}

                    <div
                      className="
                        absolute
                        right-5
                        top-5
                        flex
                        h-14
                        w-14
                        translate-y-2
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black
                        opacity-0
                        shadow-xl
                        transition-all
                        duration-500
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </div>

                    {/* Project number */}

                    <div
                      className="
                        absolute
                        bottom-5
                        left-5
                        rounded-full
                        border
                        border-white/20
                        bg-black/30
                        px-4
                        py-2
                        text-xs
                        font-medium
                        tracking-[0.15em]
                        text-white
                        opacity-0
                        backdrop-blur-md
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* =================================================
                      PROJECT INFORMATION
                  ================================================= */}

                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">

                    <div className="max-w-2xl">

                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#ff5a1f]">
                          {project.category ?? "Design"}
                        </span>

                        {project.role && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />

                            <span className="text-xs uppercase tracking-[0.15em] text-black/35 dark:text-white/35">
                              {project.role}
                            </span>
                          </>
                        )}
                      </div>

                      <h2
                        className="
                          text-2xl
                          font-semibold
                          tracking-tight
                          transition-colors
                          duration-300
                          group-hover:text-[#ff5a1f]
                          md:text-3xl
                        "
                      >
                        {project.title}
                      </h2>

                      {project.description && (
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/50 dark:text-white/50 md:text-base">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Year */}

                    <span className="shrink-0 pt-1 text-sm text-black/35 dark:text-white/35">
                      {project.year ?? ""}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* =========================================================
            BOTTOM CTA
        ========================================================= */}

        <section className="mt-32 border-t border-black/10 pt-16 dark:border-white/10 md:mt-40 md:pt-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#ff5a1f]">
                Have a project?
              </p>

              <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
                Let&apos;s create something
                <br />
                <span className="text-black/25 dark:text-white/25">
                  meaningful.
                </span>
              </h2>
            </div>

            <Link
              href="/contact"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-full
                bg-[#ff5a1f]
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:gap-5
                hover:bg-[#e94e16]
              "
            >
              Let&apos;s talk

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>

          </div>
        </section>
      </div>
    </main>
  );
}