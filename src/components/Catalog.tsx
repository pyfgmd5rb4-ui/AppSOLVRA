import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';

export default function Catalog() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (selectedColor && !p.colors.includes(selectedColor)) return false;
    if (selectedSize && !p.sizes.includes(selectedSize)) return false;
    if (priceFilter === 'low' && p.price > 50) return false;
    if (priceFilter === 'mid' && (p.price < 50 || p.price > 100)) return false;
    if (priceFilter === 'high' && p.price < 100) return false;
    return true;
  });

  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate('/home')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl capitalize">{category}</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-[#0A1F44] p-2 -mr-2"
          >
            <SlidersHorizontal size={24} />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
          <div className="mb-4">
            <h3 className="text-[#0A1F44] mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {allColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedColor === color
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-[#0A1F44] mb-2">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.slice(0, 8).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedSize === size
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#0A1F44] mb-2">Preu</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setPriceFilter(priceFilter === 'low' ? null : 'low')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  priceFilter === 'low'
                    ? 'bg-[#0A1F44] text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                &lt; 50€
              </button>
              <button
                onClick={() => setPriceFilter(priceFilter === 'mid' ? null : 'mid')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  priceFilter === 'mid'
                    ? 'bg-[#0A1F44] text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                50€ - 100€
              </button>
              <button
                onClick={() => setPriceFilter(priceFilter === 'high' ? null : 'high')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  priceFilter === 'high'
                    ? 'bg-[#0A1F44] text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                &gt; 100€
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="px-6 py-6">
        <p className="text-gray-600 mb-4">{filteredProducts.length} productes</p>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
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
  );
}