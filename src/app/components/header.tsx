'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
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
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-md">
        <div className="flex items-center gap-4">
            <div className="pr-8">
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
          <button className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <svg className="w-6 h-6 [shape-rendering:geometricPrecision]" fill="none" stroke="currentColor" viewBox="0 0 24 24" vectorEffect="non-scaling-stroke">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>

          {/* Features Icon */}
          <button className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <svg className="w-6 h-6 [shape-rendering:geometricPrecision]" fill="none" stroke="currentColor" viewBox="0 0 24 24" vectorEffect="non-scaling-stroke">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          {/* Contact Icon */}
          <button className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
            <svg className="w-6 h-6 [shape-rendering:geometricPrecision]" fill="none" stroke="currentColor" viewBox="0 0 24 24" vectorEffect="non-scaling-stroke">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
