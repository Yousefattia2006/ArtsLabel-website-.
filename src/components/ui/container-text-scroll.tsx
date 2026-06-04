"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerTextScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.8, 1] : [0.9, 1]);

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0.8, 1, 0.8] : [0.9, 1, 0.9]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const titleTranslateY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div
      className="flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ perspective: "1000px" }}
    >
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <Card rotate={rotate} scale={scale}>
          {children}

          <motion.div
            style={{ translateY: titleTranslateY, scale: titleScale }}
            className="max-w-5xl mx-auto absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="text-center">{titleComponent}</div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue;
  scale: MotionValue;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-border rounded-[30px] shadow-2xl overflow-hidden relative"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-muted md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
