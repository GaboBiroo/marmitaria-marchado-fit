"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Battery, Heart, Zap, Utensils } from "lucide-react";

const benefitsList = [
  { icon: CheckCircle2, title: "Ingredientes frescos e selecionados" },
  { icon: CheckCircle2, title: "Refeições equilibradas e nutritivas" },
  { icon: CheckCircle2, title: "Praticidade para o dia a dia" },
  { icon: CheckCircle2, title: "Opções saudáveis e saborosas" },
  { icon: CheckCircle2, title: "Ideal para quem busca qualidade de vida" },
];

const highlights = [
  { icon: Battery, title: "Mais energia no dia a dia", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Heart, title: "Melhora da saúde e bem-estar", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: Zap, title: "Mais disposição para atividades", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: Utensils, title: "Alimentação saborosa", color: "text-primary", bg: "bg-primary/10" },
];

export default function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="beneficios" className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Por que escolher nossas <br/>
            <span className="text-primary italic">Marmitas?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Main List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {benefitsList.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  {benefit.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Highlights Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col items-center p-8 text-center rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl ${highlight.bg} flex items-center justify-center mb-6`}>
                  <highlight.icon className={`w-8 h-8 ${highlight.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {highlight.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
