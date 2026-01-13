export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6 text-white text-2xl font-bold">
                            <img src="/logo.png" alt="ServiceMarket" className="h-8 brightness-0 invert" />
                            ServiceMarket
                        </div>
                        <p className="max-w-md mb-8 leading-relaxed">
                            Transformando a forma como você contrata serviços residenciais e corporativos. Segurança, agilidade e confiança em uma única plataforma.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'instagram', 'twitter', 'linkedin'].map(social => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                                    <span className="sr-only">{social}</span>
                                    {/* Icons could go here */}
                                    <div className="w-4 h-4 rounded-sm bg-slate-500" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 italic">Empresa</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 italic">Legal</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p>&copy; 2026 ServiceMarket. Todos os direitos reservados.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white">Português (BR)</a>
                        <a href="#" className="hover:text-white">R$ BRL</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
