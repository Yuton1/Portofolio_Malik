
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Palette,
  Play,
  Sparkles,
} from "lucide-react";

const disciplines = [
  {
    number: "01",
    title: "Graphic Design",
    description:
      "Visual identities, posters, social media content, and digital graphics.",
    icon: Palette,
  },
  {
    number: "02",
    title: "Motion Design",
    description:
      "Motion graphics and animated visuals that bring ideas to life.",
    icon: Play,
  },
  {
    number: "03",
    title: "Video Editing",
    description:
      "Video editing with a focus on pacing, storytelling, and visual consistency.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Web & UI/UX",
    description:
      "Responsive interfaces and digital experiences built around usability.",
    icon: Code2,
  },
];

const software = [
  {
    name: "Adobe Illustrator",
    category: "Vector & Graphic Design",
    initials: "Ai",
  },
  {
    name: "Adobe Photoshop",
    category: "Image Editing & Compositing",
    initials: "Ps",
  },
  {
    name: "Figma",
    category: "UI/UX & Prototyping",
    initials: "Fg",
  },
  {
    name: "Adobe After Effects",
    category: "Motion Graphics",
    initials: "Ae",
  },
  {
    name: "Adobe Premiere Pro",
    category: "Video Editing",
    initials: "Pr",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/55 dark:text-white/55">
              About Me
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Designer by passion.
                <span className="block text-[#ff5a1f]">
                  Creator by nature.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-black/60 dark:text-white/60 sm:text-lg">
                I&apos;m Ahsan Malik, a multidisciplinary creative
                focused on graphic design, motion, video, and
                digital experiences. I enjoy turning ideas into
                thoughtful visuals that communicate clearly and
                make an impact.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#ff5a1f] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#e94b13]"
                >
                  Let&apos;s work together
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium transition hover:border-[#ff5a1f] dark:border-white/15"
                >
                  Explore my work
                  <ArrowDownRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Profile card */}
            <div className="relative">
              <div className="relative flex aspect-[4/5] min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl bg-[#1c1c1c] p-6 text-white sm:p-8">
                <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full border border-white/10" />
                <div className="absolute -right-8 -top-4 h-44 w-44 rounded-full border border-white/10" />
                <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-[#ff5a1f]/15 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Creative Portfolio
                  </span>
                  <Sparkles className="h-5 w-5 text-[#ff5a1f]" />
                </div>

                <div className="relative">
                  <p className="mb-3 text-sm text-white/50">
                    Graphic Designer & Creative
                  </p>
                  <p className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                    Ahsan
                    <br />
                    <span className="text-[#ff5a1f]">Malik.</span>
                  </p>
                  <div className="mt-6 h-px w-full bg-white/15" />
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    Creating meaningful visuals, one project
                    at a time.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 right-4 rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-xl dark:border-white/10 dark:bg-[#252525] sm:right-8">
                <p className="text-2xl font-semibold tracking-tight">
                  2+
                </p>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                  Years of remote design experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-y border-black/10 bg-black/[0.025] px-5 py-20 dark:border-white/10 dark:bg-white/[0.025] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
              A Little About Me
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Good design starts with understanding.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-black/60 dark:text-white/60 sm:text-lg">
            <p>
              I&apos;m a graphic designer with around two years
              of remote design experience. My work includes
              creating visual content for digital platforms,
              promotional materials, and other communication
              needs.
            </p>

            <p>
              I believe design is more than making something
              look good. It is about understanding the purpose
              behind a project, communicating the right message,
              and creating visuals that feel consistent and
              intentional.
            </p>

            <p>
              Beyond graphic design, I also explore motion
              design, video editing, web development, and UI/UX.
              These disciplines help me approach creative
              projects from different perspectives and build
              more complete digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
                What I Do
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Creative skills, connected.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-black/55 dark:text-white/55">
              Different disciplines, one goal: turning ideas
              into clear and engaging visual experiences.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
            {disciplines.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group bg-white p-6 transition-colors hover:bg-black/[0.025] dark:bg-[#1c1c1c] dark:hover:bg-white/[0.035] sm:p-8 lg:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tabular-nums text-black/40 dark:text-white/40">
                      {item.number}
                    </span>
                    <Icon className="h-5 w-5 text-[#ff5a1f] transition-transform group-hover:scale-110" />
                  </div>

                  <h3 className="mt-10 text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-black/55 dark:text-white/55">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="border-y border-black/10 bg-black/[0.025] px-5 py-20 dark:border-white/10 dark:bg-white/[0.025] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
              Experience
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Learning through real projects.
            </h2>
            <p className="mt-5 text-sm leading-7 text-black/55 dark:text-white/55">
              Growing my skills through collaboration,
              experimentation, and hands-on creative work.
            </p>
          </div>

          <div className="space-y-0">
            <article className="border-t border-black/10 py-7 dark:border-white/10 sm:py-9">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="h-5 w-5 text-[#ff5a1f]" />
                    <h3 className="text-lg font-semibold">
                      Remote Graphic Designer
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-black/55 dark:text-white/55">
                    Creating graphic assets and visual
                    communication materials for digital and
                    promotional needs.
                  </p>
                </div>

                <span className="shrink-0 text-xs text-black/45 dark:text-white/45">
                  2+ Years
                </span>
              </div>
            </article>

            <article className="border-t border-black/10 py-7 dark:border-white/10 sm:py-9">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="h-5 w-5 text-[#ff5a1f]" />
                    <h3 className="text-lg font-semibold">
                      HMIF — Kominfo
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-black/55 dark:text-white/55">
                    Graphic design contributions for
                    organizational communication and visual
                    content.
                  </p>
                </div>

                <span className="shrink-0 text-xs text-black/45 dark:text-white/45">
                  Organization
                </span>
              </div>
            </article>

            <article className="border-y border-black/10 py-7 dark:border-white/10 sm:py-9">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="h-5 w-5 text-[#ff5a1f]" />
                    <h3 className="text-lg font-semibold">
                      Informatics Study Program
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-black/55 dark:text-white/55">
                    Contributing as a content creator for
                    academic and digital communication.
                  </p>
                </div>

                <span className="shrink-0 text-xs text-black/45 dark:text-white/45">
                  Content Creator
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SOFTWARE */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
            Tools of the Trade
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Tools I work with.
            </h2>
            <p className="max-w-md text-sm leading-7 text-black/55 dark:text-white/55">
              Software I use across design and digital
              creative workflows.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {software.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-4 rounded-2xl border border-black/10 p-4 transition-colors hover:border-[#ff5a1f]/50 dark:border-white/10 sm:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff5a1f]/10 text-sm font-semibold text-[#ff5a1f]">
                  {tool.initials}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                    {tool.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#ff5a1f] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                Have a project in mind?
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-6xl">
                Let&apos;s create something meaningful.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                Have an idea, a project, or an opportunity
                to collaborate? I&apos;d love to hear about it.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
