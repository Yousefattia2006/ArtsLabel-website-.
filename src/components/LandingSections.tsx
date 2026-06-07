import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CinematicFooter } from "@/components/ui/cinematic-footer";

import { ImageComparison } from "@/components/ui/image-comparison-slider";
import bottleBefore from "@/assets/bottle-before.webp";
import bottleAfter from "@/assets/bottle-after.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const PRODUCT_CATEGORIES = [
  { key: "cosmetics", image: "/cat-cosmetics.png" },
  { key: "food",      image: "/cat-food.png"      },
  { key: "detergents",image: "/cat-detergents.png"},
  { key: "chemicals", image: "/cat-chemicals.png" },
  { key: "pesticides",image: "/cat-pesticides.png"},
  { key: "pharma",    image: "/cat-pharma.png"    },
];

export default function LandingSections() {
  const { t } = useLanguage();

  return (
    <>
      {/* Products */}
      <section id="products" className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-10 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3"
          >
            {t("products.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-xl font-body"
          >
            {t("products.subtitle")}
          </motion.p>
        </div>

        {/* Horizontal scroll gallery */}
        <div
          className="flex gap-5 overflow-x-auto px-6 md:px-10 pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-x" }}
        >
          <style>{`#products-scroll::-webkit-scrollbar { display: none; }`}</style>
          {PRODUCT_CATEGORIES.map(({ key, image }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center shrink-0 group cursor-default"
              style={{ width: "clamp(160px, 60vw, 320px)" }}
            >
              {/* Image card — no zoom so mobile scroll isn't intercepted */}
              <div className="w-full rounded-2xl overflow-hidden border border-border shadow-sm group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300 aspect-[4/5] bg-muted">
                <img
                  src={image}
                  alt={t(`products.${key}.name`)}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              {/* Name below */}
              <p className="mt-4 text-sm md:text-base font-semibold text-foreground text-center font-body leading-snug px-2">
                {t(`products.${key}.name`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image Comparison */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-primary">
              {t("comparison.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-center text-muted-foreground mb-12 max-w-xl mx-auto font-body">
              {t("comparison.subtitle")}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ImageComparison
              beforeImage={bottleAfter}
              afterImage={bottleBefore}
              altBefore="Labeled bottle"
              altAfter="Plain bottle"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-display font-bold text-center text-foreground mb-3">
            {t("contact.title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-muted-foreground mb-10 max-w-xl mx-auto font-body text-sm md:text-base">
            {t("contact.subtitle")}
          </motion.p>

          {/* Contact info cards — tap-friendly on mobile */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <a href="mailto:Ahmed@artslabels.com" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors min-h-[64px] cursor-pointer">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm text-foreground font-body leading-snug">{t("contact.email")}</span>
            </a>
            <a href="tel:01226613862" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors min-h-[64px] cursor-pointer">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-sm text-foreground font-body">{t("contact.phone")}</span>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card min-h-[64px]">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-sm text-foreground font-body leading-snug">{t("contact.location")}</span>
            </div>
          </motion.div>

          <motion.form variants={fadeUp} className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card-soft space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder={t("contact.name.placeholder")} className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-base font-body focus:outline-none focus:ring-2 focus:ring-ring min-h-[52px]" />
              <input type="email" placeholder={t("contact.email.placeholder")} className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-base font-body focus:outline-none focus:ring-2 focus:ring-ring min-h-[52px]" />
            </div>
            <textarea placeholder={t("contact.message.placeholder")} rows={4} className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-base font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <button type="submit" className="w-full min-h-[52px] rounded-xl bg-primary text-primary-foreground font-body font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all touch-manipulation cursor-pointer">
              {t("contact.submit")}
            </button>
          </motion.form>
        </motion.div>
      </section>

      {/* Cinematic Footer */}
      <CinematicFooter />
    </>
  );
}
