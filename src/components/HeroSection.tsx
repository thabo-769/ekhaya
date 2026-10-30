import React, { useState } from 'react';
import { ArrowRight, MapPin, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onFindBranch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onFindBranch,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      titleLine1: 'Good Food.',
      titleLine2: 'Great Taste.',
      titleHighlight: 'Ekhaya.',
      subtitle: 'Discover delicious takeaway meals made for sharing, enjoying and coming back for more.',
      bgGlow: '#ff5a0a',
    },
    {
      titleLine1: 'Flame-Grilled.',
      titleLine2: 'Pure Zimbabwean.',
      titleHighlight: 'Flavour.',
      subtitle: 'From Bulawayo CBD to Donnington, authentic traditional sausages and tender peri-peri chicken.',
      bgGlow: '#f5a623',
    },
    {
      titleLine1: 'Hot, Crispy.',
      titleLine2: 'Ready In Minutes.',
      titleHighlight: 'Takeaway.',
      subtitle: 'Fast pickup, doorstep delivery across Bulawayo, or quick 1-click WhatsApp ordering.',
      bgGlow: '#ff7700',
    }
  ];

  const currentSlide = slides[activeSlide];

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#07381e] text-white">
      {/* Background Graphic elements matching image */}
      <div className="hero-pattern absolute inset-0 -z-10 opacity-25 pointer-events-none" />
      
      {/* Distinctive Orange Arch in the top right background */}
      <div className="absolute -right-32 -top-32 -z-10 h-[640px] w-[640px] rounded-full border-[60px] border-[#ff5a0a] opacity-90 blur-xs" />
      <div className="absolute -right-16 top-16 -z-10 h-[480px] w-[480px] rounded-full bg-[#0a4d29] opacity-70 blur-2xl" />
      <div className="absolute left-1/4 top-1/2 -z-10 h-72 w-72 rounded-full bg-[#ff5a0a]/10 blur-3xl" />

      <div className="mx-auto grid min-h-[700px] max-w-[1280px] items-center gap-8 px-4 pb-12 pt-24 sm:px-6 lg:min-h-[100svh] lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:pt-24">
        {/* Left Column: Typography & CTAs */}
        <div className="relative z-10 flex flex-col items-start pt-2 lg:pt-0">
          {/* Heading matching photo exactly */}
          <h1 className="font-display text-[44px] font-black leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[70px]">
            {currentSlide.titleLine1}<br />
            {currentSlide.titleLine2}<br />
            <span className="text-[#ff5a0a]">{currentSlide.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-[440px] text-base font-medium leading-relaxed text-white/85 sm:text-lg">
            {currentSlide.subtitle}
          </p>

          {/* Buttons matching image */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {/* Orange Button */}
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a0a] px-6 py-3.5 font-display text-sm font-extrabold text-white shadow-lg shadow-orange-950/25 transition hover:bg-[#e04500] hover:scale-105 active:scale-95"
            >
              Explore Our Menu <ArrowRight size={17} />
            </button>

            {/* Dark/Transparent Button with Pin */}
            <button
              onClick={onFindBranch}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 font-display text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/15"
            >
              Find Your Nearest Branch <MapPin size={16} className="text-[#ff5a0a]" />
            </button>
          </div>

          {/* 3 Carousel Dots at bottom left matching image */}
          <div className="mt-10 flex items-center gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === idx
                    ? 'w-7 bg-[#ff5a0a]'
                    : 'w-2.5 border border-white/60 bg-transparent hover:border-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Hero Visual with Burger, Chicken, Chips, Drinks & Script Badge */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* Main Hero Platter Composite */}
          <div className="relative w-full max-w-[560px]">
            {/* Food Platter Image */}
            <div className="relative overflow-hidden rounded-[40px] border-4 border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
              <img
                src="https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=90"
                alt="Ekhaya flame grilled burger with crispy chips and golden takeaway chicken"
                className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[490px] transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Top-Right Circular Badge matching image */}
            <div className="absolute -right-3 -top-5 z-20 hidden rotate-6 rounded-3xl border-2 border-[#ff5a0a] bg-[#062d18]/95 px-5 py-4 text-center shadow-2xl backdrop-blur-md sm:block">
              <p className="font-display text-xs font-black uppercase tracking-wider text-white">
                Good Food
              </p>
              <p className="font-display text-xs font-black uppercase tracking-wider text-white">
                Great Taste
              </p>
              <p className="font-display text-base font-black text-[#ff5a0a] tracking-tight">
                Ekhaya
              </p>
            </div>

            {/* Floating Bottom-Left Badge */}
            <div className="absolute -bottom-4 left-4 z-20 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-[#07381e] shadow-xl backdrop-blur-md">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#ff5a0a] text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-display text-xs font-black uppercase tracking-wider text-[#ff5a0a]">
                  Bulawayo's Best
                </p>
                <p className="font-display text-sm font-extrabold text-stone-900">
                  Made Fresh Daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
