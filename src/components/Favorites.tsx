import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useApp } from '../App';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useApp();

  const handleRemoveFavorite = (productId: string) => {
    setFavorites(favorites.filter((f) => f.id !== productId));
  };

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl">Favorits</h1>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <div className="text-center">
            <Heart size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">No tens cap favorit guardat</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-[#0A1F44] text-white px-8 py-4 rounded-full transition-transform active:scale-95"
            >
              Explorar productes
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 py-6">
          <p className="text-gray-600 mb-4">{favorites.length} productes</p>
          <div className="grid grid-cols-2 gap-4">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 relative"
              >
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-[#0A1F44]">{product.price}€</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md text-red-500"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
