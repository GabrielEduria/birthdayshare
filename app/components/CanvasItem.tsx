'use client';

import type { CanvasItem as CanvasItemType } from "../types/CanvasItem";

interface CanvasItemProps {
  item: CanvasItemType;
}

export default function CanvasItem({ item }: CanvasItemProps) {
  return (
    <div
      id={item.id}
      data-id={item.id}
      data-x={item.x}
      data-y={item.y}
      className="absolute border border-gray-300 p-2 bg-white"
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
  );
}
