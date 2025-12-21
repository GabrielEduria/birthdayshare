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
    if (!slug.trim()) {
      setError("Enter a name for your card URL");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/saveCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug.trim(), canvasJson }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/Happy-Birthday-To-You/${data.slug}`);
      } else {
        setError(data.error || "Error saving card");
      }
    } catch {
      setError("Failed to save card");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full">
      <Header />

      {error && <ErrorToast message={error} />}

      <div className="p-6 flex flex-col items-center bg-gray-100 text-black font-roboto">
        <h1 className="text-2xl mb-4 font-semibold">Create A Birthday Card</h1>

        <CanvasEditor onExport={setCanvasJson} />

        <div className="flex gap-2 mt-4 ml-50">
          <input
            type="text"
            className="border px-20 bg-white text-black rounded-2xl"
            placeholder="Enter name for URL (ex: Sarah)"
            value={slug}
            onChange={(e) => {
              setError("");
              setSlug(e.target.value);
            }}
          />

          <Button
            onClick={saveCard}
            className="px-4 py-1 bg-green-600 text-white rounded"
            disabled={saving}
          >
            {saving ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
