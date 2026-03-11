"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder gradient for background until we add the real hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-black/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop" 
          alt="Marmitas saudáveis" 
          className="w-full h-full object-cover grayscale-[20%]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold mb-6">
            Sabor & Saúde em cada refeição
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Nunca foi tão fácil <br/>
          <span className="text-primary italic pr-2">comer saudável.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          Oferecemos marmitas fitness preparadas com ingredientes frescos e selecionados, pensadas para quem busca praticidade, sabor e qualidade no dia a dia. Com opções equilibradas e nutritivas, nossas refeições são ideais para quem estuda, trabalha ou treina e quer manter uma alimentação saudável sem perder tempo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <button 
            onClick={() => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95"
          >
            Ver Cardápio
          </button>
        </motion.div>
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
