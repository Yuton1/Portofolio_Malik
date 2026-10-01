import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { MediaGallery } from "@/components/admin/MediaGallery";
import { ProjectStatusForm } from "@/components/admin/ProjectStatusForm";
import { ProjectEditForm } from "@/components/admin/ProjectEditForm";


type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Check authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check admin access
  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/");
  }

  // Get project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (projectError || !project) {
    notFound();
  }

  // Get project media
  const { data: media, error: mediaError } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", id)
    .order("display_order", {
      ascending: true,
    });

  if (mediaError) {
    console.error("Media fetch error:", mediaError.message);
  }

  // Create signed URLs for preview
  const mediaWithUrls = await Promise.all(
    (media ?? []).map(async (item) => {
      const { data, error } = await supabase.storage
        .from("portfolio-media")
        .createSignedUrl(item.url, 3600);

      if (error) {
        console.error(
          "Signed URL error:",
          error.message
        );
      }

      return {
        ...item,
        signedUrl: data?.signedUrl ?? null,
      };
    })
  );

  return (
    <div className="min-h-screen bg-[#1c1c1c] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#ff5a1f]">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold">
          {project.title}
        </h1>

        <p className="mt-3 text-white/50">
          Manage project information and media.
        </p>

        {/* Project Information */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold">
            Project Information
          </h2>

          <ProjectEditForm
            project={{
              id: project.id,
              title: project.title,
              slug: project.slug,
              description: project.description,
              category: project.category,
              year: project.year,
              role: project.role,
              tags: project.tags,
            }}
          />
        </section>

        {/* Project Status */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold">
            Project Status
          </h2>

          <ProjectStatusForm
            projectId={project.id}
            currentStatus={project.status}
          />
        </section>

        {/* Upload Media */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold">
            Upload Media
          </h2>

          <MediaUploader
            projectId={project.id}
          />
        </section>

        {/* Media Gallery */}
        <section className="mt-10">
          <h2 className="mb-2 text-2xl font-semibold">
            Project Media
          </h2>

          <p className="mb-5 text-sm text-white/50">
            Preview and manage your uploaded images
            and videos.
          </p>

          <MediaGallery
            initialMedia={mediaWithUrls}
            projectId={project.id}
            currentCoverImage={project.cover_image}
          />
        </section>

        {/* Back Button */}
        <Link
          href="/admin/projects"
          className="mt-8 inline-block text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}