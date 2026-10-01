"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Project", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8 md:pt-6">
      <nav
        className="
          mx-auto flex h-[72px] max-w-[1440px] items-center
          justify-between rounded-[22px]
          border border-black/5
          bg-white/95
          px-5
          shadow-xl
          backdrop-blur-xl
          transition-colors duration-300
          dark:border-white/5
          dark:bg-[#1c1c1c]/95
          md:px-8
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ahsan Malik homepage"
          onClick={() => setIsMenuOpen(false)}
          className="group flex h-10 w-10 items-center justify-center"
        >
          <span
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              border border-[#ff5a1f]
              text-lg font-bold
              text-[#ff5a1f]
              transition-transform duration-300
              group-hover:rotate-12
            "
          >
            A
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                rounded-full px-7 py-3
                text-sm font-medium
                transition-all duration-300
                ${
                  index === 0
                    ? "bg-[#ff5a1f] text-black"
                    : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* CTA */}
          <Link
            href="/contact"
            className="
              rounded-full
              bg-[#ff5a1f]
              px-6 py-3
              text-sm font-semibold
              text-black
              transition-all duration-300
              hover:scale-105
              hover:bg-[#ff713d]
            "
          >
            LET&apos;S TALK ↗
          </Link>
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-black/10
              bg-black/5
              text-[#1c1c1c]
              transition-all duration-300
              hover:bg-black/10
              dark:border-white/10
              dark:bg-white/5
              dark:text-white
              dark:hover:bg-white/10
            "
          >
            <span className="text-xl">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className="
            mx-auto mt-3 max-w-[1440px]
            rounded-[22px]
            border border-black/5
            bg-white
            p-5
            shadow-xl
            transition-colors duration-300
            dark:border-white/5
            dark:bg-[#1c1c1c]
            md:hidden
          "
        >
          <div className="flex flex-col gap-2">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  rounded-xl
                  px-4 py-4
                  text-sm font-medium
                  transition-all duration-300
                  ${
                    index === 0
                      ? "bg-[#ff5a1f] text-black"
                      : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="
                mt-3 rounded-full
                bg-[#ff5a1f]
                px-5 py-4
                text-center
                text-sm font-semibold
                text-black
                transition-all duration-300
                hover:bg-[#ff713d]
              "
            >
              LET&apos;S TALK ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}