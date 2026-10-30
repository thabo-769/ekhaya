import React, { useState, useEffect } from 'react';
import { CustomerOrder } from '../types';
import { X, CheckCircle, Clock, MapPin, Phone, ChefHat, Flame, ShoppingBag, Truck } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: CustomerOrder | null;
  onSearchOrderId?: (id: string) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  order,
  onSearchOrderId,
}) => {
  const [searchId, setSearchId] = useState('');
  const [simulatedMinutes, setSimulatedMinutes] = useState(8);

  useEffect(() => {
    if (order) {
      setSimulatedMinutes(order.elapsedMinutes || 5);
    }
  }, [order]);

  if (!isOpen) return null;

  // Compute status step index
  const getStepIndex = (status?: string) => {
    switch (status) {
      case 'received': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'completed': return 3;
      default: return 1;
    }
  };

  const currentStep = order ? getStepIndex(order.status) : 1;

  const steps = [
    { title: 'Order Received', desc: 'Sent to Ekhaya kitchen terminal', icon: CheckCircle },
    { title: 'On The Grill', desc: 'Flame grilling & preparing fresh sides', icon: Flame },
    { title: 'Quality Pack & Check', desc: 'Inspected, boxed hot & sealed', icon: ShoppingBag },
    { title: order?.orderType === 'Delivery' ? 'Out for Delivery' : 'Ready for Pickup', desc: order?.orderType === 'Delivery' ? 'Driver en route to your address' : 'Counter ready at Bulawayo branch', icon: order?.orderType === 'Delivery' ? Truck : MapPin },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-[#fffdf9] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-[#07381e] px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff5a0a] text-white">
              <ChefHat size={18} />
            </div>
            <div>
              <h2 className="font-display text-lg font-black">Live Takeaway Tracker</h2>
              <p className="text-[11px] text-emerald-200">Real-time Bulawayo Kitchen Status</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order lookup if no order selected or user wants to track another */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Track Order by ID
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                placeholder="e.g. EK-1048"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs uppercase font-bold outline-none focus:border-[#ff5a0a]"
              />
              <button
                type="button"
                onClick={() => onSearchOrderId && onSearchOrderId(searchId.trim())}
                className="rounded-xl bg-[#07381e] px-4 text-xs font-bold text-white hover:bg-emerald-950"
              >
                Track
              </button>
            </div>
          </div>

          {order ? (
            <>
              {/* Order Info Card */}
              <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-br from-orange-50/60 to-amber-50/60 p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full bg-[#ff5a0a] px-3 py-1 font-display text-xs font-black text-white">
                      {order.id}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-black text-stone-900">
                      {order.customerName}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-stone-600">
                      <MapPin size={13} className="text-[#ff5a0a]" /> {order.branch} ({order.orderType})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-stone-400">Est. Time</p>
                    <p className="font-display text-lg font-black text-[#07381e]">
                      {order.estimatedDeliveryTime || '12 mins'}
                    </p>
                  </div>
                </div>

                {order.deliveryAddress && (
                  <div className="mt-3 rounded-xl bg-white/80 p-2.5 text-xs text-stone-700">
                    <span className="font-bold text-stone-900">Deliver to: </span>
                    {order.deliveryAddress}
                  </div>
                )}
              </div>

              {/* Progress Stepper */}
              <div className="space-y-4">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-stone-600">
                  Preparation Stages
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:bottom-3 before:left-2.5 before:top-3 before:w-0.5 before:bg-stone-200">
                  {steps.map((st, idx) => {
                    const isDone = idx < currentStep;
                    const isCurrent = idx === currentStep;
                    const Icon = st.icon;

                    return (
                      <div key={st.title} className="relative flex items-start gap-4">
                        <div
                          className={`absolute -left-6 grid h-6 w-6 place-items-center rounded-full text-white ring-4 ring-white ${
                            isDone
                              ? 'bg-emerald-600'
                              : isCurrent
                              ? 'bg-[#ff5a0a] animate-pulse'
                              : 'bg-stone-300'
                          }`}
                        >
                          <Icon size={12} />
                        </div>
                        <div className="flex-1">
                          <p className={`font-display text-sm font-black ${isCurrent ? 'text-[#ff5a0a]' : isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                            {st.title}
                          </p>
                          <p className="text-xs text-stone-500">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-stone-600">
                  Items Ordered
                </h4>
                <div className="mt-2 divide-y divide-stone-100 text-xs">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-2 flex justify-between">
                      <div>
                        <span className="font-bold text-stone-900">{item.quantity}x {item.name}</span>
                        {item.customizations && (
                          <p className="text-[10px] text-stone-500">{item.customizations}</p>
                        )}
                      </div>
                      <span className="font-bold text-stone-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between border-t border-stone-200 pt-2 font-display text-sm font-black text-stone-900">
                  <span>Total Paid ({order.paymentMethod})</span>
                  <span className="text-[#07381e]">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Branch Contact Quick dial */}
              <div className="flex items-center justify-between rounded-2xl bg-emerald-950 p-4 text-white">
                <div>
                  <p className="text-xs text-emerald-200">Need to check with the branch?</p>
                  <p className="font-display text-sm font-bold">
                    {order.branch === 'Bulawayo CBD' ? '+263 78 907 9132' : '+263 78 982 2078'}
                  </p>
                </div>
                <a
                  href={`tel:${order.branch === 'Bulawayo CBD' ? '+263789079132' : '+263789822078'}`}
                  className="flex items-center gap-1.5 rounded-full bg-[#ff5a0a] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#e04500]"
                >
                  <Phone size={13} /> Call Branch
                </a>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-stone-500">
              <ShoppingBag size={36} className="mx-auto text-stone-300" />
              <p className="mt-3 font-display font-bold">Enter an Order ID above to track your meal.</p>
              <p className="text-xs text-stone-400">Example IDs: EK-1048, EK-1049, EK-1047</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
