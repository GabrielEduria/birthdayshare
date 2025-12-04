"use client";

import { useState } from "react";
import { CanvasItem } from "@/app/types/CanvasItem";
import DraggableItem from "./DraggableItem";
import { v4 as uuid } from "uuid";
import Button from "../button/Button";

interface Props {
  onExport: (items: CanvasItem[]) => void;
}

export default function CanvasEditor({ onExport }: Props) {
  const [items, setItems] = useState<CanvasItem[]>([]);

  
  const addText = () => {
    const newItem: CanvasItem = {
      id: uuid(),
      type: "text",
      content: "New Text",
      x: 100,
      y: 100,
      width: 200,
      height: 60,
    };
    setItems((prev) => [...prev, newItem]);
    onExport([...items, newItem]);
  };

  const addImage = (url: string) => {
    const newItem: CanvasItem = {
      id: uuid(),
      type: "image",
      content: url,
      x: 150,
      y: 150,
      width: 250,
      height: 250,
    };
    setItems((prev) => [...prev, newItem]);
    onExport([...items, newItem]);
  };

  const updateItem = (updated: CanvasItem) => {
    setItems(prev =>
      prev.map(item => (item.id === updated.id ? updated : item))
    );
    onExport(items);
  };

  // select local images
  const addImageFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const newItem: CanvasItem = {
      id: uuid(),
      type: "image",
      content: reader.result as string, 
      x: 150,
      y: 150,
      width: 250,
      height: 250,
    };
    setItems(prev => [...prev, newItem]);
    onExport([...items, newItem]);
  };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
  
      <div className="flex gap-3">
        <Button
          onClick={addText}
         
        >
          Add Text
        </Button>

        <div className="pt-2">
          <input
            type="file"
            accept="image/*"
            onChange={addImageFromFile}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button>
              Add Image
            </Button>
          </label>
        </div>
      </div>

      <div
        className="relative border bg-white"
        style={{ width: 1080, height: 1080 }}
      >
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} onChange={updateItem} />
        ))}
      </div>
    </div>
  );
}
