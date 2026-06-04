import { useLanguage } from "@/contexts/LanguageContext";

export default function AnnouncementStrip() {
  const { t } = useLanguage();

  return (
    <div className="w-full select-none py-16 md:py-24 px-4 md:px-8 flex items-center justify-center bg-background"
      style={{ perspective: "1200px" }}
    >
      {/* The label block — tilted in 3D like it's stuck on a curved bottle surface */}
      <div
        className="w-full max-w-6xl relative flex items-center justify-center py-20 md:py-28 px-8 rounded-xl overflow-hidden"
        style={{
          backgroundColor: "#ffa51f",
          transform: "rotateX(6deg) rotateY(-1deg)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 30px 80px -10px rgba(255,165,31,0.45), 0 8px 20px -4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        {/* Subtle gloss highlight at top — like a label's sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
            borderRadius: "inherit",
          }}
        />

        {/* Left edge shadow — gives the wrap-around depth */}
        <div
          className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.08), transparent)" }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.08), transparent)" }}
        />

        <p
          className="relative text-center text-white font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight"
          style={{
            fontFamily: "'Cairo', sans-serif",
            textShadow: "2px 4px 0px rgba(0,0,0,0.2), 0 1px 12px rgba(0,0,0,0.1)",
          }}
        >
          {t("strip.text")}
        </p>
      </div>
    </div>
  );
}
