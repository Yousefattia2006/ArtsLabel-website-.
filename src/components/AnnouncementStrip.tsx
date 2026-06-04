import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AnnouncementStrip() {
  const { t } = useLanguage();
  const BG = "#ffa51f";
  const PAGE = "hsl(35, 25%, 95%)";

  return (
    <div className="relative w-full select-none" style={{ margin: "-1px 0" }}>

      {/* ── TOP TEAR ── */}
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "130px" }}>
        {/* orange fill behind so no gap */}
        <rect width="1440" height="110" fill={BG} />
        {/* page-colour smooth torn piece sitting on top */}
        <path
          d={`
            M0,0
            L0,75
            C60,85 120,55 180,70
            C240,85 300,50 360,65
            C400,75 430,45 480,60
            C530,75 560,40 620,58
            C670,73 700,38 760,55
            C820,72 850,35 910,52
            C960,67 990,30 1050,48
            C1100,63 1130,28 1190,45
            C1250,62 1290,32 1350,50
            C1390,62 1415,42 1440,55
            L1440,0 Z
          `}
          fill={PAGE}
        />
        {/* subtle shadow stroke along the tear */}
        <path
          d={`
            M0,75
            C60,85 120,55 180,70
            C240,85 300,50 360,65
            C400,75 430,45 480,60
            C530,75 560,40 620,58
            C670,73 700,38 760,55
            C820,72 850,35 910,52
            C960,67 990,30 1050,48
            C1100,63 1130,28 1190,45
            C1250,62 1290,32 1350,50
            C1390,62 1415,42 1440,55
          `}
          fill="none"
          stroke="rgba(0,0,0,0.10)"
          strokeWidth="4"
        />
      </svg>

      {/* ── MAIN STRIP ── */}
      <div className="w-full flex items-center justify-center py-24 md:py-36 px-6"
        style={{ backgroundColor: BG }}>
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

      {/* ── BOTTOM TEAR ── */}
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "130px" }}>
        {/* orange fill */}
        <rect width="1440" height="110" fill={BG} />
        {/* page-colour smooth torn piece from bottom */}
        <path
          d={`
            M0,110
            L0,42
            C50,30 100,55 160,38
            C220,22 270,50 330,35
            C380,22 420,52 480,38
            C540,24 580,56 640,42
            C690,30 720,58 780,44
            C840,30 870,60 930,46
            C980,34 1010,62 1070,48
            C1120,36 1150,64 1210,50
            C1260,38 1300,62 1360,48
            C1395,38 1420,55 1440,44
            L1440,110 Z
          `}
          fill={PAGE}
        />
        {/* shadow stroke */}
        <path
          d={`
            M0,42
            C50,30 100,55 160,38
            C220,22 270,50 330,35
            C380,22 420,52 480,38
            C540,24 580,56 640,42
            C690,30 720,58 780,44
            C840,30 870,60 930,46
            C980,34 1010,62 1070,48
            C1120,36 1150,64 1210,50
            C1260,38 1300,62 1360,48
            C1395,38 1420,55 1440,44
          `}
          fill="none"
          stroke="rgba(0,0,0,0.10)"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
