import { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-1",
    left: "right-full top-1/2 transform -translate-x-1 -translate-y-1/2",
    right: "left-full top-1/2 transform translate-x-1 -translate-y-1/2",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`absolute ${positionClasses[position]} w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20`}
      >
        {content}
      </div>
    </div>
  );
}