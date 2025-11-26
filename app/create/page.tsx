"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CanvasEditor from "../components/ui/CanvasEditor";
import type { CanvasItem } from "../types/CanvasItem";

export default function Create() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [canvasJson, setCanvasJson] = useState<CanvasItem[]>([]);

  const saveCard = async () => {
    if (!slug) return alert("Enter a name for your card URL");

    const res = await fetch("/api/saveCard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, canvasJson }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/Happy-Birthday-To-You/${data.slug}`);
    } else {
      alert(data.error || "Error saving card");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Create Birthday Card</h1>

      <CanvasEditor onExport={setCanvasJson} />

      <div className="flex gap-2 mt-4">
        <input
          className="border px-3 py-1"
          placeholder="Name for URL (ex: Sarah)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button
          onClick={saveCard}
          className="px-4 py-1 bg-green-600 text-white"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
