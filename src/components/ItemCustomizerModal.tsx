import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Plus, Minus, Flame, Sparkles, Check, ShoppingBag } from 'lucide-react';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, spice: any, side: string, drink: string, notes: string) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Lemon & Herb' | 'Hot Peri-Peri' | 'Extra Hot'>('Lemon & Herb');
  const [selectedSide, setSelectedSide] = useState('Crispy Golden Chips');
  const [selectedDrink, setSelectedDrink] = useState('Coca-Cola (330ml)');
  const [specialNotes, setSpecialNotes] = useState('');

  const sides = [
    { name: 'Crispy Golden Chips', price: 0 },
    { name: 'Traditional Sadza & Gravy', price: 0 },
    { name: 'Savoury Yellow Rice', price: 0.50 },
    { name: 'Fresh Coleslaw Salad', price: 0.50 },
    { name: 'Extra Boerewors Sausage Link', price: 2.00 },
  ];

  const drinks = [
    { name: 'Coca-Cola (330ml)', price: 0 },
    { name: 'Fanta Orange (330ml)', price: 0 },
    { name: 'Sprite Cold (330ml)', price: 0 },
    { name: 'Stoney Ginger Beer (330ml)', price: 0 },
    { name: 'Pure Still Water (500ml)', price: -0.50 },
    { name: 'No Drink', price: -1.00 },
  ];

  const sideExtra = sides.find(s => s.name === selectedSide)?.price || 0;
  const drinkExtra = drinks.find(d => d.name === selectedDrink)?.price || 0;
  const singlePrice = Math.max(1, item.price + sideExtra + drinkExtra);
  const totalPrice = singlePrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, spiceLevel, selectedSide, selectedDrink, specialNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-[#fffdf9] shadow-2xl">
        {/* Header Image */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-emerald-950">
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-full w-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-gray-800 backdrop-blur transition hover:bg-white hover:text-black"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-block rounded-full bg-[#ff5a0a] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
              {item.badge}
            </span>
            <h2 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">
              {item.name}
            </h2>
            <p className="text-xs text-white/80">{item.description}</p>
          </div>
        </div>

        {/* Scrollable Options */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          {/* Spice Level */}
          <div>
            <label className="flex items-center gap-2 font-display text-sm font-bold text-[#0c381f]">
              <Flame size={16} className="text-[#ff5a0a]" /> Choose Spice Basting
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(['Mild', 'Lemon & Herb', 'Hot Peri-Peri', 'Extra Hot'] as const).map(spice => (
                <button
                  key={spice}
                  type="button"
                  onClick={() => setSpiceLevel(spice)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center text-xs font-bold transition ${
                    spiceLevel === spice
                      ? 'border-[#ff5a0a] bg-orange-50/70 text-[#ff5a0a] ring-2 ring-[#ff5a0a]/30'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-orange-200'
                  }`}
                >
                  <span>{spice}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Side Choice */}
          <div>
            <label className="flex items-center gap-2 font-display text-sm font-bold text-[#0c381f]">
              <Sparkles size={16} className="text-[#ff5a0a]" /> Choose Your Side
            </label>
            <div className="mt-3 space-y-2">
              {sides.map(side => (
                <label
                  key={side.name}
                  onClick={() => setSelectedSide(side.name)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-semibold transition ${
                    selectedSide === side.name
                      ? 'border-[#ff5a0a] bg-orange-50/50 text-[#0c381f]'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`grid h-4 w-4 place-items-center rounded-full border ${selectedSide === side.name ? 'border-[#ff5a0a] bg-[#ff5a0a] text-white' : 'border-stone-400'}`}>
                      {selectedSide === side.name && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span>{side.name}</span>
                  </div>
                  <span className="font-bold text-stone-500">
                    {side.price === 0 ? 'Included' : `+$${side.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Drink Choice */}
          <div>
            <label className="flex items-center gap-2 font-display text-sm font-bold text-[#0c381f]">
              Drink Selection
            </label>
            <div className="mt-3 space-y-2">
              {drinks.map(drink => (
                <label
                  key={drink.name}
                  onClick={() => setSelectedDrink(drink.name)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-semibold transition ${
                    selectedDrink === drink.name
                      ? 'border-[#ff5a0a] bg-orange-50/50 text-[#0c381f]'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`grid h-4 w-4 place-items-center rounded-full border ${selectedDrink === drink.name ? 'border-[#ff5a0a] bg-[#ff5a0a] text-white' : 'border-stone-400'}`}>
                      {selectedDrink === drink.name && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span>{drink.name}</span>
                  </div>
                  <span className="font-bold text-stone-500">
                    {drink.price === 0 ? 'Included' : drink.price > 0 ? `+$${drink.price.toFixed(2)}` : `-$${Math.abs(drink.price).toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block font-display text-xs font-bold text-[#0c381f]">
              Special Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra serviettes, well done, chips seasoning on side..."
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-stone-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid h-8 w-8 place-items-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-stone-200"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-display text-sm font-bold text-stone-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#ff5a0a] text-white shadow-sm transition hover:bg-[#e04500]"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex flex-1 items-center justify-between rounded-full bg-gradient-to-r from-[#ff5a0a] to-[#ff6f00] px-6 py-3.5 font-display text-sm font-extrabold text-white shadow-lg shadow-orange-950/20 transition hover:brightness-105"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={17} /> Add to Order
              </span>
              <span className="text-base font-black">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
