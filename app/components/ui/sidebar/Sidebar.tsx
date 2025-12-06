"use client";

import { useState } from "react";
import BackgroundPanel from "./BackgroundPanel";
import TextPanel from "./TextPanel";
import ImagesPanel from "./ImagesPanel";
import ShapesPanel from "./ShapesPanel";
import EmojiPanel from "./EmojiPanel";

interface SidebarProps {
  onAddText: (preset?: string) => void;
  onAddImage: (url: string) => void;
  onUploadImage: (file: File) => void;
  onSetBackground: (bg: string) => void;
  onAddShape: (shape: string) => void;
}

export default function Sidebar({
  onAddText,
  onAddImage,
  onUploadImage,
  onSetBackground,
  onAddShape,
}: SidebarProps) {
  const [tab, setTab] = useState<"background" | "text" | "images" | "shapes" | "emoji">("background");

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        {["background", "text", "images", "shapes", "emoji"].map((t) => (
          <button
            key={t}
            className={`flex-1 py-2 text-sm capitalize ${
              tab === t ? "bg-gray-200 font-semibold" : "bg-white"
            }`}
            onClick={() => setTab(t as any)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="flex-1 overflow-y-auto p-3">
        {tab === "background" && (
          <BackgroundPanel onSetBackground={onSetBackground} />
        )}
        {tab === "text" && <TextPanel onAddText={onAddText} />}
        {tab === "images" && (
          <ImagesPanel onAddImage={onAddImage} onUploadImage={onUploadImage} />
        )}
        {tab === "shapes" && <ShapesPanel onAddShape={onAddShape} />}
        {tab === "emoji" && <EmojiPanel onAddEmoji={onAddText} />}
      </div>
    </div>
  );
}
