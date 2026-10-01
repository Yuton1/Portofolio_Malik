"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ProjectStatusFormProps = {
  projectId: string;
  currentStatus: string;
};

export function ProjectStatusForm({
  projectId,
  currentStatus,
}: ProjectStatusFormProps) {
  const supabase = createClient();

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newStatus = event.target.value;

    setStatus(newStatus);
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("projects")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (error) {
      setMessage(error.message);
      setStatus(currentStatus);
    } else {
      setMessage("Status updated successfully.");
    }

    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-xl font-semibold">
        Project Status
      </h2>

      <select
        value={status}
        onChange={handleStatusChange}
        disabled={loading}
        className="mt-4 w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white outline-none focus:border-[#ff5a1f]"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      {message && (
        <p className="mt-3 text-sm text-white/60">
          {message}
        </p>
      )}
    </div>
  );
}