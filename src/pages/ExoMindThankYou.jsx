import React, { useEffect } from 'react';
import { CheckCircle, Clock, Mail, Phone, ArrowRight } from 'lucide-react';

const BRAND = {
  dark: '#0d3b40',
  teal: '#0f766e',
  tealLight: '#2dd4bf',
  gold: '#c5b896',
  goldDark: '#b5a882',
  lightBg: '#f8f9fb',
  white: '#ffffff',
};

export default function ExoMindThankYou() {
  useEffect(() => {
    document.title = 'Thank You — ExoMind | LivForMor Media';

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'ExoMind Thank You' });
    }
  }, []);

  const nextSteps = [
    { num: '1', icon: <Mail size={18} />, text: 'Check your inbox for a confirmation email from our team.' },
    { num: '2', icon: <Phone size={18} />, text: 'A strategist will reach out within 24 hours to schedule your call.' },
    { num: '3', icon: <Clock size={18} />, text: 'Come prepared to discuss your clinic goals, patient volume, and market.' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(170deg, ${BRAND.dark} 0%, #0a3a3f 40%, ${BRAND.dark} 100%)`,
      fontFamily: "'Nunito Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
    }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ─── CHECK ICON ─── */}
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.tealLight})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        boxShadow: `0 8px 32px rgba(15,118,110,0.35)`,
        animation: 'checkPop 0.5s ease-out',
      }}>
        <CheckCircle size={40} color="white" />
      </div>

      {/* ─── HEADLINE ─── */}
      <h1 style={{
        fontSize: 'clamp(32px, 6vw, 48px)',
        fontWeight: 900,
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
        animation: 'fadeSlideIn 0.6s ease-out 0.1s backwards',
      }}>
        You're In.
      </h1>

      <p style={{
        fontSize: 20,
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
        maxWidth: 520,
        lineHeight: 1.6,
        marginBottom: 40,
        animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
      }}>
        Thank you for your interest in ExoMind. We received your information and our team is on it.
      </p>

      {/* ─── NEXT STEPS CARD ─── */}
      <div style={{
        maxWidth: 540,
        width: '100%',
        marginBottom: 40,
        animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: `2px solid ${BRAND.gold}40`,
          borderRadius: 24,
          padding: '32px 28px',
        }}>
          <h2 style={{
            fontSize: 22,
            fontWeight: 800,
            color: BRAND.gold,
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            What Happens Next
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {nextSteps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${BRAND.gold}25, ${BRAND.goldDark}25)`,
                  border: `1px solid ${BRAND.gold}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  fontWeight: 800,
                  color: BRAND.gold,
                }}>
                  {step.num}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <span style={{ fontSize: 17, color: 'white', fontWeight: 600, lineHeight: 1.5 }}>
                    {step.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BACK LINK ─── */}
      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: BRAND.tealLight,
          fontSize: 16,
          fontWeight: 700,
          textDecoration: 'none',
          animation: 'fadeSlideIn 0.6s ease-out 0.4s backwards',
        }}
      >
        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
        Back to LivForMor Media
      </a>

      {/* ─── FOOTER ─── */}
      <p style={{
        marginTop: 60,
        fontSize: 13,
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
      }}>
        ExoMind is a service of LivForMor Media.
      </p>
    </div>
  );
}
