import React, { useEffect } from 'react';

export default function StructuredData({ type = 'organization' }) {
  useEffect(() => {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Add structured data based on type
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    if (type === 'organization') {
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "LivForMor Media",
        "url": "https://livformor.com",
        "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png",
        "description": "Specialized marketing agency for mental health clinics. We help TMS, Ketamine, Spravato, and Psychedelic therapy clinics attract high-quality patients through proven strategies.",
        "founder": {
          "@type": "Person",
          "name": "Oriel Mor",
          "jobTitle": "Founder & CEO"
        },
        "sameAs": [
          "https://www.youtube.com/@LivForMorMedia"
        ],
        "areaServed": "US",
        "knowsAbout": [
          "TMS Clinic Marketing",
          "Ketamine Clinic Marketing",
          "Spravato Marketing",
          "Psychedelic Therapy Marketing",
          "Mental Health Clinic Advertising"
        ]
      });
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type]);

  return null;
}