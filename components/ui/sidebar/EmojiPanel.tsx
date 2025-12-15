"use client";

import { useState } from "react";

interface EmojiPanelProps {
  onAddEmoji: (emoji: string) => void;
}

const emojiList = [
  "🎉", "🎂", "🎈", "🎁", "✨", "⭐", "💖", "❤️",
  "🥳", "😄", "😊", "💝", "🧁", "🍰",
  "🌟", "🎀", "🍭", "🍬",
];

export default function EmojiPanel({ onAddEmoji }: EmojiPanelProps) {
  const [query, setQuery] = useState("");

  const filtered = emojiList.filter((e) =>
    e.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-2">Emoji</h3>

      <input
        type="text"
        placeholder="Search emoji..."
        className="border p-2 w-full rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-6 gap-2 text-xl">
        {filtered.map((emoji, i) => (
          <button
            key={i}
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => onAddEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
