"use client";

import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import TravelingProduct from "@/components/TravelingProduct";
import { useRef, useState, useEffect } from "react";
import { useScroll, useInView, animate, motion } from "framer-motion";

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate(value) {
          setValue(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={nodeRef}>{value}</span>;
}

export default function Home() {
  const routineRef = useRef<HTMLParagraphElement>(null);
  const ritualRef = useRef<HTMLElement>(null);
  const lightSectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: fadeProgress } = useScroll({
    target: routineRef,
    offset: ["end end", "end center"]
  });

  const { scrollYProgress: ritualProgress } = useScroll({
    target: ritualRef,
    offset: ["start center", "end center"]
  });

  const { scrollYProgress: lightModeProgress } = useScroll({
    target: lightSectionRef,
    offset: ["start 100px", "start start"] 
  });

  return (
    <main className="bg-[#EAEAEA] min-h-screen text-clean-black relative">
      {/* Removed scroll progress props entirely, Navbar elegantly manages itself natively now */}
      <Navbar />
      <HeroCanvas />
      <TravelingProduct fadeProgress={fadeProgress} ritualProgress={ritualProgress} />

      <div ref={lightSectionRef} className="relative z-10 bg-[#EAEAEA]">
        <section id="formulation-results" className="py-24 md:py-48 px-6 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-black/5 min-h-0 md:min-h-[80vh]">
          {/* Left Side: Formulation Text */}
          <div className="flex-1 max-w-lg text-center md:text-left z-10 relative md:pr-4 mb-24 md:mb-0">
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal mb-[12px] tracking-tight text-clean-black leading-tight">
              The Formulation
            </h3>
            <p ref={routineRef} className="text-base md:text-lg text-clean-black/70 leading-relaxed font-light mt-4">
              A concentrated complex of bio-compatible actives. Clinical-grade hydration without the weight. Designed to replace three steps in your routine.
            </p>
          </div>
          
          <div className="hidden md:block w-[30vw] flex-shrink-0" />
          
          {/* Right Side: Percentage Counters */}
          <div className="flex-1 flex flex-col items-center md:items-end gap-16 text-center md:text-right z-10 relative md:pl-4">
            <div>
              <h4 className="font-serif text-7xl md:text-8xl lg:text-[7rem] font-normal text-clean-black mb-1 tracking-tighter leading-none">
                <Counter from={0} to={98} />%
              </h4>
              <p className="text-clean-black/50 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Saw instant hydration</p>
            </div>
            <div>
              <h4 className="font-serif text-7xl md:text-8xl lg:text-[7rem] font-normal text-clean-black mb-1 tracking-tighter leading-none">
                <Counter from={0} to={92} />%
              </h4>
              <p className="text-clean-black/50 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">Noticed improved texture</p>
            </div>
          </div>
        </section>

        {/* Notice min-h-0 strictly resets mobile bounds so it naturally collapses excessive whitespace */}
        <section ref={ritualRef} id="ritual" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-t border-black/5 leading-none flex flex-col items-center md:items-end min-h-0 md:min-h-[80vh]">
          <div className="max-w-xl w-full relative z-10 md:pl-0">
            <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal mb-16 md:mb-24 tracking-tight text-center md:text-left text-clean-black">
              The Ritual
            </h3>
            
            {/* Timeline Wrapper inside Left Alignment Block */}
            <div className="relative flex flex-col gap-16 md:gap-24 text-center md:text-left md:pl-12">
              <div className="absolute left-[13px] md:left-[14px] top-6 bottom-6 w-[2px] bg-black/5 hidden md:block" />
              
              <motion.div 
                style={{ scaleY: ritualProgress, transformOrigin: "top" }} 
                className="absolute left-[13px] md:left-[14px] top-6 bottom-6 w-[2px] bg-clean-black hidden md:block" 
              />

              <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                <div className="absolute -left-[42px] top-4 w-3 h-3 rounded-full bg-clean-black ring-4 ring-[#EAEAEA] hidden md:block" />
                
                <span className="font-serif block text-5xl md:text-6xl font-normal text-black/10 mb-2 md:mb-4 tracking-tight">01</span>
                <h5 className="font-serif text-2xl md:text-3xl font-normal mb-2 md:mb-3 tracking-wide">Cleanse</h5>
                <p className="text-clean-black/60 text-base md:text-lg font-light md:max-w-[22rem] max-w-[18rem] leading-relaxed mx-auto md:mx-0">Start with a perfectly clean canvas to maximize absorption.</p>
              </div>

              <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                <div className="absolute -left-[42px] top-4 w-3 h-3 rounded-full bg-clean-black ring-4 ring-[#EAEAEA] shadow-[0_0_0_1px_rgba(5,5,5,0.1)] hidden md:block" />

                <span className="font-serif block text-5xl md:text-6xl font-normal text-black/10 mb-2 md:mb-4 tracking-tight">02</span>
                <h5 className="font-serif text-2xl md:text-3xl font-normal mb-2 md:mb-3 tracking-wide">Mist</h5>
                <p className="text-clean-black/60 text-base md:text-lg font-light md:max-w-[22rem] max-w-[18rem] leading-relaxed mx-auto md:mx-0">Apply exactly 2 pumps directly to your face, neck, and chest.</p>
              </div>

              <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                <div className="absolute -left-[42px] top-4 w-3 h-3 rounded-full bg-clean-black ring-4 ring-[#EAEAEA] shadow-[0_0_0_1px_rgba(5,5,5,0.1)] hidden md:block" />

                <span className="font-serif block text-5xl md:text-6xl font-normal text-black/10 mb-2 md:mb-4 tracking-tight">03</span>
                <h5 className="font-serif text-2xl md:text-3xl font-normal mb-2 md:mb-3 tracking-wide">Press</h5>
                <p className="text-clean-black/60 text-base md:text-lg font-light md:max-w-[22rem] max-w-[18rem] leading-relaxed mx-auto md:mx-0">Gently press into skin until fully absorbed. Feel the bounce.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-6 flex flex-col items-center text-center relative border-t border-black/5 overflow-hidden">
          <div className="h-[45vh] md:h-[65vh] w-full" />
          
          <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-normal tracking-tighter mb-4 md:mb-6 text-clean-black">TOTAL CARE.</h2>
          <p className="text-base md:text-xl text-clean-black/60 mb-8 md:mb-12 font-light max-w-sm md:max-w-md px-4">
            The simplest routine you'll ever love.
          </p>
          
          <button className="relative z-50 bg-clean-black text-white px-10 md:px-12 py-4 md:py-5 mb-24 md:mb-32 rounded-full text-[10px] md:text-xs font-extrabold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-black hover:shadow-[0_0_40px_rgba(0,0,0,0.15)]">
            Add to Cart — $45
          </button>
        </footer>
      </div>
    </main>
  );
}
