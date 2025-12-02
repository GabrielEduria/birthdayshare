import { notFound } from "next/navigation";
import CanvasItem from "@/app/components/CanvasItem";
import type { CanvasItem as CanvasItemType } from "@/app/types/CanvasItem";

// Temporary mock – later you will replace with DB fetch
async function getDesign(slug: string): Promise<CanvasItemType[] | null> {
  // Example saved design
  return [
    {
      id: 1,
      type: "text",
      content: "Happy Birthday!",
      x: 100,
      y: 120,
      width: 300,
      height: 80,
    },
    {
      id: 2,
      type: "image",
      content: "/cake.jpg",
      x: 200,
      y: 300,
      width: 200,
      height: 200,
    },
  ];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const design = await getDesign(params.slug);

  if (!design) return notFound();

  return (
    <div className="flex justify-center py-10">
      <div
        className="relative bg-white border"
        style={{ width: 1080, height: 1080 }}
      >
        {design.map((item) => (
          <CanvasItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
