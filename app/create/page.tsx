"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CanvasEditor from "../components/ui/CanvasEditor";
import Header from "../components/Header";
import Button from "../components/button/Button";
import ErrorToast from "../components/ErrorToast";
import { error } from "console";

type CanvasItem = Record<string, unknown>;

export default function Create() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [canvasJson, setCanvasJson] = useState<CanvasItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const saveCard = async () => {
    if (!slug) return alert("Enter a name for your card URL");

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
        alert(data.error || "Error saving card");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save card");
    } finally {
      setSaving(false);
    }
  };

  
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
  {error && <ErrorToast message={error} />}

  return (
    <>
    <Header />
      <div className="p-6 flex flex-col items-center min-h-screen bg-gray-400 font-roboto">
        <h1 className="text-2xl mb-4 font-semibold">Create Birthday Card</h1>

        <CanvasEditor onExport={setCanvasJson} />

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            className="border px-3 py-1"
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
