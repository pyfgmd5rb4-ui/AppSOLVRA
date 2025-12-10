import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <CheckCircle size={80} className="text-green-500" />
        </div>
        <h1 className="text-[#0A1F44] text-3xl mb-4">Gràcies per la teva compra!</h1>
        <p className="text-gray-600 text-lg mb-12">
          La teva comanda s{"'"}ha processat correctament. Rebràs un correu de confirmació aviat.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/my-orders')}
            className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95"
          >
            Veure les meves comandes
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-white text-[#0A1F44] py-4 rounded-full border-2 border-[#0A1F44] transition-transform active:scale-95"
          >
            Tornar a l{"'"}inici
          </button>
        </div>
      </div>
    </div>
  );
}
