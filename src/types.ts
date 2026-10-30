export type Category = 
  | 'All' 
  | 'Chicken' 
  | 'Burgers' 
  | 'Wraps'
  | 'Sausages' 
  | 'Russian' 
  | 'Shawarma' 
  | 'Pizza' 
  | 'Meat & Grill' 
  | 'Chips & Sides' 
  | 'Combo Meals' 
  | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  badge: string;
  isPopular?: boolean;
  inStock: boolean;
  calories?: string;
  prepTimeMinutes?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  spiceLevel?: 'Mild' | 'Lemon & Herb' | 'Hot Peri-Peri' | 'Extra Hot';
  sideOption?: string;
  drinkOption?: string;
  specialInstructions?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  branch: 'Bulawayo CBD' | 'Donnington';
  orderType: 'Pickup' | 'Delivery';
  deliveryAddress?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    customizations?: string;
  }[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Pickup' | 'EcoCash USD' | 'EcoCash ZiG' | 'InnBucks' | 'ZimSwitch / Card' | 'WhatsApp';
  status: OrderStatus;
  createdAt: string;
  elapsedMinutes: number;
  estimatedDeliveryTime?: string;
}

export interface BranchInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  mapEmbedUrl: string;
  isOpen: boolean;
  activeOrdersCount: number;
  manager: string;
  lat: number;
  lng: number;
}

export interface Promotion {
  id: string;
  badge: 'SPECIAL' | 'LIMITED TIME' | 'VALUE PACK';
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  tag: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  branch: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  approved: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  contact: string;
  type: string;
  message: string;
  date: string;
  status: 'New' | 'Replied' | 'Archived';
}


