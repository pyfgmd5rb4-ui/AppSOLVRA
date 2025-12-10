import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageCircle, RefreshCw, Award } from 'lucide-react';
import { useApp } from '../App';

const availableShoppers = [
  {
    id: 'ps1',
    name: 'Maria García',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 4.8,
    specialties: ['Casual', 'Formal', 'Esportiu'],
    ordersCompleted: 127
  },
  {
    id: 'ps2',
    name: 'Laura Martínez',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 4.9,
    specialties: ['Elegant', 'Casual', 'Festiu'],
    ordersCompleted: 203
  },
  {
    id: 'ps3',
    name: 'Anna Soler',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    rating: 4.7,
    specialties: ['Esportiu', 'Street', 'Casual'],
    ordersCompleted: 89
  }
];

export default function MyPersonalShopper() {
  const navigate = useNavigate();
  const { personalShopper, setPersonalShopper } = useApp();
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = (stars: number) => {
    setRating(stars);
    setHasRated(true);
    setTimeout(() => setHasRated(false), 2000);
  };

  const handleChangeShopper = (shopper: typeof availableShoppers[0]) => {
    setPersonalShopper(shopper);
    setShowChangeModal(false);
    setRating(0);
  };

  if (!personalShopper) return null;

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl">El meu Personal Shopper</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Personal Shopper */}
        <div className="bg-gradient-to-br from-[#0A1F44] to-blue-900 rounded-3xl p-6 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
              <img
                src={personalShopper.image}
                alt={personalShopper.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-2">{personalShopper.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="opacity-90">{personalShopper.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="opacity-70" />
                <span className="text-sm opacity-90">{personalShopper.ordersCompleted} comandes</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm opacity-70 mb-2">Especialitats</h3>
            <div className="flex flex-wrap gap-2">
              {personalShopper.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/personal-shopper')}
            className="w-full bg-white text-[#0A1F44] py-3 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MessageCircle size={20} />
            Iniciar xat
          </button>
        </div>

        {/* Rate Your Shopper */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6">
          <h3 className="text-[#0A1F44] mb-4">Valora el teu Personal Shopper</h3>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={40}
                  className={`${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {hasRated && (
            <p className="text-center text-green-600 text-sm">
              Gràcies per la teva valoració!
            </p>
          )}
        </div>

        {/* Service Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
          <h3 className="text-[#0A1F44] mb-3">Servei de Personal Shopper</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <p>Assessorament personalitzat per 10€ per comanda</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <p>Enviament gratuït en totes les comandes</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <p>Selecció curada segons les teves preferències</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <p>Atenció directa via xat</p>
            </div>
          </div>
        </div>

        {/* Change Shopper */}
        <button
          onClick={() => setShowChangeModal(true)}
          className="w-full bg-white text-[#0A1F44] py-4 rounded-full border-2 border-[#0A1F44] transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          Canviar de Personal Shopper
        </button>
      </div>

      {/* Change Shopper Modal */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-[#0A1F44] text-xl">Triar Personal Shopper</h2>
                <button
                  onClick={() => setShowChangeModal(false)}
                  className="text-gray-500 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="px-6 py-6 space-y-4">
              {availableShoppers.map((shopper) => (
                <div
                  key={shopper.id}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                    shopper.id === personalShopper.id
                      ? 'border-[#0A1F44] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleChangeShopper(shopper)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={shopper.image}
                        alt={shopper.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 mb-1">{shopper.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span>{shopper.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{shopper.ordersCompleted} comandes</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {shopper.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    {shopper.id === personalShopper.id && (
                      <div className="text-[#0A1F44]">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
