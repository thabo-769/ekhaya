import React from 'react';
import { BRANCHES } from '../data/menuData';
import { BranchInfo } from '../types';
import { MapPin, Phone, Clock, ArrowRight, Navigation } from 'lucide-react';

interface LocationsSectionProps {
  onViewBranch: (branch: BranchInfo) => void;
  onContactBranch: (branch: BranchInfo) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onViewBranch,
  onContactBranch,
}) => {
  return (
    <section id="locations" className="bg-[#07381e] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header Row matching image */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black sm:text-4xl lg:text-5xl">
              Our <span className="text-[#ff5a0a]">Locations</span>
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Visit one of our branches in Bulawayo.
            </p>
          </div>

          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-[#ff5a0a]"
          >
            View All Locations <ArrowRight size={14} />
          </a>
        </div>

        {/* 2 Branch Cards matching image */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {BRANCHES.map(branch => (
            <article
              key={branch.id}
              className="overflow-hidden rounded-3xl bg-white text-stone-900 shadow-xl"
            >
              {/* Branch photo with simulated map pin overlay */}
              <div className="relative h-44 w-full bg-stone-200">
                <img
                  src={branch.image}
                  alt={branch.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                
                {/* Floating Map Pin marker */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 shadow-lg backdrop-blur-xs">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5a0a] animate-ping" />
                    <span className="font-display text-[11px] font-black text-[#07381e]">
                      {branch.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Branch Info details */}
              <div className="p-6">
                <h3 className="font-display text-xl font-black text-[#07381e]">
                  {branch.name}
                </h3>

                <div className="mt-4 space-y-2.5 text-xs text-stone-600">
                  <p className="flex items-start gap-2.5">
                    <MapPin size={16} className="shrink-0 text-[#ff5a0a]" />
                    <span>{branch.address}</span>
                  </p>

                  <p className="flex items-center gap-2.5">
                    <Phone size={15} className="shrink-0 text-[#ff5a0a]" />
                    <span className="font-bold text-stone-800">{branch.phone}</span>
                  </p>

                  <p className="flex items-center gap-2.5">
                    <Clock size={15} className="shrink-0 text-[#ff5a0a]" />
                    <span>Open: {branch.hours}</span>
                  </p>
                </div>

                {/* 2 Action Buttons matching image */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {/* Get Directions Button (white pill) */}
                  <button
                    onClick={() => onViewBranch(branch)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white py-2.5 font-display text-xs font-bold text-stone-800 transition hover:border-[#ff5a0a] hover:text-[#ff5a0a]"
                  >
                    <Navigation size={13} className="text-[#ff5a0a]" /> Get Directions
                  </button>

                  {/* Contact Branch Button (orange pill) */}
                  <button
                    onClick={() => onContactBranch(branch)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#ff5a0a] py-2.5 font-display text-xs font-black text-white shadow-xs transition hover:bg-[#e04500]"
                  >
                    Contact Branch
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
