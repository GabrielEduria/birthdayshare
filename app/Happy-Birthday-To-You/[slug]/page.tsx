import { notFound } from "next/navigation";
import CanvasItem from "@/components/ui/CanvasItem";
import type { CanvasItem as CanvasItemType } from "@/types/CanvasItem";

async function getDesign(slug: string): Promise<CanvasItemType[] | null> {
  if (!slug) return null;

  return [
    {
      id: "1",
      type: "text",
      content: "🎉 Happy Birthday John! 🎂",
      x: 200,
      y: 140,
      width: 680,
      height: 140,
      fontSize: 56,
      fontFamily: "Poppins",
      color: "#ec4899",
    },
    {
      id: "2",
      type: "image",
      content: "/cake.jpg",
      x: 390,
      y: 340,
      width: 300,
      height: 300,
      color: "",
      fontSize: 0,
      fontFamily: ""
    },
  ];
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const design = await getDesign(params.slug);

  if (!design) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 flex flex-col items-center px-4 py-10">
 
      <header className="mb-6 text-center max-w-xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Someone made you a birthday card 🎁
        </h1>
        <p className="text-gray-600 mt-2">
          A small surprise, just for you.
        </p>
      </header>

      <section
        className="relative bg-white rounded-[32px] shadow-2xl overflow-hidden ring-1 ring-black/5"
        style={{ width: 1080, height: 1080 }}
      >
        {design.map((item) => (
          <CanvasItem key={item.id} item={item} readOnly />
        ))}
      </section>

      <footer className="mt-8 text-sm text-gray-500">
        Made with ❤️ on <span className="font-medium">Birthday Share</span>
      </footer>
    </main>
  );
}
