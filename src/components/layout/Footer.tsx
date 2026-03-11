import { MapPin, Phone, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Marchado<span className="text-primary">Fit</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-6 max-w-xs">
            Refeições equilibradas e saborosas para acompanhar a sua rotina, garantindo mais energia e praticidade sem abrir mão da saúde.
          </p>
        </div>

        {/* Contact Links */}
        <div id="contato">
          <h3 className="text-lg font-semibold text-white mb-6">Contato</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>(12) 99210-9408</span>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-primary" />
              <span>@marchadomarmitas</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Rua Alegre, 123 – Cidade Brasileira</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Navegação</h3>
          <ul className="space-y-3">
            <li><a href="#inicio" className="hover:text-primary transition-colors">Início</a></li>
            <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre Nós</a></li>
            <li><a href="#beneficios" className="hover:text-primary transition-colors">Benefícios</a></li>
            <li><a href="#cardapio" className="hover:text-primary transition-colors">Cardápio</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        <p>© {new Date().getFullYear()} Marmitaria Marchado Fit. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
