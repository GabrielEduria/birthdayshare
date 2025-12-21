/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";

interface ImagesPanelProps {
  onAddImage: (url: string) => void;
  onUploadImage: (file: File) => void;
}

const birthdayClipart = [
  "/clipart/cake.png",
  "/clipart/balloon.png",
  "/clipart/gift.png",
  "/clipart/confetti.png",
  "/clipart/party-hat.png",
];

const stickers = [
  "/stickers/star.png",
  "/stickers/heart.png",
  "/stickers/sparkle.png",
  "/stickers/flower.png",
  "/stickers/ribbon.png",
];

export default function ImagesPanel({
  onAddImage,
  onUploadImage,
}: ImagesPanelProps) {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onAddImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">

      <section>
        <h3 className="font-semibold mb-2">Upload Image</h3>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />

        <button
          className="w-full py-2 bg-blue-600 text-white rounded"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Image URL</h3>

        <input
          ref={urlInputRef}
          type="text"
          className="border p-2 w-full rounded"
          placeholder="https://example.com/image.png"
        />

        <button
          className="mt-2 w-full py-2 bg-gray-700 text-white rounded"
          onClick={() => {
            const url = urlInputRef.current?.value;
            if (url && url.length > 5) onAddImage(url);
          }}
        >
          Add Image
        </button>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Birthday Clipart</h3>

        <div className="grid grid-cols-3 gap-3">
          {birthdayClipart.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="clipart"
              className="w-full h-20 object-contain cursor-pointer bg-white p-1 rounded border hover:bg-gray-100"
              onClick={() => onAddImage(src)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Stickers</h3>

        <div className="grid grid-cols-3 gap-3">
          {stickers.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="sticker"
              className="w-full h-20 object-contain cursor-pointer bg-white p-1 rounded border hover:bg-gray-100"
              onClick={() => onAddImage(src)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
