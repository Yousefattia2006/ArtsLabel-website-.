import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useTransparentLogo(src: string) {
  const [result, setResult] = useState<string | null>(null); // null until ready
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 230 && d[i + 1] > 220 && d[i + 2] > 210) d[i + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      setResult(canvas.toDataURL("image/png"));
    };
    img.src = src;
  }, [src]);
  return result;
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const logoSrc = useTransparentLogo("/artslabel-logo.svg");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Only render once transparent version is ready — prevents white flash */}
            {logoSrc && (
              <img
                src={logoSrc}
                alt="ArtsLabel"
                className="w-48 md:w-64"
              />
            )}

            {/* Loading bar */}
            <div className="w-48 md:w-64 h-0.5 bg-border overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#ffa51f" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
