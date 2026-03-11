"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function CartDrawer() {
  const { isOpen, items, toggleCart, updateQuantity, removeItem, getCartTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    const phoneNumber = "5512992109408";
    
    let message = "Olá, *Marmitaria Marchado Fit*! Gostaria de fazer o seguinte pedido:\n\n";
    
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.title} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    message += `\n*Total estimado: R$ ${getCartTotal().toFixed(2).replace('.', ',')}*`;
    message += `\n\n*(Por favor, aguarde enquanto calculamos o valor do frete caso necessário)*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    try {
      // Gravar na base de dados
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
          totalAmount: getCartTotal(),
          whatsappMsg: message,
          customerName: "Cliente", // In real world we would have a small form, but for UX fluidity we skip it here as they will send a WhatsApp message
        }),
      });
    } catch (error) {
      console.error("Failed to save order:", error);
      // We proceed anyway to not block the customer from making the order via WhatsApp
    } finally {
      setIsSubmitting(false);
      clearCart();
      toggleCart();
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-white dark:bg-slate-950 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Seu Carrinho
              </h2>
              <button 
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                  </div>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-400">Seu carrinho está vazio</p>
                  <p className="text-sm text-center">Adicione algumas de nossas deliciosas marmitas para começar.</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Ver cardápio
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-tight mb-1">{item.title}</h4>
                        <p className="text-primary font-bold text-sm">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center bg-white dark:bg-slate-950 rounded-full border border-slate-200 dark:border-slate-700">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Subtotal</span>
                  <span className="font-bold text-lg text-slate-900 dark:text-white">
                    R$ {getCartTotal().toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6 font-medium bg-slate-200/50 dark:bg-slate-800 inline-block px-2 py-1 rounded">Taxa de entrega calculada via WhatsApp</p>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd5b] disabled:bg-slate-400 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <MessageCircle className="w-5 h-5 fill-current" />
                  )}
                  {isSubmitting ? "Processando..." : "Finalizar Pedido"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
