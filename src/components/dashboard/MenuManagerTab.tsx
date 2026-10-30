import React, { useState } from 'react';
import { MenuItem, Category } from '../../types';
import { Plus, Search, Edit3, Check, X, Tag, AlertCircle } from 'lucide-react';

interface MenuManagerTabProps {
  items: MenuItem[];
  onToggleStock: (itemId: string) => void;
  onUpdatePrice: (itemId: string, newPrice: number) => void;
  onAddNewItem: (item: MenuItem) => void;
}

export const MenuManagerTab: React.FC<MenuManagerTabProps> = ({
  items,
  onToggleStock,
  onUpdatePrice,
  onAddNewItem,
}) => {
  const [filterCat, setFilterCat] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item modal form state
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState<Category>('Chicken');
  const [newPrice, setNewPrice] = useState('5.00');
  const [newDesc, setNewDesc] = useState('');
  const [newBadge, setNewBadge] = useState('CHICKEN');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=720&q=85');

  const filtered = items.filter(i => {
    const matchCat = filterCat === 'All' || i.category === filterCat;
    const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleStartEditPrice = (item: MenuItem) => {
    setEditingId(item.id);
    setTempPrice(item.price.toFixed(2));
  };

  const handleSavePrice = (itemId: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val > 0) {
      onUpdatePrice(itemId, val);
    }
    setEditingId(null);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MenuItem = {
      id: `item-${Date.now()}`,
      name: newName,
      category: newCat,
      description: newDesc || 'Freshly made to order at Ekhaya.',
      price: parseFloat(newPrice) || 4.50,
      image: newImage,
      badge: newBadge.toUpperCase(),
      inStock: true,
      calories: '450 kcal',
      prepTimeMinutes: 10
    };
    onAddNewItem(created);
    setShowAddModal(false);
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-xs">
        <div>
          <h2 className="font-display text-xl font-black text-stone-900">
            Menu & Inventory Manager
          </h2>
          <p className="text-xs text-stone-500">
            Toggle items in/out of stock. Changes instantly update the customer takeaway storefront.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-full bg-[#ff5a0a] px-4 py-2 text-xs font-black text-white shadow-md hover:bg-[#e04500]"
        >
          <Plus size={16} /> Add New Dish
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-3">
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Chicken', 'Burgers', 'Sausages', 'Russian', 'Shawarma', 'Pizza', 'Meat & Grill', 'Chips & Sides', 'Combo Meals', 'Drinks'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                filterCat === cat
                  ? 'bg-[#07381e] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search dish title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-[#ff5a0a]"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="border-b border-stone-200 bg-stone-50 font-display text-[11px] uppercase tracking-wider text-stone-500">
            <tr>
              <th className="p-4">Dish</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price (USD)</th>
              <th className="p-4">Kitchen Prep</th>
              <th className="p-4">Inventory Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-stone-50/70">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-stone-900">{item.name}</h4>
                      <p className="text-[11px] text-stone-500 max-w-xs truncate">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-semibold text-stone-600">
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-black text-stone-700">
                    {item.category}
                  </span>
                </td>
                <td className="p-4">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-stone-500">$</span>
                      <input
                        type="number"
                        step="0.5"
                        value={tempPrice}
                        onChange={e => setTempPrice(e.target.value)}
                        className="w-16 rounded border border-orange-400 px-1 py-0.5 text-xs font-bold"
                      />
                      <button
                        onClick={() => handleSavePrice(item.id)}
                        className="rounded bg-emerald-700 p-1 text-white hover:bg-emerald-800"
                      >
                        <Check size={12} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded bg-stone-200 p-1 text-stone-700 hover:bg-stone-300"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-black text-[#07381e]">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleStartEditPrice(item)}
                        className="text-stone-400 hover:text-stone-700"
                      >
                        <Edit3 size={13} />
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-4 text-stone-500">
                  {item.prepTimeMinutes || 10} mins
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onToggleStock(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold transition ${
                      item.inStock
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${item.inStock ? 'bg-emerald-600' : 'bg-red-600'}`} />
                    {item.inStock ? 'In Stock (Live)' : 'Sold Out (86)'}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onToggleStock(item.id)}
                    className="text-xs font-bold text-stone-600 hover:text-[#ff5a0a]"
                  >
                    {item.inStock ? 'Mark Sold Out' : 'Restock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAddModal(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-display text-lg font-black text-stone-900">Add New Takeaway Dish</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDish} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700">Dish Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Flame Grilled Half Chicken"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-xs outline-none focus:border-[#ff5a0a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700">Category</label>
                  <select
                    value={newCat}
                    onChange={e => {
                      setNewCat(e.target.value as any);
                      setNewBadge(e.target.value.toUpperCase());
                    }}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-xs outline-none"
                  >
                    {['Chicken', 'Burgers', 'Sausages', 'Russian', 'Shawarma', 'Pizza', 'Meat & Grill', 'Chips & Sides', 'Combo Meals', 'Drinks'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700">Price (USD)</label>
                  <input
                    required
                    type="number"
                    step="0.5"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-xs outline-none focus:border-[#ff5a0a]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700">Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Tender flame-grilled chicken with lemon & herb or hot peri-peri..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-xs outline-none focus:border-[#ff5a0a]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700">Photo URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2 text-xs outline-none focus:border-[#ff5a0a]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-[#ff5a0a] py-3 text-xs font-black text-white hover:bg-[#e04500]"
              >
                Publish Dish to Menu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

