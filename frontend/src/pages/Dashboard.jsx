import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import {
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    LayoutDashboard,
    Settings,
    Plus
} from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/provider-bookings');
                setBookings(response.data);
            } catch (err) {
                console.error("Erro ao buscar agendamentos:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.profile === 'PROVIDER') {
            fetchBookings();
        }
    }, [user]);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await api.patch(`/bookings/${id}/status`, newStatus, {
                headers: { 'Content-Type': 'text/plain' }
            });
            // Atualiza a lista local
            setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        } catch (err) {
            alert("Erro ao atualizar status");
        }
    };

    if (user?.profile !== 'PROVIDER') {
        return (
            <div className="pt-32 px-6 text-center">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold">Acesso Negado</h2>
                <p className="text-slate-600">Esta área é exclusiva para prestadores de serviço.</p>
            </div>
        );
    }

    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-700',
        CONFIRMED: 'bg-blue-100 text-blue-700',
        COMPLETED: 'bg-green-100 text-green-700',
        CANCELLED: 'bg-red-100 text-red-700'
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 leading-tight">Painel do Prestador</h1>
                        <p className="text-slate-600">Bem-vindo de volta, {user.fullName}. Gerencie seus agendamentos aqui.</p>
                    </div>
                    <button className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> Novo Serviço
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Interna */}
                    <div className="lg:col-span-1 space-y-4">
                        <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-primary-600 font-bold shadow-sm border border-primary-100">
                            <LayoutDashboard size={20} /> Visão Geral
                        </button>
                        <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-transparent text-slate-600 font-medium hover:bg-white transition-all">
                            <Calendar size={20} /> Agenda
                        </button>
                        <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-transparent text-slate-600 font-medium hover:bg-white transition-all">
                            <Settings size={20} /> Configurações
                        </button>
                    </div>

                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="glass-card p-8 rounded-3xl">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Clock className="text-primary-600" size={24} /> Próximos Agendamentos
                            </h2>

                            {loading ? (
                                <div className="py-12 text-center text-slate-500">Carregando agendamentos...</div>
                            ) : bookings.length === 0 ? (
                                <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                    Nenhum agendamento pendente.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="pb-4 font-bold text-slate-400 uppercase text-xs tracking-widest">Serviço/Cliente</th>
                                                <th className="pb-4 font-bold text-slate-400 uppercase text-xs tracking-widest">Data</th>
                                                <th className="pb-4 font-bold text-slate-400 uppercase text-xs tracking-widest">Status</th>
                                                <th className="pb-4 font-bold text-slate-400 uppercase text-xs tracking-widest">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-6">
                                                        <p className="font-bold text-slate-900">Serviço #{booking.serviceId.substring(0, 8)}</p>
                                                        <p className="text-sm text-slate-500">ID Cliente: {booking.clientId.substring(0, 8)}</p>
                                                    </td>
                                                    <td className="py-6">
                                                        <p className="text-slate-900 font-medium">
                                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {new Date(booking.bookingDate).toLocaleTimeString([], { hour: '2-刻', minute: '2-digit' })}
                                                        </p>
                                                    </td>
                                                    <td className="py-6">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[booking.status]}`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-6">
                                                        {booking.status === 'PENDING' && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                    title="Confirmar"
                                                                >
                                                                    <CheckCircle2 size={20} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Cancelar"
                                                                >
                                                                    <XCircle size={20} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
