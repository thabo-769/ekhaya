import React from 'react';
import { BranchInfo } from '../types';
import { X, MapPin, Phone, Clock, Navigation, CheckCircle } from 'lucide-react';

interface BranchModalProps {
  branch: BranchInfo | null;
  onClose: () => void;
  onSelectBranchForOrder?: (branchName: 'Bulawayo CBD' | 'Donnington') => void;
}

export const BranchModal: React.FC<BranchModalProps> = ({
  branch,
  onClose,
  onSelectBranchForOrder,
}) => {
  if (!branch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-[#fffdf9] shadow-2xl">
        {/* Header photo */}
        <div className="relative h-48 w-full overflow-hidden bg-emerald-950">
          <img
            src={branch.image}
            alt={branch.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-stone-800 transition hover:bg-white hover:text-black"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
              <CheckCircle size={11} /> Open Now ({branch.hours})
            </span>
            <h2 className="mt-1 font-display text-2xl font-black">{branch.name}</h2>
            <p className="text-xs text-white/80">{branch.address}</p>
          </div>
        </div>

        {/* Content & Map mockup */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-3.5">
              <span className="text-[10px] font-bold uppercase text-stone-400">Direct Telephone</span>
              <p className="mt-1 font-display text-base font-black text-stone-900">{branch.phone}</p>
              <a 
                href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5a0a] hover:underline"
              >
                <Phone size={13} /> Call Branch Desk
              </a>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-3.5">
              <span className="text-[10px] font-bold uppercase text-stone-400">Operating Hours</span>
              <p className="mt-1 font-display text-base font-black text-stone-900">{branch.hours}</p>
              <p className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Clock size={13} /> Serving hot takeaway orders 7 days a week
              </p>
            </div>
          </div>

          {/* Interactive Bulawayo Route Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-stone-600">
              Bulawayo Location Details
            </h4>
            <div className="mt-2 rounded-xl bg-stone-100 p-3 text-xs text-stone-700 space-y-1">
              <p><strong className="text-stone-900">Branch Manager:</strong> {branch.manager}</p>
              <p><strong className="text-stone-900">Kitchen Line:</strong> Grill, Fryer, Burger Press, Rotisserie active</p>
              <p><strong className="text-stone-900">Power & Connectivity:</strong> Solar & Generator back-up active</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={branch.mapEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[#07381e] px-4 py-2.5 font-display text-xs font-bold text-white shadow transition hover:bg-emerald-950"
              >
                <Navigation size={14} /> Open in Google Maps
              </a>
              {onSelectBranchForOrder && (
                <button
                  onClick={() => {
                    onSelectBranchForOrder(branch.name as any);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-[#ff5a0a] px-4 py-2.5 font-display text-xs font-black text-white shadow transition hover:bg-[#e04500]"
                >
                  Order from this Branch
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
