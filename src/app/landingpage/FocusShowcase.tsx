'use client';

import Image from 'next/image';
import { Users, Shield, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../components/LanguageProvider';

export default function FocusShowcase() {
  const { t } = useLanguage();
  const items = [
    { icon: Heart, title: t('focus.items.institutional.title'), description: t('focus.items.institutional.desc') },
    { icon: Users, title: t('focus.items.reach.title'), description: t('focus.items.reach.desc') },
    { icon: Globe, title: t('focus.items.scalability.title'), description: t('focus.items.scalability.desc') },
    { icon: Shield, title: t('focus.items.ai.title'), description: t('focus.items.ai.desc') },

  ];

  return (
    <section id="features" className="bg-white md:py-24 py-12">
      <div className="max-w-7xl px-6 md:px-8 lg:px-12 mx-auto">
        {/* Top split: copy left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center py-12">
          <div>
            <h2 className="mt-4 text-3xl sm:text-4xl tracking-tight inline-block pb-1 bg-gradient-to-r from-[#BFE3F8] via-[#5FADEB] to-[#1D4ED8] bg-clip-text text-transparent">{t('focus.heading')}</h2>
            <p className="mt-4 text-md text-gray-600 leading-relaxed max-w-lg text-justify">{t('focus.blurb')}</p>
          </div>
          <div className="relative w-full h-[300px] md:h-[360px] lg:h-[350px]">
            <div className="absolute -inset-8 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB]/80 via-[#89BFE2]/70 to-[#3B82F6]/70 opacity-50 blur-3xl"></div>
            <div className="relative z-10 rounded-md overflow-hidden w-full h-full">
              <Image src="/features1.png" alt="Radiology workstation showing CT lung cancer screening dashboard" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Icons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 py-10 md:mt-10">
          {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="flex flex-col text-left">
              <div className="h-12 w-12 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-md mt-3 text-gray-900">{title}</h3>
              <p className="text-sm md:text-md text-gray-600 mt-3 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


