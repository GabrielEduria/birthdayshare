"use client";

import { useState } from "react";

interface TextPanelProps {
  onAddText: (preset?: string) => void;
}

const fontFamilies = [
  "Arial",
  "Roboto",
  "Georgia",
  "Courier New",
  "Comic Sans MS",
  "Pacifico",
  "Lobster",
  "Great Vibes",
  "Montserrat",
];

export default function TextPanel({ onAddText }: TextPanelProps) {
  const [color, setColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");

  return (
    <div className="space-y-6">

      <section>
        <h3 className="font-semibold mb-2">Add Text</h3>

        <div className="grid grid-cols-1 gap-2">
          <button
            className="w-full py-2 bg-gray-100 rounded text-left px-3 hover:bg-gray-200"
            onClick={() => onAddText("Heading")}
          >
            Heading
          </button>
          <button
            className="w-full py-2 bg-gray-100 rounded text-left px-3 hover:bg-gray-200"
            onClick={() => onAddText("Subheading")}
          >
            Subheading
          </button>
          <button
            className="w-full py-2 bg-gray-100 rounded text-left px-3 hover:bg-gray-200"
            onClick={() => onAddText("Body")}
          >
            Body Text
          </button>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Birthday Styles</h3>

        <div className="grid grid-cols-1 gap-2">
          <button
            className="py-2 w-full rounded bg-pink-100 hover:bg-pink-200 px-3"
            onClick={() => onAddText("Happy Birthday! 🎉")}
          >
            Script Style
          </button>
          <button
            className="py-2 w-full rounded bg-yellow-100 hover:bg-yellow-200 px-3"
            onClick={() => onAddText("Happy Birthday! 💛")}
          >
            Bubble Letters
          </button>
          <button
            className="py-2 w-full rounded bg-blue-100 hover:bg-blue-200 px-3"
            onClick={() => onAddText("🎂 Happy Birthday! 🎂")}
          >
            Outline Style
          </button>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Font Family</h3>

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {fontFamilies.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f}
            </option>
          ))}
        </select>

        <button
          className="mt-2 w-full py-2 bg-blue-600 text-white rounded"
          onClick={() => onAddText(`font:${fontFamily}`)}
        >
          Apply to Selected
        </button>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Text Color</h3>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 cursor-pointer"
        />

        <button
          className="mt-2 w-full py-2 bg-gray-700 text-white rounded"
          onClick={() => onAddText(`color:${color}`)}
        >
          Apply Color
        </button>
      </section>
    </div>
  );
}
