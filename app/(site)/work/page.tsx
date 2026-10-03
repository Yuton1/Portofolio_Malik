import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { WorkGrid } from "@/components/site/WorkGrid";

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
        <WorkGrid projects={projectsWithCovers} />
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