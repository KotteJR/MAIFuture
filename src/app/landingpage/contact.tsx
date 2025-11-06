'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });
import EmailModal from '../components/EmailModal';
import { useLanguage } from '../components/LanguageProvider';

export default function Contact() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <section id="contact" className="bg-white md:py-24 py-12">
      <div className="max-w-7xl px-6 md:px-8 lg:px-12 mx-auto">
        {/* Intro */}
        <div className="mb-10 ">
          <h2 className="text-3xl lg:text-4xl leading-tight inline-block pb-1 bg-gradient-to-r from-[#BFE3F8] via-[#5FADEB] to-[#1D4ED8] bg-clip-text text-transparent" dangerouslySetInnerHTML={{ __html: t('contact.heading') }} />
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Stay Updated */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg text-black mb-2">{t('contact.cards.updates.title')}</h3>
            <p className="text-gray-600 mb-4">{t('contact.cards.updates.desc')}</p>
            <button onClick={openModal} className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
              {t('contact.cards.updates.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
          </div>

          {/* Support the Cause */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg text-black mb-2">{t('contact.cards.support.title')}</h3>
            <p className="text-gray-600 mb-4">{t('contact.cards.support.desc')}</p>
            <button onClick={openModal} className="inline-flex items-center gap-2 bg-white border border-gray-300 text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              {t('contact.cards.support.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
          </div>

          {/* General Inquiries */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg text-black mb-2">{t('contact.cards.general.title')}</h3>
            <p className="text-gray-600 mb-4">{t('contact.cards.general.desc')}</p>
            <button onClick={openModal} className="inline-flex items-center gap-2 bg-white border border-gray-300 text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              {t('contact.cards.general.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
          </div>
        </div>

        {/* Map card (React map, full size, centered on Skopje) */}
        <div className="relative rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="absolute -inset-6 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB] via-[#89BFE2] to-[#3B82F6] opacity-30 blur-3xl"></div>
          <div className="relative z-10 bg-white">
            <div className="p-0">
              <div className="w-full h-[420px] rounded-xl overflow-hidden">
                {/* React Leaflet Map */}
                <LeafletMap center={[41.9973, 21.4280]} zoom={5} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmailModal open={open} onClose={closeModal} email="ivana.karalieva@adamass.se" />
    </section>
  );
}
