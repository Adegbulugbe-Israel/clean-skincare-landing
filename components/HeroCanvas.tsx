"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { productData } from "@/data/product";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(240).fill(null));
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  
  useEffect(() => {
    for (let i = 1; i <= 240; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/images/sequence/frame-${frameNumber}.jpg`;
      img.onload = () => {
        imagesRef.current[i - 1] = img;
        if (i === 1) setFirstFrameLoaded(true);
      };
    }
  }, []);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 239]);

  useEffect(() => {
    if (!firstFrameLoaded) return;
    drawFrame(0);

    const unsubscribe = frameIndex.on("change", (latest) => {
      drawFrame(Math.round(latest));
    });
    return () => unsubscribe();
  }, [firstFrameLoaded, frameIndex]);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let img = imagesRef.current[idx];
    if (!img) {
      for (let i = idx; i >= 0; i--) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
    }
    
    if (img) {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      
      // Scale by 1.15 to crop out the Veed/Vecteezy stock watermark on the frame edges
      const ratio  = Math.max(hRatio, vRatio) * 1.15;
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      ctx.clearRect(0,0,canvas.width, canvas.height);
      ctx.drawImage(img, 0,0, img.width, img.height,
                          centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (firstFrameLoaded) drawFrame(Math.round(frameIndex.get()));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [firstFrameLoaded, frameIndex]);

  const globalOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#EAEAEA]">
      <motion.div style={{ opacity: globalOpacity }} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Animated Overlays */}
        {productData.sections.map((section) => (
          <OverlayCard key={section.id} section={section} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </div>
  );
}

function OverlayCard({ section, scrollYProgress }: { section: typeof productData.sections[0], scrollYProgress: MotionValue<number> }) {
  const TOTAL_FRAMES = 240;
  const startP = section.startFrame / TOTAL_FRAMES;
  const endP = section.endFrame / TOTAL_FRAMES;
  
  const opacity = useTransform(scrollYProgress, 
    [startP, startP + 0.05, endP - 0.05, endP], 
    [0, 1, 1, 0]
  );
  
  const y = useTransform(scrollYProgress, 
    [startP, startP + 0.05], 
    [30, 0]
  );

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-6"
    >
      {/* Background shadow glow to guarantee perfect contrast against any video frame */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,transparent_50%)] -z-10" />
      
      <h2 className="font-serif z-10 text-5xl sm:text-7xl md:text-9xl font-normal tracking-tight text-white mb-6 px-8 leading-[0.9] uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        {section.title}
      </h2>
      <p className="text-base md:text-xl z-10 text-white max-w-md font-light tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-8">
        {section.subtitle}
      </p>

      <button className="pointer-events-auto z-10 mt-12 bg-white text-clean-black px-12 py-5 rounded-full text-xs font-extrabold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.05] shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
        Buy Now
      </button>
    </motion.div>
  );
}
