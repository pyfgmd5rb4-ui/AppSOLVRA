import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, ChevronRight, Star, MessageCircle } from 'lucide-react';
import { useApp } from '../App';

export default function MyOrders() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/profile')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl">Les meves comandes</h1>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <div className="text-center">
            <Package size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No tens cap comanda encara</p>
            <p className="text-gray-500 text-sm mb-6">
              Parla amb el teu Personal Shopper per fer la teva primera comanda
            </p>
            <button
              onClick={() => navigate('/personal-shopper')}
              className="bg-[#0A1F44] text-white px-8 py-4 rounded-full transition-transform active:scale-95 flex items-center gap-2 mx-auto"
            >
              <MessageCircle size={20} />
              Contactar Personal Shopper
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 py-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100">
              <button
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="text-left">
                  <h3 className="text-[#0A1F44] mb-1">Comanda {order.id}</h3>
                  <p className="text-gray-500 text-sm mb-1">{order.date}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'Entregada'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'En procés'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-[#0A1F44]">{order.total.toFixed(2)}€</span>
                  </div>
                </div>
                <ChevronRight
                  className={`text-gray-400 transition-transform ${
                    selectedOrder === order.id ? 'rotate-90' : ''
                  }`}
                  size={20}
                />
              </button>

              {selectedOrder === order.id && (
                <div className="border-t border-gray-100 p-4 space-y-3">
                  <h4 className="text-[#0A1F44] mb-2">Productes</h4>
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${index}`}
                      className="flex gap-3 bg-gray-50 rounded-xl p-3"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-gray-800 text-sm mb-1">{item.product.name}</h5>
                        <p className="text-gray-500 text-xs mb-1">
                          Talla: {item.size} · Quantitat: {item.quantity}
                        </p>
                        <p className="text-[#0A1F44] text-sm">{item.product.price}€</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Personal Shopper Fee */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Servei Personal Shopper</span>
                      <span className="text-[#0A1F44]">{order.personalShopperFee}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Enviament</span>
                      <span className="text-green-600">GRATUÏT</span>
                    </div>
                  </div>

                  {/* Contact Personal Shopper */}
                  <button
                    onClick={() => navigate('/personal-shopper')}
                    className="w-full py-3 bg-white border-2 border-[#0A1F44] text-[#0A1F44] rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <MessageCircle size={18} />
                    Contactar Personal Shopper
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}