"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface ErrorToastProps {
  message: string;
  duration?: number; 
}

export default function ErrorToast({ message, duration = 3000 }: ErrorToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in">
      {message}
    </div>
  );
}