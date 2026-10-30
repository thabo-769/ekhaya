import { Storefront } from './components/Storefront';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { PromotionsSection } from './components/PromotionsSection';
import { AboutSection } from './components/AboutSection';
import { LocationsSection } from './components/LocationsSection';
import { OrderEasyBanner } from './components/OrderEasyBanner';
import { ReviewsAndContactSection } from './components/ReviewsAndContactSection';
import { Footer } from './components/Footer';

// Modals
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { SearchModal } from './components/SearchModal';
import { BranchModal } from './components/BranchModal';
import { CateringModal } from './components/CateringModal';

// Dashboard
import { DashboardLayout } from './components/dashboard/DashboardLayout';

// Data & Types
import { 
  INITIAL_MENU_ITEMS, 
  BRANCHES, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS, 
  INITIAL_INQUIRIES, 
  PROMOTIONS 
} from './data/menuData';
import { 
  MenuItem, 
  CartItem, 
  CustomerOrder, 
  BranchInfo, 
  CustomerReview, 
  ContactInquiry, 
  OrderStatus,
  Promotion
} from './types';
import { X } from 'lucide-react';

export default function App() {
  // Navigation & View Mode ('storefront' | 'dashboard')
  const [viewMode, setViewMode] = useState<'storefront' | 'dashboard'>('storefront');

  // Core Data States
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(INITIAL_INQUIRIES);
  const [branches] = useState<BranchInfo[]>(BRANCHES);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: INITIAL_MENU_ITEMS[0],
      quantity: 1,
      spiceLevel: 'Hot Peri-Peri',
      sideOption: 'Crispy Golden Chips',
      drinkOption: 'Coca-Cola (330ml)'
    }
  ]);
  const [selectedBranch, setSelectedBranch] = useState<'Bulawayo CBD' | 'Donnington'>('Bulawayo CBD');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(['Grilled Chicken', 'Traditional Sausages']);

  // Modals visibility
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderTrackerOpen, setOrderTrackerOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<CustomerOrder | null>(orders[0] || null);
  const [selectedBranchModal, setSelectedBranchModal] = useState<BranchInfo | null>(null);
  const [cateringModalOpen, setCateringModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (
    item: MenuItem, 
    quantity: number, 
    spiceLevel?: any, 
    sideOption?: string, 
    drinkOption?: string, 
    specialNotes?: string
  ) => {
    setCart(prev => {
      // Check if identical item already in cart
      const existingIdx = prev.findIndex(ci => 
        ci.item.id === item.id && 
        ci.spiceLevel === spiceLevel && 
        ci.sideOption === sideOption && 
        ci.drinkOption === drinkOption
      );

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          item,
          quantity,
          spiceLevel,
          sideOption,
          drinkOption,
          specialInstructions: specialNotes
        }];
      }
    });

    showToast(`${quantity}x ${item.name} added to your takeaway bag!`);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCart(prev => {
        const next = [...prev];
        next[index].quantity = newQty;
        return next;
      });
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from order');
  };

  const handleProceedToCheckout = (
    branch: 'Bulawayo CBD' | 'Donnington', 
    promoCode: string, 
    discount: number
  ) => {
    setSelectedBranch(branch);
    setAppliedPromoCode(promoCode);
    setAppliedDiscount(discount);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: CustomerOrder) => {
    // Add to orders list (which shows up in live KDS immediately!)
    setOrders(prev => [newOrder, ...prev]);
    // Clear cart
    setCart([]);
    // Set for tracker
    setActiveTrackingOrder(newOrder);
    setCheckoutOpen(false);
    setOrderTrackerOpen(true);
    showToast(`Order #${newOrder.id} confirmed! Kitchen is preparing your food.`);
  };

  const handleOrderViaWhatsApp = () => {
    if (cart.length === 0) {
      showToast('Add something to your order before WhatsApping!');
      return;
    }

    const branchPhone = selectedBranch === 'Bulawayo CBD' ? '263789079132' : '263789822078';
    const subtotal = cart.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);
    
    let text = `*New Ekhaya Takeaway Order*\n\n`;
    text += `*Branch:* ${selectedBranch}\n`;
    text += `--------------------------\n`;
    cart.forEach(ci => {
      text += `• ${ci.quantity}x ${ci.item.name} - $${(ci.item.price * ci.quantity).toFixed(2)}\n`;
      if (ci.spiceLevel) text += `   Spice: ${ci.spiceLevel}\n`;
      if (ci.sideOption) text += `   Side: ${ci.sideOption}\n`;
    });
    text += `--------------------------\n`;
    text += `*Estimated Total:* $${subtotal.toFixed(2)} USD\n\n`;
    text += `Please confirm my order and prep time! Kumnandi ngempela!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${branchPhone}?text=${encoded}`, '_blank');
  };

  const handleToggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  // Dashboard Operation Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} moved to ${newStatus.toUpperCase()}`);
  };

  const handleToggleStock = (itemId: string) => {
    setMenuItems(prev => prev.map(it => {
      if (it.id === itemId) {
        const nextStock = !it.inStock;
        showToast(`${it.name} is now ${nextStock ? 'IN STOCK' : 'MARKED OUT OF STOCK (86)'}`);
        return { ...it, inStock: nextStock };
      }
      return it;
    }));
  };

  const handleUpdatePrice = (itemId: string, newPrice: number) => {
    setMenuItems(prev => prev.map(it => {
      if (it.id === itemId) {
        showToast(`${it.name} price updated to $${newPrice.toFixed(2)}`);
        return { ...it, price: newPrice };
      }
      return it;
    }));
  };

  const handleAddNewItem = (item: MenuItem) => {
    setMenuItems(prev => [item, ...prev]);
    showToast(`"${item.name}" added to Ekhaya menu!`);
  };

  const handleApproveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    showToast('Review approved');
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Review removed');
  };

  const handleAddReview = (newReview: CustomerReview) => {
    setReviews(prev => [newReview, ...prev]);
    showToast('Thank you! Review published.');
  };

  const handleUpdateInquiryStatus = (id: string, status: 'New' | 'Replied' | 'Archived') => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    showToast(`Inquiry status updated to ${status}`);
  };

  const handleContactSubmit = (name: string, contact: string, type: string, message: string) => {
    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      name,
      contact,
      type,
      message,
      date: 'Just now',
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Your message has been delivered to Ekhaya managers!');
  };

  // Search order in tracker
  const handleSearchOrderId = (id: string) => {
    const found = orders.find(o => o.id.toLowerCase() === id.toLowerCase());
    if (found) {
      setActiveTrackingOrder(found);
      showToast(`Tracking order #${found.id}`);
    } else {
      showToast(`No order found matching "${id}"`);
    }
  };

  const handleSelectPromo = (promo: Promotion) => {
    const match = menuItems.find(m => m.name.toLowerCase().includes(promo.title.toLowerCase().split(' ')[0]));
    if (match) {
      setCustomizingItem(match);
    } else {
      setCustomizingItem(menuItems[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf1] font-sans antialiased selection:bg-[#ff5a0a] selection:text-white">
      {/* RENDER VIEW: DASHBOARD OR STOREFRONT */}
      {viewMode === 'dashboard' ? (
        <DashboardLayout
          onBackToStore={() => setViewMode('storefront')}
          orders={orders}
          menuItems={menuItems}
          branches={branches}
          reviews={reviews}
          inquiries={inquiries}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onToggleStock={handleToggleStock}
          onUpdatePrice={handleUpdatePrice}
          onAddNewItem={handleAddNewItem}
          onApproveReview={handleApproveReview}
          onDeleteReview={handleDeleteReview}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
        />
      ) : (
        <Storefront items={menuItems} branches={branches} reviews={reviews} cartCount={totalCartCount} onCart={()=>setCartOpen(true)} onSearch={()=>setSearchOpen(true)} onDashboard={()=>setViewMode('dashboard')} onAdd={item=>handleAddToCart(item,1)} onBranch={setSelectedBranchModal} onContact={handleContactSubmit}/>      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        selectedBranch={selectedBranch}
        onChangeBranch={setSelectedBranch}
        onOrderViaWhatsApp={handleOrderViaWhatsApp}
      />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        branch={selectedBranch}
        discount={appliedDiscount}
        promoCode={appliedPromoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={orderTrackerOpen}
        onClose={() => setOrderTrackerOpen(false)}
        order={activeTrackingOrder}
        onSearchOrderId={handleSearchOrderId}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={menuItems}
        onSelectItem={(it) => setCustomizingItem(it)}
      />

      {/* Branch Locator & Directions Modal */}
      <BranchModal
        branch={selectedBranchModal}
        onClose={() => setSelectedBranchModal(null)}
        onSelectBranchForOrder={(b) => {
          setSelectedBranch(b);
          setCartOpen(true);
        }}
      />

      {/* Bulk Catering Modal */}
      <CateringModal
        isOpen={cateringModalOpen}
        onClose={() => setCateringModalOpen(false)}
        onSubmitInquiry={handleContactSubmit}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div 
          role="status" 
          className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#07381e] px-6 py-3.5 text-xs font-black text-white shadow-2xl ring-2 ring-white/20 animate-fade-in"
        >
          <span className="h-2 w-2 rounded-full bg-[#ff5a0a]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-1 text-white/70 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}




