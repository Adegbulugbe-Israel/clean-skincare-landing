"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TravelingProduct({ fadeProgress }: { fadeProgress: MotionValue<number> }) {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // trigger instantly on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const opacity = useTransform(fadeProgress, [0, 1], [0, 1]);
  const startScale = useTransform(fadeProgress, [0, 1], [0.2, 1]);

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(
    springProgress,
    [0.6, 0.8, 0.85, 0.95, 1],
    // Disable horizontal shifts entirely on mobile devices 
    isMobile ? ["0vw", "0vw", "0vw", "0vw", "0vw"] : ["0vw", "0vw", "-33vw", "-33vw", "0vw"]
  );

  const y = useTransform(
    springProgress,
    [0.9, 0.95, 1],
    ["0vh", "0vh", "-12vh"]
  );

  const rotate = useTransform(
    springProgress, 
    [0.6, 0.8, 0.85, 0.95, 1], 
    isMobile ? [0, 0, 0, 0, 0] : [0, 0, -12, -12, 0]
  );

  const endScale = useTransform(
    springProgress, 
    [0.6, 0.8, 0.85, 0.95, 1], 
    // Substantially scale down the bottle asset on mobile to avoid overcrowding
    isMobile ? [0.8, 0.8, 0.8, 0.8, 0.8] : [1, 1, 1.8, 1.8, 1.1]
  );

  return (
    // Sink the bottle strictly to the background (-z-10 layer) on mobile with 15% opacity so it functions as a watermark
    <div className={`fixed inset-0 flex items-center justify-center pointer-events-none ${isMobile ? '-z-10 opacity-[0.15]' : 'z-40'}`}>
      <motion.div 
        style={{ opacity, x, y, rotate, scale: endScale }}
        className="relative flex items-center justify-center"
      >
        <motion.div style={{ scale: startScale }}>
          <Image
            src="/images/clean-bottle-hero.png"
            alt="Clean All-In-One Bottle"
            width={800}
            height={800}
            className={`w-auto object-contain drop-shadow-2xl ${isMobile ? 'max-h-[35vh]' : 'max-h-[55vh]'}`}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
