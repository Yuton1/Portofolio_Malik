
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
import { ProjectInquiryCard } from "@/components/ui/ProjectInquiryCard";

const CONTACT_EMAIL = "mohahsanmalik1@gmail.com";
const WHATSAPP_NUMBER = "+62-85749418875";

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
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#1c1c1c] sm:p-8 lg:p-10">
                        
          {/* PIXEL EFFECT */}
          <div className="pixel-effect" aria-hidden="true" />
                        
          {/* FORM CONTENT */}
          <div className="relative z-10">
                        
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
                Project Inquiry
              </p>
                        
              <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Tell me about your project.
              </h2>
                        
              <p className="mt-3 text-sm leading-7 text-black/55 dark:text-white/55">
                Fields marked with * are required.
              </p>
            </div>
                        
            <form onSubmit={handleSubmit} className="space-y-6">
                        
              {/* PERTAHANKAN SELURUH ISI FORM LAMA DI SINI */}
                        
            </form>
          </div>
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
