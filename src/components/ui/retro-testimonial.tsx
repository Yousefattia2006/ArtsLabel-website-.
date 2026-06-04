"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

const isMobile = () => window && window.innerWidth < 768;

const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 md:py-20 [scrollbar-width:none]"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />
        <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" } }}
              key={"card" + index}
              className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mr-10 flex justify-end gap-2">
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-muted disabled:opacity-50"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-6 w-6 text-muted-foreground" />
        </button>
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-muted disabled:opacity-50"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop",
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCollapse();
    };
    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    }
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

    return (
      <motion.div
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-muted md:h-[40rem] md:w-96"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <img
          src={backgroundImage}
          alt="background"
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 z-40 p-3 backdrop-blur-sm md:p-4 bg-primary rounded-3xl shadow-none opacity-90">
          <p className="text-left text-xl font-bold text-white md:text-2xl font-display">
            {testimonial.name}
          </p>
        </div>
      </motion.div>
    );
};

const ProfileImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-full">
      <img
        onLoad={() => setLoading(false)}
        src={src}
        loading="lazy"
        decoding="async"
        alt={alt || "Profile image"}
        className={cn(
          "transition duration-300",
          isLoading ? "blur-sm scale-110" : "blur-0 scale-100",
          className
        )}
      />
    </div>
  );
};

export { Carousel, TestimonialCard, ProfileImage };
