import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';

const products = [
  {
    id: 'p1',
    name: 'Aurelia Chrono',
    price: 1299,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'Silk Noir Scarf',
    price: 220,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p3',
    name: 'Prism Leather Tote',
    price: 980,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p4',
    name: 'Carbon Edge Sneakers',
    price: 350,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p5',
    name: 'Halo Frame Sunglasses',
    price: 410,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p6',
    name: 'Lumen Scent No. 07',
    price: 180,
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1585386959984-a41552231656?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function ProductGrid({ onQuickBuy }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl md:text-3xl text-white">Featured</h2>
        <div className="hidden md:flex items-center gap-2 text-sm text-white/70">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Price</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Material</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Brand</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2, ease: 'easeOut' }}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-lg"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-white text-lg">{p.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-[var(--lux-gold)] font-medium">${p.price}</div>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <Star className="w-4 h-4 text-[var(--lux-gold)]" /> {p.rating}
                </div>
              </div>
              <button
                onClick={() => onQuickBuy?.(p)}
                className="mt-3 w-full rounded-xl bg-gradient-to-tr from-[var(--lux-gold)] to-amber-300 text-[var(--charcoal)] font-medium py-2 active:scale-95 transition shadow"
              >
                1-Tap Buy
              </button>
            </div>

            {/* Hover glass overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-x-4 bottom-4 rounded-xl backdrop-blur-md bg-white/15 border border-white/20 p-3 flex items-center justify-between">
                <span className="text-white">Quick View</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickBuy?.(p);
                  }}
                  className="pointer-events-auto px-4 py-2 rounded-lg bg-[var(--lux-gold)] text-[var(--charcoal)] font-medium"
                >
                  1-Tap Buy
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating quick-buy button for mobile */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button
          onClick={() => onQuickBuy?.(products[0])}
          className="rounded-full px-5 py-3 bg-[var(--lux-gold)] text-[var(--charcoal)] font-semibold shadow-xl active:scale-95"
        >
          Quick Buy
        </button>
      </div>
    </section>
  );
}
