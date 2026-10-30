import React, { useState } from 'react';
import { CartItem, CustomerOrder } from '../types';
import { X, CheckCircle2, Phone, MapPin, User, Banknote, CreditCard, ArrowRight, Clock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  branch: 'Bulawayo CBD' | 'Donnington';
  discount: number;
  promoCode: string;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  branch,
  discount,
  promoCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+263 ');
  const [orderType, setOrderType] = useState<'Pickup' | 'Delivery'>('Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Pickup' | 'EcoCash USD' | 'EcoCash ZiG' | 'InnBucks' | 'ZimSwitch / Card'>('EcoCash USD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);
  const deliveryFee = orderType === 'Delivery' ? 2.50 : 0;
  const packagingFee = 0.50;
  const total = Math.max(0, subtotal - discount + deliveryFee + packagingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `EK-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newOrder: CustomerOrder = {
        id: orderId,
        customerName: name || 'Valued Customer',
        customerPhone: phone || '+263 78 000 0000',
        branch: branch,
        orderType: orderType,
        deliveryAddress: orderType === 'Delivery' ? deliveryAddress : undefined,
        items: items.map(ci => ({
          name: ci.item.name,
          quantity: ci.quantity,
          price: ci.item.price,
          customizations: [ci.spiceLevel, ci.sideOption, ci.drinkOption].filter(Boolean).join(' · ')
        })),
        subtotal: subtotal,
        discount: discount,
        deliveryFee: deliveryFee,
        total: total,
        paymentMethod: paymentMethod,
        status: 'received',
        createdAt: timeStr,
        elapsedMinutes: 0,
        estimatedDeliveryTime: orderType === 'Pickup' ? '15-20 mins' : '35-45 mins'
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-[#fffdf9] shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-[#07381e] px-6 py-4 text-white">
          <div>
            <h2 className="font-display text-xl font-black">Complete Your Order</h2>
            <p className="text-xs text-orange-200">Branch: {branch} · Ekhaya Takeaways</p>
          </div>
          <button 
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Pickup vs Delivery */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Order Type
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('Pickup')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 font-display text-xs font-black transition ${
                  orderType === 'Pickup'
                    ? 'border-[#ff5a0a] bg-orange-50 text-[#ff5a0a] ring-2 ring-[#ff5a0a]/30'
                    : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                <Clock size={16} /> Takeaway Collection (Bulawayo)
              </button>
              <button
                type="button"
                onClick={() => setOrderType('Delivery')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 font-display text-xs font-black transition ${
                  orderType === 'Delivery'
                    ? 'border-[#ff5a0a] bg-orange-50 text-[#ff5a0a] ring-2 ring-[#ff5a0a]/30'
                    : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                <MapPin size={16} /> Doorstep Delivery (+$2.50)
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                <User size={14} className="text-[#ff5a0a]" /> Full Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Sthandwa Moyo"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                <Phone size={14} className="text-[#ff5a0a]" /> Phone Number (EcoCash/Calls)
              </label>
              <input
                required
                type="text"
                placeholder="+263 78 123 4567"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
              />
            </div>
          </div>

          {orderType === 'Delivery' && (
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                <MapPin size={14} className="text-[#ff5a0a]" /> Bulawayo Delivery Address & Suburb
              </label>
              <input
                required
                type="text"
                placeholder="e.g. House 14, 12th Avenue, Suburbs, Bulawayo"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
              />
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Payment Method
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { id: 'EcoCash USD', label: 'EcoCash USD', icon: Phone },
                { id: 'EcoCash ZiG', label: 'EcoCash ZiG', icon: Phone },
                { id: 'InnBucks', label: 'InnBucks', icon: CreditCard },
                { id: 'Cash on Pickup', label: 'Cash on Pickup', icon: Banknote },
                { id: 'ZimSwitch / Card', label: 'Swipe / ZimSwitch', icon: CreditCard },
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition ${
                      isSelected
                        ? 'border-[#07381e] bg-emerald-50 text-[#07381e] ring-2 ring-[#07381e]/20'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Icon size={16} className={isSelected ? 'text-[#07381e]' : 'text-stone-400'} />
                    <span className="mt-1 font-display text-[11px] font-bold">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary box */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-2 text-xs">
            <h4 className="font-display font-extrabold text-stone-800">Order Overview</h4>
            <div className="max-h-28 overflow-y-auto space-y-1 text-stone-500">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.quantity}x {it.item.name}</span>
                  <span className="font-semibold text-stone-800">${(it.item.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 pt-2 space-y-1 text-stone-600">
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({promoCode})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              {orderType === 'Delivery' && (
                <div className="flex justify-between">
                  <span>Bulawayo City Delivery</span>
                  <span>$2.50</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Eco Takeaway Packaging</span>
                <span>$0.50</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-1.5 font-display text-sm font-black text-stone-900">
                <span>Total Due</span>
                <span className="text-[#07381e]">${total.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff5a0a] to-[#ff7b00] py-4 font-display text-sm font-black text-white shadow-xl shadow-orange-950/20 transition hover:brightness-105 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Sending Order to Kitchen...</span>
            ) : (
              <>
                <CheckCircle2 size={18} /> Confirm & Place Takeaway Order (${total.toFixed(2)})
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
