import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext, ReactNode } from 'react';
import Splash from './components/Splash';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import PreferencesStep1 from './components/PreferencesStep1';
import PreferencesStep2 from './components/PreferencesStep2';
import PreferencesStep3 from './components/PreferencesStep3';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderComplete from './components/OrderComplete';
import Profile from './components/Profile';
import Favorites from './components/Favorites';
import MyOrders from './components/MyOrders';
import PersonalShopper from './components/PersonalShopper';
import MyPersonalShopper from './components/MyPersonalShopper';

// Types
interface User {
  email: string;
  name: string;
}

interface Preferences {
  style: string[];
  sizes: {
    top: string;
    bottom: string;
    shoes: string;
  };
  priceRange: [number, number];
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface PersonalShopperType {
  id: string;
  name: string;
  image: string;
  rating: number;
  specialties: string[];
  ordersCompleted: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: { product: Product; size: string; quantity: number; }[];
  personalShopperId: string;
  personalShopperFee: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  preferences: Preferences | null;
  setPreferences: (preferences: Preferences | null) => void;
  likedProducts: Product[];
  setLikedProducts: (products: Product[]) => void;
  favorites: Product[];
  setFavorites: (favorites: Product[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  personalShopper: PersonalShopperType | null;
  setPersonalShopper: (ps: PersonalShopperType | null) => void;
  hasSeenSplash: boolean;
  setHasSeenSplash: (seen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [personalShopper, setPersonalShopper] = useState<PersonalShopperType | null>({
    id: 'ps1',
    name: 'Maria García',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 4.8,
    specialties: ['Casual', 'Formal', 'Esportiu'],
    ordersCompleted: 127
  });
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        preferences,
        setPreferences,
        likedProducts,
        setLikedProducts,
        favorites,
        setFavorites,
        orders,
        setOrders,
        personalShopper,
        setPersonalShopper,
        hasSeenSplash,
        setHasSeenSplash,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/preferences/step1" element={<PreferencesStep1 />} />
            <Route path="/preferences/step2" element={<PreferencesStep2 />} />
            <Route path="/preferences/step3" element={<PreferencesStep3 />} />
            <Route path="/home" element={<Home />} />
            <Route path="/catalog/:category" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/personal-shopper" element={<PersonalShopper />} />
            <Route path="/my-personal-shopper" element={<MyPersonalShopper />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}