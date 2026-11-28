
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
