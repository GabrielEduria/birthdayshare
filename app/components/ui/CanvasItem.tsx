/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import type { CanvasItem as BaseCanvasItem } from "@/app/types/CanvasItem";
import DraggableItem from "./DraggableItem";

interface CanvasItemProps {
  item: BaseCanvasItem & {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    shape?: string;
  };
  selectedId: string | null;
  setSelected: (id: string | null) => void;
  updateItem: (id: string, changes: Partial<unknown>) => void;
}

const renderShape = (
  shape: string | undefined,
  width: number,
  height: number,
  color: string
) => {
  switch (shape) {
    case "rectangle":
      return <div style={{ width, height, backgroundColor: color || "#ccc" }} />;
    case "circle":
      return (
        <div
          style={{
            width,
            height,
            borderRadius: "50%",
            backgroundColor: color || "#ccc",
          }}
        />
      );
    case "star":
      return (
        <div
          style={{
            width,
            height,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
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

export default function CanvasItem({
  item,
  selectedId,
  setSelected,
  updateItem,
}: CanvasItemProps) {
  const isSelected = selectedId === item.id;

  return (
    <DraggableItem
      item={item}
      isSelected={isSelected}
      setSelected={setSelected}
      onChange={(updatedItem) => updateItem(item.id, updatedItem)}
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
            direction: "ltr",      
            textAlign: "left",     
            whiteSpace: "pre-wrap" 
          }}
          onInput={(e) => updateItem(item.id, { content: e.currentTarget.innerText })}
        >
          {item.content}
        </div>
      ) : item.type === "image" && item.shape ? (
        renderShape(item.shape, item.width, item.height, item.color || "#ccc")
      ) : item.type === "image" ? (
        <img
          src={item.content}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : null}
    </DraggableItem>
  );
}
