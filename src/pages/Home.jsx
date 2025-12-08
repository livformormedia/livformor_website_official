import React, { useState, useEffect } from 'react';

import Navigation from '../components/home/Navigation';
import HeroSection from '../components/home/HeroSection';
import FreeResourcesCTA from '../components/home/FreeResourcesCTA';
import YouTubeSection from '../components/home/YouTubeSection';
import CareFramework from '../components/home/CareFramework';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FounderSection from '../components/home/FounderSection';
import FAQ from '../components/home/FAQ';
import Footer from '../components/home/Footer';
import ResourceFormModal from '../components/home/ResourceFormModal';
import FloatingCTA from '../components/home/FloatingCTA';

export default function Home() {
  // SEO
  useEffect(() => {
    document.title = 'LivForMor Media - Mental Health Clinic Marketing Experts | TMS, Ketamine, Spravato';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Specialized marketing agency for mental health clinics. We help TMS, Ketamine, Spravato, and Psychedelic therapy clinics attract high-quality patients through proven strategies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Specialized marketing agency for mental health clinics. We help TMS, Ketamine, Spravato, and Psychedelic therapy clinics attract high-quality patients through proven strategies.';
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'TMS clinic marketing, Ketamine clinic marketing, Spravato marketing, psychedelic therapy marketing, mental health clinic advertising, patient acquisition';
      document.head.appendChild(meta);
    }
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const openResourceForm = () => setIsResourceFormOpen(true);

  return (
    <div className="min-h-screen bg-white font-['Nunito_Sans'] overflow-x-hidden">
      <Navigation isScrolled={isScrolled} onOpenResourceForm={openResourceForm} />
      <HeroSection onOpenResourceForm={openResourceForm} />
      <FreeResourcesCTA onOpenResourceForm={openResourceForm} />
      <YouTubeSection />
      <CareFramework />
      <WhyChooseUs />
      <FounderSection />
      <FAQ />
      <Footer />
      
      <ResourceFormModal 
        isOpen={isResourceFormOpen}
        onClose={() => setIsResourceFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
      
      <FloatingCTA onOpenResourceForm={openResourceForm} />
    </div>
  );
}