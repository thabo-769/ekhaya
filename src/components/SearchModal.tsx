import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Search, X, Plus, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = items.filter(i => 
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.category.toLowerCase().includes(query.toLowerCase()) ||
    i.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-[#fffdf9] shadow-2xl">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 border-b border-stone-200 bg-white px-5 py-4">
          <Search size={20} className="text-[#ff5a0a]" />
          <input
            autoFocus
            type="text"
            placeholder="Search flame-grilled chicken, burgers, sausages, chips..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-semibold text-stone-900 outline-none placeholder:text-stone-400"
          />
          <button 
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {results.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="font-display text-sm font-bold">No takeaway dishes found matching "{query}".</p>
              <p className="mt-1 text-xs text-stone-400">Try searching for "chicken", "burger", "sausage", or "chips".</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {results.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="group flex cursor-pointer items-center gap-3.5 rounded-2xl border border-stone-200 bg-white p-3 transition hover:border-[#ff5a0a] hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-black uppercase text-[#ff5a0a]">
                      {item.badge}
                    </span>
                    <h4 className="font-display text-sm font-black text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{item.description}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-display text-xs font-black text-[#07381e]">
                        From ${item.price.toFixed(2)}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#ff5a0a] group-hover:bg-[#ff5a0a] group-hover:text-white">
                        <Plus size={11} /> Customize
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
