'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  faqs: { q: string; a: string }[];
}

export default function ServiceFaqAccordion({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800/60 rounded-2xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden hover:border-brand-200 dark:hover:border-brand-700 transition-all"
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            aria-expanded={openFaq === i}
            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
          >
            <span className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors flex-1">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-brand-600' : ''}`}
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
            <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
