import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, ThumbsUp, Star } from 'lucide-react';
import { useApp } from '../App';
import { products } from '../data/products';

export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { likedProducts, setLikedProducts, favorites, setFavorites } = useApp();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 2);

  if (!product) {
    return <div>Product not found</div>;
  }

  const isFavorite = favorites.some((f) => f.id === product.id);
  const isLiked = likedProducts.some((p) => p.id === product.id);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikedProducts(likedProducts.filter((p) => p.id !== product.id));
    } else {
      setLikedProducts([...likedProducts, product]);
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((f) => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`p-2 -mr-2 transition-colors ${
              isFavorite ? 'text-red-500' : 'text-[#0A1F44]'
            }`}
          >
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-square bg-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Product Info */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[#0A1F44] text-3xl mb-2">{product.name}</h1>
          <p className="text-[#0A1F44] text-2xl">{product.price}€</p>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <h3 className="text-[#0A1F44] mb-3">Talles disponibles</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <div
                key={size}
                className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700"
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-[#0A1F44] mb-3">Descripció</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h3 className="text-[#0A1F44] mb-3">Opinions</h3>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-700">4.8 (124 opinions)</span>
            </div>
            <p className="text-gray-600 text-sm">Producte de molt alta qualitat!</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-8">
          <h3 className="text-[#0A1F44] mb-4">Productes recomanats</h3>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                onClick={() => navigate(`/product/${related.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-gray-800 mb-1 line-clamp-2">{related.name}</h4>
                  <p className="text-[#0A1F44]">{related.price}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleToggleLike}
            className={`w-full py-4 rounded-full transition-all flex items-center justify-center gap-2 ${
              isLiked
                ? 'bg-[#0A1F44] text-white'
                : 'bg-white text-[#0A1F44] border-2 border-[#0A1F44]'
            }`}
          >
            <ThumbsUp size={20} fill={isLiked ? 'currentColor' : 'none'} />
            {isLiked ? "M'agrada ✓" : "M'agrada"}
          </button>
          <button
            onClick={() => navigate('/personal-shopper')}
            className="w-full bg-white text-[#0A1F44] py-4 rounded-full border-2 border-[#0A1F44] transition-transform active:scale-95"
          >
            Parla amb el teu Personal Shopper
          </button>
        </div>
      </div>
    </div>
  );
}