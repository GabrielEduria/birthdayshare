"use client";

import { Rnd } from "react-rnd";
import { CanvasItem } from "@/app/types/CanvasItem";

interface DraggableItemProps {
  item: CanvasItem & {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    shape?: string;
  };
  onChange: (changes: Partial<CanvasItem>) => void;
  isSelected?: boolean;
  setSelected?: (id: string | null) => void;
  children: React.ReactNode;
}

export default function DraggableItem({
  item,
  onChange,
  isSelected,
  setSelected,
  children,
}: DraggableItemProps) {
  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      bounds="parent"
      onDragStop={(_, d) =>
        onChange({ x: d.x, y: d.y })
      }

      onResizeStop={(_, __, ref, ___, position) =>
        onChange({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        })
      }
      onClick={() => setSelected && setSelected(item.id)}
      className="relative"
    >
      {children}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "2px dashed #3b82f6",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        />
      )}
    </Rnd>
  );
}
