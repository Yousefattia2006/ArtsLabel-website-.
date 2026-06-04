import { useState, useEffect, useRef } from "react";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_SRC = "/artslabel-logo.svg";

/** Strip near-white/cream background from logo using canvas */
function useTransparentLogo(src: string) {
  const [result, setResult] = useState<string>(src);
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

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const logoSrc = useTransparentLogo(LOGO_SRC);

  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const lastY        = useRef(0);
  const stopTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { label: t("nav.products"), id: "products" },
    { label: t("nav.partners"), id: "partners" },
    { label: t("nav.contact"),  id: "contact"  },
  ];

  /* ── Scroll behaviour ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      // Clear any existing stop-timer
      if (stopTimer.current) clearTimeout(stopTimer.current);

      if (y <= 120) {
        // Near top — always visible
        setHidden(false);
      } else if (y < lastY.current - 2) {
        // Scrolling UP — show header
        setHidden(false);
        // Hide again 800ms after scrolling stops
        stopTimer.current = setTimeout(() => setHidden(true), 800);
      } else if (y > lastY.current + 4) {
        // Scrolling DOWN — hide immediately
        setHidden(true);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all",
          // hide / reveal
          hidden ? "-translate-y-full" : "translate-y-0",
          // duration — 400ms per UI/UX Pro Max (premium feel)
          "duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        )}
      >
        {/* ── Liquid glass bar ── */}
        <div
          className={cn(
            "transition-all duration-[420ms]",
            scrolled
              // Glassmorphism: blur 20px + saturate 180% + semi-transparent bg
              ? "bg-[hsl(35,25%,97%)]/80 backdrop-blur-xl saturate-180 border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
              // Top of page: dark gradient overlay so header differentiates from hero
              : "bg-gradient-to-b from-black/55 via-black/18 to-transparent border-b border-transparent"
          )}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-20">

            {/* ── Logo ── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label="Back to top"
            >
              <img src={logoSrc} alt="ArtsLabel" className="h-14 w-auto" />
            </button>

            {/* ── Desktop links ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={cn(
                    "relative px-4 py-2.5 rounded-lg text-sm font-medium font-body tracking-wide",
                    "cursor-pointer transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    "group",
                    scrolled
                      ? "text-foreground/75 hover:text-foreground hover:bg-black/5"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  {l.label}
                  {/* Animated underline — 200ms micro-interaction */}
                  <span className={cn(
                    "absolute bottom-1.5 left-4 right-4 h-[1.5px] rounded-full",
                    "scale-x-0 group-hover:scale-x-100 origin-left rtl:origin-right",
                    "transition-transform duration-200",
                    scrolled ? "bg-primary" : "bg-white/70"
                  )} />
                </button>
              ))}

              {/* Divider */}
              <div className={cn(
                "w-px h-5 mx-2 rounded-full transition-colors duration-300",
                scrolled ? "bg-border" : "bg-white/20"
              )} />

              {/* Language toggle — Globe SVG icon (no emoji per UX rules) */}
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "text-sm font-medium font-body cursor-pointer",
                  "border transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  scrolled
                    ? "text-foreground/75 hover:text-foreground border-border/80 hover:bg-black/5"
                    : "text-white/85 hover:text-white border-white/25 hover:bg-white/10"
                )}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span>{lang === "en" ? "عربي" : "EN"}</span>
              </button>
            </nav>

            {/* ── Mobile controls ── */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg",
                  "text-sm font-body cursor-pointer border transition-all duration-200",
                  scrolled
                    ? "text-foreground/75 border-border hover:bg-black/5"
                    : "text-white/85 border-white/30 hover:bg-white/10"
                )}
              >
                <Globe className="w-4 h-4" />
                {lang === "en" ? "ع" : "EN"}
              </button>
              <button
                onClick={() => setMobileOpen(v => !v)}
                className={cn(
                  "p-2 rounded-lg cursor-pointer transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  scrolled
                    ? "text-foreground/75 hover:bg-black/5"
                    : "text-white/85 hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          "bg-[hsl(35,25%,97%)]/95 backdrop-blur-xl border-b border-white/40",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left rtl:text-right px-4 py-3 rounded-lg text-sm font-medium font-body text-foreground/80 hover:text-foreground hover:bg-black/5 cursor-pointer transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Offset so content doesn't hide behind fixed nav */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
