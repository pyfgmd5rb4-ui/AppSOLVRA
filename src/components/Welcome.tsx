import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative h-[60vh] sm:h-[65vh] md:h-[70vh]">
        <img
          src="https://i.pinimg.com/1200x/11/eb/91/11eb91c0843ba3670df3354c9996b042.jpg"
          alt="Fashion cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-white text-3xl tracking-wider mb-2">MyPersonalShopper</h1>
          <p className="text-white/90 text-lg">El teu estil, a la teva manera</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-[#0A1F44] text-white py-4 rounded-full transition-transform active:scale-95"
        >
          Iniciar sessió
        </button>
        <button
          onClick={() => navigate('/register')}
          className="w-full bg-white text-[#0A1F44] py-4 rounded-full border-2 border-[#0A1F44] transition-transform active:scale-95"
        >
          Crear compte
        </button>
      </div>
    </div>
  );
}
