'use client';
import { useEffect, useRef, useState } from "react";
import interact from "interactjs";
import Button from "../button/Button";

type CanvasItem = {
  id: string; 
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

interface CanvasEditorProps {
  onExport: (items: CanvasItem[]) => void;
}

export default function CanvasEditor({ onExport }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<CanvasItem[]>([]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".draggable");

    targets.forEach((el) => {
      interact(el)
        .draggable({
          listeners: {
            move(event) {
              const id = el.dataset.id!;
              const dx = event.dx;
              const dy = event.dy;

              setItems((prev) =>
                prev.map((item) =>
                  item.id === id ? { ...item, x: item.x + dx, y: item.y + dy } : item
                )
              );
            },
          },
        })
        .resizable({
          edges: { left: true, right: true, bottom: true, top: true },
          listeners: {
            move(event) {
              const id = el.dataset.id!;
              const dx = event.deltaRect.left;
              const dy = event.deltaRect.top;
              const width = event.rect.width;
              const height = event.rect.height;

              setItems((prev) =>
                prev.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        x: item.x + dx,
                        y: item.y + dy,
                        width,
                        height,
                      }
                    : item
                )
              );
            },
          },
        });
    });
  }, [items]);

  const addText = () => {
    const newItem: CanvasItem = {
      id: crypto.randomUUID(),
      type: "text",
      content: "Happy Birthday!",
      x: 50,
      y: 50,
      width: 200,
      height: 50,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newItem: CanvasItem = {
        id: crypto.randomUUID(),
        type: "image",
        content: reader.result as string,
        x: 50,
        y: 50,
        width: 200,
        height: 200,
      };
      setItems((prev) => [...prev, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const exportJSON = () => {
    const output = items.map((item) => {
      const el = document.getElementById(item.id) as HTMLElement | null;
      return {
        ...item,
        x: parseFloat(el?.dataset.x || item.x.toString()),
        y: parseFloat(el?.dataset.y || item.y.toString()),
        width: parseFloat(el?.style.width || item.width.toString()),
        height: parseFloat(el?.style.height || item.height.toString()),
      };
    });

    onExport(output);
  };

  return (
    <div>
      <div
        ref={canvasRef}
        id="canvas"
        className="relative bg-white border"
        style={{ width: 1080, height: 1080 }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            id={item.id}
            data-id={item.id}
            data-x={item.x}
            data-y={item.y}
            className="draggable absolute border border-gray-300 p-2 bg-white"
            style={{
              width: item.width,
              height: item.height,
              transform: `translate(${item.x}px, ${item.y}px)`,
            }}
          >
            {item.type === "text" && (
              <div className="w-full h-full flex items-center justify-center text-xl">
                {item.content}
              </div>
            )}
            {item.type === "image" && (
              <img src={item.content} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-3 justify-center items-center">
        <Button onClick={addText} className="px-3 py-1 bg-blue-500 border">
          Add Text
        </Button>

        <input type="file" onChange={addImage} />

        <Button onClick={exportJSON} className="px-3 py-1 bg-blue-500 text-white">
          Save Design
        </Button>
      </div>
    </div>
  );
}
