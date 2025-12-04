"use client";

import { Rnd } from "react-rnd";
import { CanvasItem } from "@/app/types/CanvasItem";

interface Props {
  item: CanvasItem;
  onChange: (updated: CanvasItem) => void;
}

export default function DraggableItem({ item, onChange }: Props) {
  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      onDragStop={(_, d) =>
        onChange({ ...item, x: d.x, y: d.y })
      }
      onResizeStop={(_, __, ref, ___, position) =>
        onChange({
          ...item,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        })
      }
      bounds="parent"
      className="border cursor-move bg-white/20 backdrop-blur-md"
    >
      {item.type === "text" ? (
        <div className="w-full h-full flex items-center justify-center p-2 text-black font-semibold">
          {item.content}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.content}
          alt=""
          className="w-full h-full object-contain pointer-events-none"
        />
      )}
    </Rnd>
  );
}
