'use client';

import { useCart } from '@/components/CartProvider';

export default function CartToast() {
  const { toast } = useCart();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4"
    >
      {toast && (
        <p
          key={toast.id}
          className={`toast rounded-full px-5 py-3 text-xs font-bold text-cream shadow-soft ${
            toast.tone === 'info' ? 'bg-brown' : 'bg-caramel-dark'
          }`}
        >
          {toast.text}
        </p>
      )}
    </div>
  );
}
