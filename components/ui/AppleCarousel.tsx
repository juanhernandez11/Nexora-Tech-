'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type AppleCarouselItem = {
  id: number | string;
  type?: 'wide' | 'large' | 'narrow';
  title: string;
  description: string;
  imgSrc: string;
  tag?: string;
  imgPosition?: string;
};

const CARD_SIZES: Record<string, string> = {
  narrow: 'w-[320px] sm:w-[360px] md:w-[400px]',
  large: 'w-[320px] sm:w-[460px] md:w-[620px]',
  wide: 'w-[320px] sm:w-[580px] md:w-[832px]',
};

const DEFAULT_GALLERY_ITEMS: AppleCarouselItem[] = [
  {
    id: 1,
    type: 'wide',
    tag: 'Arquitectura Cloud',
    title: 'Sistemas resilientes y de alta disponibilidad.',
    description: 'Diseñados para soportar 10x de crecimiento con latencias mínimas y 99.9% de uptime garantizado.',
    imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=832&h=680&auto=format&fit=crop',
    imgPosition: 'object-center',
  },
  {
    id: 2,
    type: 'large',
    tag: 'Automatización & IA',
    title: 'Flujos automatizados y agentes inteligentes.',
    description: 'Eliminamos horas de trabajo manual repetitivo conectando tus herramientas críticas.',
    imgSrc: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=620&h=680&auto=format&fit=crop',
    imgPosition: 'object-center',
  },
  {
    id: 3,
    type: 'wide',
    tag: 'Desarrollo Web & Móvil',
    title: 'Interfaces fluidas con Core Web Vitals en verde.',
    description: 'Experiencias de usuario de nivel internacional con Next.js, React y animaciones precisas.',
    imgSrc: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=832&h=680&auto=format&fit=crop',
    imgPosition: 'object-center',
  },
  {
    id: 4,
    type: 'narrow',
    tag: 'Seguridad Empresarial',
    title: 'Infraestructura blindada y escalable.',
    description: 'Auditorías continuas, encriptación de extremo a extremo y control de accesos granular.',
    imgSrc: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=680&auto=format&fit=crop',
    imgPosition: 'object-center',
  },
];

interface AppleCarouselProps {
  title?: string;
  items?: AppleCarouselItem[];
  className?: string;
}

export default function AppleCarousel({
  title = 'Ingeniería y diseño hasta el último pixel.',
  items = DEFAULT_GALLERY_ITEMS,
  className = '',
}: AppleCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CONTENT_MAX_WIDTH = 1260;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const isMobile = window.innerWidth < 768;
    const scrollAmount = isMobile ? 320 + 16 : 600 + 32;

    if (direction === 'left') {
      const currentScroll = scrollRef.current.scrollLeft;
      if (currentScroll - scrollAmount < 150) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    setTimeout(checkScroll, 400);
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full font-sans py-14 sm:py-20 overflow-hidden bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors ${className}`}
    >
      {/* Encabezado */}
      <div
        className="w-full mx-auto mb-8 md:mb-12 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        style={{ maxWidth: `${CONTENT_MAX_WIDTH}px` }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-heading leading-tight text-[#1d1d1f] dark:text-white max-w-2xl">
          {title}
        </h2>

        {/* Controles estilo Apple (Libreria-UI) */}
        <div className="flex gap-2.5 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Desplazar hacia la izquierda"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-[#1d1d1f] dark:text-[#f5f5f7] disabled:opacity-25 disabled:cursor-not-allowed shadow-xs"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8.5 1.5L2 8L8.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Desplazar hacia la derecha"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-[#1d1d1f] dark:text-[#f5f5f7] disabled:opacity-25 disabled:cursor-not-allowed shadow-xs"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M1.5 1.5L8 8L1.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carrusel deslizable con snap */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-4 md:gap-6 pb-6 px-4 sm:px-6 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            ref={addToRefs}
            className={`flex flex-col shrink-0 snap-start ${CARD_SIZES[item.type ?? 'large'] || CARD_SIZES.large}`}
          >
            <div className="w-full h-[360px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-[#f5f5f7] dark:bg-[#161617] relative group cursor-pointer border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
              <Image
                src={item.imgSrc}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${item.imgPosition || 'object-center'}`}
              />
              {item.tag && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md text-[#1d1d1f] dark:text-white border border-black/5 dark:border-white/10">
                    {item.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Texto de la tarjeta */}
            <div className="mt-4 px-2">
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
