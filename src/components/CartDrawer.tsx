import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ShieldCheck, MessageSquare } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (branch: 'Bulawayo CBD' | 'Donnington', promoCode: string, discount: number) => void;
  selectedBranch: 'Bulawayo CBD' | 'Donnington';
  onChangeBranch: (branch: 'Bulawayo CBD' | 'Donnington') => void;
  onOrderViaWhatsApp: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  selectedBranch,
  onChangeBranch,
  onOrderViaWhatsApp,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, cartItem) => {
    return sum + (cartItem.item.price * cartItem.quantity);
  }, 0);

  const discountAmount = appliedPromo ? (subtotal * (appliedPromo.discountPct / 100)) : 0;
  const deliveryOrPrepFee = subtotal > 0 ? 0.50 : 0; // eco packaging fee
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryOrPrepFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCodeInput.trim().toUpperCase();
    if (clean === 'EKHAYA10' || clean === 'WELCOME10') {
      setAppliedPromo({ code: clean, discountPct: 10 });
      setPromoError('');
    } else if (clean === 'FEAST20') {
      setAppliedPromo({ code: clean, discountPct: 20 });
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try EKHAYA10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="relative flex w-screen max-w-md flex-col bg-[#fffdf9] shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-stone-200 bg-emerald-950 px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff5a0a] text-white">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="font-display text-lg font-black tracking-tight">Your Takeaway Order</h2>
                <p className="text-xs text-emerald-200/80">Freshly prepared in Bulawayo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          {/* Branch Picker inside Cart */}
          <div className="border-b border-stone-200 bg-amber-50/70 px-5 py-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Select Pickup/Delivery Branch:
            </label>
            <div className="mt-1 flex gap-2">
              {(['Bulawayo CBD', 'Donnington'] as const).map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => onChangeBranch(b)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-extrabold transition ${
                    selectedBranch === b 
                      ? 'bg-[#0b381e] text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-600'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-orange-100 text-[#ff5a0a]">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-stone-800">Your bag is empty</h3>
                <p className="mt-1 max-w-xs text-xs text-stone-500">
                  Explore our menu to add flame-grilled chicken, burgers, traditional sausages and combos.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 rounded-full bg-[#ff5a0a] px-6 py-2.5 font-display text-xs font-black text-white shadow-md hover:bg-[#e04500]"
                >
                  Explore Our Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((cartItem, idx) => (
                  <div 
                    key={`${cartItem.item.id}-${idx}`}
                    className="flex gap-3.5 rounded-2xl border border-stone-200 bg-white p-3.5 shadow-sm"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="h-18 w-18 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-display text-sm font-extrabold text-stone-900">
                            {cartItem.item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-stone-400 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {cartItem.spiceLevel && (
                          <p className="mt-0.5 text-[11px] font-semibold text-[#ff5a0a]">
                            Spice: {cartItem.spiceLevel}
                          </p>
                        )}
                        {cartItem.sideOption && (
                          <p className="text-[10px] text-stone-500">
                            Side: {cartItem.sideOption}
                          </p>
                        )}
                        {cartItem.drinkOption && (
                          <p className="text-[10px] text-stone-500">
                            Drink: {cartItem.drinkOption}
                          </p>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-display text-sm font-black text-stone-900">
                          ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 p-1">
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                            className="grid h-5 w-5 place-items-center rounded bg-white text-stone-700 shadow-xs hover:bg-stone-200"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-stone-800">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                            className="grid h-5 w-5 place-items-center rounded bg-[#ff5a0a] text-white shadow-xs hover:bg-[#e04500]"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code box */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-3 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. EKHAYA10)"
                        value={promoCodeInput}
                        onChange={e => setPromoCodeInput(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-9 pr-3 text-xs uppercase outline-none focus:border-[#ff5a0a]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-stone-900 px-4 text-xs font-bold text-white hover:bg-black"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-1 text-[11px] text-red-600">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <ShieldCheck size={13} /> {appliedPromo.discountPct}% Discount Applied!
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 bg-white p-5 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Takeaway Eco-Packaging</span>
                  <span className="font-bold text-stone-900">${deliveryOrPrepFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-stone-200 pt-2 font-display text-base font-black text-stone-900">
                  <span>Estimated Total</span>
                  <span className="text-[#0c381f]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onProceedToCheckout(selectedBranch, appliedPromo?.code || '', discountAmount)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff5a0a] to-[#ff7b00] py-3.5 font-display text-sm font-black text-white shadow-lg shadow-orange-900/20 transition hover:brightness-105"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>

                <button
                  onClick={onOrderViaWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-50/50 py-2.5 font-display text-xs font-extrabold text-emerald-800 transition hover:bg-emerald-100"
                >
                  <MessageSquare size={15} className="text-emerald-600" />
                  Order via WhatsApp Directly
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
