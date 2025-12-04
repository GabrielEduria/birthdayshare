"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CanvasEditor from "../components/ui/CanvasEditor";
import Header from "../components/Header";
import Button from "../components/button/Button";
import ErrorToast from "../components/ErrorToast";
import type { CanvasItem } from "@/app/types/CanvasItem";

export default function Create() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [canvasJson, setCanvasJson] = useState<CanvasItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const saveCard = async () => {
    if (!slug) {
      setError("Enter a name for your card URL");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/saveCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, canvasJson }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/Happy-Birthday-To-You/${data.slug}`);
      } else {
        setError(data.error || "Error saving card");
      }
    } catch (err) {
      setError("Failed to save card");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />

      {error && <ErrorToast message={error} />}

      <div
        className="p-6 flex flex-col items-center min-h-screen font-roboto"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 600px at 0% 200px, #d5c5ff, transparent),
            radial-gradient(circle 600px at 100% 200px, #d5c5ff, transparent)
          `,
          backgroundSize: `
            96px 64px,
            96px 64px,
            100% 100%,
            100% 100%
          `,
        }}
      >
        <h1 className="text-2xl mb-4 font-semibold">Create Birthday Card</h1>

        <CanvasEditor onExport={setCanvasJson} />

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            className="border px-20 bg-white"
            placeholder="Enter name for URL (ex: Sarah)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
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
    </>
  );
}
