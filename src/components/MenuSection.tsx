import React, { useState } from 'react';
import { MenuItem, Category } from '../types';
import { Heart, Plus, ShoppingBag, ArrowRight, Flame } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  favorites: string[];
  onToggleFavorite: (itemName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const categories: Category[] = [
    'All',
    'Chicken',
    'Burgers',
    'Sausages',
    'Meat & Grill',
    'Chips & Sides',
    'Combo Meals',
    'Drinks',
  ];

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="menu" className="bg-[#f0f6f0] py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header matching image */}
        <div className="text-center sm:text-left">
          <h2 className="font-display text-3xl font-black tracking-tight text-[#07381e] sm:text-4xl lg:text-[44px]">
            Your Favourites, All in One Place
          </h2>
          <p className="mt-2 text-sm text-stone-600 sm:text-base">
            Explore our selection of tasty meals and find something you'll love.
          </p>
        </div>

        {/* Category Pills matching image */}
        <div className="mt-7 flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-black transition-all ${
                  isSelected
                    ? 'bg-[#ff5a0a] text-white shadow-md shadow-orange-950/20'
                    : 'border border-emerald-900/15 bg-white text-[#24422f] hover:border-orange-300 hover:text-[#ff5a0a]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid matching the exact image structure */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {filteredItems.map(item => {
            const isFav = favorites.includes(item.name);
            return (
              <article
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#fffefa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-200"
              >
                <div>
                  {/* Dish Image + Badge */}
                  <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    
                    {/* Badge */}
                    <span className="absolute bottom-2 left-2 rounded-md bg-[#ff5a0a] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
                      {item.badge}
                    </span>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.name);
                      }}
                      aria-label="Add to favorites"
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/80 text-stone-600 backdrop-blur-xs transition hover:bg-white hover:text-red-500"
                    >
                      <Heart
                        size={14}
                        className={isFav ? 'fill-red-500 text-red-500' : ''}
                      />
                    </button>

                    {!item.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                        <span className="rounded-full bg-red-600 px-3 py-1 font-display text-[10px] font-black uppercase text-white shadow">
                          Sold Out Today
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-3">
                    <h3 className="font-display text-sm font-black text-[#07381e] line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="mt-1 min-h-[32px] text-[11px] leading-snug text-stone-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price & Orange Order Now Button matching image */}
                <div className="p-3 pt-0">
                  <div className="mb-2.5">
                    <span className="font-display text-xs font-black text-stone-900">
                      From ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    disabled={!item.inStock}
                    onClick={() => onSelectItem(item)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#ff5a0a] py-2 font-display text-xs font-black text-white shadow-xs transition hover:bg-[#e04500] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Order Now
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

