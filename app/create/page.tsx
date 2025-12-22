"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CanvasEditor from "../components/ui/CanvasEditor";
import Header from "../components/Header";
import Button from "../components/button/Button";
import ErrorToast from "../components/ErrorToast";
import type { CanvasItem } from "@/types/CanvasItem";

export default function Create() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [canvasJson, setCanvasJson] = useState<CanvasItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const saveCard = async () => {
    if (!slug.trim()) return setError("Enter a name for your card URL");

    setSaving(true);
    try {
      const res = await fetch("/api/saveCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug.trim(), canvasJson }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/happy-birthday-to-you/${data.slug}`);
    } catch {
      setError("Failed to save card");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {error && <ErrorToast message={error} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-3 border-b bg-white">
          <h1 className="font-semibold text-lg">Create Birthday Card</h1>

          <div className="ml-auto flex gap-2">
            <input
              className="border px-3 py-2 rounded-md text-sm w-56"
              placeholder="URL name (e.g. sarah)"
              value={slug}
              onChange={(e) => {
                setError("");
                setSlug(e.target.value);
              }}
            />
            <Button
              onClick={saveCard}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              {saving ? "Saving..." : "Publish"}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <CanvasEditor onExport={setCanvasJson} />
        </div>
      </div>
    </div>
  );
}
