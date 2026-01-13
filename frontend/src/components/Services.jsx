import { useState, useEffect } from 'react';
import { Star, Clock, ShieldCheck, Loader2, Calendar, X } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services');
                setServices(response.data);
            } catch (err) {
                console.error("Erro:", err);
                setError("Erro ao carregar serviços.");
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Faça login para agendar!");
            return;
        }

        setBookingLoading(true);
        try {
            await api.post('/bookings', {
                serviceId: selectedService.id,
                clientId: user.id,
                bookingDate: bookingDate,
                status: 'PENDING'
            });
            alert("Agendamento solicitado com sucesso!");
            setSelectedService(null);
        } catch (err) {
            alert(err.response?.data?.message || "Erro ao agendar. Verifique o horário.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="py-24 text-center"><Loader2 className="animate-spin mx-auto text-primary-600" size={48} /></div>;

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-slate-900 mb-12">Serviços Disponíveis</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                            <div className="h-48 bg-slate-100 overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80" className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" /> 5.0
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-xs font-bold text-primary-600 uppercase mb-2">Profissional</p>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold text-slate-900">R$ {service.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Agendamento */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Solicitar Agendamento</h3>
                                <p className="text-slate-500">{selectedService.name}</p>
                            </div>
                            <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateBooking} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Data e Hora</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        required
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-sm text-blue-700 border border-blue-100">
                                <ShieldCheck className="shrink-0" size={20} />
                                <p>Seu pedido será enviado ao profissional para confirmação. Você não será cobrado agora.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={bookingLoading}
                                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                            >
                                {bookingLoading ? <Loader2 className="animate-spin" size={20} /> : "Confirmar Solicitação"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
