import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { FeaturedProjects } from "@/components/site/FeaturedProjects";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#1c1c1c] transition-colors duration-300 dark:bg-[#1c1c1c] dark:text-white">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-10">
        {/* Decorative Circle */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-black/[0.04] dark:border-white/[0.04]" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-[#ff5a1f]/10" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-5xl">
            {/* Small Label */}
            <p className="mb-6 text-sm uppercase tracking-[0.25em] text-[#ff5a1f]">
              Graphic Designer & Visual Creator
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
              I create
              <br />
              <span className="text-black/30 dark:text-white/40">
                visual
              </span>{" "}
              experiences.
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-black/50 dark:text-white/50 md:text-lg">
              Graphic designer focused on creating
              visual identities, social media content,
              posters, banners, and digital experiences
              that communicate clearly and make an impact.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              {/* Primary CTA */}
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ff5a1f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff6b36]"
              >
                View my work

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/contact"
                className="
                  inline-flex items-center
                  rounded-full
                  border border-black/10
                  px-6 py-3
                  text-sm font-medium
                  text-black/70
                  transition-all duration-300
                  hover:border-black/30
                  hover:text-black
                  dark:border-white/10
                  dark:text-white/70
                  dark:hover:border-white/30
                  dark:hover:text-white
                "
              >
                Let's work together
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="
              absolute bottom-10 left-6 hidden
              items-center gap-3
              text-xs uppercase tracking-[0.2em]
              text-black/30
              dark:text-white/30
              md:flex
            "
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />

            Scroll to explore
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECTS
      ===================================================== */}
      <FeaturedProjects />

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section
        id="services"
        className="
          border-t border-black/10
          bg-white
          px-6 py-24
          text-[#1c1c1c]
          transition-colors duration-300
          dark:border-white/10
          dark:bg-[#1c1c1c]
          dark:text-white
          md:px-10 md:py-32
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
              What I do
            </p>

            <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Design that serves
              <br />
              a purpose.
            </h2>
          </div>

          <div className="grid border-t border-black/10 dark:border-white/10 md:grid-cols-2">
            {/* Graphic Design */}
            <div className="border-b border-black/10 py-8 dark:border-white/10 md:border-r md:pr-10">
              <span className="mb-6 block text-sm text-black/30 dark:text-white/30">
                01
              </span>

              <h3 className="text-2xl font-semibold">
                Graphic Design
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-black/40 dark:text-white/40">
                Posters, social media content,
                banners, promotional materials, and
                other visual communication assets.
              </p>
            </div>

            {/* Branding */}
            <div className="border-b border-black/10 py-8 dark:border-white/10 md:pl-10">
              <span className="mb-6 block text-sm text-black/30 dark:text-white/30">
                02
              </span>

              <h3 className="text-2xl font-semibold">
                Branding
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-black/40 dark:text-white/40">
                Visual identities and brand assets
                designed to create a consistent and
                recognizable presence.
              </p>
            </div>

            {/* Social Media */}
            <div className="border-b border-black/10 py-8 dark:border-white/10 md:border-r md:pr-10">
              <span className="mb-6 block text-sm text-black/30 dark:text-white/30">
                03
              </span>

              <h3 className="text-2xl font-semibold">
                Social Media Design
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-black/40 dark:text-white/40">
                Engaging visual content for Instagram,
                Facebook, YouTube, and other digital
                platforms.
              </p>
            </div>

            {/* UI / UX */}
            <div className="border-b border-black/10 py-8 dark:border-white/10">
              <span className="mb-6 block text-sm text-black/30 dark:text-white/30">
                04
              </span>

              <h3 className="text-2xl font-semibold">
                UI / UX Design
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-black/40 dark:text-white/40">
                Clean and intuitive interfaces focused
                on usability, hierarchy, and a strong
                visual experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section
        className="
          border-t border-black/10
          bg-white
          px-6 py-28
          transition-colors duration-300
          dark:border-white/10
          dark:bg-[#1c1c1c]
          md:px-10 md:py-40
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
              Have a project?
            </p>

            <h2 className="text-5xl font-bold leading-[1] tracking-tight md:text-8xl">
              Let's create
              <br />
              something great.
            </h2>

            <Link
              href="/contact"
              className="
                group mt-10
                inline-flex items-center gap-3
                text-lg font-medium
                text-black/70
                transition-colors duration-300
                hover:text-black
                dark:text-white/70
                dark:hover:text-white
              "
            >
              Get in touch

              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}