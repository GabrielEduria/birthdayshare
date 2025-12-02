"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  href,
  className,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer transition";

  if (href) {
    return (
      <Link href={href} className={clsx(baseStyles, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clsx(baseStyles, className)} {...rest}>
      {children}
    </button>
  );
}