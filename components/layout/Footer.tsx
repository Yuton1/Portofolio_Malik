import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="
        border-t border-black/10
        bg-white
        px-6 py-8
        text-[#1c1c1c]
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#1c1c1c]
        dark:text-white
        md:px-10
      "
    >
      <div
        className="
          mx-auto flex max-w-[1400px]
          flex-col gap-5
          text-sm
          text-black/50
          transition-colors duration-300
          dark:text-white/50
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <p>© 2026 Ahsan Malik. All rights reserved.</p>

        <div className="flex flex-wrap gap-5">
          <Link
            href="/"
            className="
              transition-colors
              hover:text-black
              dark:hover:text-white
            "
          >
            Home
          </Link>

          <Link
            href="/work"
            className="
              transition-colors
              hover:text-black
              dark:hover:text-white
            "
          >
            Work
          </Link>

          <Link
            href="/about"
            className="
              transition-colors
              hover:text-black
              dark:hover:text-white
            "
          >
            About
          </Link>

          <Link
            href="/contact"
            className="
              transition-colors
              hover:text-black
              dark:hover:text-white
            "
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}