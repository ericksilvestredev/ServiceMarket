import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-10">
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero.png"
                    alt="Professional working"
                    className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#f8fafc]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-primary-700 uppercase bg-primary-50 rounded-full">
                        🔥 #1 Marketplace de Serviços
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                        Serviços de <span className="text-primary-600">Qualidade</span> ao seu alcance.
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                        Encontre os melhores profissionais validados para sua casa ou empresa. Tecnologia e confiança em cada agendamento.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn-primary text-lg px-8 shadow-primary-200">Encontrar Profissional</button>
                        <button className="btn-secondary text-lg px-8">Quero ser Prestador</button>
                    </div>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">+10k Clientes Satisfeitos</p>
                            <div className="flex text-yellow-400">
                                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="hidden lg:block relative"
                >
                    <div className="relative z-10 glass-card p-2 rounded-[2.5rem] overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                        <img src="/hero.png" alt="Hero Illustration" className="rounded-[2rem] shadow-inner h-[550px] w-full object-cover" />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute -top-10 -right-10 glass-card p-6 rounded-2xl shadow-xl z-20 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Serviço Concluído</p>
                                <p className="font-bold text-slate-900">Limpeza Residencial</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
