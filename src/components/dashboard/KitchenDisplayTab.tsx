import React, { useState } from 'react';
import { CustomerOrder, OrderStatus } from '../../types';
import { Flame, Clock, CheckCircle, ArrowRight, Printer, Bell, Check, User, MapPin } from 'lucide-react';

interface KitchenDisplayTabProps {
  orders: CustomerOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  selectedBranchFilter: 'All' | 'Bulawayo CBD' | 'Donnington';
}

export const KitchenDisplayTab: React.FC<KitchenDisplayTabProps> = ({
  orders,
  onUpdateOrderStatus,
  selectedBranchFilter,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [printSuccessNotice, setPrintSuccessNotice] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => 
    selectedBranchFilter === 'All' ? true : o.branch === selectedBranchFilter
  );

  const handlePrintTicket = (orderId: string) => {
    setPrintSuccessNotice(`Thermal takeaway slip printed for #${orderId}`);
    setTimeout(() => setPrintSuccessNotice(null), 3000);
  };

  const receivedOrders = filteredOrders.filter(o => o.status === 'received');
  const preparingOrders = filteredOrders.filter(o => o.status === 'preparing');
  const readyOrders = filteredOrders.filter(o => o.status === 'ready');
  const completedOrders = filteredOrders.filter(o => o.status === 'completed');

  return (
    <div className="space-y-6">
      {/* KDS Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-xs">
        <div>
          <h2 className="font-display text-xl font-black text-stone-900">
            Live Kitchen Display System (KDS)
          </h2>
          <p className="text-xs text-stone-500">
            Interactive Bulawayo takeaway prep line. Click to bump orders to the next stage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              soundEnabled
                ? 'bg-emerald-100 text-[#07381e]'
                : 'bg-stone-100 text-stone-500'
            }`}
          >
            <Bell size={14} /> {soundEnabled ? 'Kitchen Bell: ON' : 'Kitchen Bell: MUTED'}
          </button>

          <span className="rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-black text-[#ff5a0a]">
            {receivedOrders.length + preparingOrders.length} In Prep Queue
          </span>
        </div>
      </div>

      {printSuccessNotice && (
        <div className="flex items-center justify-between rounded-2xl bg-emerald-700 px-5 py-3 text-xs font-bold text-white shadow-md">
          <span>{printSuccessNotice}</span>
          <Printer size={15} />
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Column 1: New / Received */}
        <div className="flex flex-col rounded-3xl border border-orange-200 bg-orange-50/40 p-4">
          <div className="flex items-center justify-between pb-3 border-b border-orange-200/60">
            <span className="font-display text-xs font-black uppercase tracking-wider text-[#ff5a0a]">
              1. New Orders ({receivedOrders.length})
            </span>
            <span className="h-2 w-2 rounded-full bg-[#ff5a0a] animate-ping" />
          </div>

          <div className="mt-3 flex-1 space-y-3 overflow-y-auto max-h-[70vh]">
            {receivedOrders.length === 0 ? (
              <p className="py-8 text-center text-xs text-stone-400">No new incoming orders</p>
            ) : (
              receivedOrders.map(order => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-black text-white">
                        {order.id}
                      </span>
                      <h4 className="mt-1 font-display text-sm font-bold text-stone-900">
                        {order.customerName}
                      </h4>
                      <p className="text-[11px] text-stone-500">{order.branch} · {order.orderType}</p>
                    </div>
                    <span className="flex items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-[#ff5a0a]">
                      <Clock size={11} /> {order.elapsedMinutes}m ago
                    </span>
                  </div>

                  {/* Items */}
                  <div className="mt-3 border-t border-dashed border-stone-200 pt-2 text-xs text-stone-700 space-y-1">
                    {order.items.map((it, i) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold">
                          <span>{it.quantity}x {it.name}</span>
                          <span>${(it.price * it.quantity).toFixed(2)}</span>
                        </div>
                        {it.customizations && (
                          <p className="text-[10px] text-[#ff5a0a] italic">{it.customizations}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handlePrintTicket(order.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
                      title="Print Slip"
                    >
                      <Printer size={13} />
                    </button>
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#ff5a0a] py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#e04500]"
                    >
                      <Flame size={13} /> Fire to Grill &rarr;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: On The Grill / Preparing */}
        <div className="flex flex-col rounded-3xl border border-amber-200 bg-amber-50/40 p-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
            <span className="font-display text-xs font-black uppercase tracking-wider text-amber-800">
              2. On The Grill / Prep ({preparingOrders.length})
            </span>
            <Flame size={15} className="text-amber-600 animate-pulse" />
          </div>

          <div className="mt-3 flex-1 space-y-3 overflow-y-auto max-h-[70vh]">
            {preparingOrders.length === 0 ? (
              <p className="py-8 text-center text-xs text-stone-400">No orders currently on grill</p>
            ) : (
              preparingOrders.map(order => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-amber-300 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="rounded-md bg-amber-800 px-2 py-0.5 text-[10px] font-black text-white">
                        {order.id}
                      </span>
                      <h4 className="mt-1 font-display text-sm font-bold text-stone-900">
                        {order.customerName}
                      </h4>
                      <p className="text-[11px] text-stone-500">{order.branch} ({order.orderType})</p>
                    </div>
                    <span className="flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                      <Clock size={11} /> Prep: 8m
                    </span>
                  </div>

                  <div className="mt-3 border-t border-dashed border-stone-200 pt-2 text-xs text-stone-700 space-y-1">
                    {order.items.map((it, i) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold">
                          <span>{it.quantity}x {it.name}</span>
                          <span>${(it.price * it.quantity).toFixed(2)}</span>
                        </div>
                        {it.customizations && (
                          <p className="text-[10px] text-[#ff5a0a] font-semibold">{it.customizations}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handlePrintTicket(order.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
                      title="Print Slip"
                    >
                      <Printer size={13} />
                    </button>
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800"
                    >
                      <CheckCircle size={13} /> Mark Packed & Ready &rarr;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Ready for Pickup / Delivery */}
        <div className="flex flex-col rounded-3xl border border-emerald-200 bg-emerald-50/40 p-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
            <span className="font-display text-xs font-black uppercase tracking-wider text-emerald-800">
              3. Ready at Counter ({readyOrders.length})
            </span>
            <CheckCircle size={15} className="text-emerald-600" />
          </div>

          <div className="mt-3 flex-1 space-y-3 overflow-y-auto max-h-[70vh]">
            {readyOrders.length === 0 ? (
              <p className="py-8 text-center text-xs text-stone-400">No orders awaiting pickup</p>
            ) : (
              readyOrders.map(order => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-emerald-300 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-black text-white">
                        {order.id}
                      </span>
                      <h4 className="mt-1 font-display text-sm font-bold text-stone-900">
                        {order.customerName}
                      </h4>
                      <p className="text-[11px] text-stone-500">{order.branch} · {order.customerPhone}</p>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Bagged & Hot
                    </span>
                  </div>

                  <div className="mt-3 border-t border-dashed border-stone-200 pt-2 text-xs text-stone-700 space-y-1">
                    {order.items.map((it, i) => (
                      <div key={i} className="flex justify-between font-bold">
                        <span>{it.quantity}x {it.name}</span>
                        <span>${(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-stone-900 py-2 text-xs font-bold text-white shadow-sm hover:bg-black"
                    >
                      <Check size={14} /> Handed Over / Completed
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
