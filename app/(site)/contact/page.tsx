"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

const CONTACT_EMAIL = "mohahsanmalik1@gmail.com";

const PROJECT_TYPES = [
  "Graphic Design",
  "Brand Identity",
  "Motion Design",
  "Video Editing",
  "Web Development",
  "UI/UX Design",
  "Other",
];

const CONTACT_LINKS = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    label: "Instagram",
    value: "Connect on Instagram",
    href: "https://www.instagram.com/mex_aam?gwpx=Z2xzN213d3l4N294&utm_source=qr",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    value: "Professional profile",
    href: "https://linkedin.com/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "Explore my code",
    href: "https://github.com/",
    icon: Github,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handlePixelMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  };

  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setReady(false);
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error ||
            "Unable to send your message. Please try again."
        );
        return;
      }

      setReady(true);

      setForm({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch {
      setError(
        "Could not connect to the email service. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="overflow-hidden">
      <section className="px-5 pb-20 pt-32 sm:px-8 sm:pb-28 lg:px-12 lg:pt-36">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          {/* LEFT COLUMN: HEADING + FIND ME ONLINE */}
          <div className="flex flex-col">
            <h1 className="text-8xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-8xl lg:text-[clamp(4.25rem,6.5vw,7rem)]">
              Have an
              <br />
              idea?
              <br />
              Let&apos;s talk.
            </h1>

            {/* SOCIAL LINKS */}
            <div className="mt-14 max-w-md lg:mt-20">
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                Find me online
              </h3>

              <div className="divide-y divide-black/10 dark:divide-white/10">
                {CONTACT_LINKS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.label === "Email" ? undefined : "_blank"
                      }
                      rel={
                        item.label === "Email"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-black/45 transition-colors group-hover:text-[#ff5a1f] dark:text-white/45" />

                        <span>
                          <span className="block text-sm font-medium">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-xs text-black/45 dark:text-white/45">
                            {item.value}
                          </span>
                        </span>
                      </span>

                      <ArrowUpRight className="h-4 w-4 shrink-0 text-black/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff5a1f] dark:text-white/35" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div
            onMouseMove={handlePixelMove}
            className="group relative overflow-hidden rounded-3xl border border-black/10 p-6 dark:border-white/10 dark:bg-[#1c1c1c] sm:p-8 lg:p-10"
          >
            {/* PIXEL EFFECT */}
            <div className="pixel-effect" aria-hidden="true" />

            {/* FORM CONTENT */}
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Tell me About Project
                </h2>

                <p className="mt-3 text-sm leading-7 text-black/55 dark:text-white/55">
                  Fields marked with * are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Your name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="name"
                      className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-3.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/10 dark:border-white/15 dark:placeholder:text-white/25"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      placeholder="Email@example.com"
                      className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-3.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/10 dark:border-white/15 dark:placeholder:text-white/25"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-2 block text-sm font-medium"
                  >
                    What do you need? *
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        projectType: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-3.5 text-sm outline-none transition focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/10 dark:border-white/15 dark:[color-scheme:dark]"
                  >
                    <option value="">Select a service</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block text-sm font-medium"
                  >
                    Estimated budget{" "}
                    <span className="font-normal text-black/40 dark:text-white/40">
                      (optional)
                    </span>
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={(event) =>
                      setForm({ ...form, budget: event.target.value })
                    }
                    className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-3.5 text-sm outline-none transition focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/10 dark:border-white/15 dark:[color-scheme:dark]"
                  >
                    <option value="">$</option>
                    <option value="Under $100">Under $100</option>
                    <option value="$100–$300">$100–$300</option>
                    <option value="$300–$500">$300–$500</option>
                    <option value="$500–$1,000">$500–$1,000</option>
                    <option value="$1,000+">$1,000+</option>
                    <option value="To be discussed">To be discussed</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Project details *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    placeholder="Briefly describe your idea, goals, or timeline......"
                    className="w-full resize-y rounded-xl border border-black/15 bg-transparent px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-black/30 focus:border-[#ff5a1f] focus:ring-2 focus:ring-[#ff5a1f]/10 dark:border-white/15 dark:placeholder:text-white/25"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-500"
                  >
                    {error}
                  </p>
                )}

                {ready && (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-[#ff5a1f]/20 bg-[#ff5a1f]/5 p-3 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5a1f]" />
                    Your message was accepted by the email service. Thank you
                    for reaching out!
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#ff5a1f] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#e94b13] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  {sending ? "Sending message..." : "Send message"}

                  {!sending && (
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
