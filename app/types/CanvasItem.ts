export interface CanvasItem {
  color: string;
  fontSize: number;
  fontFamily: string;
  id: string;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
}