import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, UserCheck } from 'lucide-react';
import { useApp } from '../App';
import { products } from '../data/products';


export default function Checkout() {
  const navigate = useNavigate();
  const { likedProducts, orders, setOrders, personalShopper } = useApp();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Simulem que la comanda conté els productes que t'agraden
  const recommendedProducts = products.slice(0, 5); // Simulación básica
  const orderItems = recommendedProducts;
  const subtotal = orderItems.reduce((sum, product) => sum + product.price, 0);
  const personalShopperFee = 10;
  const finalTotal = subtotal + personalShopperFee;

  const handlePayment = () => {
    if (!address) {
      alert("Omple l'adreça d'enviament");
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('ca-ES'),
      total: finalTotal,
      status: 'En procés',
      items: orderItems.map(product => ({
        product,
        size: 'M',
        quantity: 1
      })),
      personalShopperId: personalShopper?.id || 'ps1',
      personalShopperFee: personalShopperFee
    };

    setOrders([newOrder, ...orders]);
    navigate('/order-complete');
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/personal-shopper')} className="text-[#0A1F44] p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#0A1F44] text-2xl">Finalitzar comanda</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Personal Shopper Info */}
        {personalShopper && (
          <div className="bg-gradient-to-r from-[#0A1F44] to-blue-900 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <UserCheck size={24} />
              <h2>Personal Shopper</h2>
            </div>
            <p className="text-sm opacity-90">
              {personalShopper.name} ha preparat aquesta selecció per a tu
            </p>
          </div>
        )}

        {/* Order Items Preview */}
        <div>
          <h2 className="text-[#0A1F44] text-lg mb-3">Productes seleccionats</h2>
          <div className="space-y-3">
            {orderItems.map((product) => (
              <div key={product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{product.name}</p>
                  <p className="text-[#0A1F44]">{product.price}€</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h2 className="text-[#0A1F44] text-lg mb-3">Adreça d&apos;enviament</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Carrer, número, pis&#10;Codi postal, ciutat&#10;País"
            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#0A1F44] focus:outline-none resize-none"
            rows={4}
          />
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-[#0A1F44] text-lg mb-3">Mètode de pagament</h2>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#0A1F44] bg-[#0A1F44]/5'
                  : 'border-gray-200'
              }`}
            >
              <CreditCard className="text-[#0A1F44]" size={24} />
              <span className="text-gray-800">Targeta de crèdit/dèbit</span>
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                paymentMethod === 'paypal'
                  ? 'border-[#0A1F44] bg-[#0A1F44]/5'
                  : 'border-gray-200'
              }`}
            >
              <CreditCard className="text-[#0A1F44]" size={24} />
              <span className="text-gray-800">PayPal</span>
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-[#0A1F44] text-lg mb-4">Resum de la comanda</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal productes</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Enviament</span>
              <span className="text-green-600">GRATUÏT</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Servei Personal Shopper</span>
              <span>{personalShopperFee.toFixed(2)}€</span>
            </div>
            <div className="h-px bg-gray-200 my-3" />
            <div className="flex justify-between text-[#0A1F44] text-lg">
              <span>Total</span>
              <span>{finalTotal.toFixed(2)}€</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <p className="text-sm text-gray-700">
              ✓ Enviament gratuït inclòs
              <br />
              ✓ Assessorament personalitzat
            </p>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6">
        <button
          onClick={handlePayment}
          className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95"
        >
          Confirmar i pagar {finalTotal.toFixed(2)}€
        </button>
      </div>
    </div>
  );
}