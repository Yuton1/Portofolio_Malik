import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1c1c1c] px-6 py-8 text-white md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Ahsan Malik. All rights reserved.</p>

        <div className="flex flex-wrap gap-5">
          <Link
            href="/"
            className="transition-colors hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/work"
            className="transition-colors hover:text-white"
          >
            Work
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition-colors hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}