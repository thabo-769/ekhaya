import { MenuItem, BranchInfo, Promotion, CustomerOrder, CustomerReview, ContactInquiry } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Quarter Chicken Meal',
    category: 'Chicken',
    description: 'Tender, flavourful and always a favourite.',
    price: 5.00,
    badge: 'CHICKEN',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '420 kcal',
    prepTimeMinutes: 12
  },
  {
    id: 'item-2',
    name: 'eKhaya Burger',
    category: 'Burgers',
    description: 'Juicy beef, fresh toppings, real flavour.',
    price: 4.50,
    badge: 'BURGERS',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '560 kcal',
    prepTimeMinutes: 10
  },
  {
    id: 'item-3',
    name: 'Chicken Wrap',
    category: 'Wraps',
    description: 'Fresh chicken, salad and our special sauce.',
    price: 4.00,
    badge: 'WRAPS',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '380 kcal',
    prepTimeMinutes: 8
  },
  {
    id: 'item-4',
    name: 'T-bone Steak',
    category: 'Meat & Grill',
    description: 'A classic, grilled to perfection.',
    price: 8.00,
    badge: 'MEAT & GRILL',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=720&q=85',
    isPopular: false,
    inStock: true,
    calories: '610 kcal',
    prepTimeMinutes: 15
  },
  {
    id: 'item-5',
    name: 'Chips',
    category: 'Chips & Sides',
    description: 'Golden, crispy and fresh.',
    price: 2.00,
    badge: 'CHIPS & SIDES',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '290 kcal',
    prepTimeMinutes: 6
  },
  {
    id: 'item-6',
    name: 'Family Combo',
    category: 'Combo Meals',
    description: 'More food. More to enjoy.',
    price: 10.00,
    badge: 'COMBO MEALS',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '1150 kcal',
    prepTimeMinutes: 18
  },
  {
    id: 'item-7',
    name: 'Soft Drinks',
    category: 'Drinks',
    description: 'Cool, refreshing, always on hand.',
    price: 1.00,
    badge: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '140 kcal',
    prepTimeMinutes: 2
  },
  // Additional extended authentic menu choices:
  {
    id: 'item-8',
    name: 'Quarter Chicken & Chips',
    category: 'Chicken',
    description: 'Flame-grilled quarter chicken basted with peri-peri, served with golden chips.',
    price: 4.50,
    badge: 'CHICKEN',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '520 kcal',
    prepTimeMinutes: 10
  },
  {
    id: 'item-9',
    name: 'Double Bacon Cheeseburger',
    category: 'Burgers',
    description: 'Two pure beef patties, melted cheddar, crispy bacon, house secret sauce.',
    price: 6.50,
    badge: 'BURGERS',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=720&q=85',
    isPopular: false,
    inStock: true,
    calories: '780 kcal',
    prepTimeMinutes: 12
  },
  {
    id: 'item-10',
    name: 'Braai Boerewors Roll',
    category: 'Sausages',
    description: 'Traditional spiced farm boerewors on a freshly baked roll with grilled onions.',
    price: 3.50,
    badge: 'SAUSAGES',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '450 kcal',
    prepTimeMinutes: 7
  },
  {
    id: 'item-11',
    name: 'Flame Grilled Pork Chops',
    category: 'Meat & Grill',
    description: 'Two succulent seasoned pork chops served with gravy or peri-peri dip.',
    price: 7.00,
    badge: 'MEAT & GRILL',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=720&q=85',
    isPopular: false,
    inStock: true,
    calories: '590 kcal',
    prepTimeMinutes: 14
  },
  {
    id: 'item-12',
    name: 'Fresh Garden Salad',
    category: 'Chips & Sides',
    description: 'Crisp lettuce, cucumbers, cherry tomatoes, and creamy tangy dressing.',
    price: 2.50,
    badge: 'CHIPS & SIDES',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=85',
    isPopular: false,
    inStock: true,
    calories: '160 kcal',
    prepTimeMinutes: 5
  }
  ,{
    id: 'item-13',
    name: 'Fresh Crispy Chips',
    category: 'Chips & Sides',
    description: 'Golden fresh-cut chips, crisp outside and fluffy inside.',
    price: 2.50,
    badge: 'FRESH DAILY',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '320 kcal',
    prepTimeMinutes: 6
  },
  {
    id: 'item-14',
    name: 'Russian Sausage & Chips',
    category: 'Russian',
    description: 'A smoky, juicy Russian sausage served with fresh golden chips.',
    price: 4.50,
    badge: 'RUSSIAN',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '570 kcal',
    prepTimeMinutes: 8
  },
  {
    id: 'item-15',
    name: 'Chicken Shawarma',
    category: 'Shawarma',
    description: 'Seasoned grilled chicken, crisp salad and creamy garlic sauce in a warm wrap.',
    price: 5.50,
    badge: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '520 kcal',
    prepTimeMinutes: 10
  },
  {
    id: 'item-16',
    name: 'Chicken & Cheese Pizza',
    category: 'Pizza',
    description: 'A shareable pizza topped with grilled chicken, cheese and our house sauce.',
    price: 8.50,
    badge: 'PIZZA',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=720&q=85',
    isPopular: true,
    inStock: true,
    calories: '790 kcal',
    prepTimeMinutes: 16
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    badge: 'SPECIAL',
    title: 'Chicken & Chips Combo',
    description: 'A perfect combo for any occasion.',
    price: 6.00,
    originalPrice: 7.50,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=720&q=85',
    tag: 'SAVE $1.50'
  },
  {
    id: 'promo-2',
    badge: 'LIMITED TIME',
    title: 'Burger Meal Deal',
    description: 'Bigger taste. Better value.',
    price: 5.50,
    originalPrice: 7.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=85',
    tag: 'FREE SODA'
  },
  {
    id: 'promo-3',
    badge: 'VALUE PACK',
    title: 'Sausage Feast',
    description: 'Real flavour. Great company.',
    price: 11.00,
    originalPrice: 14.00,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=720&q=85',
    tag: 'FEEDS 3-4'
  }
];

export const BRANCHES: BranchInfo[] = [
  {
    id: 'branch-cbd',
    name: 'Bulawayo CBD',
    address: 'Corner of 10th Avenue and Herbert Chitepo Street, Bulawayo.',
    phone: '+263 78 907 9132',
    hours: '08:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=720&q=85',
    mapEmbedUrl: 'https://maps.google.com/?q=Herbert+Chitepo+St+and+10th+Ave+Bulawayo',
    isOpen: true,
    activeOrdersCount: 9,
    manager: 'Sipho Ndlovu',
    lat: -20.1553,
    lng: 28.5833
  },
  {
    id: 'branch-donnington',
    name: 'Donnington',
    address: '12 Wolverhampton Road, Donnington, Bulawayo.',
    phone: '+263 78 982 2078',
    hours: '08:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=720&q=85',
    mapEmbedUrl: 'https://maps.google.com/?q=Wolverhampton+Rd+Donnington+Bulawayo',
    isOpen: true,
    activeOrdersCount: 5,
    manager: 'Nokuthula Moyo',
    lat: -20.1834,
    lng: 28.5621
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'EK-1048',
    customerName: 'Tinashe Marange',
    customerPhone: '+263 77 214 8831',
    branch: 'Bulawayo CBD',
    orderType: 'Pickup',
    items: [
      { name: 'Grilled Chicken', quantity: 2, price: 5.00, customizations: 'Hot Peri-Peri · Extra Hot' },
      { name: 'Chips', quantity: 2, price: 2.00, customizations: 'Well done crispy' },
      { name: 'Soft Drinks', quantity: 2, price: 1.00, customizations: 'Coke Ice Cold' }
    ],
    subtotal: 16.00,
    discount: 0,
    deliveryFee: 0,
    total: 16.00,
    paymentMethod: 'EcoCash USD',
    status: 'preparing',
    createdAt: '16:04',
    elapsedMinutes: 8,
    estimatedDeliveryTime: '16:20'
  },
  {
    id: 'EK-1049',
    customerName: 'Bongani Khumalo',
    customerPhone: '+263 71 890 2234',
    branch: 'Bulawayo CBD',
    orderType: 'Delivery',
    deliveryAddress: '42 Heyman Road, Suburbs, Bulawayo',
    items: [
      { name: 'eKhaya Burger', quantity: 3, price: 4.50, customizations: 'Extra melted cheddar' },
      { name: 'Family Combo', quantity: 1, price: 10.00, customizations: 'Mild Herb · Seasoned fries' }
    ],
    subtotal: 23.50,
    discount: 2.35,
    deliveryFee: 3.00,
    total: 24.15,
    paymentMethod: 'InnBucks',
    status: 'received',
    createdAt: '16:11',
    elapsedMinutes: 3,
    estimatedDeliveryTime: '16:45'
  },
  {
    id: 'EK-1047',
    customerName: 'Charmaine Sibanda',
    customerPhone: '+263 78 440 9012',
    branch: 'Donnington',
    orderType: 'Pickup',
    items: [
      { name: 'Traditional Sausages', quantity: 3, price: 4.00, customizations: 'Flame grilled with sweet relish' },
      { name: 'Chips', quantity: 1, price: 2.00 }
    ],
    subtotal: 14.00,
    discount: 0,
    deliveryFee: 0,
    total: 14.00,
    paymentMethod: 'Cash on Pickup',
    status: 'ready',
    createdAt: '15:52',
    elapsedMinutes: 20,
    estimatedDeliveryTime: 'Ready now'
  },
  {
    id: 'EK-1045',
    customerName: 'Farai Gumbo',
    customerPhone: '+263 77 553 1189',
    branch: 'Bulawayo CBD',
    orderType: 'Pickup',
    items: [
      { name: 'T-bone Steak', quantity: 1, price: 8.00, customizations: 'Medium Rare · Gravy' },
      { name: 'Soft Drinks', quantity: 1, price: 1.00 }
    ],
    subtotal: 9.00,
    discount: 0,
    deliveryFee: 0,
    total: 9.00,
    paymentMethod: 'ZimSwitch / Card',
    status: 'completed',
    createdAt: '15:35',
    elapsedMinutes: 38,
    estimatedDeliveryTime: 'Collected'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Sthandwa Ndebele',
    branch: 'Bulawayo CBD',
    rating: 5,
    date: 'Yesterday',
    comment: 'Best flame-grilled chicken on 10th Avenue! The peri-peri sauce actually tastes homemade. Always quick during my lunch break.',
    favoriteDish: 'Grilled Chicken',
    approved: true
  },
  {
    id: 'rev-2',
    name: 'Dumiso Ncube',
    branch: 'Donnington',
    rating: 5,
    date: '2 days ago',
    comment: 'The traditional boerewors sausages are unmatched in town. Perfectly spiced and tender. Staff at Donnington are super polite!',
    favoriteDish: 'Traditional Sausages',
    approved: true
  },
  {
    id: 'rev-3',
    name: 'Tendai Mpofu',
    branch: 'Bulawayo CBD',
    rating: 5,
    date: '3 days ago',
    comment: 'Cheeseburger is juicy, bun is toasted just right, and chips are crisp and golden! Kumnandi ngempela!',
    favoriteDish: 'Cheeseburger',
    approved: true
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Nigel Tshuma (Old Mutual Bulawayo)',
    contact: 'nigel.tshuma@email.com / +263 77 345 6789',
    type: 'Catering enquiry',
    message: 'Can you provide 45 takeaway packs (chicken & chips combos + cold drinks) for our regional team workshop this Friday at 12:30?',
    date: '29 Oct 2026, 14:20',
    status: 'New'
  },
  {
    id: 'inq-2',
    name: 'Prudence Dube',
    contact: '+263 78 554 1122',
    type: 'Menu enquiry',
    message: 'Do you offer catering trays of grilled boerewors sausages for a family birthday braai in Hillside?',
    date: '28 Oct 2026, 17:05',
    status: 'Replied'
  }
];



