import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Heart, Package, Settings, LogOut, ChevronRight, MessageCircle } from 'lucide-react';
import { useApp } from '../App';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const handleLogout = () => {
    setUser(null);
    navigate('/welcome');
  };

  const menuItems = [
    {
      icon: MessageCircle,
      label: 'El meu Personal Shopper',
      path: '/my-personal-shopper',
    },
    {
      icon: Package,
      label: 'Les meves comandes',
      path: '/my-orders',
    },
    {
      icon: Heart,
      label: 'Favorits',
      path: '/favorites',
    },
    {
      icon: Settings,
      label: 'Preferències',
      path: '/preferences/step1',
    },
    {
      icon: Settings,
      label: 'Configuració',
      path: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl">Perfil</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 bg-[#0A1F44] rounded-full flex items-center justify-center text-white text-2xl">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-[#0A1F44] text-xl mb-1">{user?.name || 'Usuari'}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="text-[#0A1F44]" size={24} />
                <span className="text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-200 transition-colors active:bg-red-100"
        >
          <LogOut size={24} />
          <span>Tancar sessió</span>
        </button>
      </div>
    </div>
  );
}