import { useNavigate } from 'react-router-dom';
import { Search, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <nav className="fixed w-full z-50 top-0 left-0">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="glass-card px-8 py-3 rounded-2xl flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900 hidden sm:block">
                            Service<span className="text-primary-600">Market</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
                        <a href="#" className="hover:text-primary-600 transition-colors">Como funciona</a>
                        {user?.profile === 'PROVIDER' && (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="hover:text-primary-600 transition-colors"
                            >
                                Dashboard
                            </button>
                        )}
                        {user && (
                            <button
                                onClick={() => navigate('/my-bookings')}
                                className="hover:text-primary-600 transition-colors"
                            >
                                Agendamentos
                            </button>
                        )}
                        <a href="#" className="hover:text-primary-600 transition-colors">Categorias</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                            <Search size={22} />
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900 leading-none">{user.fullName}</p>
                                    <p className="text-xs text-slate-500">{user.profile}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="bg-primary-50 text-primary-700 px-5 py-2 rounded-xl text-sm font-bold hover:bg-primary-100 transition-all active:scale-95"
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
                            >
                                <UserIcon size={18} />
                                <span className="hidden sm:inline">Entrar</span>
                            </button>
                        )}

                        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full">
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
