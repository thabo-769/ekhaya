import React, { useState } from 'react';
import { CustomerReview, ContactInquiry } from '../../types';
import { Star, MessageSquare, Check, Trash2, Mail, Phone, Calendar } from 'lucide-react';

interface InquiriesReviewsTabProps {
  reviews: CustomerReview[];
  inquiries: ContactInquiry[];
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: 'New' | 'Replied' | 'Archived') => void;
}

export const InquiriesReviewsTab: React.FC<InquiriesReviewsTabProps> = ({
  reviews,
  inquiries,
  onApproveReview,
  onDeleteReview,
  onUpdateInquiryStatus,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'inquiries' | 'reviews'>('inquiries');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-xs">
        <div>
          <h2 className="font-display text-xl font-black text-stone-900">
            Customer Inquiries & Feedback Center
          </h2>
          <p className="text-xs text-stone-500">
            Incoming catering requests, event braai bookings, and verified customer testimonials.
          </p>
        </div>

        <div className="flex rounded-full bg-stone-100 p-1">
          <button
            onClick={() => setActiveSubTab('inquiries')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              activeSubTab === 'inquiries'
                ? 'bg-[#07381e] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveSubTab('reviews')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              activeSubTab === 'reviews'
                ? 'bg-[#07381e] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Reviews & Ratings ({reviews.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'inquiries' ? (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center text-stone-400">
              <Mail size={32} className="mx-auto text-stone-300" />
              <p className="mt-2 text-xs font-bold">No catering requests or messages yet.</p>
            </div>
          ) : (
            inquiries.map(inq => (
              <div
                key={inq.id}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-orange-100 px-3 py-1 font-display text-xs font-black text-[#ff5a0a]">
                      {inq.type}
                    </span>
                    <h4 className="font-display text-base font-black text-stone-900">
                      {inq.name}
                    </h4>
                  </div>
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Calendar size={13} /> {inq.date}
                  </span>
                </div>

                <div className="rounded-2xl bg-stone-50 p-4 text-xs text-stone-700 leading-relaxed">
                  "{inq.message}"
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Phone size={13} className="text-[#ff5a0a]" />
                    <span className="font-semibold">{inq.contact}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                      inq.status === 'New'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Status: {inq.status}
                    </span>
                    {inq.status === 'New' && (
                      <button
                        onClick={() => onUpdateInquiryStatus(inq.id, 'Replied')}
                        className="rounded-full bg-[#07381e] px-3 py-1 font-display text-xs font-bold text-white hover:bg-emerald-950"
                      >
                        Mark as Contacted
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h4 className="mt-3 font-display text-sm font-black text-stone-900">
                  {rev.name}
                </h4>
                <p className="text-[11px] text-[#ff5a0a] font-bold">
                  Favourite: {rev.favoriteDish} ({rev.branch})
                </p>

                <p className="mt-2 text-xs text-stone-600 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-[#07381e]">
                  Verified Bulawayo Customer
                </span>

                <button
                  onClick={() => onDeleteReview(rev.id)}
                  className="text-stone-400 hover:text-red-500"
                  title="Remove review"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
