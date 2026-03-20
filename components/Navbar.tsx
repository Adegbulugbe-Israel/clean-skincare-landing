"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
      >
        <div className="flex-1" />

        {/* Desktop Nav Fill */}
        <div className="flex-1 justify-center hidden md:flex">
          <div className="pointer-events-auto backdrop-blur-xl bg-white/70 border border-white/50 rounded-full px-8 py-4 flex items-center gap-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            {["Home", "Story", "Products"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`}>
                <span className="text-xs font-semibold tracking-widest uppercase text-clean-black opacity-60 hover:opacity-100 transition-opacity block cursor-pointer">
                  {item}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex-1 flex justify-end gap-3 items-center">
          <button className="pointer-events-auto group relative flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 bg-clean-black text-white shadow-xl">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[10px] md:text-xs font-extrabold tracking-wider uppercase">Buy Now</span>
            <ShoppingBag className="w-4 h-4 relative hidden md:block" />
          </button>

          {/* Mobile Hamburger Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="pointer-events-auto md:hidden bg-white/80 backdrop-blur-md border border-white/50 text-clean-black p-2.5 rounded-full shadow-lg transition-transform active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Pop-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#EAEAEA]/95 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/50 rounded-full text-clean-black shadow-md active:scale-95 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-12 text-center">
              {["Home", "Story", "Products"].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-4xl font-serif tracking-tight text-clean-black hover:opacity-50 transition-opacity cursor-pointer">
                    {item}
                  </span>
                </Link>
              ))}
              
              <div className="mt-8">
                <button className="bg-clean-black text-white px-12 py-5 rounded-full text-xs font-extrabold tracking-[0.2em] uppercase shadow-2xl active:scale-95 transition-transform">
                  Add to Cart — $45
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
