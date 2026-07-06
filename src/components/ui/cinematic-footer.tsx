"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Styles ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.9; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%,100% { transform: scale(1);   filter: drop-shadow(0 0 5px  color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%,45% { transform: scale(1.25); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30%     { transform: scale(1); }
}

.animate-footer-breathe        { animation: footer-breathe        8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 35s linear      infinite; }
.animate-footer-heartbeat      { animation: footer-heartbeat       2s cubic-bezier(0.25,1,0.5,1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right,  color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, #ffa51f 15%, transparent) 0%,
    color-mix(in oklch, #ffa51f 8%,  transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: clamp(48px, 22vw, 22vw);
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 2px rgba(30, 20, 10, 0.25);
  background: linear-gradient(180deg, rgba(30, 20, 10, 0.22) 0%, rgba(30, 20, 10, 0.06) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Cairo', sans-serif;
  white-space: nowrap;
}

.footer-text-glow {
  -webkit-text-fill-color: #1a1a1a;
  color: #1a1a1a;
  filter: none;
}
`;

// ── Magnetic Button ──────────────────────────────────────────────────────────
type MagneticProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

const MagneticButton = React.forwardRef<HTMLElement, MagneticProps>(
  ({ className, children, as: Tag = "button", ...props }, fwdRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4, rotationX: -(e.clientY - r.top - r.height / 2) * 0.15, rotationY: (e.clientX - r.left - r.width / 2) * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.2 });
        el.addEventListener("mousemove", onMove as any);
        el.addEventListener("mouseleave", onLeave);
        return () => { el.removeEventListener("mousemove", onMove as any); el.removeEventListener("mouseleave", onLeave); };
      }, el);
      return () => ctx.revert();
    }, []);

    return (
      <Tag
        ref={(n: HTMLElement) => {
          (localRef as any).current = n;
          if (typeof fwdRef === "function") fwdRef(n);
          else if (fwdRef) (fwdRef as any).current = n;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// ── Marquee row ──────────────────────────────────────────────────────────────
const MARQUEE_TEXT = "Premium Label Printing — PE — PP — Thermal — Metallized — UV Coating & Lamination — IML In-Mold Labels — Alexandria, Egypt — Arts Label";

const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-foreground/70 whitespace-nowrap shrink-0">
    <span>{MARQUEE_TEXT}</span>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export function CinematicFooter() {
  const { t } = useLanguage();
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const linksRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo([headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={wrapperRef}
        className="relative w-full overflow-hidden bg-background text-foreground cinematic-footer-wrapper"
      >
          {/* Aurora glow */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div ref={giantTextRef} className="footer-giant-bg-text absolute -bottom-[3vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
            ARTSLABEL
          </div>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden border-b border-border/50 bg-background/60 backdrop-blur-md py-3 z-10" dir="ltr">
            <div className="flex w-max animate-footer-scroll-marquee">
              <MarqueeItem /><MarqueeItem /><MarqueeItem />
              <MarqueeItem /><MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* Centre content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:py-24 w-full max-w-5xl mx-auto">
            <h2 ref={headingRef} className="text-4xl sm:text-6xl md:text-8xl font-black footer-text-glow tracking-tighter mb-10 text-center" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {t("footer.standout")}
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              {/* Primary CTA pills */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full">
                <MagneticButton as="a" href="https://wa.me/201226613862" target="_blank" rel="noopener noreferrer"
                  className="footer-glass-pill px-7 py-4 rounded-full text-foreground font-bold text-sm flex items-center justify-center gap-3 group w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  WhatsApp
                </MagneticButton>
                <MagneticButton as="a" href="mailto:Ahmed@artslabels.com"
                  className="footer-glass-pill px-7 py-4 rounded-full text-foreground font-bold text-sm flex items-center justify-center gap-3 group w-full sm:w-auto">
                  <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  Ahmed@artslabels.com
                </MagneticButton>
                <MagneticButton as="a" href="tel:01226613862"
                  className="footer-glass-pill px-7 py-4 rounded-full text-foreground font-bold text-sm flex items-center justify-center gap-3 group w-full sm:w-auto">
                  <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  012 26613862
                </MagneticButton>
              </div>

              {/* Secondary nav pills */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full mt-1">
                {[
                  { label: t("nav.products"),    id: "products"  },
                  { label: t("materials.title"), id: "materials" },
                  { label: t("nav.partners"),    id: "partners"  },
                  { label: t("nav.contact"),     id: "contact"   },
                ].map(({ label, id }) => (
                  <MagneticButton key={id} as="button" onClick={() => scrollTo(id)}
                    className="footer-glass-pill px-5 py-2.5 rounded-full text-muted-foreground font-medium text-xs hover:text-foreground">
                    {label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/30 pt-6">

            <div className="text-foreground/60 text-[10px] md:text-xs font-semibold tracking-widest uppercase font-body text-center sm:text-left order-3 sm:order-1">
              {t("footer.rights2")}
            </div>

            {/* Crafted by MY Studios */}
            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 cursor-default border-border/50 order-1 sm:order-2">
              <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest font-body">{t("footer.crafted")}</span>
              <span className="animate-footer-heartbeat text-sm text-destructive">❤</span>
              <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest font-body">{t("footer.by")}</span>
              <span className="text-foreground font-black text-xs md:text-sm tracking-normal ml-1 rtl:ml-0 rtl:mr-1">MY Studios</span>
            </div>

            {/* Back to top */}
            <MagneticButton as="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group order-2 sm:order-3">
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>

        </footer>
    </>
  );
}
