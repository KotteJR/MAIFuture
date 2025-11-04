'use client';

import { Users, Shield, Heart, Globe } from 'lucide-react';
import { useEffect } from 'react';
import ScrollWordReveal from '../components/ScrollWordReveal';


export default function About() {

  useEffect(() => {}, []);

  return (
    <section id="about" className="bg-white md:pb-12">
      <div className="max-w-7xl px-6 md:px-8 lg:px-12 mx-auto">

        <h2 className="text-3xl lg:text-5xl font-italic leading-tight inline-block pb-1 mb-6 bg-gradient-to-r from-[#BFE3F8] via-[#5FADEB] to-[#1D4ED8] bg-clip-text text-transparent">
        Why this matters
          </h2>

        {/* Intro Paragraph with Scroll Fill Effect */}
          <div className="">
            <div className="max-w-7xl mx-auto">
              <ScrollWordReveal
                className="text-justify text-lg leading-[1.85] md:text-2xl md:leading-[2]"
                text={`Lung cancer remains one of the most challenging diseases in the region, with late diagnosis contributing to high mortality rates. Increasing access to structured screening programs can improve early identification and dramatically elevate survival outcomes. \n\nMAI Future is developing an integrated lung-screening platform designed to support clinicians in identifying early signs of lung disease with enhanced efficiency, accuracy, and diagnostic confidence. \n\nOur approach unites advanced imaging technology, standardized assessment protocols, and secure data infrastructure to strengthen public-health outcomes in North Macedonia. We are building a clinically driven and operationally scalable framework for AI-supported lung-cancer screening, designed in collaboration with regional health stakeholders.  \n\nThe platform combines structured CT-scan workflows, privacy-first medical cloud infrastructure, and validated imaging-support tools to help accelerate clinical decisions and shorten time-to-care. Our end-to-end system will enable seamless adoption in hospitals and diagnostic centers, offering secure data processing, clinician-focused review tools, and continuous performance refinement informed by real-world practice.  \n\nJoin our waitlist to stay informed as we bring advanced lung-screening innovation to healthcare institutions across the region.`}
              />
            </div>
          </div>
      </div>
    </section>
  );
}
