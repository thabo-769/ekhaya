import { useState, useEffect, useRef, type FormEvent, type CSSProperties } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ChefHat, Clock3, Leaf, MapPin, Menu as MenuIcon, Phone, Search, ShoppingCart, Users, X, Utensils, Send, Star, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { MenuItem, BranchInfo, CustomerReview } from '../types';

interface Props {
  items: MenuItem[]; branches: BranchInfo[]; reviews: CustomerReview[]; cartCount: number;
  onCart: () => void; onSearch: () => void; onDashboard: () => void;
  onAdd: (item: MenuItem) => void; onBranch: (branch: BranchInfo) => void;
  onContact: (name: string, contact: string, type: string, message: string) => void;
}

const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const categories = ['All', 'Grilled', 'Burgers', 'Russian', 'Shawarma', 'Pizza', 'Traditional', 'Snacks', 'Drinks'];
const gallery = [
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1400&q=90',
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1400&q=90'
];
const galleryAlts = ['Grilled meal', 'Beef burger', 'Restaurant dining room', 'Family meal', 'Refreshing drink', 'Fresh salad bowl', 'Wood-fired pizza', 'Grilled barbecue platter', 'Restaurant favourite', 'Fresh garden salad', 'Grilled steak', 'Colourful salad plate', 'eKhaya meal favourite', 'Grilled meat platter', 'Freshly baked pizza', 'Plated restaurant meal', 'House burger', 'Noodle bowl'];

export function Storefront(p: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState('All');
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const restaurantGalleryPhotos = p.branches.map(branch => ({ src: branch.image, alt: `${branch.name} restaurant` }));
  const galleryPhotos = [
    ...gallery.slice(0, 8).map((src, index) => ({ src, alt: galleryAlts[index] })),
    ...restaurantGalleryPhotos,
    ...gallery.slice(8).map((src, index) => ({ src, alt: galleryAlts[index + 8] }))
  ];
  const startingGalleryIndex = Math.min(Math.floor(galleryPhotos.length / 2) + 1, galleryPhotos.length - 1);
  const [galleryIndex, setGalleryIndex] = useState(startingGalleryIndex);
  const [mobile, setMobile] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const items = category === 'All' ? p.items.slice(0, 16) : p.items.filter(i => {
    const c = `${i.category} ${i.name}`.toLowerCase();
    return category === 'Grilled' ? /chicken|grill|steak|peri/.test(c) : category === 'Traditional' ? /sadza|traditional|stew|ru?zivo/.test(c) : category === 'Russian' ? c.includes('russian') : category === 'Shawarma' ? c.includes('shawarma') : category === 'Pizza' ? c.includes('pizza') : category === 'Snacks' ? /roll|snack|chips|side/.test(c) : c.includes(category.toLowerCase());
  }).slice(0, 8);
  const searchedMenuItems = items.filter(item =>
    `${item.name} ${item.description} ${item.category} ${item.badge}`
      .toLowerCase()
      .includes(menuSearch.trim().toLowerCase())
  );
  const visibleMenuItems = menuExpanded ? searchedMenuItems : searchedMenuItems.slice(0, 4);

  const approvedReviews = p.reviews.filter(r => r.approved).slice(0, 3);
  const displayedReviews = approvedReviews.length ? approvedReviews : [
    {id:'a',name:'Tendai M.',comment:'The food is always fresh and delicious. eKhaya is my go-to place whenever I want good food!',rating:5,approved:true},
    {id:'b',name:'Nqobile D.',comment:'Great service, amazing atmosphere and the best chicken in town! I love it here.',rating:5,approved:true},
    {id:'c',name:'Brian S.',comment:'Affordable, tasty and always consistent. Keep up the great work!',rating:5,approved:true}
  ];
  const heroImage = p.items.find(i => /chicken/i.test(i.name))?.image ?? gallery[0];
  const restaurantImage = p.branches[0]?.image ?? gallery[2];
  const nav = [['Home','home'],['Menu','menu'],['About Us','about'],['Gallery','gallery'],['Contact','contact']];
  const sendContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    p.onContact(String(d.get('name')), `${String(d.get('email'))} | ${String(d.get('phone'))}`, 'Website contact', String(d.get('message')));
    e.currentTarget.reset(); setContactSent(true);
  };

  const scrollToGallerySlide = (index: number) => {
    const carousel = galleryRef.current;
    const slide = carousel?.querySelectorAll<HTMLImageElement>('.ek-gallery-slide')[galleryPhotos.length + index];
    if (!carousel || !slide) return;
    const rect = slide.getBoundingClientRect();
    carousel.scrollTo({
      left: carousel.scrollLeft + rect.left + rect.width / 2 - (carousel.getBoundingClientRect().left + carousel.clientWidth / 2),
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const carousel = galleryRef.current;
    if (!carousel) return;
    let frame = 0;
    const slides = Array.from(carousel.querySelectorAll<HTMLImageElement>('.ek-gallery-slide'));
    const initialSlide = slides[galleryPhotos.length + startingGalleryIndex];
    if (initialSlide) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft += initialSlide.getBoundingClientRect().left + initialSlide.getBoundingClientRect().width / 2
        - (carousel.getBoundingClientRect().left + carousel.clientWidth / 2);
      carousel.style.removeProperty('scroll-behavior');
    }
    const updateScales = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
        const reach = carousel.clientWidth * 0.58;
        let nearestIndex = 0;
        let nearestAbsoluteIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        slides.forEach((image, index) => {
          const rect = image.getBoundingClientRect();
          const imageCenter = rect.left + rect.width / 2;
          const rawDistance = Math.abs(center - imageCenter);
          const distance = Math.min(1, rawDistance / reach);
          if (rawDistance < nearestDistance) {
            nearestDistance = rawDistance;
            nearestAbsoluteIndex = index;
            nearestIndex = index % galleryPhotos.length;
          }
          image.style.setProperty('--gallery-scale', String(1.18 - distance * 0.46));
        });
        if (nearestAbsoluteIndex < galleryPhotos.length || nearestAbsoluteIndex >= galleryPhotos.length * 2) {
          const matchingSlide = slides[galleryPhotos.length + nearestIndex];
          if (matchingSlide) {
            const matchingRect = matchingSlide.getBoundingClientRect();
            carousel.style.scrollBehavior = 'auto';
            carousel.scrollLeft += matchingRect.left + matchingRect.width / 2 - center;
            carousel.style.removeProperty('scroll-behavior');
          }
        }
        setGalleryIndex(nearestIndex);
      });
    };
    updateScales();
    carousel.addEventListener('scroll', updateScales, { passive: true });
    window.addEventListener('resize', updateScales);
    return () => {
      cancelAnimationFrame(frame);
      carousel.removeEventListener('scroll', updateScales);
      window.removeEventListener('resize', updateScales);
    };
  }, []);

  return <div className="ekhaya-page">
    <header className="ek-header"><div className="ek-wrap ek-navrow">
      <a href="#home" className="ek-brand"><img src="/ekhaya-logo.png" alt="eKhaya" /></a>
      <nav className={mobile ? 'ek-nav is-open' : 'ek-nav'}>{nav.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMobile(false)}>{label}</a>)}</nav>
      <div className="ek-nav-actions"><button className="ek-cart" aria-label={`Open cart (${p.cartCount})`} onClick={p.onCart}><ShoppingCart size={17}/><span>Order Now</span><b>{p.cartCount}</b></button><button className="ek-dash" onClick={p.onDashboard} title="Dashboard">Dashboard</button><button className="ek-mobile" onClick={()=>setMobile(!mobile)} aria-label="Toggle menu">{mobile?<X/>:<MenuIcon/>}</button></div>
    </div></header>
    <main>
      <section id="home" className="ek-hero" style={{'--hero-image':`url("${heroImage}")`} as CSSProperties}>
        <div className="ek-wrap ek-hero-inner"><div className="ek-hero-copy"><span className="ek-script">Welcome to</span><img className="ek-hero-logo" src="/ekhaya-logo.png" alt="eKhaya"/><h1>Good Food. Good<br/>Moments. Feel at Home.</h1><p>At eKhaya, we serve fresh, delicious meals made with love. From hearty traditional dishes to modern favourites, every bite brings people together.</p><div className="ek-buttons"><button className="ek-button" onClick={()=>jump('menu')}><Utensils size={15}/> Order Now</button><button className="ek-button ek-button-outline" onClick={()=>jump('menu')}>View Our Menu</button></div></div><div className="ek-scribble">Fresh Food<br/>Great Vibes</div></div>
      </section>
      <section className="ek-benefits"><div className="ek-wrap ek-benefit-grid">{[[Leaf,'Fresh Ingredients','We use only the freshest and highest quality ingredients.'],[ChefHat,'Skilled Chefs','Our chefs bring years of experience and passion to every dish.'],[Users,'Family Friendly','A welcoming space for friends and family.'],[Clock3,'Fast & Reliable','Enjoy quick service and convenient takeaways.']].map(([Icon,title,desc])=>{const I=Icon as typeof Leaf;return <div className="ek-benefit" key={String(title)}><I/><h3>{String(title)}</h3><p>{String(desc)}</p></div>})}</div></section>
      <section id="menu" className="ek-menu-section"><div className="ek-wrap"><div className="ek-title centered"><small>OUR MENU</small><h2>Delicious Choices for Everyone</h2></div><div className="ek-menu-tools"><label className="ek-menu-search"><Search size={17}/><input type="search" aria-label="Search menu" placeholder="Search meals, ingredients..." value={menuSearch} onChange={event=>{setMenuSearch(event.target.value);setMenuExpanded(false);}}/><span>Search menu</span></label><div className="ek-categories">{categories.map(c=><button key={c} className={category===c?'selected':''} onClick={()=>{setCategory(c);setMenuExpanded(false);}}>{c}</button>)}</div></div><div className="ek-food-grid">{visibleMenuItems.map(item=><article className="ek-food-card" key={item.id}><img src={item.image} alt={item.name} loading="lazy"/><div className="ek-food-info"><h3>{item.name}</h3><p>{item.description}</p><strong>${item.price.toFixed(2)}</strong><button className="ek-add" disabled={!item.inStock} onClick={()=>p.onAdd(item)}><ShoppingCart size={13}/>{item.inStock?'Add to Cart':'Sold Out'}</button></div></article>)}</div>{searchedMenuItems.length===0&&<p className="ek-menu-empty" role="status">No menu items match “{menuSearch}”. Try another search.</p>}{searchedMenuItems.length>4&&<div className="ek-menu-more"><button className="ek-outline-green" onClick={()=>setMenuExpanded(value=>!value)}>{menuExpanded?'Show Less':'View More'} <ArrowRight size={14}/></button></div>}</div></section>
      <section id="about" className="ek-about"><div className="ek-wrap ek-about-grid"><img src={restaurantImage} alt="Inside eKhaya restaurant" loading="lazy"/><div><small>ABOUT US</small><h2>Our Story</h2><p>eKhaya was born from a simple idea — to bring people together through great food. We are passionate about quality, flavour and creating a warm, welcoming atmosphere where everyone feels at home. Whether you're stopping by for a quick bite or enjoying a meal with loved ones, eKhaya is your place.</p><button className="ek-button" onClick={()=>jump('contact')}>Learn More <ArrowRight size={15}/></button></div><span className="ek-about-script">More than just<br/>a meal...</span></div></section>
    <section id="gallery" className="ek-gallery"><div className="ek-wrap"><div className="ek-gallery-heading"><div><small>OUR GALLERY</small><h2>A Taste of eKhaya</h2><p>Take a look at some of our delicious meals, beautiful space and happy customers.</p></div><button className="ek-outline-green" onClick={()=>jump('gallery')}>View More Photos <ArrowRight size={14}/></button></div><div className="ek-gallery-grid" ref={galleryRef} aria-label="eKhaya restaurant photos" tabIndex={0} onWheel={event=>{const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;if(delta){event.preventDefault();event.currentTarget.scrollBy({left:delta,behavior:'auto'});}}}>{[0,1,2].flatMap(copy=>galleryPhotos.map((photo,index)=><img className="ek-gallery-slide" key={`${copy}-${photo.src}-${index}`} src={photo.src} alt={photo.alt} loading="lazy" decoding="async"/>))}</div><div className="ek-gallery-controls" aria-label="Gallery navigation"><button type="button" aria-label="Previous photo" onClick={()=>scrollToGallerySlide((galleryIndex-1+galleryPhotos.length)%galleryPhotos.length)}><ChevronLeft size={17}/></button><button type="button" aria-label="Next photo" onClick={()=>scrollToGallerySlide((galleryIndex+1)%galleryPhotos.length)}><ChevronRight size={17}/></button></div></div></section>
      <section className="ek-reviews"><div className="ek-wrap"><div className="ek-title centered"><small>TESTIMONIALS</small><h2>What Our Customers Say</h2></div><div className="ek-review-window"><div className="ek-review-track">{[...displayedReviews,...displayedReviews].map((r,i)=><article key={`${r.id}-${i}`} aria-hidden={i>=displayedReviews.length}><div className="ek-review-top"><span className="ek-avatar"><Users size={17}/></span><span className="ek-stars" aria-label={`${r.rating} stars`}>{Array.from({length:r.rating},(_,j)=><Star key={j} size={12} fill="currentColor"/> )}</span></div><p>“{r.comment}”</p><b>– {r.name}</b></article>)}</div></div></div></section>
      <section id="contact" className="ek-contact"><div className="ek-wrap ek-contact-grid"><div className="ek-find"><small>FIND US</small><h2>Visit Our Restaurant</h2><p>We are located in a convenient and easy to find location. Come through and enjoy your favourite meals!</p>{p.branches.map(branch=><div className="ek-location-detail" key={branch.id}><MapPin/><span><strong>{branch.name}</strong><br/>{branch.address}<br/><a href={branch.mapEmbedUrl} target="_blank" rel="noreferrer">Get directions</a></span></div>)}</div><div className="ek-map" aria-label="Map showing all Ekhaya branches in Bulawayo"><iframe title="Map showing Ekhaya branches in Bulawayo" src="https://www.openstreetmap.org/export/embed.html?bbox=28.54%2C-20.20%2C28.61%2C-20.14&layer=mapnik" loading="lazy"/><div className="ek-map-pins">{p.branches.map(branch=>{const left=((branch.lng-28.54)/0.07)*100;const top=((-20.14-branch.lat)/0.06)*100;return <a key={branch.id} href={branch.mapEmbedUrl} target="_blank" rel="noreferrer" className="ek-map-pin" style={{left:`${left}%`,top:`${top}%`}} aria-label={`${branch.name}: open directions`}><MapPin size={25}/><span>{branch.name}</span></a>})}</div></div><form className="ek-contact-form" onSubmit={sendContact}><h3>Get in Touch</h3><p>Send us a message and our team will get back to you.</p><label htmlFor="contact-name">Name</label><input id="contact-name" required name="name" autoComplete="name" placeholder="Your name"/><label htmlFor="contact-email">Email</label><input id="contact-email" required type="email" name="email" autoComplete="email" placeholder="you@example.com"/><label htmlFor="contact-phone">Contact detail</label><input id="contact-phone" required type="tel" name="phone" autoComplete="tel" placeholder="Phone number"/><label htmlFor="contact-message">Message</label><textarea id="contact-message" required name="message" placeholder="How can we help?" rows={4}/><button className="ek-button" type="submit"><Send size={14}/>{contactSent?'Message Sent':'Send Message'}</button></form></div></section>
    </main>
    <footer className="ek-footer"><div className="ek-wrap ek-footer-main"><div className="ek-footer-brand"><a href="#home"><img src="/ekhaya-logo.png" alt="eKhaya"/></a><p>Good food, warm welcomes and moments worth sharing.</p></div><div className="ek-footer-column"><h3>Explore</h3><nav>{nav.map(([label,id])=><a key={id} href={`#${id}`}>{label}</a>)}</nav></div><div className="ek-footer-column ek-footer-locations"><h3>Visit Us</h3>{p.branches.slice(0,2).map(branch=><a key={branch.id} href={branch.mapEmbedUrl} target="_blank" rel="noreferrer"><MapPin size={15}/><span><strong>{branch.name}</strong><small>{branch.address}</small></span></a>)}</div><div className="ek-footer-connect"><h3>Stay Connected</h3><div className="ek-social"><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook size={15}/></a><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={15}/></a><a href="https://www.whatsapp.com/" aria-label="WhatsApp"><MessageCircle size={15}/></a></div><button className="ek-footer-dashboard" onClick={p.onDashboard}>Restaurant Dashboard <ArrowRight size={13}/></button></div></div><div className="ek-wrap ek-footer-bottom"><span>© 2026 eKhaya Takeaways. All rights reserved.</span><span>Kumnandi ngempela</span></div></footer>
  </div>;
}




