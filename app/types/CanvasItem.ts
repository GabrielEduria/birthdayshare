export type CanvasItem = {
  id: number;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
