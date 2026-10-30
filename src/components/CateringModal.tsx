import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send } from 'lucide-react';

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (name: string, contact: string, type: string, message: string) => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({
  isOpen,
  onClose,
  onSubmitInquiry,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [eventType, setEventType] = useState('Corporate Office Lunch');
  const [estimatedGuests, setEstimatedGuests] = useState('30');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = `Catering request for ${estimatedGuests} guests (${eventType}). Details: ${notes}`;
    onSubmitInquiry(name, contact, 'Catering enquiry', fullMsg);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-[#fffdf9] shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 bg-[#07381e] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#ff5a0a]" />
            <h2 className="font-display text-lg font-black">Ekhaya Bulk & Event Catering</h2>
          </div>
          <button 
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle size={36} />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900">Request Sent to Ekhaya!</h3>
            <p className="text-xs text-stone-500">
              Our Bulawayo team will contact you directly to confirm portion sizes, braai trays, and custom quotation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-stone-600">
              Hosting a braai, company workshop, or church gathering in Bulawayo? Order bulk platters of flame-grilled chicken, traditional boerewors sausages, burgers and chips.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700">Full Name / Organization</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Tendai Dube / ZimGold Corp"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700">Phone or Email</label>
                <input
                  required
                  type="text"
                  placeholder="+263 77 ... or email@domain.co.zw"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700">Event Type</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-800 outline-none"
                  >
                    <option>Corporate Office Lunch</option>
                    <option>Family Braai / Gathering</option>
                    <option>Church / Sports Event</option>
                    <option>Birthday Celebration</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700">Estimated People</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={estimatedGuests}
                    onChange={e => setEstimatedGuests(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700">Menu Preferences & Date</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. 35 packs of chicken & chips combo, plus 10 boerewors rolls for Friday 13:00..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#ff5a0a]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5a0a] py-3.5 font-display text-xs font-black text-white shadow-lg transition hover:bg-[#e04500]"
            >
              <Send size={15} /> Submit Catering Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
