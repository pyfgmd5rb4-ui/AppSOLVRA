import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User } from 'lucide-react';
import { useApp } from '../App';
import { products } from '../data/products';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  outfit?: string[];
}

export default function PersonalShopper() {
  const navigate = useNavigate();
  const { personalShopper, likedProducts } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hola! Sóc ${personalShopper?.name || 'el teu Personal Shopper'}. Com et puc ajudar avui?`,
      sender: 'bot',
    },
    {
      id: 2,
      text: 'Pots comentar-me què busques i faré una selecció personalitzada per a tu. També puc ajudar-te amb els productes que t\'han agradat!',
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    };

    const botMessage: Message = {
      id: messages.length + 2,
      text: "Perfecte! Deixa'm buscar les millors opcions per a tu...",
      sender: 'bot',
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/home')} className="text-[#0A1F44] p-2 -ml-2">
              <ArrowLeft size={24} />
            </button>
            {personalShopper && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={personalShopper.image}
                    alt={personalShopper.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-[#0A1F44]">{personalShopper.name}</h1>
                  <p className="text-gray-500 text-sm">Online</p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/my-personal-shopper')}
            className="text-[#0A1F44] p-2"
          >
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Service Info Banner */}
      <div className="px-6 pt-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-[#0A1F44] text-sm">
            <span className="font-semibold">Servei de Personal Shopper: 10€</span>
            <br />
            Assessorament personalitzat + enviament gratuït
          </p>
        </div>
      </div>

      {/* Liked Products Quick Access */}
      {likedProducts.length > 0 && (
        <div className="px-6 pt-4">
          <p className="text-gray-700 text-sm mb-3">Els teus gustos ({likedProducts.length})</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {likedProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex-shrink-0 w-20 cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-600 text-center">{product.price}€</p>
              </div>
            ))}
            {likedProducts.length > 5 && (
              <button
                onClick={() => navigate('/cart')}
                className="flex-shrink-0 w-20 aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 text-sm"
              >
                +{likedProducts.length - 5}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[#0A1F44] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>

            {message.outfit && (
              <div className="mt-3">
                <div className="grid grid-cols-3 gap-3">
                  {message.outfit.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div
                        key={productId}
                        onClick={() => navigate(`/product/${productId}`)}
                        className="bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer active:scale-95 transition-transform"
                      >
                        <div className="aspect-square bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-[#0A1F44]">{product.price}€</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
        {likedProducts.length > 0 && (
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-green-600 text-white py-3 rounded-full mb-3 transition-transform active:scale-95"
          >
            Fer comanda amb els meus gustos ({likedProducts.length} productes)
          </button>
        )}
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escriu un missatge..."
            className="flex-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#0A1F44] text-white p-3 rounded-full transition-transform active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}