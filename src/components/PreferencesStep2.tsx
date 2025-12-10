import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const sizesTop = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const sizesBottom = ['36', '38', '40', '42', '44', '46'];
const sizesShoes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

export default function PreferencesStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sizeTop, setSizeTop] = useState('');
  const [sizeBottom, setSizeBottom] = useState('');
  const [sizeShoes, setSizeShoes] = useState('');

  const handleContinue = () => {
    if (sizeTop && sizeBottom && sizeShoes) {
      navigate('/preferences/step3', {
        state: {
          ...location.state,
          sizes: { top: sizeTop, bottom: sizeBottom, shoes: sizeShoes },
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-12 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            <div className="h-2 flex-1 bg-[#0A1F44] rounded-full" />
            <div className="h-2 flex-1 bg-[#0A1F44] rounded-full" />
            <div className="h-2 flex-1 bg-gray-200 rounded-full" />
          </div>
          <h1 className="text-[#0A1F44] text-3xl mb-2">Les teves talles</h1>
          <p className="text-gray-600">Selecciona les teves talles per a cada categoria</p>
        </div>

        <div className="space-y-8 mb-12">
          <div>
            <h3 className="text-[#0A1F44] mb-3">Part de dalt</h3>
            <div className="grid grid-cols-3 gap-3">
              {sizesTop.map((size) => (
                <button
                  key={size}
                  onClick={() => setSizeTop(size)}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    sizeTop === size
                      ? 'border-[#0A1F44] bg-[#0A1F44] text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#0A1F44] mb-3">Part de baix</h3>
            <div className="grid grid-cols-3 gap-3">
              {sizesBottom.map((size) => (
                <button
                  key={size}
                  onClick={() => setSizeBottom(size)}
                  className={`py-4 rounded-2xl border-2 transition-all ${
                    sizeBottom === size
                      ? 'border-[#0A1F44] bg-[#0A1F44] text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#0A1F44] mb-3">Calçat</h3>
            <div className="grid grid-cols-5 gap-2">
              {sizesShoes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSizeShoes(size)}
                  className={`py-3 rounded-2xl border-2 transition-all ${
                    sizeShoes === size
                      ? 'border-[#0A1F44] bg-[#0A1F44] text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!sizeTop || !sizeBottom || !sizeShoes}
          className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
