import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { Star, Send, Heart, CheckCircle2, MessageCircle, Phone, MapPin, Mail } from 'lucide-react';

interface ReviewsAndContactSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
  onSubmitContact: (name: string, contact: string, type: string, message: string) => void;
}

export const ReviewsAndContactSection: React.FC<ReviewsAndContactSectionProps> = ({
  reviews,
  onAddReview,
  onSubmitContact,
}) => {
  // Review form
  const [revName, setRevName] = useState('');
  const [revBranch, setRevBranch] = useState('Bulawayo CBD');
  const [revRating, setRevRating] = useState(5);
  const [revDish, setRevDish] = useState('Grilled Chicken');
  const [revComment, setRevComment] = useState('');
  const [revSubmitted, setRevSubmitted] = useState(false);

  // Contact form
  const [contactName, setContactName] = useState('');
  const [contactDetail, setContactDetail] = useState('');
  const [contactType, setContactType] = useState('General question');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: revName || 'Happy Customer',
      branch: revBranch,
      rating: revRating,
      date: 'Just now',
      comment: revComment,
      favoriteDish: revDish,
      approved: true,
    };
    onAddReview(newRev);
    setRevSubmitted(true);
    setTimeout(() => {
      setRevSubmitted(false);
      setRevName('');
      setRevComment('');
    }, 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitContact(contactName, contactDetail, contactType, contactMsg);
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactDetail('');
      setContactMsg('');
    }, 2500);
  };

  return (
    <div className="bg-[#f0f6f0] py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Customer Reviews Section */}
        <div>
          <div className="text-center">
            <span className="font-display text-xs font-black uppercase tracking-widest text-[#ff5a0a]">
              What Bulawayo Is Saying
            </span>
            <h2 className="mt-1 font-display text-3xl font-black text-[#07381e] sm:text-4xl">
              Authentic Community Reviews
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Hear from our regular takeaway lovers in Bulawayo CBD and Donnington.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map(r => (
              <div
                key={r.id}
                className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>

                  <p className="mt-4 text-xs font-medium leading-relaxed text-stone-700 italic">
                    "{r.comment}"
                  </p>
                </div>

                <div className="mt-6 border-t border-stone-100 pt-3">
                  <h4 className="font-display text-sm font-black text-stone-900">{r.name}</h4>
                  <div className="mt-0.5 flex items-center justify-between text-[11px] text-stone-500">
                    <span>{r.branch}</span>
                    <span className="font-bold text-[#ff5a0a]">{r.favoriteDish}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review modal/card */}
          <div className="mt-8 rounded-3xl border border-orange-200/80 bg-orange-50/50 p-6 sm:p-8">
            <h3 className="font-display text-lg font-black text-[#07381e]">
              Dined with us recently? Leave a quick review!
            </h3>
            {revSubmitted ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-100 p-4 text-xs font-bold text-emerald-800">
                <CheckCircle2 size={16} /> Thank you! Your review has been added to the live feed and operations board.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="mt-4 grid gap-3 sm:grid-cols-4">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  value={revName}
                  onChange={e => setRevName(e.target.value)}
                  className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#ff5a0a]"
                />
                <select
                  value={revBranch}
                  onChange={e => setRevBranch(e.target.value)}
                  className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none"
                >
                  <option>Bulawayo CBD</option>
                  <option>Donnington</option>
                </select>
                <select
                  value={revDish}
                  onChange={e => setRevDish(e.target.value)}
                  className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none"
                >
                  <option>Grilled Chicken</option>
                  <option>Cheeseburger</option>
                  <option>Traditional Sausages</option>
                  <option>T-bone Steak</option>
                  <option>Chips</option>
                  <option>Family Combo</option>
                </select>
                <input
                  required
                  type="text"
                  placeholder="Your experience / review..."
                  value={revComment}
                  onChange={e => setRevComment(e.target.value)}
                  className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#ff5a0a]"
                />
                <div className="sm:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full bg-[#ff5a0a] px-6 py-2 text-xs font-black text-white hover:bg-[#e04500]"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Contact Us Interactive Form */}
        <div id="contact" className="grid gap-10 rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <span className="font-display text-xs font-black uppercase tracking-widest text-[#ff5a0a]">
              We'd Love To Hear From You
            </span>
            <h2 className="mt-1 font-display text-3xl font-black text-[#07381e] sm:text-4xl">
              Get In Touch With <span className="text-[#ff5a0a]">Ekhaya</span>
            </h2>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              Have an inquiry about our takeaways, party catering, business partnerships, or special orders? Drop our management team a note below.
            </p>

            <div className="mt-8 space-y-4 text-xs text-stone-700">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-100 text-[#ff5a0a]">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Direct Calls & WhatsApp</p>
                  <p className="text-stone-500">+263 78 907 9132 / +263 78 982 2078</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-[#07381e]">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-bold text-stone-900">Visit Us</p>
                  <p className="text-stone-500">10th Ave CBD & Wolverhampton Rd Donnington, Bulawayo</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {contactSent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center text-emerald-800">
                <CheckCircle2 size={40} className="text-emerald-600" />
                <h4 className="mt-3 font-display text-lg font-bold">Message Delivered!</h4>
                <p className="mt-1 text-xs text-emerald-700">
                  Your message has reached our manager terminal. We will call or WhatsApp you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-stone-700">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sipho Moyo"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#ff5a0a]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700">Phone or Email</label>
                    <input
                      required
                      type="text"
                      placeholder="+263 78 ... or email"
                      value={contactDetail}
                      onChange={e => setContactDetail(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#ff5a0a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700">Inquiry Type</label>
                  <select
                    value={contactType}
                    onChange={e => setContactType(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none"
                  >
                    <option>General question</option>
                    <option>Catering enquiry</option>
                    <option>Menu enquiry</option>
                    <option>Branch information</option>
                    <option>Customer Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700">Your Message</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can we assist you today?..."
                    value={contactMsg}
                    onChange={e => setContactMsg(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#ff5a0a]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5a0a] py-3 font-display text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[#e04500]"
                >
                  <Send size={14} /> Send Message to Ekhaya
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


