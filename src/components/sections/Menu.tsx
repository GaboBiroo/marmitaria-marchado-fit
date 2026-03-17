"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

const marmitasImg = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
const saladasImg = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop";
const sucosImg = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop";

const menuItems = [
  // MARMITAS
  { id: "m1", title: "Marmita Opção 1", description: "Arroz integral, legumes e contra-coxa.", price: 18.90, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m2", title: "Marmita Opção 2", description: "Escondidinho c/ purê especial, recheado com carne moída.", price: 19.90, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m3", title: "Marmita Opção 3", description: "Arroz integral, carne moída c/quiabo, brócolis e couve-flor.", price: 19.90, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m4", title: "Marmita Opção 4", description: "Arroz a grega, contra-coxa e abobrinha.", price: 18.90, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m5", title: "Marmita Opção 5", description: "Arroz integral, almôndegas ao molho sugo e legumes.", price: 19.90, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m6", title: "Marmita Opção 6", description: "Macarrão integral a bolonhesa com requeijão.", price: 28.00, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m7", title: "Marmita Opção 7", description: "Caldo Baby (legumes) e frango desfiado 710ml.", price: 19.00, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m8", title: "Marmita Opção 8", description: "Strogonoff de Frango, arroz integral, brócolis e couve-flor.", price: 19.90, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m9", title: "Marmita Opção 9", description: "Feijoada Fit (Feijão preto, lombo de porco e linguiça calabresa. 710 ml.", price: 28.00, category: "Marmitas", imageUrl: marmitasImg },
  { id: "m10", title: "Marmita Opção 10", description: "Tirinhas de boi c/ legumes ao molho e mandioca.", price: 23.00, category: "Marmitas", imageUrl: marmitasImg },

  // SALADAS
  { id: "sa1", title: "Salada Opção 1", description: "Alface americana e roxa, Frango grelhado em tiras, Tomate cereja, Pepino, Cenoura ralada. Molho: Iogurte natural com limão e ervas.", price: 15.99, category: "Saladas", imageUrl: saladasImg },
  { id: "sa2", title: "Salada Opção 2", description: "Mix de folhas verdes, Atum em água, Ovo cozido, Abacate em cubos, Tomate cereja. Molho: Azeite, limão e pimenta-do-reino.", price: 15.00, category: "Saladas", imageUrl: saladasImg },
  { id: "sa3", title: "Salada Opção 3", description: "Rúcula e alface, Frango grelhado, Batata doce cozida em cubos, Tomate cereja, Sementes de chia. Molho: Azeite de oliva e limão.", price: 16.00, category: "Saladas", imageUrl: saladasImg },
  { id: "sa4", title: "Salada Opção 4", description: "Couve picada, Beterraba ralada, Cenoura ralada, Pepino, Abacate, Sementes de girassol. Molho: Limão, azeite e gengibre.", price: 16.00, category: "Saladas", imageUrl: saladasImg },
  { id: "sa5", title: "Salada Opção 5", description: "Grão-de-bico, Pepino, Tomate, Alface, Azeitona preta, Queijo branco em cubos. Molho: Azeite de oliva, limão e orégano.", price: 16.90, category: "Saladas", imageUrl: saladasImg },

  // SUCOS
  { id: "su1", title: "Suco Opção 1", description: "Couve, hortelã e limão.", price: 14.99, category: "Sucos", imageUrl: sucosImg },
  { id: "su2", title: "Suco Opção 2", description: "Couve, hortelã e laranja.", price: 14.99, category: "Sucos", imageUrl: sucosImg },
  { id: "su3", title: "Suco Opção 3", description: "Couve, pepino, gengibre, hortelã e água.", price: 9.99, category: "Sucos", imageUrl: sucosImg },
  { id: "su4", title: "Suco Opção 4", description: "Espinafre, rúcula, couve, hortelã e água.", price: 9.99, category: "Sucos", imageUrl: sucosImg },
  { id: "su5", title: "Suco Opção 5", description: "Alface, espinafre, capim cidreira e água.", price: 9.99, category: "Sucos", imageUrl: sucosImg },
];

const categories = ["Todos", "Marmitas", "Saladas", "Sucos"];

export default function Menu() {
  const addItem = useCartStore(state => state.addItem);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

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

  const filteredItems = activeCategory === "Todos" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="cardapio" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Nosso <span className="text-primary italic">Cardápio</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Escolha entre nossas opções preparadas com ingredientes frescos e selecionados para a sua rotina saudável.
            </p>
          </motion.div>
        </div>

        {/* Categoria Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === category 
                  ? "bg-primary text-white scale-105 shadow-primary/30" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
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
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
