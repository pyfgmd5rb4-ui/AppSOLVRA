import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../App';

export default function PreferencesStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPreferences } = useApp();
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 200]);

  const handleFinish = () => {
    setPreferences({
      style: location.state?.styles || [],
      sizes: location.state?.sizes || { top: '', bottom: '', shoes: '' },
      priceRange,
    });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-12">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            <div className="h-2 flex-1 bg-[#0A1F44] rounded-full" />
            <div className="h-2 flex-1 bg-[#0A1F44] rounded-full" />
            <div className="h-2 flex-1 bg-[#0A1F44] rounded-full" />
          </div>
          <h1 className="text-[#0A1F44] text-3xl mb-2">Rang de preu</h1>
          <p className="text-gray-600">Estableix el teu pressupost preferit</p>
        </div>

        <div className="mb-12">
          <div className="bg-gray-50 rounded-3xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Mínim</p>
                <p className="text-[#0A1F44] text-2xl">{priceRange[0]}€</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm mb-1">Màxim</p>
                <p className="text-[#0A1F44] text-2xl">{priceRange[1]}€</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #0A1F44 0%, #0A1F44 ${
                    ((priceRange[0] - 10) / 190) * 100
                  }%, #e5e7eb ${((priceRange[0] - 10) / 190) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer slider-thumb mt-4"
                style={{
                  background: `linear-gradient(to right, #0A1F44 0%, #0A1F44 ${
                    ((priceRange[1] - 10) / 190) * 100
                  }%, #e5e7eb ${((priceRange[1] - 10) / 190) * 100}%, #e5e7eb 100%)`,
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setPriceRange([10, 50])}
              className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A1F44] transition-colors"
            >
              Econòmic (10€ - 50€)
            </button>
            <button
              onClick={() => setPriceRange([50, 100])}
              className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A1F44] transition-colors"
            >
              Mitjà (50€ - 100€)
            </button>
            <button
              onClick={() => setPriceRange([100, 200])}
              className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A1F44] transition-colors"
            >
              Premium (100€ - 200€)
            </button>
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95"
        >
          Finalitzar
        </button>
      </div>
    </div>
  );
}
