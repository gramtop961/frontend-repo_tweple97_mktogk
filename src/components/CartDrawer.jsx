import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Tag, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ open, onClose, items }) {
  const shouldReduceMotion = useReducedMotion();
  const total = items.reduce((sum, it) => sum + it.price, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            aria-hidden
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[rgba(15,23,42,0.85)] backdrop-blur-2xl border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-serif text-xl text-white">Your Cart</h3>
              <button aria-label="Close" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full grid place-items-center text-center">
                  <div>
                    <div className="mx-auto w-16 h-16 rounded-2xl border border-[var(--lux-gold)]/50 text-[var(--lux-gold)] grid place-items-center mb-4">
                      <ShieldCheck />
                    </div>
                    <p className="font-serif text-white text-lg">Elegantly Empty</p>
                    <p className="text-white/70">Add something refined to begin.</p>
                  </div>
                </div>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <img src={it.image} alt={it.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-serif text-white">{it.name}</p>
                      <p className="text-[var(--lux-gold)]">${it.price}</p>
                    </div>
                    <div className="text-white/70 text-sm">1×</div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    placeholder="Promo code"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--lux-gold)]/60"
                  />
                  <Tag className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Subtotal</span>
                <span className="text-[var(--lux-gold)] font-semibold">${total.toFixed(2)}</span>
              </div>
              <button className="w-full rounded-xl bg-gradient-to-tr from-[var(--lux-gold)] to-amber-300 text-[var(--charcoal)] font-semibold py-3 active:scale-95 transition shadow">
                Checkout — Secure
              </button>
              <div className="text-center text-white/70 text-xs">UPI • Cards • Encrypted</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
