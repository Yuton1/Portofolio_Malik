"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";

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
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    // Normalize title
    const normalizedTitle = form.title.trim();

    if (!normalizedTitle) {
      setErrorMessage("Project title is required.");
      setLoading(false);
      return;
    }

    // Validate category
    if (
      !PROJECT_CATEGORIES.includes(
        form.category as (typeof PROJECT_CATEGORIES)[number]
      )
    ) {
      setErrorMessage("Please select a valid project category.");
      setLoading(false);
      return;
    }

    // Create slug
    const slug = createSlug(normalizedTitle);

    if (!slug) {
      setErrorMessage("A valid project title is required to create a slug.");
      setLoading(false);
      return;
    }

    // Normalize tags
    const normalizedTags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // Insert project
    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: normalizedTitle,
        slug,
        category: form.category,
        year: form.year ? Number(form.year) : null,
        role: form.role.trim() || null,
        description: form.description.trim() || null,
        tags: normalizedTags,
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
      setErrorMessage(
        "Project berhasil disimpan, tetapi data tidak ditemukan."
      );
      setLoading(false);
      return;
    }

    router.push(`/admin/projects/${data.id}/edit`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Title */}
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

      {/* Category + Year */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm text-white/70"
          >
            Category
          </label>

          <select
            required
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
          >
            <option value="">Select category</option>

            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm text-white/70"
          >
            Year
          </label>

          <input
            id="year"
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2026"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
          />
        </div>
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm text-white/70"
        >
          Role
        </label>

        <input
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Graphic Designer"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm text-white/70"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe your project..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        />
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="mb-2 block text-sm text-white/70"
        >
          Tags
        </label>

        <input
          id="tags"
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

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm text-white/70"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Actions */}
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