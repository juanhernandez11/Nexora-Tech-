'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem { q: string; a: string; }

const CATEGORIES = [
  { label: 'Comerciales', range: [0, 15] },
  { label: 'Técnicas',    range: [15, 30] },
  { label: 'Contratación', range: [30, 50] },
];

export default function FAQClient({ items, locale }: { items: FAQItem[]; locale: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const { range } = CATEGORIES[activeCategory];
  const visible = items.slice(range[0], range[1]);

  return (
    <div>
      {/* Tabs de categoría */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => { setActiveCategory(i); setOpen(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeCategory === i
                ? 'bg-brand-600 text-white shadow-brand'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-brand-50 dark:hover:bg-brand-900/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Acordeón */}
      <div className="space-y-3">
        {visible.map((item, idx) => {
          const globalIdx = range[0] + idx;
          const isOpen = open === globalIdx;
          return (
            <div
              key={globalIdx}
              className="bg-white dark:bg-slate-800/60 rounded-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden hover:border-brand-200 dark:hover:border-brand-700 transition-all"
            >
              <button
                onClick={() => setOpen(isOpen ? null : globalIdx)}
                aria-expanded={isOpen}
                aria-controls={`faq-${globalIdx}`}
                className="w-full px-6 py-5 flex items-start sm:items-center justify-between gap-4 text-left group"
              >
                <span className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-1">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-600' : ''}`}
                />
              </button>
              <div
                id={`faq-${globalIdx}`}
                role="region"
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
