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
      setError("Choose a URL name for your birthday page");
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
      if (!res.ok) throw new Error(data.error);

      router.push(`/happy-birthday-to-you/${data.slug}`);
    } catch {
      setError("Something went wrong while publishing");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      {error && <ErrorToast message={error} />}

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex items-center px-6 py-4 border-b bg-blue-300">
          <div>
            <h1 className="text-lg font-semibold text-gray-600">Design your birthday page</h1>
            <p className="text-sm text-gray-600">
              Customize the message, then publish a shareable link
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex flex-col">
              <input
                className="border px-3 py-2 rounded-md text-sm w-60 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Public URL name (e.g. sarah)"
                value={slug}
                onChange={(e) => {
                  setError("");
                  setSlug(e.target.value);
                }}
              />
              <span className="text-xs text-gray-600 mt-1">
                birthdayshare.com/happy-birthday-to-you/{slug || "your-name"}
              </span>
            </div>

            <Button
              onClick={saveCard}
              disabled={saving}
              className="px-5 py-2 bg-green-600 text-white rounded-md font-medium"
            >
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-100">
          <CanvasEditor onExport={setCanvasJson} />
        </div>
      </div>
    </div>
  );
}
