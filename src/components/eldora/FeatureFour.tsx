"use client";

import { cn } from "@heroui/react";

export function TextComponent({
  number,
  title,
  content,
  isOpen,
  loadingWidthPercent,
}: Readonly<{
  number: number;
  title: string;
  content: string;
  isOpen: boolean;
  loadingWidthPercent?: number;
}>) {
  return (
    <div
      className={cn(
        "transform-gpu rounded-lg border transition-all",
        isOpen
          ? "border-amber-500 border "
          : "scale-90 border-transparent opacity-50 saturate-0",
      )}
    >
      <div className="flex w-full items-center gap-4 p-4">
        <p
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-amber-500  text-neutral-600",
          )}
        >
          {number}
        </p>
        <h2
          className={cn(
            "text-left text-4xl font-medium text-neutral-800 dark:text-neutral-200 font-serif",
          )}
        >
          {title}
        </h2>
      </div>
      <div
        className={cn(
          "w-full transform-gpu overflow-hidden text-left text-neutral-600 transition-all duration-500 dark:text-neutral-400",
          isOpen ? " max-h-64" : "max-h-0",
        )}
      >
        <p className="p-4 text-lg font-geistSans">{content}</p>
        <div className="w-full px-4 pb-4">
          <div className="relative h-1 w-full overflow-hidden rounded-full">
            <div
              className={cn("absolute left-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-600")}
              style={{ width: `${loadingWidthPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}