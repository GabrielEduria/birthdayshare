'use client';

import { useState } from "react";
import type { CanvasItem as CanvasItemType } from "../types/CanvasItem";

interface CanvasItemProps {
  item: CanvasItemType;
  updateItem: (id: string | number, changes: Partial<CanvasItemType>) => void;
}

export default function CanvasItem({ item, updateItem }: CanvasItemProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.content);

  const finishEdit = () => {
    setEditing(false);
    updateItem(item.id, { content: value });
  };

  return (
    <div
      id={String(item.id)}
      data-id={item.id}
      className="absolute border bg-white p-2"
      style={{
        width: item.width,
        height: item.height,
        transform: `translate(${item.x}px, ${item.y}px)`
      }}
      onDoubleClick={() => setEditing(true)}
    >
    
      {item.type === "text" && (
        <>
          {editing ? (
            <input
              autoFocus
              className="w-full h-full border p-1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={finishEdit}
              onKeyDown={(e) => e.key === "Enter" && finishEdit()}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">
              {item.content}
            </div>
          )}
        </>
      )}

      {item.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.content}
          className="w-full h-full object-cover"
          alt="canvas item"
        />
      )}
    </div>
  );
}
