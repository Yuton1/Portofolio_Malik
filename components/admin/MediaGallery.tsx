"use client";

import { useState } from "react";
import {
  Trash2,
  Image as ImageIcon,
  Video,
  Check,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type MediaItem = {
  id: string;
  project_id: string;
  type: "image" | "video";
  url: string;
  title: string | null;
  display_order: number | null;
  signedUrl: string | null;
};

type MediaGalleryProps = {
  initialMedia: MediaItem[];
  projectId: string;
  currentCoverImage: string | null;
};

export function MediaGallery({
  initialMedia,
  projectId,
  currentCoverImage,
}: MediaGalleryProps) {
  const supabase = createClient();

  const [media, setMedia] = useState(initialMedia);
  const [coverImage, setCoverImage] = useState(
    currentCoverImage
  );

  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );

  const [settingCoverId, setSettingCoverId] = useState<
    string | null
  >(null);

  const [message, setMessage] = useState("");

  async function handleSetCover(item: MediaItem) {
    if (item.type !== "image") return;

    setSettingCoverId(item.id);
    setMessage("");

    const { error } = await supabase
      .from("projects")
      .update({
        cover_image: item.url,
      })
      .eq("id", projectId);

    if (error) {
      setMessage(error.message);
      setSettingCoverId(null);
      return;
    }

    setCoverImage(item.url);
    setMessage("Cover image updated successfully.");
    setSettingCoverId(null);
  }

  async function handleDelete(item: MediaItem) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${
        item.title ?? "this file"
      }"?`
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setMessage("");

    const { error: storageError } = await supabase.storage
      .from("portfolio-media")
      .remove([item.url]);

    if (storageError) {
      setMessage(storageError.message);
      setDeletingId(null);
      return;
    }

    const { error: databaseError } = await supabase
      .from("project_media")
      .delete()
      .eq("id", item.id);

    if (databaseError) {
      setMessage(databaseError.message);
      setDeletingId(null);
      return;
    }

    // Jika media yang dihapus merupakan cover,
    // kosongkan cover_image pada project.
    if (coverImage === item.url) {
      await supabase
        .from("projects")
        .update({
          cover_image: null,
        })
        .eq("id", projectId);

      setCoverImage(null);
    }

    setMedia((currentMedia) =>
      currentMedia.filter(
        (mediaItem) => mediaItem.id !== item.id
      )
    );

    setMessage("Media deleted successfully.");
    setDeletingId(null);
  }

  if (media.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 p-8 text-center">
        <p className="text-sm text-white/50">
          No media uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => {
          const isCover = coverImage === item.url;

          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl border bg-white/[0.03] ${
                isCover
                  ? "border-[#ff5a1f]"
                  : "border-white/10"
              }`}
            >
              {/* Preview */}
              <div className="aspect-video bg-black/20">
                {item.signedUrl && item.type === "image" && (
                  <img
                    src={item.signedUrl}
                    alt={item.title ?? "Project media"}
                    className="h-full w-full object-cover"
                  />
                )}

                {item.signedUrl && item.type === "video" && (
                  <video
                    src={item.signedUrl}
                    controls
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                )}

                {!item.signedUrl && (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-white/50">
                      Preview unavailable
                    </p>
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="space-y-3 p-4">
                <div className="flex items-center gap-2">
                  {item.type === "image" ? (
                    <ImageIcon className="h-4 w-4 text-white/60" />
                  ) : (
                    <Video className="h-4 w-4 text-white/60" />
                  )}

                  <p className="truncate text-sm text-white/70">
                    {item.title ?? "Untitled media"}
                  </p>
                </div>

                <p className="text-xs uppercase text-[#ff5a1f]">
                  {item.type}
                </p>

                {/* Cover Button */}
                {item.type === "image" && (
                  <button
                    type="button"
                    onClick={() => handleSetCover(item)}
                    disabled={settingCoverId === item.id}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isCover
                        ? "bg-[#ff5a1f] text-white"
                        : "border border-white/15 text-white/70 hover:bg-white/10"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {isCover && <Check className="h-4 w-4" />}

                    {settingCoverId === item.id
                      ? "Saving..."
                      : isCover
                        ? "Current Cover"
                        : "Set as Cover"}
                  </button>
                )}

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  disabled={deletingId === item.id}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />

                  {deletingId === item.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {message && (
        <p className="text-sm text-white/60">
          {message}
        </p>
      )}
    </div>
  );
}