/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Rnd } from "react-rnd";
import { CanvasItem } from "@/app/types/CanvasItem";

interface Props {
  item: CanvasItem & {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    shape?: string;
  };
  isSelected?: boolean;
  setSelected?: (id: string | null) => void;
  updateItem?: (id: string, changes: Partial<any>) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  children: React.ReactNode;
}

export default function DraggableItem({
  item,
  children,
  updateItem,
}: Props) {
  return (
    <Rnd
      size={{ width: item.width, height: item.height }}
      position={{ x: item.x, y: item.y }}
      onDragStop={(_, d) =>
        updateItem?.(item.id, { x: d.x, y: d.y })
      }
      onResizeStop={(_, __, ref, ___, position) =>
        updateItem?.(item.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        })
      }
      bounds="parent"
      className="cursor-move"
    >
      {children}
    </Rnd>
  );
}
