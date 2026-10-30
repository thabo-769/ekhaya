import React, { useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { OverviewTab } from './OverviewTab';
import { KitchenDisplayTab } from './KitchenDisplayTab';
import { MenuManagerTab } from './MenuManagerTab';
import { BranchManagerTab } from './BranchManagerTab';
import { InquiriesReviewsTab } from './InquiriesReviewsTab';
import { CustomerOrder, MenuItem, BranchInfo, CustomerReview, ContactInquiry, OrderStatus } from '../../types';
import { LayoutDashboard, ShoppingBag, Eye, Search, Bell, Package, Users, Boxes, BarChart3, Megaphone, Settings, ChevronDown } from 'lucide-react';

interface DashboardLayoutProps {
  onBackToStore: () => void; orders: CustomerOrder[]; menuItems: MenuItem[]; branches: BranchInfo[]; reviews: CustomerReview[]; inquiries: ContactInquiry[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void; onToggleStock: (itemId: string) => void; onUpdatePrice: (itemId: string, newPrice: number) => void; onAddNewItem: (item: MenuItem) => void; onApproveReview: (id: string) => void; onDeleteReview: (id: string) => void; onUpdateInquiryStatus: (id: string, status: 'New' | 'Replied' | 'Archived') => void;
}

type Tab = 'overview' | 'orders' | 'products' | 'customers' | 'inventory' | 'reports' | 'marketing' | 'settings';
const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard }, { id: 'products', label: 'Products', icon: Package }, { id: 'orders', label: 'Orders', icon: ShoppingBag }, { id: 'customers', label: 'Customers', icon: Users }, { id: 'inventory', label: 'Inventory', icon: Boxes }, { id: 'reports', label: 'Reports', icon: BarChart3 }, { id: 'marketing', label: 'Marketing', icon: Megaphone }, { id: 'settings', label: 'Settings', icon: Settings },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<'All' | 'Bulawayo CBD' | 'Donnington'>('All');
  const activeOrdersCount = props.orders.filter(o => o.status === 'received' || o.status === 'preparing').length;
  const mappedTab = activeTab === 'orders' ? 'kds' : activeTab === 'products' || activeTab === 'inventory' ? 'menu' : activeTab === 'customers' || activeTab === 'marketing' ? 'inquiries' : activeTab === 'reports' || activeTab === 'settings' ? 'branches' : 'overview';
  return <div className="commerce-dashboard min-h-screen bg-[#176039] text-white">
    <aside className="commerce-sidebar fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col border-r border-emerald-400/20 bg-[#176039] px-[18px] py-7 lg:flex">
      <div className="flex justify-center"><BrandLogo light size="lg"/></div>
      <nav aria-label="Dashboard sections" className="mt-6 space-y-1.5">{tabs.map(({id,label,icon:Icon}) => <button key={id} onClick={() => setActiveTab(id)} aria-current={activeTab === id ? 'page' : undefined} className={`group flex h-[43px] w-full items-center gap-4 rounded-xl px-4 text-left text-[14px] font-semibold transition ${activeTab === id ? 'bg-[#f4510b] text-white shadow-lg' : 'text-white hover:bg-emerald-900/70'}`}><Icon size={21} strokeWidth={2.2}/><span className="flex-1">{label}</span>{id === 'orders' && <span className="rounded-full bg-[#f4510b] px-2 py-0.5 text-[11px]">12</span>}</button>)}</nav>
      <div className="mt-8 overflow-hidden rounded-xl border border-emerald-400/30 bg-[#287c4c]"><img className="h-[114px] w-full object-cover" src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=85"/><div className="p-4"><h2 className="font-display text-lg font-bold leading-tight">Good Food.<br/>Great Taste.</h2><p className="mt-2 text-xs text-emerald-100">Fresh takeaway meals, made with flavour.</p><button onClick={() => setActiveTab('products')} className="mt-4 rounded-full bg-[#f4510b] px-4 py-2 text-xs font-bold">Explore Menu →</button></div></div>
      <div className="mt-auto flex justify-center pt-8"><BrandLogo light size="md"/></div>
    </aside>
    <div className="lg:pl-[252px]">
      <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-emerald-400/20 bg-[#217043]/95 px-4 backdrop-blur sm:px-7 lg:px-[30px]">
        <label className="flex h-[46px] w-full max-w-[634px] items-center gap-3 rounded-full bg-[#398b59] px-4 text-emerald-50/90"><Search size={21}/><input aria-label="Search" placeholder="Search products, orders, customers..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-emerald-50/75"/><kbd className="hidden rounded-lg bg-emerald-50/15 px-2 py-1 text-[10px] sm:block">Ctrl + K</kbd></label>
        <div className="ml-4 flex shrink-0 items-center gap-5"><button aria-label="Notifications" className="relative"><Bell size={23}/><span className="absolute -right-2 -top-2 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#f4510b] text-[10px] font-bold">3</span></button><div className="hidden items-center gap-3 sm:flex"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#16813d] text-2xl">●</span><span className="text-sm font-semibold">Thabo<small className="mt-0.5 block text-xs font-normal text-emerald-100/70">Admin</small></span><ChevronDown size={17}/></div><button onClick={props.onBackToStore} className="rounded-full border border-emerald-200/20 px-3 py-2 text-xs font-bold hover:bg-white/10" title="View storefront"><Eye size={16}/></button></div>
      </header>
      <main className="mx-auto max-w-[1600px] p-3 sm:p-5 lg:p-[16px]">
        <div className="mb-[14px] flex flex-wrap items-end justify-between gap-3 lg:hidden"><div className="flex gap-2 overflow-x-auto">{tabs.map(t => <button onClick={() => setActiveTab(t.id)} key={t.id} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${activeTab === t.id ? 'bg-[#f4510b]' : 'bg-[#328451]'}`}>{t.label}</button>)}</div></div>
        <div className="grid grid-cols-1 gap-[14px] 2xl:grid-cols-[minmax(600px,1fr)_322px]">
          <div className="min-w-0">
            <section className="commerce-welcome relative flex min-h-[114px] items-center justify-between overflow-hidden rounded-[15px] border border-emerald-400/40 bg-gradient-to-r from-[#063d1b] via-[#075024]/90 to-[#075024]/30 px-6 py-5 sm:px-7"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,54,22,.97)_0%,rgba(0,64,25,.85)_48%,rgba(0,64,25,.05)_100%)]"/><div className="relative z-10"><h1 className="font-display text-2xl font-extrabold sm:text-[28px]">{activeTab === 'overview' ? 'Welcome back, Thabo 👋' : tabs.find(t=>t.id===activeTab)?.label}</h1><p className="mt-1 text-sm">{activeTab === 'overview' ? "Here's what's happening with your store today." : 'Manage your Ekhaya Takeaways restaurant.'}</p></div><div className="relative z-10 hidden scale-125 sm:block"><BrandLogo light size="md"/></div></section>
            <div className="mt-[14px]">{mappedTab === 'overview' ? <OverviewTab orders={props.orders} menuItems={props.menuItems} onNavigateToTab={(t) => setActiveTab(t === 'kds' ? 'orders' : t === 'menu' ? 'products' : 'overview')}/> : mappedTab === 'kds' ? <KitchenDisplayTab orders={props.orders} onUpdateOrderStatus={props.onUpdateOrderStatus} selectedBranchFilter={selectedBranchFilter}/> : mappedTab === 'menu' ? <MenuManagerTab items={props.menuItems} onToggleStock={props.onToggleStock} onUpdatePrice={props.onUpdatePrice} onAddNewItem={props.onAddNewItem}/> : mappedTab === 'inquiries' ? <InquiriesReviewsTab reviews={props.reviews} inquiries={props.inquiries} onApproveReview={props.onApproveReview} onDeleteReview={props.onDeleteReview} onUpdateInquiryStatus={props.onUpdateInquiryStatus}/> : <BranchManagerTab branches={props.branches}/>}</div>
            {mappedTab === 'overview' && <section className="mt-[14px] rounded-[14px] border border-emerald-400/30 bg-[#217043] px-5 py-4"><div className="flex flex-wrap items-center gap-4"><BrandLogo light size="md"/><div className="min-w-[175px] flex-1"><h2 className="font-display text-lg font-extrabold">More Taste. More to Enjoy.</h2><p className="mt-1 text-xs text-emerald-50/90">Fresh ingredients. Great value. Proudly Zimbabwean.</p></div><img className="hidden h-14 w-1/3 rounded-lg object-cover lg:block" src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85"/><button onClick={() => setActiveTab('products')} className="rounded-xl bg-[#f4510b] px-4 py-2.5 text-xs font-bold">Manage Menu →</button></div></section>}
          </div>
          <aside className="space-y-[14px]">
            <section className="rounded-[14px] border border-emerald-400/30 bg-[#217043] p-4"><div className="flex items-center justify-between"><h2 className="font-display text-base font-extrabold">Recent Orders</h2><button onClick={()=>setActiveTab('orders')} className="text-[11px] font-bold text-[#ff6420]">View All →</button></div><div className="mt-3">{props.orders.slice(0,5).map((o,i)=><div key={o.id} className="flex items-center gap-3 border-t border-emerald-400/15 py-2.5"><div className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-lg bg-white/10 text-2xl">{['🍗','🍔','🌭','🥩','🍟'][i]}</div><div className="min-w-0 flex-1"><p className="text-xs font-extrabold">#{o.id}</p><p className="mt-1 truncate text-xs">{o.customerName}</p><p className="mt-1 text-xs font-bold">${o.total.toFixed(2)}</p></div><div className="text-right"><span className="rounded-full bg-emerald-500/80 px-2.5 py-1.5 text-[10px] font-bold">{o.status}</span><p className="mt-3 text-[10px] text-emerald-100/80">{i*2+2}h ago</p></div></div>)}</div></section>
            <section className="rounded-[14px] border border-emerald-400/30 bg-[#217043] p-4"><h2 className="font-display text-base font-extrabold">Quick Actions</h2><div className="mt-3 grid grid-cols-2 gap-3">{[{label:'Add Product',icon:Package,tab:'products' as Tab},{label:'Manage Orders',icon:ShoppingBag,tab:'orders' as Tab},{label:'View Reports',icon:BarChart3,tab:'reports' as Tab},{label:'Settings',icon:Settings,tab:'settings' as Tab}].map(({label,icon:Icon,tab})=><button key={label} onClick={()=>setActiveTab(tab)} className="flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-xl bg-[#328451] transition hover:bg-[#0b6731]"><Icon size={29} className="text-[#ff5914]"/><span className="text-xs font-bold">{label}</span></button>)}</div></section>
          </aside>
        </div>
      </main>
    </div>
  </div>;
};

