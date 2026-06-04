import React, { useState, useRef, useCallback, useEffect } from 'react';

export const ImageComparison = ({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
}: {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = ((clientX - rect.left) / rect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      setSliderPosition(newPosition);
    },
    [isDragging]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] max-w-2xl mx-auto overflow-hidden rounded-2xl cursor-col-resize select-none shadow-2xl"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image (Bottom Layer) */}
      <img
        src={afterImage}
        alt={altAfter}
        className="absolute inset-0 w-full h-full object-contain bg-white"
        draggable={false}
      />

      {/* Before Image (Top Layer) - clipped */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={altBefore}
          className="w-full h-full object-contain bg-white"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-0.5 h-full bg-white/80 mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6, 0)" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full">
        Before
      </span>
      <span className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full">
        After
      </span>
    </div>
  );
};
