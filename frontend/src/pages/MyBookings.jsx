import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Calendar, Clock, Loader2, Sparkles } from 'lucide-react';

export default function MyBookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const response = await api.get('/bookings/my-bookings');
                setBookings(response.data);
            } catch (err) {
                console.error("Erro ao buscar agendamentos:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchMyBookings();
    }, [user]);

    const statusMap = {
        PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
        CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-700' },
        COMPLETED: { label: 'Concluído', color: 'bg-green-100 text-green-700' },
        CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-700' }
    };

    if (loading) return <div className="pt-32 text-center"><Loader2 className="animate-spin mx-auto text-primary-600" size={48} /></div>;

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                        <Sparkles className="text-primary-600" /> Meus Agendamentos
                    </h1>
                    <p className="text-slate-600 text-lg">Acompanhe o status das suas solicitações de serviço.</p>
                </header>

                {bookings.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
                        <Calendar className="mx-auto text-slate-300 mb-4" size={48} />
                        <p className="text-xl font-bold text-slate-400">Você ainda não tem agendamentos.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="glass-card p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                        <Clock size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Serviço #{booking.serviceId.substring(0, 8)}</h3>
                                        <p className="text-slate-500 flex items-center gap-2 mt-1">
                                            <Calendar size={16} />
                                            {new Date(booking.bookingDate).toLocaleDateString()} ás {new Date(booking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest ${statusMap[booking.status].color}`}>
                                    {statusMap[booking.status].label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
