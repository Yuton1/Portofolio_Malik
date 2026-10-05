"use client";

import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { useMemo, useState } from "react";

import { PROJECT_CATEGORIES } from "@/lib/project-categories";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  year: string | number | null;
  role: string | null;
  coverUrl: string | null;
};

type WorkGridProps = {
  projects: Project[];
};

const categories = [
  "All",
  ...PROJECT_CATEGORIES,
];

export function WorkGrid({ projects }: WorkGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => {
      if (!project.category) {
        return false;
      }

      return (
        project.category.toLowerCase() ===
        activeCategory.toLowerCase()
      );
    });
  }, [projects, activeCategory]);

  return (
    <>
      {/* =========================================================
          FILTER
      ========================================================= */}

      <div className="mb-16 flex flex-wrap items-center gap-2 border-y border-black/10 py-5 dark:border-white/10">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`
                rounded-full
                px-4
                py-2.5
                text-xs
                font-medium
                uppercase
                tracking-[0.12em]
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-[#ff5a1f] text-white"
                    : "text-black/45 hover:bg-black/5 hover:text-black dark:text-white/45 dark:hover:bg-white/5 dark:hover:text-white"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* =========================================================
          PROJECT COUNT
      ========================================================= */}

      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-black/35 dark:text-white/35">
          Showing {filteredProjects.length.toString().padStart(2, "0")}{" "}
          {filteredProjects.length === 1 ? "Project" : "Projects"}
        </p>

        {activeCategory !== "All" && (
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className="text-xs uppercase tracking-[0.15em] text-[#ff5a1f] transition-opacity hover:opacity-70"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* =========================================================
          PROJECT GRID
      ========================================================= */}

      {filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/15 p-16 text-center dark:border-white/15">
          <FolderOpen className="mx-auto mb-4 h-10 w-10 text-black/30 dark:text-white/30" />

          <p className="text-sm text-black/50 dark:text-white/50">
            No projects found in this category.
          </p>

          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className="mt-5 text-sm font-medium text-[#ff5a1f]"
          >
            View all projects
          </button>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-20 md:grid-cols-2 md:gap-y-28">
          {filteredProjects.map((project, index) => {
            const isFeatured =
              activeCategory === "All" && index === 0;

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

                  {/* Overlay */}

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
                    INFORMATION
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

                  <span className="shrink-0 pt-1 text-sm text-black/35 dark:text-white/35">
                    {project.year ?? ""}
                  </span>
                </div>

                {/* Role */}

                {project.role && (
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-black/30 dark:text-white/30">
                    {project.role}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}