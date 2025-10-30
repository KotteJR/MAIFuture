'use client';

import { Users, Shield, Heart, Globe } from 'lucide-react';
import { useEffect } from 'react';
import ScrollWordReveal from '../components/ScrollWordReveal';


export default function About() {

  useEffect(() => {}, []);

  return (
    <section className="bg-white md:pb-12 pb-6">
      <div className="max-w-7xl px-6 md:px-8 lg:px-12 mx-auto">

        <h2 className="text-4xl lg:text-5xl font-italic text-black leading-tight mb-6">
        Why this matters
          </h2>

        {/* Intro Paragraph with Scroll Fill Effect */}
          <div className="">
            <div className="max-w-7xl mx-auto">
              <ScrollWordReveal
                className="text-justify text-xl leading-[1.85] md:text-2xl md:leading-[2]"
                text={`Early detection of lung cancer can increase survival rates by up to 90%. Our AI‑powered solution will make screening more accessible, accurate, and efficient.\n\n"From Risk To Relief" — our mission is to transform lives through technology. We are working on a groundbreaking solution to establish the clinical, operational, and technological foundation for AI‑powered lung cancer screening in North Macedonia. Our comprehensive approach will transform early detection and save lives through innovative technology.\n\nWe are building a clinically robust and operationally scalable program for AI‑assisted lung cancer screening in North Macedonia. We combine standardized data capture, privacy‑first cloud infrastructure, and validated diagnostic models to help clinicians identify risk earlier, reduce time‑to‑diagnosis, and deliver confident care—moving people from risk to relief.\n\nWe’re preparing a comprehensive solution that providers can launch and scale with minimal setup: secure data workflows, clinician‑friendly review tools, and continuous model improvement informed by real‑world use. Be the first to know when we go live and help us make advanced screening the standard of care across the region.`}
              />
            </div>
          </div>
      </div>
    </section>
  );
}
