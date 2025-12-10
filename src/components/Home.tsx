import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, ThumbsUp, MessageCircle } from 'lucide-react';
import { useApp } from '../App';
import { products } from '../data/products';

const categories = [
  { id: 'home', label: 'Home' },
  { id: 'dona', label: 'Dona' },
  { id: 'sabatilles', label: 'Sabatilles' },
  { id: 'accessoris', label: 'Accessoris' },
];

export default function Home() {
  const navigate = useNavigate();
  const { likedProducts, user } = useApp();
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const recommendedProducts = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#0A1F44] text-2xl tracking-wider">MyPersonalShopper</h1>
          <div className="flex gap-4">
            <button onClick={() => navigate('/profile')} className="text-[#0A1F44]">
              <User size={24} />
            </button>
            <button onClick={() => navigate('/cart')} className="text-[#0A1F44] relative">
              <ThumbsUp size={24} />
              {likedProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0A1F44] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {likedProducts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cerca productes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                navigate(`/catalog/${cat.id}`);
              }}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#0A1F44] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Recommended */}
        <div className="mb-8">
          <h2 className="text-[#0A1F44] text-2xl mb-4">Recomanat per a tu</h2>
          <div className="grid grid-cols-2 gap-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer active:scale-95 transition-transform"
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
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="mb-8">
          <h2 className="text-[#0A1F44] text-2xl mb-4">Tendències</h2>
          <div className="grid grid-cols-2 gap-4">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer active:scale-95 transition-transform"
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
            ))}
          </div>
        </div>
      </div>

      {/* Floating Personal Shopper Button */}
      <button
        onClick={() => navigate('/personal-shopper')}
        className="fixed bottom-24 right-6 bg-[#0A1F44] text-white p-4 rounded-full shadow-lg active:scale-95 transition-transform z-20"
      >
        <MessageCircle size={28} />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
        <div className="flex justify-around">
          <button onClick={() => navigate('/home')} className="text-[#0A1F44]">
            <div className="flex flex-col items-center gap-1">
              <Search size={24} />
              <span className="text-xs">Inici</span>
            </div>
          </button>
          <button onClick={() => navigate('/profile')} className="text-gray-400">
            <div className="flex flex-col items-center gap-1">
              <User size={24} />
              <span className="text-xs">Perfil</span>
            </div>
          </button>
          <button onClick={() => navigate('/cart')} className="text-gray-400 relative">
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <ThumbsUp size={24} />
                {likedProducts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0A1F44] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {likedProducts.length}
                  </span>
                )}
              </div>
              <span className="text-xs">Favorits</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}