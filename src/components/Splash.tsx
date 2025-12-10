import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

export default function Splash() {
  const navigate = useNavigate();
  const { hasSeenSplash, setHasSeenSplash } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSeenSplash(true);
      navigate('/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, setHasSeenSplash]);

  return (
    <div className="fixed inset-0 bg-[#0A1F44] flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-white text-3xl tracking-widest mb-8">MyPersonalShopper</h1>
        <p className="text-white/90 text-xl">El teu estil, a la teva manera</p>
      </div>
    </div>
  );
}
