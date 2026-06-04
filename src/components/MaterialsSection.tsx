import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const substrates = ["pe", "pp", "thermal", "semiglossy", "metallizedpaper", "metallizedfilm", "transparent", "iml"];
const finishings  = ["lamination", "uv"];

export default function MaterialsSection() {
  const { t } = useLanguage();

  return (
    <section id="materials" className="bg-background relative overflow-hidden w-full">
      <FloatingPathsBackground position={1} className="py-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {t("materials.title")}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl font-body">
              {t("materials.subtitle")}
            </motion.p>
          </motion.div>

          {/* Substrates */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body">
                {t("materials.substrates")}
              </span>
              <div className="flex-1 h-px bg-border" />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {substrates.map((key) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="group flex items-center gap-3 px-5 py-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl hover:border-primary/50 hover:shadow-card-soft transition-all duration-200 cursor-default"
                >
                  <span className="text-primary font-bold shrink-0 leading-none">—</span>
                  <h3 className="font-display text-sm font-semibold text-foreground leading-snug">
                    {t(`materials.${key}`)}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Finishing */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body">
                {t("materials.finishing")}
              </span>
              <div className="flex-1 h-px bg-border" />
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {finishings.map((key) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="group flex items-center gap-3 px-5 py-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl hover:border-primary/50 hover:shadow-card-soft transition-all duration-200 cursor-default"
                >
                  <span className="text-primary font-bold shrink-0 leading-none">—</span>
                  <h3 className="font-display text-sm font-semibold text-foreground leading-snug">
                    {t(`materials.${key}`)}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </FloatingPathsBackground>
    </section>
  );
}
