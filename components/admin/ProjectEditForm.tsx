"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";

type ProjectEditFormProps = {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    category: string | null;
    year: number | null;
    role: string | null;
    tags: string[] | null;
  };
};

export function ProjectEditForm({
  project,
}: ProjectEditFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState(project.title);
  const [slug, setSlug] = useState(project.slug);
  const [description, setDescription] = useState(
    project.description ?? ""
  );
  const [category, setCategory] = useState(
    project.category ?? ""
  );
  const [year, setYear] = useState(
    project.year?.toString() ?? ""
  );
  const [role, setRole] = useState(
    project.role ?? ""
  );
  const [tags, setTags] = useState(
    project.tags?.join(", ") ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    // Normalize slug
    const normalizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Validate title and slug
    if (!title.trim()) {
      setError("Project title is required.");
      setLoading(false);
      return;
    }

    if (!normalizedSlug) {
      setError("A valid slug is required.");
      setLoading(false);
      return;
    }

    if (
      category &&
      !PROJECT_CATEGORIES.includes(
        category as (typeof PROJECT_CATEGORIES)[number]
      )
    ) {
      setError("Please select a valid project category.");
      setLoading(false);
      return;
    }

    // Normalize tags
    const normalizedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // Check duplicate slug
    const { data: existingProject, error: slugError } =
      await supabase
        .from("projects")
        .select("id")
        .eq("slug", normalizedSlug)
        .neq("id", project.id)
        .maybeSingle();

    if (slugError) {
      setError(slugError.message);
      setLoading(false);
      return;
    }

    if (existingProject) {
      setError(
        "This slug is already used by another project."
      );
      setLoading(false);
      return;
    }

    // Update project
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        title: title.trim(),
        slug: normalizedSlug,
        description: description.trim() || null,
        category: category.trim() || null,
        year: year ? Number(year) : null,
        role: role.trim() || null,
        tags: normalizedTags,
      })
      .eq("id", project.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSlug(normalizedSlug);
    setMessage(
      "Project information updated successfully."
    );
    setLoading(false);

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-white"
        >
          Project Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff5a1f]"
          placeholder="Project title"
        />
      </div>

      {/* Slug */}
      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-medium text-white"
        >
          Slug
        </label>

        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(event) =>
            setSlug(event.target.value)
          }
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff5a1f]"
          placeholder="project-slug"
        />

        <p className="mt-2 text-xs text-white/40">
          Used in the project URL.
        </p>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-white"
        >
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff5a1f]"
          placeholder="Describe the project..."
        />
      </div>

      {/* Category + Year */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-white"
          >
            Category
          </label>

          <select
              id="category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition focus:border-[#ff5a1f]"
            >
              <option value="" className="bg-[#1c1c1c] text-white">
                Select category
              </option>
            
              {PROJECT_CATEGORIES.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-[#1c1c1c] text-white"
                >
                  {item}
                </option>
              ))}
            </select>
        </div>

        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-medium text-white"
          >
            Year
          </label>

          <input
            id="year"
            type="number"
            value={year}
            onChange={(event) =>
              setYear(event.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff5a1f]"
            placeholder="2026"
          />
        </div>
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm font-medium text-white"
        >
          Role
        </label>

        <input
          id="role"
          type="text"
          value={role}
          onChange={(event) =>
            setRole(event.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff5a1f]"
          placeholder="Graphic Designer"
        />
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="mb-2 block text-sm font-medium text-white"
        >
          Tags
        </label>

        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(event) =>
            setTags(event.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff5a1f]"
          placeholder="branding, poster, social media"
        />

        <p className="mt-2 text-xs text-white/40">
          Separate tags with commas.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Success */}
      {message && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#ff5a1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff6b36] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Save className="h-4 w-4" />

        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}