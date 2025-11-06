'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Home, Grid3X3, Calculator, Mail, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider'

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[calc(100vw-24px)] max-w-xl ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2 md:px-4 shadow-md">
        <div className="flex items-center gap-2 md:gap-4 w-full">
            <div className="pr-3 md:pr-8">
          {/* Logo */}
          <Image
            src="/logos/logo.png"
            alt="MAI Future"
            width={200} // high intrinsic width for DPR sharpness
            height={48}
            priority
            className="h-8 w-auto"
          />
          </div>

          {/* Shared gradient for icon strokes */}
            <svg width="0" height="0" className="absolute">
            <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop stopColor="#C7E9FB" offset="0%" />
              <stop stopColor="#89BFE2" offset="50%" />
              <stop stopColor="#3B82F6" offset="100%" />
            </linearGradient>
          </svg>

          {/* Home Icon */}
          <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="ml-auto w-9 h-9 md:w-10 md:h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <Home className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Features Icon */}
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <Grid3X3 className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Calculator Icon */}
          <button onClick={() => document.getElementById('Calculator')?.scrollIntoView({ behavior: 'smooth' })} className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <Calculator className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Contact Icon */}
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <Mail className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Language Selector Dropdown */}
          <div className="ml-1 relative select-none">
            <button onClick={() => setLangOpen((v)=>!v)} className="w-9 h-9 md:w-10 md:h-10 bg-white text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <span className="text-[11px] font-semibold tracking-wide">{lang==='mk' ? 'MKD' : 'GB'}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 min-w-[140px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50" onMouseLeave={() => setLangOpen(false)}>
                <button onClick={() => { setLang('en'); setLangOpen(false); }} className={`w-full px-3 py-2.5 flex items-center justify-between text-gray-800 hover:bg-gray-50 ${lang==='en' ? 'bg-gray-50' : ''}`}>
                  <span className="text-xs font-medium">English</span>
                  <span className="text-[11px] font-semibold tracking-wide">GB</span>
                </button>
                <button onClick={() => { setLang('mk'); setLangOpen(false); }} className={`w-full px-3 py-2.5 flex items-center justify-between text-gray-800 hover:bg-gray-50 ${lang==='mk' ? 'bg-gray-50' : ''}`}>
                  <span className="text-xs font-medium">Македонски</span>
                  <span className="text-[11px] font-semibold tracking-wide">MKD</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
