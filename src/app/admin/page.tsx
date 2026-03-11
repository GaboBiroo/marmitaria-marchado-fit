"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, CheckCircle2, ChefHat, RefreshCw, ShoppingBag } from "lucide-react";

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      title: string;
    };
  }>;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // In a real prod setup we'd use WebSocket or SWR/ReactQuery for live polling
    const interval = setInterval(fetchOrders, 30000); 
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic update
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error("Failed to update status", error);
      fetchOrders(); // revert
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "PENDING":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold"><Clock className="w-3.5 h-3.5" /> Pendente</span>;
      case "PREPARING":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold"><ChefHat className="w-3.5 h-3.5" /> Em Preparo</span>;
      case "COMPLETED":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Concluído</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Pedidos Recentes</h1>
          <p className="text-slate-400">Acompanhe as encomendas que chegam via WhatsApp.</p>
        </div>
        
        <button 
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading && orders.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-500 flex flex-col items-center">
            <RefreshCw className="w-10 h-10 animate-spin mb-4 text-slate-700" />
            Carregando pedidos...
          </div>
        ) : orders.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-500 flex flex-col items-center border border-dashed border-slate-800 rounded-2xl">
            <ShoppingBag className="w-12 h-12 text-slate-700 mb-4" />
            Nenhum pedido recebido ainda.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-800/50 flex justify-between items-start bg-slate-900/50">
                <div>
                  <h3 className="font-bold text-slate-200">Pedido #{order.id.slice(-5).toUpperCase()}</h3>
                  <p className="text-xs text-slate-500">
                    {format(new Date(order.createdAt), "dd 'de' MMM, HH:mm", { locale: ptBR })}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="p-5 flex-1">
                <div className="space-y-3 mb-6">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">
                        <span className="text-slate-500 mr-2">{item.quantity}x</span>
                         Produto ID: {item.id.slice(-4)} {/* Simplificado */}
                      </span>
                      <span className="text-slate-400">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
                  <span className="font-medium text-slate-400">Total Pago</span>
                  <span className="font-bold text-lg text-white">R$ {order.totalAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/50">
                <button 
                  onClick={() => updateStatus(order.id, 'PENDING')}
                  className={`p-3 text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${order.status === 'PENDING' ? 'text-amber-500 bg-amber-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                >
                  <Clock className="w-4 h-4" /> Pendente
                </button>
                <button 
                  onClick={() => updateStatus(order.id, 'PREPARING')}
                  className={`p-3 text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${order.status === 'PREPARING' ? 'text-blue-400 bg-blue-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                >
                  <ChefHat className="w-4 h-4" /> Em Preparo
                </button>
                <button 
                  onClick={() => updateStatus(order.id, 'COMPLETED')}
                  className={`p-3 text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${order.status === 'COMPLETED' ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Concluído
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
