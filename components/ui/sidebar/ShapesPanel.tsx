"use client";

interface ShapesPanelProps {
  onAddShape: (shape: string) => void;
}

const shapes = [
  { id: "rectangle", label: "Rectangle" },
  { id: "circle", label: "Circle" },
  { id: "star", label: "Star" },
  { id: "heart", label: "Heart" },
  { id: "balloon", label: "Balloon" },
  { id: "cake", label: "Cake" },
];

export default function ShapesPanel({ onAddShape }: ShapesPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-2">Shapes</h3>

      <div className="grid grid-cols-2 gap-3">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => onAddShape(s.id)}
            className="p-3 bg-gray-100 rounded border hover:bg-gray-200 text-sm"
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Shapes can be resized and recolored after adding.
      </p>
    </div>
  );
}
