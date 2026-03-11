"use client";

import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

// Mockup data based on requested categories
const menuItems = [
  {
    id: "1",
    title: "Frango com Batata Doce",
    description: "Marmita fitness com arroz integral, peito de frango grelhado e batata doce assada.",
    price: 18.90,
    category: "MARMITA",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop", // Placeholder
  },
  {
    id: "2",
    title: "Carne Moída com Legumes",
    description: "Marmita fitness com patinho moído, arroz integral e legumes no vapor.",
    price: 21.90,
    category: "MARMITA",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop", // Placeholder
  },
  {
    id: "3",
    title: "Salada Tropical Premium",
    description: "Mix de folhas, tomate cereja, cenoura, manga e molho especial.",
    price: 16.50,
    category: "SALADA",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop", // Placeholder
  },
  {
    id: "4",
    title: "Suco Verde Detox",
    description: "Couve, limão, maçã, gengibre e hortelã. 300ml.",
    price: 8.90,
    category: "SUCO",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop", // Placeholder
  }
];

export default function Menu() {
  const addItem = useCartStore(state => state.addItem);
  const toggleCart = useCartStore(state => state.toggleCart);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl
    });
    
    setAddedItem(item.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 1500);
  };

  return (
    <section id="cardapio" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Nosso <span className="text-primary italic">Cardápio</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Oferecemos diversas opções de refeições saudáveis. Todos os pratos são preparados pensando na qualidade, no sabor e na nutrição.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-white shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-xl text-primary">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                      addedItem === item.id 
                        ? 'bg-green-500 text-white focus:ring-green-500'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary hover:text-white focus:ring-primary'
                    }`}
                    aria-label="Adicionar ao carrinho"
                  >
                    {addedItem === item.id ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
