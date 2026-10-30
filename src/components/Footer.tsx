import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#052614] text-white pt-14 pb-8 border-t border-emerald-950">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Bio matching image */}
          <div className="space-y-4">
            <BrandLogo light size="md" />
            <p className="text-xs leading-relaxed text-white/70">
              Ekhaya is a local takeaway brand serving delicious meals and bringing people together, one meal at a time.
            </p>

            {/* Social Icons matching image */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#ff5a0a]"
                aria-label="Ekhaya Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#ff5a0a]"
                aria-label="Ekhaya Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#ff5a0a]"
                aria-label="Ekhaya TikTok"
              >
                <span className="font-bold text-xs">Tik</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#ff5a0a]"
                aria-label="Ekhaya X"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links matching image */}
          <div>
            <h4 className="font-display text-sm font-black text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/70">
              {['Home', 'Our Menu', 'About Ekhaya', 'Locations', 'Promotions', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                    className="transition hover:text-[#ff5a0a]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us matching image */}
          <div>
            <h4 className="font-display text-sm font-black text-white">
              Contact Us
            </h4>
            <div className="mt-4 space-y-3 text-xs text-white/70">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#ff5a0a]" />
                <a href="tel:+263789079132" className="hover:text-white">+263 78 907 9132</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#ff5a0a]" />
                <a href="tel:+263789822078" className="hover:text-white">+263 78 982 2078</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#ff5a0a]" />
                <a href="mailto:info@ekhaya.co.zw" className="hover:text-white">info@ekhaya.co.zw</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-[#ff5a0a]" />
                <span>Bulawayo, Zimbabwe</span>
              </p>
            </div>
          </div>

          {/* Column 4: Our Branches matching image */}
          <div>
            <h4 className="font-display text-sm font-black text-white">
              Our Branches
            </h4>
            <div className="mt-4 space-y-3 text-xs text-white/70">
              <div>
                <p className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin size={13} className="text-[#ff5a0a]" /> Bulawayo CBD
                </p>
                <p className="pl-4 text-[11px] text-white/60">Corner of 10th Avenue & Herbert Chitepo St.</p>
              </div>

              <div>
                <p className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin size={13} className="text-[#ff5a0a]" /> Donnington
                </p>
                <p className="pl-4 text-[11px] text-white/60">12 Wolverhampton Road, Donnington.</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Clock size={13} className="text-[#ff5a0a]" /> Operating Hours
                </p>
                <p className="pl-4 text-[11px] text-orange-300 font-bold">08:00 – 22:00 Daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching image */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Ekhaya Takeaways. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
