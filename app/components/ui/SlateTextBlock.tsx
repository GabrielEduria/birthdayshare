"use client";

import React, { useMemo, useEffect } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface SlateTextBlockProps {
  value: Descendant[]; 
  readOnly?: boolean;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  onChange: (value: Descendant[]) => void;
}

export default function SlateTextBlock({
  value,
  onChange,
  readOnly = false,
  fontSize = 32,
  fontFamily = "Poppins, sans-serif",
  color = "#111827",
}: SlateTextBlockProps) {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    if (!value || value.length === 0) {
      onChange([
        {
          children: [{ text: "" }],
        },
      ]);
    }
  }, [value, onChange]);

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        readOnly={readOnly}
        style={{
          fontSize,
          fontFamily,
          color,
          width: "100%",
          height: "100%",
          textAlign: "center",
          lineHeight: 1.2,
          whiteSpace: "pre-wrap",
          cursor: readOnly ? "default" : "text",
          userSelect: readOnly ? "none" : "text",
          outline: "none",
          padding: 0,
          margin: 0,
        }}
        placeholder="Type here..."
      />
    </Slate>
  );
}
