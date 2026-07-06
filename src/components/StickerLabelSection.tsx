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

export default function StickerLabelSection() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  const features = [
    t("sticker.feature1"),
    t("sticker.feature2"),
    t("sticker.feature3"),
    t("sticker.feature4"),
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-widest uppercase text-primary mb-3 font-body"
        >
          {t("sticker.heading")}
        </motion.p>

        {/* Two-column layout: text left, image right (opposite of IML) */}
        <div className={`flex flex-col ${isRTL ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center`}>

          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={isRTL ? fadeLeft : fadeRight}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-muted shadow-lg">
              <img
                src="/sticker-label.jpg"
                alt={t("sticker.title")}
                className="w-full h-full object-cover"
              />
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
              variants={fadeLeft}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t("sticker.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8"
            >
              {t("sticker.body")}
            </motion.p>

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
