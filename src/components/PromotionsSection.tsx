import React from 'react';
import { PROMOTIONS } from '../data/menuData';
import { Promotion } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PromotionsSectionProps {
  onSelectPromo: (promo: Promotion) => void;
  onExploreAllPromos: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  onSelectPromo,
  onExploreAllPromos,
}) => {
  return (
    <section id="promotions" className="bg-[#07381e] py-14 text-white sm:py-18">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2.4fr] lg:items-center">
          {/* Left Column matching image */}
          <div>
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
              More Taste.<br />
              <span className="text-white">More to </span>
              <span className="text-[#ff5a0a]">Enjoy.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Check out our latest deals and special offers.
            </p>

            <div className="mt-6">
              <button
                onClick={onExploreAllPromos}
                className="inline-flex items-center gap-2 rounded-full bg-[#ff5a0a] px-6 py-3 font-display text-sm font-extrabold text-white shadow-lg transition hover:bg-[#e04500] hover:scale-105"
              >
                View Promotions <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Promotion Cards matching image */}
          <div className="grid gap-4 sm:grid-cols-3">
            {PROMOTIONS.map(promo => (
              <div
                key={promo.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-[#fffdf9] text-stone-900 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Photo & Tag */}
                  <div className="relative h-36 w-full overflow-hidden bg-stone-100">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <span className="absolute bottom-2 left-2 rounded-md bg-[#ff5a0a] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                      {promo.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5">
                    <h3 className="font-display text-sm font-black text-[#07381e]">
                      {promo.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500">
                      {promo.description}
                    </p>
                  </div>
                </div>

                {/* Footer View Offer button */}
                <div className="p-3.5 pt-0">
                  <button
                    onClick={() => onSelectPromo(promo)}
                    className="flex w-full items-center justify-center rounded-full bg-[#ff5a0a] py-2 font-display text-xs font-black text-white transition hover:bg-[#e04500]"
                  >
                    View Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
