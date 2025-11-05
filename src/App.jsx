import { useMemo, useState } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [query, setQuery] = useState('');

  const handleQuickBuy = (item) => {
    setCartItems((prev) => [item, ...prev]);
    setCartOpen(true);
  };

  const themeVars = useMemo(
    () => ({
      '--indigo-deep': '#1E1B7A',
      '--indigo-primary': '#4F46E5',
      '--indigo-soft': '#6366F1',
      '--lux-gold': '#D4AF37',
      '--cream-bg': '#F8F7FB',
      '--charcoal': '#0F172A',
      '--glass': 'rgba(255,255,255,0.06)',
      '--muted': '#94A3B8',
    }),
    []
  );

  return (
    <div style={themeVars} className="min-h-screen bg-gradient-to-b from-[var(--indigo-deep)] via-[var(--indigo-primary)] to-[#1a1670] text-[var(--cream-bg)]">
      {/* Load Playfair Display for headings */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
        :root { color-scheme: dark; }
        .font-serif { font-family: 'Playfair Display', ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; }
        body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; }
      `}</style>

      {/* Glow background accents */}
      <div className="pointer-events-none fixed top-[-20%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-20%] right-[-10%] w-[48rem] h-[48rem] rounded-full bg-[var(--lux-gold)]/10 blur-3xl" />

      <Header onOpenCart={() => setCartOpen(true)} onSearch={setQuery} />

      <HeroCarousel />

      <ProductGrid onQuickBuy={handleQuickBuy} query={query} />

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white/60">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-white/80">Vitesse Lux</p>
          <p className="text-sm">© {new Date().getFullYear()} Fast, refined, and secure.</p>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} />
    </div>
  );
}
