"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-block py-1 px-3 rounded-full bg-secondary/80 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-sm font-semibold mb-2">
            Sobre Nós
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Nossa <span className="text-primary italic">História</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            A Marmitaria Marchado Fit nasceu em 2026, idealizada por alunos do curso Machado de Assis, de Administração, com o objetivo de tornar a alimentação saudável mais prática e acessível.
          </p>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            Produzimos marmitas fitness com ingredientes frescos e selecionados, oferecendo refeições nutritivas, equilibradas e saborosas para quem busca qualidade de vida no dia a dia.
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Nosso compromisso é facilitar a rotina de quem estuda, trabalha e treina, garantindo praticidade sem abrir mão da saúde.
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
        >
          {/* Using a placeholder Unsplash image for the "Sobre" section */}
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" 
            alt="Ingredientes frescos e saudáveis" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="glass-panel p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <p className="font-semibold text-lg overflow-hidden line-clamp-2">"A saúde no prato, a praticidade no seu dia a dia."</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
