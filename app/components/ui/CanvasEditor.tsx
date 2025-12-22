"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import CanvasItemComponent from "./CanvasItem";
import type { CanvasItem as BaseCanvasItem } from "@/types/CanvasItem";
import { v4 as uuidv4 } from "uuid";

type EditorCanvasItem = BaseCanvasItem & {
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  shape?: string;
  locked?: boolean;
};

interface CanvasEditorProps {
  onExport?: (items: EditorCanvasItem[]) => void;
}

export default function CanvasEditor({ onExport }: CanvasEditorProps) {
  const [items, setItems] = useState<EditorCanvasItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [canvasBg, setCanvasBg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onExport?.(items);
  }, [items, onExport]);

const makeBase = (
  overrides: Partial<EditorCanvasItem> = {}
): EditorCanvasItem => ({
  id: uuidv4(),
  type: "text",
  content: "",
  x: 40,
  y: 40,
  width: 200,
  height: 60,
  fontFamily: "Arial",
  fontSize: 20,
  color: "#000000",
  ...overrides,
});

  const addItem = (item: Partial<EditorCanvasItem>) => {
    const newItem = makeBase(item);
    setItems((prev) => [...prev, newItem]);
    setSelected(newItem.id);
  };

  /* ---------- Sidebar Actions ---------- */

  const handleAddText = () => {
    addItem({
      type: "text",
      content: "New text",
      fontFamily: "Arial",
      fontSize: 20,
      color: "#000000",
      width: 240,
      height: 60,
    });
  };

  const handleAddImage = (url: string) => {
    addItem({
      type: "image",
      content: url,
      width: 240,
      height: 240,
    });
  };

  const handleUploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => reader.result && handleAddImage(reader.result.toString());
    reader.readAsDataURL(file);
  };

  const handleSetBackground = (bg: string) => setCanvasBg(bg);

  const handleAddShape = (shape: string) => {
    addItem({
      type: "image",
      shape,
      content: "",
      width: 120,
      height: 120,
      color: "#F59E0B",
    });
  };

  const handleAddEmoji = (emoji: string) => {
    addItem({
      type: "text",
      content: emoji,
      fontFamily: "Segoe UI Emoji",
      fontSize: 40,
      width: 120,
      height: 120,
    });
  };

  const updateItem = (id: string, changes: Partial<EditorCanvasItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...changes } : it)));
  };

  const canvasStyle = useMemo<React.CSSProperties>(() => {
    if (!canvasBg) return { backgroundColor: "#ffffff" };

    if (canvasBg.startsWith("linear") || canvasBg.startsWith("radial")) {
      return { backgroundImage: canvasBg };
    }

    if (canvasBg.startsWith("data:") || canvasBg.startsWith("http") || canvasBg.startsWith("/")) {
      return {
        backgroundImage: `url(${canvasBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    return { backgroundColor: canvasBg };
  }, [canvasBg]);

  return (
    <div className="w-full h-full flex bg-gray-50 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onAddText={handleAddText}
        onAddImage={handleAddImage}
        onUploadImage={handleUploadImage}
        onSetBackground={handleSetBackground}
        onAddShape={handleAddShape}
        onAddEmoji={handleAddEmoji}
      />

      {/* Canvas */}
      <div className="flex-1 p-4 flex">
        <div
          ref={canvasRef}
          className="relative flex-1 overflow-hidden rounded-md border bg-white"
          style={canvasStyle}
        >
          {items.map((it) => (
            <CanvasItemComponent
              key={it.id}
              item={it}
              selectedId={selected}
              setSelected={setSelected}
              updateItem={updateItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
