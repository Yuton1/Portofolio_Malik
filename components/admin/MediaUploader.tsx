"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MediaUploaderProps = {
  projectId: string;
};

export function MediaUploader({
  projectId,
}: MediaUploaderProps) {
  const supabase = createClient();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return;

    setFiles(Array.from(event.target.files));
    setMessage("");
  }

  async function handleUpload() {
    if (files.length === 0) {
      setMessage("Please select at least one file.");
      return;
    }

    setLoading(true);
    setMessage("");

    let uploadedCount = 0;

    for (const file of files) {
      const fileExtension = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExtension}`;

      const filePath = `${projectId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, file);

      if (uploadError) {
        setMessage(uploadError.message);
        setLoading(false);
        return;
      }

      const mediaType = file.type.startsWith("video/")
        ? "video"
        : "image";

      const { error: databaseError } = await supabase
        .from("project_media")
        .insert({
          project_id: projectId,
          type: mediaType,
          url: filePath,
          title: file.name,
          display_order: uploadedCount,
        });

      if (databaseError) {
        setMessage(databaseError.message);
        setLoading(false);
        return;
      }

      uploadedCount++;
    }

    setFiles([]);
    setMessage(`${uploadedCount} file(s) uploaded successfully.`);
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-semibold">
        Upload Project Media
      </h2>

      <p className="mt-2 text-sm text-white/50">
        Upload images or videos for this project.
      </p>

      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4,video/webm"
        onChange={handleFileChange}
        className="mt-6 block w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
      />

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <p
              key={`${file.name}-${file.lastModified}`}
              className="text-sm text-white/60"
            >
              {file.name}
            </p>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || files.length === 0}
        className="mt-6 rounded-full bg-[#ff5a1f] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ff713d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Media"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-white/70">
          {message}
        </p>
      )}
    </div>
  );
}