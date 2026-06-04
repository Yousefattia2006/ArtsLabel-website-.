"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children: React.ReactNode;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    delay: i * 0.15,
  }));

  return (
    <div className={cn("w-full relative", className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Slide the whole SVG from left to right on repeat */}
        <motion.div
          className="absolute inset-0"
          style={{ width: "300%", left: "-100%" }}
          animate={{ x: ["0%", "33.333%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <svg
            className="w-full h-full text-slate-950 dark:text-white"
            /* viewBox covers the full vertical span of the paths (-189 → 875) */
            viewBox="-400 -200 2500 1100"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {[0, 750, 1500].map((offsetX) =>
              paths.map((path) => (
                <motion.path
                  key={`${offsetX}-${path.id}`}
                  d={path.d}
                  stroke="currentColor"
                  strokeWidth={path.width * 1.4}
                  strokeOpacity={0.15 + path.id * 0.018}
                  transform={`translate(${offsetX}, 0)`}
                  fill="none"
                  initial={{ pathLength: 0.3, opacity: 0.5 }}
                  animate={{
                    pathLength: 1,
                    opacity: [0.35, 0.75, 0.35],
                    pathOffset: [0, 1, 0],
                  }}
                  transition={{
                    duration: 20 + (path.id % 8) * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: path.delay,
                  }}
                />
              ))
            )}
          </svg>
        </motion.div>
      </div>

      {children}
    </div>
  );
}
