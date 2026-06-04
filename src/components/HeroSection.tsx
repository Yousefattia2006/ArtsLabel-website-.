import { useRef, useEffect } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "true");

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    attemptPlay();
    video.addEventListener("loadedmetadata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);

    return () => {
      video.removeEventListener("loadedmetadata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/ArtsHero1.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroSection;
