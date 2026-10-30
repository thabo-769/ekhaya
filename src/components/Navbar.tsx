import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Search, ShoppingBag, Menu, X, ArrowRight, LayoutDashboard, Clock3 } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenDashboard: () => void;
  onOpenOrderTracker: () => void;
  onOrderNowClick: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenDashboard,
  onOpenOrderTracker,
  onOrderNowClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', isActive: true },
    { label: 'Our Menu', href: '#menu' },
    { label: 'About Ekhaya', href: '#about' },
    { label: 'Locations', href: '#locations' },
    { label: 'Promotions', href: '#promotions' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-transparent text-white transition-all">
      <div className="mx-auto flex h-[82px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center">
          <BrandLogo light size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
                className={`text-[13.5px] font-bold tracking-tight transition hover:text-[#ff7a35] ${
                idx === 0 ? 'text-[#ff7a35]' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Dashboard Switcher for the buyer */}
          <button
            onClick={onOpenDashboard}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white/15"
            title="Open Management & Kitchen Dashboard"
          >
            <LayoutDashboard size={14} className="text-[#ff5a0a]" />
            <span>Dashboard Hub</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search menu"
            className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-[#ff7a35]"
          >
            <Search size={19} />
          </button>

          <button
            onClick={onOpenOrderTracker}
            aria-label="Track an order"
            className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-[#ff7a35]"
          >
            <Clock3 size={18} />
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={onOpenCart}
            aria-label={`Open cart (${cartCount} items)`}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-[#07381e] text-white transition hover:bg-emerald-900"
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#ff5a0a] text-[10px] font-black text-white shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Order Now Pill Button */}
          <button
            onClick={onOrderNowClick}
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a0a] px-5 py-2.5 font-display text-sm font-extrabold text-white shadow-md shadow-orange-950/20 transition hover:bg-[#e04500] hover:-translate-y-0.5"
          >
            Order Now
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-white/15 bg-[#003d19] px-5 py-4 lg:hidden">
          <div className="space-y-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block rounded-xl px-3 py-2.5 font-display text-sm font-bold text-white hover:bg-white/10 hover:text-[#ff7a35]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-white/15 pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 font-display text-xs font-bold text-white"
            >
              <LayoutDashboard size={16} className="text-[#ff5a0a]" /> Open Management Dashboard
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderNowClick();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff5a0a] py-3 font-display text-sm font-black text-white shadow"
            >
              Order Now <ArrowRight size={16} />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
