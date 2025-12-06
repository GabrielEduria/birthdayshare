"use client";

import { useRef } from "react";

interface BackgroundPanelProps {
  onSetBackground: (bg: string) => void;
}

const presetBackgrounds = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
  "/backgrounds/bg5.jpg",
  "/backgrounds/bg6.jpg",
  "/backgrounds/bg7.jpg",
  "/backgrounds/bg8.jpg",
  "/backgrounds/bg9.jpg",
  "/backgrounds/bg10.jpg",
];

const solidColors = [
  "#ffffff", "#f8f8f8", "#000000", "#ffb3c6", "#ffe599",
  "#baffc9", "#bae1ff", "#ffd6a5", "#ffc6ff",
];

const gradients = [
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
];

export default function BackgroundPanel({ onSetBackground }: BackgroundPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const uploadBackground = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onSetBackground(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
 
      <section>
        <h3 className="font-semibold mb-2">Preset Backgrounds</h3>

        <div className="grid grid-cols-3 gap-2">
          {presetBackgrounds.map((bg, i) => (
            <div
              key={i}
              className="w-full h-16 rounded cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url(${bg})` }}
              onClick={() => onSetBackground(bg)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Solid Colors</h3>

        <div className="grid grid-cols-5 gap-2">
          {solidColors.map((color) => (
            <div
              key={color}
              className="w-8 h-8 rounded cursor-pointer border"
              style={{ backgroundColor: color }}
              onClick={() => onSetBackground(color)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Gradients</h3>

        <div className="space-y-2">
          {gradients.map((grad, i) => (
            <div
              key={i}
              className="w-full h-10 rounded cursor-pointer"
              style={{ backgroundImage: grad }}
              onClick={() => onSetBackground(grad)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Upload Background</h3>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadBackground(file);
          }}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm w-full"
        >
          Upload Image
        </button>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Image URL</h3>

        <div className="flex gap-1">
          <input
            ref={urlInputRef}
            type="text"
            placeholder="https://your-image.com/bg.jpg"
            className="border p-2 w-full rounded"
          />
          <button
            className="px-3 py-2 bg-gray-700 text-white rounded text-sm"
            onClick={() => {
              const url = urlInputRef.current?.value;
              if (url) onSetBackground(url);
            }}
          >
            Set
          </button>
        </div>
      </section>
    </div>
  );
}
