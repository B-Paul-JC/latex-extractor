// LoadingBlocks.tsx
import React from "react";

interface LoadingBlocksProps {
  heights: number[];
}

export const LoadingBlocks: React.FC<LoadingBlocksProps> = ({ heights }) => (
  <div className="mt-6 rotate-180 h-16 flex justify-center gap-2">
    {heights.map((height, index) => (
      <div
        key={index}
        className="w-2 bg-green-700 rounded transition-all duration-300"
        style={{ height: `${height}px` }}
      />
    ))}
  </div>
);
