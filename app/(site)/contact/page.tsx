
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

const CONTACT_EMAIL = "hello@ahsanmalik.com";

// Ganti dengan nomor WhatsApp kamu, format internasional tanpa + atau spasi.
// Contoh format: 6281234567890
const WHATSAPP_NUMBER = "628XXXXXXXXXX";

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
    href: "https://instagram.com/",
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

  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReady(false);

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.projectType ||
      !form.message.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email.trim()
    );

    if (!emailIsValid) {
      setError("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(
      `Project Inquiry — ${form.projectType}`
    );

    const body = encodeURIComponent(
      [
        `Hello Ahsan,`,
        ``,
        `I'd like to discuss a project with you.`,
        ``,
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Project Type: ${form.projectType}`,
        `Budget: ${form.budget || "Not specified"}`,
        ``,
        `Project Details:`,
        form.message.trim(),
      ].join("\n")
    );

    setReady(true);

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  function openWhatsApp() {
    const message = encodeURIComponent(
      "Hi Ahsan! I'd like to discuss a creative project with you."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/55 dark:text-white/55">
              Contact
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Have an idea?
                <span className="block text-[#ff5a1f]">
                  Let&apos;s talk.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-black/60 dark:text-white/60 sm:text-lg">
                Have a project in mind or looking for a creative
                partner? Tell me what you&apos;re working on.
                Let&apos;s explore how we can bring your ideas
                to life.
              </p>
            </div>

            <Link
              href="/work"
              className="group inline-flex w-fit items-center gap-2 text-sm font-medium transition hover:text-[#ff5a1f]"
            >
              Explore selected work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* LEFT COLUMN */}
          <aside>
            <div className="rounded-3xl bg-[#1c1c1c] p-6 text-white sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
                Get in touch
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Let&apos;s make something great.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Share your ideas, project requirements, or
                collaboration opportunities. I&apos;ll be glad
                to hear from you.
              </p>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="mb-3 text-xs text-white/45">
                  Prefer email?
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group inline-flex max-w-full items-center gap-2 break-all text-sm font-medium transition hover:text-[#ff5a1f]"
                >
                  {CONTACT_EMAIL}
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="group flex w-full items-center justify-between gap-3 rounded-full bg-[#ff5a1f] px-5 py-4 text-left text-sm font-medium text-white transition hover:bg-[#e94b13]"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-10">
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
          </aside>

          {/* RIGHT COLUMN: FORM */}
          <div className="rounded-3xl border border-black/10 p-5 dark:border-white/10 sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
                Project Inquiry
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Tell me about your project.
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
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
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
                  <option value="">Select a project type</option>
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
                  <option value="">Prefer not to say</option>
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
                  placeholder="Tell me about your idea, goals, deliverables, and timeline..."
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
                  className="flex items-start gap-2 text-sm text-black/60 dark:text-white/60"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5a1f]" />
                  Your email app should open with your message prepared.
                  Please send it there to complete your inquiry.
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#ff5a1f] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#e94b13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
              >
                Prepare email
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs leading-6 text-black/40 dark:text-white/40">
                Submitting opens your default email application.
                Your message is not sent automatically by this website.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-black/10 px-5 py-10 dark:border-white/10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-black/50 dark:text-white/50">
            Have a quick question? Feel free to reach out.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium transition hover:text-[#ff5a1f]"
          >
            Send me an email
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
