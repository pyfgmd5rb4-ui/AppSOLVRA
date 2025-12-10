import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const styles = [
  { id: 'casual', label: 'Casual' },
  { id: 'elegant', label: 'Elegant' },
  { id: 'esportiu', label: 'Esportiu' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'formal', label: 'Formal' },
];

export default function PreferencesStep1() {
  const navigate = useNavigate();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId)
        ? prev.filter((id) => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleContinue = () => {
    if (selectedStyles.length > 0) {
      navigate('/preferences/step2', { state: { styles: selectedStyles } });
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-12 pb-12">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            <div className="h-2 flex-1 bg-[#0A1F44] rounded-full" />
            <div className="h-2 flex-1 bg-gray-200 rounded-full" />
            <div className="h-2 flex-1 bg-gray-200 rounded-full" />
          </div>
          <h1 className="text-[#0A1F44] text-3xl mb-2">Quin és el teu estil?</h1>
          <p className="text-gray-600">Selecciona un o més estils que t{"'"}agradaria explorar</p>
        </div>

        <div className="space-y-3 mb-12">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => toggleStyle(style.id)}
              className={`w-full py-5 px-6 rounded-2xl border-2 transition-all flex items-center justify-between ${
                selectedStyles.includes(style.id)
                  ? 'border-[#0A1F44] bg-[#0A1F44]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={selectedStyles.includes(style.id) ? 'text-[#0A1F44]' : 'text-gray-700'}>
                {style.label}
              </span>
              {selectedStyles.includes(style.id) && (
                <div className="w-6 h-6 bg-[#0A1F44] rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedStyles.length === 0}
          className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
