
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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

function ScrollRevealText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const color = useTransform(
    scrollYProgress,
    [0, 1],
    ["#666666", "#ffffff"]
  );

  return (
    <motion.p
      ref={ref}
      style={{ color }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

const experienceStats = [
  {
    number: "50+",
    title: "PROJECTS DELIVERED",
    description:
      "VISUAL IDENTITIES, MOTION GRAPHICS, AND WEBSITES CRAFTED FOR BRANDS & CREATORS.",
    stack: { x: "162%", y: 0, rotate: 0, zIndex: 40 },
    spreadY: -36,
  },
  {
    number: "95%",
    title: "CLIENT SATISFACTION",
    description:
      "BUILT ON CLEAR COMMUNICATION, ATTENTION TO DETAIL, AND FUNCTIONAL DELIVERY.",
    stack: { x: "54%", y: -6, rotate: -22, zIndex: 30 },
    spreadY: 44,
  },
  {
    number: "4+",
    title: "YEARS EXPERIENCE",
    description:
      "BRIDGING VISUAL COMMUNICATION, USER-CENTERED UI/UX, AND MODERN WEB CODE.",
    stack: { x: "-54%", y: -10, rotate: -9, zIndex: 20 },
    spreadY: -36,
  },
  {
    number: "05",
    title: "CORE DISCIPLINES",
    description:
      "GRAPHIC DESIGN, MOTION, VIDEO EDITING, UI/UX DESIGN, AND WEB DEVELOPMENT.",
    stack: { x: "-162%", y: 6, rotate: 20, zIndex: 10 },
    spreadY: 44,
  },
];

function StatCardInner({
  stat,
}: {
  stat: (typeof experienceStats)[number];
}) {
  return (
    <>
      {/* Top-left metallic sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 95% at 8% 6%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 34%, rgba(13,13,13,0.92) 75%)",
        }}
      />

      {/* Inset crosshair frame lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 h-px bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 h-px bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-6 w-px bg-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-6 w-px bg-white/15"
      />

      {/* Glowing dot at top-right intersection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.85)]"
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-2 py-4">
        <p className="text-5xl font-bold leading-none tracking-[-0.04em] text-white/65 xl:text-6xl">
          {stat.number}
        </p>

        <h3 className="mt-3 text-xl font-medium uppercase leading-[1.08] tracking-[-0.02em] text-white/55 xl:text-2xl">
          {stat.title}
        </h3>

        <p className="mt-4 text-[10px] font-medium uppercase leading-relaxed tracking-[0.04em] text-white/40 xl:text-[11px]">
          {stat.description}
        </p>
      </div>
    </>
  );
}

function StatCardItem({
  stat,
  progress,
  shouldReduceMotion,
}: {
  stat: (typeof experienceStats)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  shouldReduceMotion: boolean | null;
}) {
  const x = useTransform(
    progress,
    [0, 1],
    [shouldReduceMotion ? "0%" : stat.stack.x, "0%"]
  );
  const y = useTransform(
    progress,
    [0, 1],
    [shouldReduceMotion ? stat.spreadY : stat.stack.y, stat.spreadY]
  );
  const rotate = useTransform(
    progress,
    [0, 1],
    [shouldReduceMotion ? 0 : stat.stack.rotate, 0]
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        zIndex: stat.stack.zIndex,
      }}
      className="relative aspect-[1/1.05] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#121212] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
    >
      <StatCardInner stat={stat} />
    </motion.div>
  );
}

function StatistikPengalaman() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "center 0.5"],
  });

  return (
    <section
      id="statistik-pengalaman"
      aria-label="statistik pengalaman"
      className="border-b border-white/15 bg-[#1c1c1c] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      {/* STATISTIK PENGALAMAN */}
      <div ref={containerRef} className="mx-auto max-w-[1600px]">
        {/* Desktop: stacked -> staggered 4 columns on scroll */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:items-center lg:gap-8 xl:gap-10">
          {experienceStats.map((stat) => (
            <StatCardItem
              key={stat.title}
              stat={stat}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Mobile & Tablet: clean responsive grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {experienceStats.map((stat) => (
            <div
              key={stat.title}
              className="relative aspect-[1/1.05] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#121212] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
            >
              <StatCardInner stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <main className="overflow-hidden bg-[#1c1c1c] text-white">

      {/* ABOUT INTRO */}
      <section className="relative min-h-screen border-b border-white/15 px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-36">

        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[1.45fr_0.55fr] lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="flex flex-col">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <h1 className="max-w-[1050px] text-[clamp(2.4rem,5.5vw,6.5rem)] font-semibold uppercase leading-[0.91] tracking-[-0.065em]">
                I&apos;m a multidisciplinary creative from Indonesia, working across graphic design, motion design, video editing, UI/UX, and web development to create meaningful visuals and engaging digital experiences.
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
              className="mt-16 max-w-[1000px] sm:mt-24"
            >
              <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
                MY APPROACH
              </h2>

              <ScrollRevealText className="text-[clamp(1.8rem,4vw,4.5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.055em]">
                I enjoy taking ideas that feel messy or complicated and turning them into something simple, structured, and intentional.
              </ScrollRevealText>

              <ScrollRevealText className="mt-10 text-[clamp(1.8rem,4vw,4.5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.055em]">
                My goal is always the same: to create work that feels good, works well, and leaves a lasting impression.
              </ScrollRevealText>
            </motion.div>
          </div>

          {/* RIGHT PROFILE IMAGE */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative lg:pt-12"
          >
            <div className="relative mx-auto max-w-[440px]">

              {/* Image frame */}
              <div className="relative aspect-[3/4] overflow-hidden border border-white/20 bg-[#1c1c1c] p-3 sm:p-4">

                <Image
                  src="/images/about/fotoabout.jpeg"
                  alt="Ahsan Malik portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover"
                />

              </div>

              {/* Image caption */}
              <div className="mt-6 divide-y divide-white/25 border-y border-white/25 bg-[#1c1c1c] p-6 text-sm sm:p-8">
                <div className="grid grid-cols-[1.15fr_0.85fr] items-center gap-4 py-6">
                  <p className="text-sm font-semibold tracking-tight text-white sm:text-base">
                    Multidisciplinary Designer
                  </p>

                  <div>
                    <p className="text-5xl font-bold leading-none tracking-[-0.04em] text-white">
                      4+
                    </p>
                    <p className="mt-2 text-xs leading-snug text-white/80 sm:text-sm">
                      Years of design experience
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[1.15fr_0.85fr] items-center gap-4 py-6">
                  <p className="text-sm font-semibold tracking-tight text-white sm:text-base">
                    Creative Developer
                  </p>

                  <div>
                    <p className="text-5xl font-bold leading-none tracking-[-0.04em] text-white">
                      3+
                    </p>
                    <p className="mt-2 text-xs leading-snug text-white/80 sm:text-sm">
                      Where Creativity Meets Technology
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.aside>

        </div>
      </section>

      {/* STATISTIK PENGALAMAN */}
      <StatistikPengalaman />

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
