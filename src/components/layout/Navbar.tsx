"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const toggleCart = useCartStore(state => state.toggleCart);
  
  // Hydration fix for zustand persist to prevent ssr mismatch
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore(state => state.getCartCount());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-slate-900/80" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* We'll replace this with an actual optimized image later, for now we use a stylized text */}
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-white mix-blend-difference"}`}>
            Marchado<span className="text-primary">Fit</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {["Início", "Sobre", "Benefícios", "Cardápio"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
              className={`text-sm hover:text-primary transition-colors ${scrolled ? "text-slate-600 dark:text-slate-300" : "text-white mix-blend-difference"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <button 
            onClick={toggleCart}
            className={`relative p-2 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 ${scrolled ? "text-foreground" : "text-white mix-blend-difference"}`}
          >
            <ShoppingCart className="w-6 h-6" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center shadow-sm border-2 border-white dark:border-slate-950">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
