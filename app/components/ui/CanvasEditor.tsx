'use client';
import { useEffect, useRef, useState } from "react";
import interact from "interactjs";

type CanvasItem = {
  id: number;
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
    interact(".draggable")
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;

            const x =
              parseFloat(target.getAttribute("data-x") || "0") + event.dx;
            const y =
              parseFloat(target.getAttribute("data-y") || "0") + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute("data-x", String(x));
            target.setAttribute("data-y", String(y));
          },
        },
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
      })
      .on("resizemove", (event) => {
        const target = event.target;

        const x =
          parseFloat(target.getAttribute("data-x") || "0") +
          event.deltaRect.left;
        const y =
          parseFloat(target.getAttribute("data-y") || "0") +
          event.deltaRect.top;

        target.style.width = `${event.rect.width}px`;
        target.style.height = `${event.rect.height}px`;
        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute("data-x", String(x));
        target.setAttribute("data-y", String(y));
      });
  }, []);

  const addText = () => {
    const newItem: CanvasItem = {
      id: Date.now(),
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
        id: Date.now(),
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
      const el = document.getElementById(String(item.id)) as HTMLElement;

      return {
        ...item,
        x: parseFloat(el.dataset.x || "0"),
        y: parseFloat(el.dataset.y || "0"),
        width: parseFloat(el.style.width || "0"),
        height: parseFloat(el.style.height || "0"),
      };
    });

    onExport(output);
  };

  return (
    <div>
      <div
        ref={canvasRef}
        className="relative bg-white border"
        style={{ width: 1080, height: 1080 }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            id={String(item.id)}
            className="draggable absolute border border-gray-300 p-2 bg-white"
            style={{
              width: item.width,
              height: item.height,
              transform: `translate(${item.x}px, ${item.y}px)`,
            }}
            data-x={item.x}
            data-y={item.y}
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

      <div className="flex gap-3 mt-3">
        <button
          onClick={addText}
          className="px-3 py-1 bg-gray-100 border"
        >
          Add Text
        </button>

        <input type="file" onChange={addImage} />

        <button
          onClick={exportJSON}
          className="px-3 py-1 bg-blue-500 text-white"
        >
          Save Design
        </button>
      </div>
    </div>
  );
}
