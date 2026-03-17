"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

const menuItems = [
  // MARMITAS
  { 
    id: "m1", 
    title: "Frango com Legumes Assados", 
    description: "Arroz integral, legumes no vapor e contra-coxa douradinha.", 
    price: 18.90, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg" // Chicken Couscous
  },
  { 
    id: "m2", 
    title: "Escondidinho Fit de Carne", 
    description: "Escondidinho perfeito c/ purê especial, recheado com carne moída magra.", 
    price: 19.90, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg" // Brown Stew Chicken
  },
  { 
    id: "m3", 
    title: "Carne Moída Nutri", 
    description: "Arroz integral soltinho, carne moída c/ quiabo, brócolis e couve-flor frescos.", 
    price: 19.90, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/1529444830.jpg" // Beef and Mustard Pie
  },
  { 
    id: "m4", 
    title: "Arroz à Grega com Frango", 
    description: "Arroz a grega colorido, contra-coxa suculenta e abobrinha em rodelas.", 
    price: 18.90, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/1529446352.jpg" // Chicken Congee
  },
  { 
    id: "m5", 
    title: "Almôndegas Saudáveis", 
    description: "Arroz integral, almôndegas artesanais ao molho sugo caseiro e legumes.", 
    price: 19.90, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg" // Meatballs
  },
  { 
    id: "m6", 
    title: "Macarronada Bolonhesa Fit", 
    description: "Macarrão integral al dente com molho bolonhesa encorpado e toque de requeijão.", 
    price: 28.00, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg" // Spaghetti Bolognese
  },
  { 
    id: "m7", 
    title: "Caldo Baby de Frango", 
    description: "Caldo Baby quentinho de legumes e frango desfiado (Pote de 710ml).", 
    price: 19.00, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg" // Chicken Soup
  },
  { 
    id: "m8", 
    title: "Strogonoff Leve de Frango", 
    description: "Strogonoff cremoso de frango, acompanhado de arroz integral, brócolis e couve-flor.", 
    price: 19.90, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/pqulvm1763282839.jpg" // Spanish Chicken
  },
  { 
    id: "m9", 
    title: "Feijoada Light Completa", 
    description: "Feijoada Fit feita com feijão preto, lombo de porco e linguiça calabresa (710 ml).", 
    price: 28.00, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg" // Pork Cassoulet
  },
  { 
    id: "m10", 
    title: "Tirinhas de Boi com Mandioca", 
    description: "Saborosas tirinhas de boi com legumes selecionados ao molho e mandioca cozida.", 
    price: 23.00, 
    category: "Marmitas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg" // Beef and Vegetable
  },

  // SALADAS
  { 
    id: "sa1", 
    title: "Salada Clássica de Frango", 
    description: "Alface americana/roxa, frango em tiras, tomate cereja, pepino, cenoura ralada. Molho: Iogurte, limão e ervas.", 
    price: 15.99, 
    category: "Saladas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/rxvxsg1511553394.jpg" 
  },
  { 
    id: "sa2", 
    title: "Salada Proteica de Atum", 
    description: "Mix folhas verdes, atum, ovo cozido, abacate em cubos, tomate cereja. Molho: Azeite, limão e pimenta.", 
    price: 15.00, 
    category: "Saladas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg" 
  },
  { 
    id: "sa3", 
    title: "Salada Agridoce Frango", 
    description: "Rúcula e alface, frango grelhado, batata doce, tomate cereja, chia. Molho: Azeite de oliva e limão.", 
    price: 16.00, 
    category: "Saladas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg" 
  },
  { 
    id: "sa4", 
    title: "Salada Vegana Detox", 
    description: "Couve picada, beterraba/cenoura raladas, pepino, abacate, girassol. Molho: Limão, azeite e gengibre.", 
    price: 16.00, 
    category: "Saladas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/rvvyxq1511883125.jpg" 
  },
  { 
    id: "sa5", 
    title: "Salada Mediterrânea Leve", 
    description: "Grão-de-bico, pepino, tomate, alface, azeitona, queijo branco em cubos. Molho: Azeite, limão e orégano.", 
    price: 16.90, 
    category: "Saladas", 
    imageUrl: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg" 
  },

  // SUCOS
  { 
    id: "su1", 
    title: "Suco Verde Tradicional", 
    description: "Perfeita combinação detox de couve fresquinha, hortelã aromática e suco de limão.", 
    price: 14.99, 
    category: "Sucos", 
    imageUrl: "https://www.thecocktaildb.com/images/media/drink/znald61487604035.jpg" 
  },
  { 
    id: "su2", 
    title: "Suco Refrescante Cítrico", 
    description: "O adocicado e refrescante match de couve, folhas de hortelã e laranja pera selecionada.", 
    price: 14.99, 
    category: "Sucos", 
    imageUrl: "https://www.thecocktaildb.com/images/media/drink/54z5h71487603583.jpg" 
  },
  { 
    id: "su3", 
    title: "Suco Detox de Pepino", 
    description: "Bebida ultra hidratante de couve, pepino, gengibre estimulante, hortelã e água.", 
    price: 9.99, 
    category: "Sucos", 
    imageUrl: "https://www.thecocktaildb.com/images/media/drink/uqxqsy1468876703.jpg" 
  },
  { 
    id: "su4", 
    title: "Super Verde Imunidade", 
    description: "Combinação potente em verde: espinafre, rúcula, couve, hortelã revigorante e água filtrada.", 
    price: 9.99, 
    category: "Sucos", 
    imageUrl: "https://www.thecocktaildb.com/images/media/drink/iq6scx1487603980.jpg" 
  },
  { 
    id: "su5", 
    title: "Verde Relaxante Calmo", 
    description: "Sensação calmante maravilhosa de alface, espinafre, capim cidreira (erva-doce) e água.", 
    price: 9.99, 
    category: "Sucos", 
    imageUrl: "https://www.thecocktaildb.com/images/media/drink/eirmo71487603745.jpg" 
  },
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
    <section id="cardapio" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <span className="bg-primary/10 text-primary p-2 rounded-2xl">
                <Leaf className="w-8 h-8" />
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Nosso <span className="text-primary italic">Cardápio</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Escolha entre nossas opções exclusivas, preparadas diariamente com ingredientes super frescos, pensadas para a sua rotina saudável.
            </p>
          </motion.div>
        </div>

        {/* Categoria Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
                activeCategory === category 
                  ? "bg-primary text-white shadow-lg shadow-primary/30 -translate-y-1" 
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:text-primary dark:hover:text-primary hover:-translate-y-1"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col sm:flex-row bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Imagem Horizontal no Desktop, Topo no Mobile */}
                <div className="relative h-56 sm:h-auto sm:w-48 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-white shadow-sm">
                    {item.category}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-center relative">
                  <div className="hidden sm:inline-block absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/10">
                    {item.category}
                  </div>
                  
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3 pr-16 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">R$</span>
                      <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
                        {item.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 focus:ring-4 focus:ring-primary/20 cursor-pointer ${
                        addedItem === item.id 
                          ? 'bg-green-500 text-white scale-110 rotate-12 shadow-md shadow-green-500/20'
                          : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      }`}
                      aria-label="Adicionar ao carrinho"
                    >
                      {addedItem === item.id ? <Check className="w-5 h-5" /> : <Plus className="w-6 h-6" />}
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
