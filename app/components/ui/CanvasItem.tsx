/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { CanvasItem as BaseCanvasItem } from "@/types/CanvasItem";
import DraggableItem from "./DraggableItem";

interface CanvasItemProps {
  item: BaseCanvasItem & {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    shape?: string;
  };

  selectedId?: string | null;
  setSelected?: (id: string | null) => void;
  updateItem?: (id: string, changes: Partial<BaseCanvasItem>) => void;

  readOnly?: boolean;
}

function renderShape(
  shape: string | undefined,
  width: number,
  height: number,
  color?: string
) {
  switch (shape) {
    case "rectangle":
      return (
        <div
          style={{
            width,
            height,
            backgroundColor: color || "#e5e7eb",
            borderRadius: 8,
          }}
        />
      );

    case "circle":
      return (
        <div
          style={{
            width,
            height,
            borderRadius: "50%",
            backgroundColor: color || "#e5e7eb",
          }}
        />
      );

    case "star":
      return (
        <div
          style={{
            width,
            height,
            backgroundColor: color || "#facc15",
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      );

    case "heart":
      return (
        <div
          style={{
            width,
            height,
            backgroundColor: color || "#ef4444",
            clipPath:
              "path('M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z')",
          }}
        />
      );

    default:
      return null;
  }
}

export default function CanvasItem({
  item,
  selectedId,
  setSelected,
  updateItem,
  readOnly = false,
}: CanvasItemProps) {
  const isSelected = selectedId === item.id;
  const content = (() => {
    if (item.type === "text") {
      return (
        <div
          contentEditable={!readOnly}
          suppressContentEditableWarning
          style={{
            width: "100%",
            height: "100%",
            fontFamily: item.fontFamily || "Poppins, sans-serif",
            fontSize: item.fontSize || 32,
            color: item.color || "#111827",
            textAlign: "center",
            whiteSpace: "pre-wrap",
            lineHeight: 1.2,
            cursor: readOnly ? "default" : "text",
            userSelect: readOnly ? "none" : "text",
          }}
          onInput={
            readOnly || !updateItem
              ? undefined
              : (e) =>
                  updateItem(item.id, {
                    content: e.currentTarget.innerText,
                  })
          }
        >
          {item.content}
        </div>
      );
    }

    if (item.type === "image" && item.shape) {
      return renderShape(item.shape, item.width, item.height, item.color);
    }

    if (item.type === "image") {
      return (
        <img
          src={item.content}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      );
    }

    return null;
  })();

  if (readOnly) {
    return (
      <div
        style={{
          position: "absolute",
          left: item.x,
          top: item.y,
          width: item.width,
          height: item.height,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <DraggableItem
      item={item}
      isSelected={isSelected}
      setSelected={setSelected!}
      onChange={(updatedItem) =>
        updateItem && updateItem(item.id, updatedItem)
      }
    >
      {content}
    </DraggableItem>
  );
}
