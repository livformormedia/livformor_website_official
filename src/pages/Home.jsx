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

export default function Home() {
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
    // Here you would typically send this to your backend/CRM
  };

  return (
    <div className="min-h-screen bg-white font-['Nunito_Sans'] overflow-x-hidden w-full max-w-full">
      <Navigation isScrolled={isScrolled} onOpenResourceForm={() => setIsResourceFormOpen(true)} />
      <HeroSection onOpenResourceForm={() => setIsResourceFormOpen(true)} />
      <FreeResourcesCTA onOpenResourceForm={() => setIsResourceFormOpen(true)} />
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
    </div>
  );
}