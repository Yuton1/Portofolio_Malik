"use client";

import Image from "next/image";

const clients = [
  { name: "Client 1", logo: "/images/clients/client-01.svg" },
  { name: "Client 2", logo: "/images/clients/client-02.svg" },
  { name: "Client 3", logo: "/images/clients/client-03.svg" },
  { name: "Client 4", logo: "/images/clients/client-04.svg" },
  { name: "Client 5", logo: "/images/clients/client-05.svg" },
  { name: "Client 6", logo: "/images/clients/client-06.svg" },
  { name: "Client 1", logo: "/images/clients/client-07.svg" },
  { name: "Client 2", logo: "/images/clients/client-08.svg" },
  { name: "Client 3", logo: "/images/clients/client-09.svg" },
  { name: "Client 4", logo: "/images/clients/client-10.svg" },
  { name: "Client 5", logo: "/images/clients/client-11.svg" },
  { name: "Client 6", logo: "/images/clients/client-12.svg" },
  { name: "Client 1", logo: "/images/clients/client-13.svg" },
  { name: "Client 2", logo: "/images/clients/client-14.svg" },
];

export function ClientMarquee() {
  return (
    <section className="overflow-hidden border-t border-black/10 bg-white py-12 dark:border-white/10 dark:bg-[#1c1c1c] sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
          Trusted by creative partners
        </p>
      </div>

      <div className="client-marquee relative flex overflow-hidden">
        <div className="client-marquee-track flex w-max items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center gap-16 px-8 sm:gap-24 sm:px-12"
              aria-hidden={group === 1}
            >
              {clients.map((client, index) => (
                <div
                  key={`${group}-${index}`}
                  className="relative flex h-12 w-32 shrink-0 items-center justify-center sm:h-16 sm:w-40"
                >
                  <Image
                    src={client.logo}
                    alt={group === 0 ? client.name : ""}
                    fill
                    sizes="160px"
                    className="object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}