'use client';

import { Users, Shield, Heart, Globe } from 'lucide-react';
import { useEffect } from 'react';
import ScrollWordReveal from '../components/ScrollWordReveal';
import { useLanguage } from '../components/LanguageProvider';


export default function About() {
  const { t } = useLanguage();

  useEffect(() => {}, []);

  return (
    <section id="about" className="bg-white md:pb-12">
      <div className="max-w-7xl px-6 md:px-8 lg:px-12 mx-auto">

        <h1 className="text-3xl lg:text-5xl font-italic leading-tight inline-block pb-1 mb-6 bg-gradient-to-r from-[#BFE3F8] via-[#5FADEB] to-[#1D4ED8] bg-clip-text text-transparent">{t('about.heading')}</h1>

        {/* Intro Paragraph with Scroll Fill Effect */}
          <div className="">
            <div className="max-w-7xl mx-auto">
              <ScrollWordReveal
                className="text-justify text-lg leading-[1.85] md:text-2xl md:leading-[2]"
                text={t('about.body')}
              />
            </div>
          </div>
      </div>
    </section>
  );
}
