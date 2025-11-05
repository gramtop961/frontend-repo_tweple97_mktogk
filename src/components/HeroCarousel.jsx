import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const slides = [
  {
    id: 1,
    title: 'Curated Essentials — Fast',
    subtitle: 'Luxury picks, delivered quickly.',
    image:
      'https://images.unsplash.com/photo-1511389026070-a14ae610a1be?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Effortless, Elegant, Now',
    subtitle: 'Timeless pieces in moments, not days.',
    image:
      'https://images.unsplash.com/photo-1549298916-c53d5fe6c1dc?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Future-Ready Luxury',
    subtitle: 'Indigo glow. Gold details. Seamless speed.',
    image:
      'https://images.unsplash.com/photo-1544441892-2d8b3e5c2d2b?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const go = (dir) => {
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const current = useMemo(() => slides[index], [index]);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--indigo-deep)] to-[var(--indigo-primary)] shadow-2xl border border-white/10">
        {/* Ambient background image */}
        <div className="absolute inset-0">
          <img
            src={current.image}
            alt="Luxury hero"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          {/* Neon halos */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[var(--lux-gold)]/10 blur-3xl" />
        </div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-sm tracking-tight">
              {current.title}
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-xl">{current.subtitle}</p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-[var(--lux-gold)] text-[var(--lux-gold)] hover:bg-[var(--lux-gold)] hover:text-[var(--charcoal)] transition active:scale-95"
              >
                Shop the Drop
              </a>
              <button
                onClick={() => go(1)}
                className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/15 active:scale-95"
              >
                Next
              </button>
            </div>
          </div>

          {/* Carousel visual */}
          <motion.div
            key={current.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
          >
            <img src={current.image} alt="Featured" className="w-full h-full object-cover" />
            {/* subtle glass reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
          </motion.div>
        </div>

        {/* Controls */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="rounded-xl p-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="rounded-xl p-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
