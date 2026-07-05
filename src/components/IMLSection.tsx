import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

export default function IMLSection() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  const features = [
    t("iml.feature1"),
    t("iml.feature2"),
    t("iml.feature3"),
    t("iml.feature4"),
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">

        {/* Section heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-widest uppercase text-primary mb-3 font-body"
        >
          {t("iml.heading")}
        </motion.p>

        {/* Two-column layout: image left, text right (reverses for RTL) */}
        <div className={`flex flex-col ${isRTL ? "md:flex-row-reverse" : "md:flex-row"} gap-10 md:gap-16 items-center`}>

          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={isRTL ? fadeRight : fadeLeft}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted shadow-lg">
              <img
                src="/iml-printing.jpg"
                alt={t("iml.title")}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image not yet added
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Placeholder shown until image is added */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80 text-muted-foreground text-sm font-body pointer-events-none">
                <span className="opacity-50">Add /public/iml-printing.webp</span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <motion.h2
              variants={fadeRight}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t("iml.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8"
            >
              {t("iml.body")}
            </motion.p>

            {/* Feature list */}
            <motion.ul className="space-y-4" variants={stagger}>
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-foreground font-body leading-snug">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
