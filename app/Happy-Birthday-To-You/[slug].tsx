"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { CanvasItem } from "../types/CanvasItem";

export default function ViewCard() {
  const params = useParams();
  const slug = params.slug;
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCard = async () => {
      const res = await fetch(`/api/getCard/${slug}`);
      const data = await res.json();
      if (data?.data) setItems(data.data);
      setLoading(false);
    };

    fetchCard();
  }, [slug]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl mb-4">Happy Birthday {slug} 🎉</h1>

      <div
        className="relative bg-white border"
        style={{ width: 1080, height: 1080 }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
            }}
          >
            {item.type === "text" ? (
              <div className="text-xl">{item.content}</div>
            ) : (
              <img
                src={item.content}
                className="w-full h-full object-cover"
              />
            )} 
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
}
