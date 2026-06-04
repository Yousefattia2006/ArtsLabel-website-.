import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import bottlePlain from "@/assets/bottle-plain.webp";
import labelRoll from "@/assets/label-roll.webp";
import bottleLabeled from "@/assets/bottle-labeled.webp";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const steps = [
  { textKey: "scroll.step1.text", subKey: "scroll.step1.sub", num: "01" },
  { textKey: "scroll.step2.text", subKey: "scroll.step2.sub", num: "02" },
  { textKey: "scroll.step3.text", subKey: "scroll.step3.sub", num: "03" },
];

const images = [bottlePlain, labelRoll, bottleLabeled];

export default function ScrollAnimation() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
        const raw = -rect.top / scrollHeight;
        setProgress(clamp(raw, 0, 1));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const getVisibility = (index: number) => {
    const segStart = index * 0.33;
    const segEnd = segStart + 0.5;
    const segMid = segStart + 0.2;
    let opacity = 0, translateY = 0, scale = 1;

    if (progress < segStart) {
      if (index === 0) { opacity = 1; }
      else { opacity = 0; translateY = 60; scale = 0.95; }
    } else if (progress < segMid) {
      const t = easeInOutCubic((progress - segStart) / (segMid - segStart));
      if (index === 0) { opacity = 1; }
      else { opacity = lerp(0, 1, t); translateY = lerp(60, 0, t); scale = lerp(0.95, 1, t); }
    } else if (progress < segEnd) {
      const t = easeInOutCubic((progress - segMid) / (segEnd - segMid));
      if (index === 2) { opacity = 1; }
      else { opacity = lerp(1, 0, t); translateY = lerp(0, -40, t); scale = lerp(1, 0.95, t); }
    } else {
      if (index === 2) { opacity = 1; }
      else { opacity = 0; translateY = -40; scale = 0.95; }
    }

    return { opacity, transform: `translateY(${translateY}px) scale(${scale})`, transition: "none" };
  };

  const isRTL = lang === "ar";

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ background: "#F5F4F0" }}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-center">
            {/* Image Side */}
            <div className="relative flex items-center justify-center order-1 md:order-1">
              {/* Fading edges */}
              
              <div className="absolute inset-y-0 right-0 w-16 z-10" style={{ background: "linear-gradient(to left, #F5F4F0, transparent)" }} />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={t(steps[i].textKey)}
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ ...getVisibility(i), willChange: "transform, opacity", zIndex: i + 1 }}
                  />
                ))}
              </div>
            </div>

            {/* Text Side */}
            <div className="relative order-2 md:order-2 h-48 md:h-80" dir={isRTL ? "rtl" : "ltr"}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ ...getVisibility(i), willChange: "transform, opacity" }}
                >
                  {/* Accent line */}
                  <div className="w-10 h-[2px] mb-4" style={{ background: "#111111" }} />

                  {/* Slide number */}
                  <span
                    className="text-sm tracking-widest mb-3 font-mono"
                    style={{ color: "#AAAAAA" }}
                  >
                    {step.num} / 03
                  </span>

                  {/* Headline */}
                  <h2
                    className="sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed mb-4 text-5xl"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      color: "#111111",
                      lineHeight: 1.4,
                    }}
                  >
                    {t(step.textKey)}
                  </h2>

                  {/* Subtitle with decorative dot */}
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                    {isRTL && (
                      <div className="w-[2px] h-5 rounded-full" style={{ background: "#CCCCCC" }} />
                    )}
                    <p
                      className="text-left font-serif font-bold text-primary bg-inherit !text-5xl"
                    >
                      {t(step.subKey)}
                    </p>
                    {!isRTL && (
                      <div className="w-[2px] h-5 rounded-full" style={{ background: "#CCCCCC" }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: progress < 0.1 ? 1 - progress * 10 : 0, color: "#AAAAAA" }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t("scroll.indicator")}
          </span>
          <div className="w-px h-8 animate-pulse" style={{ background: "#CCCCCC" }} />
        </div>
      </div>
    </div>
  );
}
