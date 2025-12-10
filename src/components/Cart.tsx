import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, MessageCircle } from 'lucide-react';
import { useApp } from '../App';

export default function Cart() {
  const navigate = useNavigate();
  const { likedProducts, setLikedProducts } = useApp();

  const handleRemoveItem = (productId: string) => {
    setLikedProducts(likedProducts.filter((p) => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl">Els meus gustos</h1>
        </div>
      </div>

      {likedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-6">Encara no has donat like a cap producte</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-[#0A1F44] text-white px-8 py-4 rounded-full transition-transform active:scale-95"
            >
              Explorar productes
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Info Banner */}
          <div className="px-6 pt-6 pb-4">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-[#0A1F44] text-sm leading-relaxed">
                Aquests són els productes que t&apos;han agradat. Parla amb el teu Personal Shopper per fer una comanda personalitzada!
              </p>
            </div>
          </div>

          {/* Liked Items */}
          <div className="px-6 py-4 space-y-4">
            {likedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4"
              >
                <div 
                  className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-gray-800 mb-1 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <p className="text-[#0A1F44]">{product.price}€</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="text-red-500 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Personal Shopper */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6">
            <button
              onClick={() => navigate('/personal-shopper')}
              className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Parla amb el teu Personal Shopper
            </button>
          </div>
        </>
      )}
    </div>
  );
}