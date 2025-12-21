/* eslint-disable @typescript-eslint/no-explicit-any */
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
    if (onExport) onExport(items);
  }, [items, onExport]);

  const makeBase = (overrides: Partial<EditorCanvasItem> = {}): EditorCanvasItem => {
    const id = uuidv4();
    return {
      id,
      type: "text",
      content: "",
      x: 40,
      y: 40,
      width: 200,
      height: 60,
      ...overrides,
    } as EditorCanvasItem;
  };

  const addItem = (item: Partial<EditorCanvasItem>) => {
    const newItem = makeBase(item);
    setItems((s) => [...s, newItem]);
    setSelected(newItem.id);
    return newItem;
  };


  const handleAddImage = (urlOrBase64: string) => {
    addItem({
      type: "image",
      content: urlOrBase64,
      width: 240,
      height: 240,
    });
  };

  const handleUploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleAddImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSetBackground = (bg: string) => {
    setCanvasBg(bg);
  };

  const handleAddShape = (shape: string) => {
    addItem({
      type: "image",
      content: "",  
      shape,
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

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (selected === id) setSelected(null);
  };

  const duplicateItem = (id: string) => {
    const original = items.find((i) => i.id === id);
    if (!original) return;
    const copy = makeBase({
      ...original,
      id: uuidv4(),
      x: original.x + 12,
      y: original.y + 12,
    });
    setItems((prev) => [...prev, copy]);
    setSelected(copy.id);
  };

  const canvasStyle = useMemo<React.CSSProperties>(() => {
    if (!canvasBg) {
      return {
        backgroundColor: "#808080",
      };
    }

    if (canvasBg.startsWith("linear-gradient") || canvasBg.startsWith("radial-gradient")) {
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
    <div className="w-full h-[720px] flex bg-gray-50 shadow rounded-lg">
 
      <div className="flex-none">
        <Sidebar

          onAddImage={handleAddImage}
          onUploadImage={handleUploadImage}
          onSetBackground={handleSetBackground}
          onAddShape={handleAddShape}
          onAddEmoji={handleAddEmoji} onAddText={function (preset?: string): void {
            throw new Error("Function not implemented.");
          } }        />
      </div>

  
      <div className="flex-1 p-6 flex flex-col">
    
        <div
          ref={canvasRef}
          className="relative flex-1 border-1px overflow-hidden shadow-sm p-4 bg-white"
          style={{
            ...canvasStyle,
            minHeight: 480,
          }}
        >
          {items.map((it) => (
            <CanvasItemComponent
              key={it.id}
              item={it as EditorCanvasItem}
              selectedId={selected}
              setSelected={setSelected}
              updateItem={(id, changes) => updateItem(id, changes)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
