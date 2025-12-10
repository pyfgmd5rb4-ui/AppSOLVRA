import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setUser({ email, name: email.split('@')[0] });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-6 pb-12">
      <button
        onClick={() => navigate('/welcome')}
        className="mb-8 p-2 -ml-2 text-[#0A1F44]"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-[#0A1F44] text-4xl mb-2">Benvingut/da</h1>
        <p className="text-gray-600 mb-12">Inicia sessió per continuar</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[#0A1F44] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#0A1F44] focus:outline-none"
              placeholder="el-teu-email@exemple.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[#0A1F44] mb-2">
              Contrasenya
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#0A1F44] focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1F44] text-white py-4 rounded-full mt-8 transition-transform active:scale-95"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/register')}
            className="text-[#0A1F44] underline"
          >
            Crear compte
          </button>
        </div>
      </div>
    </div>
  );
}
