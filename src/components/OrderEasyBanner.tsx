import React from 'react';
import { PhoneCall, ArrowRight, MessageSquare } from 'lucide-react';

interface OrderEasyBannerProps {
  onStartOrdering: () => void;
  onOrderViaWhatsApp: () => void;
}

export const OrderEasyBanner: React.FC<OrderEasyBannerProps> = ({
  onStartOrdering,
  onOrderViaWhatsApp,
}) => {
  return (
    <section className="bg-[#07381e] pb-12 pt-2 text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/15 bg-[#052b17] p-6 shadow-2xl md:flex-row md:p-8">
          {/* Left Side */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#ff5a0a] bg-orange-500/10 text-[#ff5a0a]">
              <PhoneCall size={22} />
            </div>
            <div>
              <h3 className="font-display text-xl font-black text-white sm:text-2xl">
                Order Now, It's Easy!
              </h3>
              <p className="mt-0.5 text-xs text-white/75 sm:text-sm">
                Select your meal, choose a branch and place your order.
              </p>
            </div>
          </div>

          {/* Right Side Buttons & Tagline */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Start Ordering Button */}
            <button
              onClick={onStartOrdering}
              className="inline-flex items-center gap-2 rounded-full bg-[#ff5a0a] px-6 py-3 font-display text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-[#e04500] hover:scale-105"
            >
              Start Ordering <ArrowRight size={15} />
            </button>

            {/* Order via WhatsApp Button */}
            <button
              onClick={onOrderViaWhatsApp}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500 bg-[#25D366] px-5 py-3 font-display text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-[#1ebc57] hover:scale-105"
            >
              <MessageSquare size={16} fill="white" />
              Order via WhatsApp
            </button>

            <span className="hidden font-serif italic text-sm font-bold text-orange-300 xl:inline-block pl-2">
              kumnandi ngempela
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
