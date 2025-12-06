/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent } from "react";

interface SidebarProps {
  onAddText: (preset?: string) => void;
  onAddImage?: (urlOrBase64: string) => void;
  onUploadImage?: (file: File) => void;
  onSetBackground?: (bg: string) => void;
  onAddShape?: (shape: string) => void;
  onAddEmoji?: (emoji: string) => void;
}

const fonts = ["Arial", "Roboto", "Montserrat", "Great Vibes", "Segoe UI Emoji"];
const colors = ["#111827", "#EF4444", "#F59E0B", "#10B981", "#3B82F6"];
const shapes = ["rectangle", "circle", "star", "heart"];
const emojis = ["🎉", "🎂", "🎁", "🥳", "💖"];
const backgrounds = [
  "#ffffff",
  "#fef3c7",
  "#dbeafe",
  "#fde2e2",
  "linear-gradient(to right, #f0f0f0, #d5c5ff)",
  "radial-gradient(circle, #fef3c7, #f9a8d4)",
];

export default function Sidebar({
  onAddText,
  onAddImage,
  onUploadImage,
  onSetBackground,
  onAddShape,
  onAddEmoji,
}: SidebarProps) {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) onUploadImage(file);
  };

  return (
    <div className="w-64 p-4 bg-white border-r overflow-y-auto flex flex-col gap-4">

      <div className="p-2 border-b">
        <h3 className="font-semibold mb-2">Text</h3>

        <div className="flex flex-col gap-1 mb-2">
          <button onClick={() => onAddText("Heading")} className="px-2 py-1 border rounded">Heading</button>
          <button onClick={() => onAddText("Subheading")} className="px-2 py-1 border rounded">Subheading</button>
          <button onClick={() => onAddText("Body")} className="px-2 py-1 border rounded">Body</button>
        </div>

        <div className="mb-2">
          <span className="text-sm font-semibold">Font:</span>
          <div className="flex gap-1 flex-wrap mt-1">
            {fonts.map(f => (
              <button
                key={f}
                onClick={() => onAddText(`font:${f}`)}
                className="px-2 py-1 border rounded text-sm"
                style={{ fontFamily: f }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold">Color:</span>
          <div className="flex gap-1 flex-wrap mt-1">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => onAddText(`color:${c}`)}
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-2 border-b">
        <h3 className="font-semibold mb-2">Images</h3>
        <div className="flex flex-col gap-1">
          <input type="file" onChange={handleFileUpload} className="mb-2" />
          <button
            onClick={() => onAddImage && onAddImage("https://placekitten.com/200/200")}
            className="px-2 py-1 border rounded"
          >
            Sample Image
          </button>
        </div>
      </div>

      <div className="p-2 border-b">
        <h3 className="font-semibold mb-2">Shapes</h3>
        <div className="flex gap-2 flex-wrap">
          {shapes.map(s => (
            <button
              key={s}
              onClick={() => onAddShape && onAddShape(s)}
              className="px-2 py-1 border rounded"
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-2 border-b">
        <h3 className="font-semibold mb-2">Emoji</h3>
        <div className="flex gap-2 flex-wrap">
          {emojis.map(e => (
            <button key={e} onClick={() => onAddEmoji && onAddEmoji(e)} className="px-2 py-1 border rounded text-lg">
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="p-2 border-b">
        <h3 className="font-semibold mb-2">Background</h3>
        <div className="flex gap-2 flex-wrap">
          {backgrounds.map(bg => (
            <button
              key={bg}
              onClick={() => onSetBackground && onSetBackground(bg)}
              className="w-10 h-10 rounded border"
              style={{ background: bg }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
