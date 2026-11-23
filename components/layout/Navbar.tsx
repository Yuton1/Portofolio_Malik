
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

const navigation = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECT", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  if (href === "/work") {
    return pathname === "/work" || pathname.startsWith("/project/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function LettersPullUp({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const letters = text.split("");

  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`inline-flex overflow-hidden ${className}`}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="relative inline-block overflow-hidden"
        >
          <motion.span
            variants={{
              rest: { y: 0 },
              hover: {
                y: "-100%",
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.025,
                },
              },
            }}
            className="block whitespace-pre"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>

          <motion.span
            aria-hidden="true"
            variants={{
              rest: { y: "100%" },
              hover: {
                y: 0,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.025,
                },
              },
            }}
            className="absolute inset-0 block whitespace-pre"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const pillTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 420,
        damping: 34,
        mass: 0.8,
      };

    const logoHover = shouldReduceMotion
    ? {}
    : {
        scale: 1.08,
        y: -3,
        rotate: -6,
      };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8 md:pt-6">
      <nav
        className="
          mx-auto flex h-[72px] max-w-[1440px] items-center
          justify-between rounded-[22px]
          border border-black/5
          bg-white/95 px-5 shadow-xl
          backdrop-blur-xl transition-colors duration-300
          dark:border-white/5 dark:bg-[#1c1c1c]/95
          md:px-8
        "
      >
        {/* Animated Logo */}
        <motion.div
          whileHover={logoHover}
          whileTap={{ scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
          className="relative shrink-0"
        >
          <Link
            href="/"
            aria-label="Ahsan Malik homepage"
            onClick={() => setIsMenuOpen(false)}
            className="
              group relative flex h-11 w-11
              items-center justify-center rounded-full
              outline-none
            "
          >
            {/* Orange Glow */}
            <motion.span
              className="
                absolute inset-0 rounded-full
                bg-[#ff5a1f]/0 blur-xl
              "
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { backgroundColor: "rgba(255, 90, 31, 0.3)" }
              }
              transition={{ duration: 0.3 }}
            />

            {/* Logo SVG */}
            <Image
              src="/images/logo_pp.svg"
              alt="Ahsan Malik Logo"
              width={42}
              height={42}
              priority
              className="
                relative z-10 h-10 w-10
                object-contain
                transition-[filter] duration-300
                group-hover:drop-shadow-[0_0_8px_rgba(255,90,31,0.35)]
              "
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  relative isolate rounded-full
                  px-6 py-3 text-sm font-medium
                  transition-colors duration-200
                  ${
                    active
                      ? "text-black"
                      : "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white"
                  }
                `}
              >
                {active && (
                  <motion.span
                    layoutId="desktop-active-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#ff5a1f]"
                    transition={pillTransition}
                  />
                )}

                <span className="relative z-10"> <LettersPullUp text={item.label} /> </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/contact"
            className="
              rounded-full bg-[#ff5a1f]
              px-6 py-3 text-sm font-semibold text-black
              transition-all duration-300
              hover:scale-105 hover:bg-[#ff713d]
            "
          >
            LET&apos;S TALK ↗
          </Link>
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-black/10 bg-black/5
              text-[#1c1c1c] transition-all duration-300
              hover:bg-black/10
              dark:border-white/10 dark:bg-white/5
              dark:text-white dark:hover:bg-white/10
            "
          >
            <span className="text-xl">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={
          isMenuOpen
            ? { opacity: 1, height: "auto", y: 0 }
            : { opacity: 0, height: 0, y: -8 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
        }
        aria-hidden={!isMenuOpen}
        className="
          mx-auto mt-3 max-w-[1440px] overflow-hidden
          rounded-[22px] border border-black/5
          bg-white shadow-xl
          dark:border-white/5 dark:bg-[#1c1c1c]
          md:hidden
        "
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col gap-2 p-5">
          {navigation.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  relative isolate rounded-xl
                  px-4 py-4 text-sm font-medium
                  transition-colors duration-200
                  ${
                    active
                      ? "text-black"
                      : "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white"
                  }
                `}
              >
                {active && (
                  <motion.span
                    layoutId="mobile-active-nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-[#ff5a1f]"
                    transition={pillTransition}
                  />
                )}

                <span className="relative z-10"> <LettersPullUp text={item.label} /> </span>
              </Link>
            );
          })}

          <Link
            href="/contact"
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => setIsMenuOpen(false)}
            className="
              mt-3 rounded-full bg-[#ff5a1f]
              px-5 py-4 text-center text-sm font-semibold
              text-black transition-colors duration-300
              hover:bg-[#ff713d]
            "
          >
            LET&apos;S TALK ↗
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
