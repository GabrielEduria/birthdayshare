/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { CanvasItem as BaseCanvasItem } from "@/app/types/CanvasItem";
import DraggableItem from "./DraggableItem";

const renderShape = (shape: string | undefined, width: number, height: number, color: string) => {
  switch (shape) {
    case "rectangle":
      return <div style={{ width, height, backgroundColor: color || "#ccc" }} />;
    case "circle":
      return <div style={{ width, height, borderRadius: "50%", backgroundColor: color || "#ccc" }} />;
    case "star":
      return (
        <div
          style={{
            width,
            height,
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            backgroundColor: color || "#ffc107",
          }}
        />
      );
    case "heart":
      return (
        <div
          style={{
            width,
            height,
            backgroundColor: color || "red",
            clipPath:
              "path('M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z')",
          }}
        />
      );
    default:
      return null;
  }
};

interface CanvasItemProps {
  item: BaseCanvasItem & { shape?: string; fontFamily?: string; color?: string; fontSize?: number };
  selectedId: string | null;
  setSelected: (id: string | null) => void;
  updateItem: (id: string, changes: Partial<unknown>) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export default function CanvasItem({
  item,
  selectedId,
  setSelected,
  updateItem,
  onDelete,
  onDuplicate,
}: CanvasItemProps) {
  const isSelected = selectedId === item.id;

  return (
    <DraggableItem
      item={item}
      isSelected={isSelected}
      setSelected={setSelected}
      updateItem={updateItem}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
    >
      {item.type === "text" ? (
        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: item.fontFamily || "Arial",
            fontSize: item.fontSize || 16,
            color: item.color || "#000",
            width: "100%",
            height: "100%",
          }}
          onInput={(e) =>
            updateItem(item.id, { content: e.currentTarget.innerText })
          }
        >
          {item.content}
        </div>
      ) : item.type === "image" && item.shape ? (
        renderShape(item.shape, item.width, item.height, item.color || "#ccc")
      ) : item.type === "image" ? (
        <img src={item.content} alt="" style={{ width: "100%", height: "100%" }} />
      ) : null}

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
    </DraggableItem>
  );
}
