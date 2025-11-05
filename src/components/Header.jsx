import { useEffect, useRef } from 'react';
import { Heart, User, ShoppingCart, Search } from 'lucide-react';

export default function Header({ onOpenCart, onSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(255,255,255,0.06)]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400/80 to-indigo-600 shadow-inner" />
          <span className="font-serif text-lg tracking-wide text-white/90">Vitesse Lux</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search curated essentials… (/ to focus)"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-10 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--lux-gold)]/60 focus:border-transparent backdrop-blur-md"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="ml-auto flex items-center gap-3 text-white/80">
          <button aria-label="Wishlist" className="p-2 rounded-xl hover:bg-white/10 transition active:scale-[0.98]">
            <Heart className="w-5 h-5" />
          </button>
          <button aria-label="Profile" className="p-2 rounded-xl hover:bg-white/10 transition active:scale-[0.98]">
            <User className="w-5 h-5" />
          </button>
          <button aria-label="Open cart" onClick={onOpenCart} className="p-2 rounded-xl hover:bg-white/10 transition active:scale-[0.98]">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search curated essentials…"
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-10 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--lux-gold)]/60 focus:border-transparent backdrop-blur-md"
          />
        </div>
      </div>
    </header>
  );
}
