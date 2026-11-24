"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
          {/* ORIGINAL LETTER */}
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

          {/* ANIMATED LETTER */}
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

export function Footer() {
  return (
    <footer
      className="
        overflow-hidden
        border-t border-black/10
        bg-white
        pt-8
        text-[#1c1c1c]
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#1c1c1c]
        dark:text-white
      "
    >
      {/* TOP FOOTER */}
      <div
        className="
          mx-auto flex max-w-[1400px]
          flex-col gap-5
          px-6 pb-8
          text-sm
          text-black/50
          transition-colors duration-300
          dark:text-white/50
          md:flex-row
          md:items-center
          md:justify-between
          md:px-10
        "
      >
        <p>© 2026 Ahsan Malik. All rights reserved.</p>

        {/* NAVIGATION */}
        <nav className="flex flex-wrap gap-5">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                transition-colors duration-300
                hover:text-[#ff5a1f]
              "
            >
              <LettersPullUp text={item.label} />
            </Link>
          ))}
        </nav>
      </div>

      {/* BIG TYPOGRAPHY - STATIC */}
      <div className="relative h-[35vw] min-h-[180px] max-h-[520px] overflow-hidden">
        <div
          className="
            absolute left-1/2 top-0
            w-max
            -translate-x-1/2
            translate-y-[10%]
            whitespace-nowrap
            text-[35vw]
            font-semibold
            uppercase
            leading-[0.75]
            tracking-[-0.085em]
            text-[#1c1c1c]
            dark:text-[#e5e5e5]
          "
        >
          MALIK
        </div>
      </div>
    </footer>
  );
}