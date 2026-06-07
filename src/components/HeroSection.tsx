import { useRef, useEffect } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure all required autoplay attributes are set
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true"); // WeChat/Android
    video.setAttribute("x5-video-player-type", "h5");

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Retry after short delay (handles iOS timing issues)
          setTimeout(() => video.play().catch(() => {}), 300);
        });
      }
    };

    // Try immediately
    tryPlay();

    // Retry on every load event
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("canplaythrough", tryPlay);

    // iOS Safari: retry when page becomes visible (e.g. tab switch back)
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    // Fallback: retry every 500ms for first 3s in case browser delays autoplay
    let attempts = 0;
    const interval = setInterval(() => {
      if (!video.paused || attempts > 6) {
        clearInterval(interval);
        return;
      }
      tryPlay();
      attempts++;
    }, 500);

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      >
        <source src="/ArtsHero1.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroSection;
