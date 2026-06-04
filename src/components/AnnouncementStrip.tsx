import { useLanguage } from "@/contexts/LanguageContext";

export default function AnnouncementStrip() {
  const { t } = useLanguage();

  return (
    <div className="w-full select-none flex items-center justify-center py-24 md:py-36 px-6" style={{ backgroundColor: "#ffa51f" }}>
      <p
        className="text-center text-white font-black text-5xl md:text-8xl lg:text-9xl leading-tight"
        style={{
          fontFamily: "'Cairo', sans-serif",
          textShadow: "3px 5px 0px rgba(0,0,0,0.25), 0 2px 16px rgba(0,0,0,0.15)",
          WebkitTextStroke: "1px rgba(255,255,255,0.15)",
        }}
      >
        {t("strip.text")}
      </p>
    </div>
  );
}
