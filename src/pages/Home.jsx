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
      meta.content = 'TMS clinic marketing, ketamine clinic marketing, spravato marketing, psychedelic therapy marketing, mental health clinic advertising, patient acquisition, clinic growth';
      document.head.appendChild(meta);
    }

    // Robots meta
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'index, follow';
      document.head.appendChild(meta);
    }

    // Author meta
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      const meta = document.createElement('meta');
      meta.name = 'author';
      meta.content = 'LivForMor Media';
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'LivForMor Media - Mental Health Clinic Marketing Experts';
      document.head.appendChild(meta);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Specialized marketing for TMS, Ketamine, Spravato & Psychedelic Therapy clinics. Proven patient acquisition strategies.';
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      meta.content = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png';
      document.head.appendChild(meta);
    }

    // Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      const meta = document.createElement('meta');
      meta.name = 'twitter:card';
      meta.content = 'summary_large_image';
      document.head.appendChild(meta);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'LivForMor Media - Mental Health Clinic Marketing';
      document.head.appendChild(meta);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      meta.content = 'Specialized marketing for TMS, Ketamine, Spravato & Psychedelic Therapy clinics.';
      document.head.appendChild(meta);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      const meta = document.createElement('meta');
      meta.name = 'twitter:image';
      meta.content = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png';
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

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
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
      <div id="youtube">
        <YouTubeSection />
      </div>
      <div id="care">
        <CareFramework />
      </div>
      <WhyChooseUs />
      <div id="about">
        <FounderSection />
      </div>
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