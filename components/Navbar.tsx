"use client";

import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Navbar({ lightModeProgress }: { lightModeProgress?: MotionValue<number> }) {
  // Use robust DOM Intersection observer passed from page.tsx to perfectly align on mobile iOS
  const fallbackProgress = useMotionValue(0);
  const progress = lightModeProgress || fallbackProgress;

  const navTextColor = useTransform(
    progress,
    [0, 1],
    ["rgba(255, 255, 255, 1)", "rgba(5, 5, 5, 1)"] 
  );

  const navBg = useTransform(
    progress,
    [0, 1],
    ["rgba(255, 255, 255, 0.05)", "rgba(5, 5, 5, 0.05)"] 
  );
  
  const navBorder = useTransform(
    progress,
    [0, 1],
    ["rgba(255, 255, 255, 0.15)", "rgba(5, 5, 5, 0.15)"]
  );

  const buttonBg = useTransform(
    progress,
    [0, 1],
    ["rgba(255, 255, 255, 1)", "rgba(5, 5, 5, 1)"] 
  );

  const buttonText = useTransform(
    progress,
    [0, 1],
    ["rgba(5, 5, 5, 1)", "rgba(255, 255, 255, 1)"] 
  );

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
    >
      <div className="flex-1"></div>

      <div className="flex-1 flex justify-center">
        <motion.div 
          style={{ backgroundColor: navBg, borderColor: navBorder, color: navTextColor }}
          className="pointer-events-auto backdrop-blur-md border rounded-full px-8 py-4 flex items-center gap-10 shadow-2xl transition-all"
        >
          {["Home", "Story", "Products"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`}>
              <span className="text-xs font-semibold tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity block cursor-pointer">
                {item}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="flex-1 flex justify-end">
        <motion.button 
          style={{ backgroundColor: buttonBg, color: buttonText }}
          className="pointer-events-auto group relative flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative text-xs font-extrabold tracking-wider uppercase">Buy Now</span>
          <ShoppingBag className="w-4 h-4 relative" />
        </motion.button>
      </div>
    </motion.nav>
  );
}
