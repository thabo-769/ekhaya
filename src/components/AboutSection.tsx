import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, Heart, MapPin, Award } from 'lucide-react';

interface AboutSectionProps {
  onDiscoverClick: () => void;
  onCateringClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onDiscoverClick,
  onCateringClick,
}) => {
  const features = [
    {
      title: 'Great Taste',
      desc: 'Quality meals, full of flavour.',
      icon: Utensils,
    },
    {
      title: 'Convenient Takeaways',
      desc: 'Fresh food, ready when you are.',
      icon: ShoppingBag,
    },
    {
      title: 'A Welcoming Local Brand',
      desc: 'Proudly Zimbabwean.',
      icon: Heart,
    },
    {
      title: 'Easy Access to Our Branches',
      desc: 'Find us in Bulawayo.',
      icon: MapPin,
    },
  ];

  return (
    <section id="about" className="bg-[#00451d] py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Split matching image */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: Storefront Photo with Ekhaya Branding */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85"
                alt="Ekhaya Takeaways Bulawayo Storefront"
                className="h-[320px] w-full object-cover sm:h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Storefront Overlay Pill Badge */}
            <div className="absolute -bottom-3 right-6 rounded-2xl bg-[#ff5a0a] px-4 py-2 text-white shadow-lg">
              <p className="font-display text-xs font-black uppercase tracking-wider">
                Bulawayo Born
              </p>
              <p className="font-display text-sm font-extrabold">
                kumnandi ngempela
              </p>
            </div>
          </div>

          {/* Right: Text & Script Typography */}
          <div className="space-y-5">
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Welcome to <span className="text-[#ff5a0a]">Ekhaya</span>
            </h2>

            <p className="text-sm font-medium leading-relaxed text-emerald-50/80 sm:text-base">
              Ekhaya is a local takeaway brand built around the enjoyment of good food and the familiar feeling of home. Our goal is to give customers a welcoming way to enjoy their favourite meals.
            </p>

            {/* Handwritten Script Accent matching image */}
            <div className="pt-2">
              <p className="font-serif italic text-2xl font-black text-white tracking-tight">
                "Good Food Brings People Together"
              </p>
              <div className="mt-1 h-1 w-28 rounded-full bg-[#ff5a0a]" />
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={onDiscoverClick}
                className="inline-flex items-center gap-2 rounded-full bg-[#ff5a0a] px-6 py-3 font-display text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[#e04500]"
              >
                Discover Ekhaya <ArrowRight size={15} />
              </button>

              <button
                onClick={onCateringClick}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 font-display text-xs font-bold text-white transition hover:bg-emerald-50"
              >
                Catering & Events Platter
              </button>
            </div>
          </div>
        </div>

        {/* Bottom 4 Feature Badges in Rounded Card Boxes matching image */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col items-center rounded-2xl border border-emerald-300/20 bg-[#075326] p-5 text-center text-white shadow-xs transition hover:border-orange-300 hover:shadow-md"
              >
                {/* Circular Orange Icon */}
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#ff5a0a] to-[#ff7a00] text-white shadow-md shadow-orange-950/15">
                  <Icon size={22} />
                </div>

                <h3 className="mt-4 font-display text-sm font-black text-white">
                  {feat.title}
                </h3>
                <p className="mt-1 text-xs text-emerald-50/70">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

