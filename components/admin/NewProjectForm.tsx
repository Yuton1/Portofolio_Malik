"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function NewProjectForm() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    year: "",
    role: "",
    description: "",
    tags: "",
    status: "draft",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function createSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const slug = createSlug(form.title);

    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: form.title,
        slug,
        category: form.category,
        year: form.year ? Number(form.year) : null,
        role: form.role || null,
        description: form.description || null,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: form.status,
      })
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setErrorMessage("Project berhasil disimpan, tetapi data tidak ditemukan.");
      setLoading(false);
      return;
    }

    router.push(`/admin/projects/${data.id}/edit`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm text-white/70">
          Project Title
        </label>

        <input
          required
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Example: Luma Coffee Brand Campaign"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Category
          </label>

          <select
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
          >
            <option value="">Select category</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Motion Design">Motion Design</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Web Development">Web Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Year
          </label>

          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2026"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">
          Role
        </label>

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Graphic Designer"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe your project..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">
          Tags
        </label>

        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="branding, poster, social media"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        />

        <p className="mt-2 text-xs text-white/40">
          Separate tags using commas.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#ff5a1f] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ff713d] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}