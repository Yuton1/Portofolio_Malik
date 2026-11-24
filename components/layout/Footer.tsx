import Link from "next/link";

const footerLinks = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

function LettersPullUp({ text }: { text: string }) {
  return (
    <span
      aria-label={text}
      className="group inline-flex cursor-pointer overflow-hidden"
    >
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="inline-flex overflow-hidden"
        >
          <span
            className="
              flex flex-col
              transition-transform duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:-translate-y-full
            "
            style={{ transitionDelay: `${index * 25}ms` }}
          >
            <span>{letter}</span>
          </span>
        </span>
      ))}
    </span>
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

      {/* BIG TYPOGRAPHY */}
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