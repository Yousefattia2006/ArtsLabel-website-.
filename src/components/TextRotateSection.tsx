import { LayoutGroup, motion } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";

const ROTATING_WORDS = ["IML (In-Mould Label)", "Labels", "Stickers"];

export default function TextRotateSection() {
  return (
    <section className="flex items-center justify-center min-h-[20vh] bg-background px-6 py-6 md:py-8" dir="ltr">
      <LayoutGroup>
        <motion.div className="flex flex-col items-center w-full" layout>
          <h2
            className="flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground text-center leading-tight"
          >
            <span className="whitespace-nowrap">ARTS Label prints</span>
            <TextRotate
              texts={ROTATING_WORDS}
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
