import { LayoutGroup, motion } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TextRotateSection() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  return (
    <section className="flex items-center justify-center min-h-[40vh] bg-background px-4 py-12" dir={isRTL ? "rtl" : "ltr"}>
      <LayoutGroup>
        <motion.div className="flex flex-col items-center w-full" layout>
          <h2
            className="flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground"
          >
            <span className="whitespace-nowrap">{t("rotate.prefix")}</span>
            <TextRotate
              texts={[t("rotate.word1"), t("rotate.word2"), t("rotate.word3")]}
              mainClassName="overflow-hidden h-[1.2em] min-w-[3em] sm:min-w-[4em] flex items-center justify-center"
              splitBy="words"
              staggerFrom="last"
              staggerDuration={0.025}
              rotationInterval={2000}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              elementLevelClassName="text-primary"
            />
          </h2>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
