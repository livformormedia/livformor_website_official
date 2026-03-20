import React, { useEffect } from 'react';
import { Brain, Zap, Target, TrendingUp, ArrowRight } from 'lucide-react';

const BRAND = {
  dark: '#0d3b40',
  teal: '#0f766e',
  tealLight: '#2dd4bf',
  gold: '#c5b896',
  goldDark: '#b5a882',
  lightBg: '#f8f9fb',
  white: '#ffffff',
};

const EXOMIND_FORM_URL = '/exomind-thank-you';

export default function ExoMindLanding() {
  useEffect(() => {
    document.title = 'ExoMind — Peak Brain Performance for Executives | LivForMor Media';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'ExoMind neurofeedback helps executives optimize brain performance, sharpen focus, and eliminate mental fatigue. Fill your clinic with high-value patients.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'ExoMind neurofeedback helps executives optimize brain performance, sharpen focus, and eliminate mental fatigue. Fill your clinic with high-value patients.';
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'ExoMind — Peak Brain Performance for Executives';
      document.head.appendChild(meta);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Neurofeedback marketing for clinics targeting executives. Proven patient acquisition strategies by LivForMor Media.';
      document.head.appendChild(meta);
    }
  }, []);

  const valueProps = [
    {
      icon: <Brain size={24} />,
      title: 'Neurofeedback That Delivers',
      desc: 'Clinically validated brain training protocols designed for high-performers who demand measurable results.',
    },
    {
      icon: <Target size={24} />,
      title: 'Sharper Focus, Faster Decisions',
      desc: 'Executives report sustained attention, reduced mental fatigue, and clearer decision-making within weeks.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Performance Without Burnout',
      desc: 'Optimize cognitive output without stimulants, sleep loss, or the crash cycle that derails most leaders.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Concierge-Level Experience',
      desc: 'Private sessions, personalized brain maps, and a protocol tailored to your executive patients\u2019 unique demands.',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(170deg, ${BRAND.dark} 0%, #0a3a3f 40%, ${BRAND.dark} 100%)`,
      fontFamily: "'Nunito Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 20px',
    }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <div style={{
        maxWidth: 720,
        width: '100%',
        textAlign: 'center',
        paddingTop: 'clamp(60px, 12vh, 120px)',
        paddingBottom: 48,
        animation: 'fadeSlideIn 0.6s ease-out',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: `linear-gradient(135deg, ${BRAND.gold}18, ${BRAND.goldDark}18)`,
          border: `1px solid ${BRAND.gold}35`,
          borderRadius: 50,
          padding: '8px 20px',
          fontSize: 13,
          fontWeight: 800,
          color: BRAND.gold,
          marginBottom: 28,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
        }}>
          <Brain size={14} /> ExoMind by LivForMor Media
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 56px)',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.15,
          marginBottom: 24,
        }}>
          Your Executive Patients Deserve a{' '}
          <span style={{
            background: `linear-gradient(90deg, ${BRAND.gold}, #e2d5b0, ${BRAND.gold})`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s linear infinite',
          }}>
            Sharper Brain
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(18px, 3vw, 22px)',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.6,
          maxWidth: 600,
          margin: '0 auto 40px',
        }}>
          ExoMind positions your neurofeedback clinic as the go-to brain optimization center for executives, founders, and high-performers in your market.
        </p>

        <a
          href={EXOMIND_FORM_URL}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
            color: BRAND.dark,
            fontSize: 18,
            fontWeight: 800,
            padding: '16px 36px',
            borderRadius: 14,
            textDecoration: 'none',
            boxShadow: `0 8px 32px rgba(197,184,150,0.3)`,
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(197,184,150,0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(197,184,150,0.3)';
          }}
        >
          Get Your ExoMind Strategy <ArrowRight size={18} />
        </a>
      </div>

      {/* ─── VALUE PROPS ─── */}
      <div style={{
        maxWidth: 720,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        paddingBottom: 60,
      }}>
        {valueProps.map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: '28px 24px',
              animation: `fadeSlideIn 0.6s ease-out ${0.15 + i * 0.1}s backwards`,
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${BRAND.teal}25, ${BRAND.teal}10)`,
              border: `1px solid ${BRAND.teal}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: BRAND.tealLight,
              marginBottom: 16,
            }}>
              {item.icon}
            </div>
            <h3 style={{
              fontSize: 20,
              fontWeight: 800,
              color: 'white',
              marginBottom: 8,
            }}>
              {item.title}
            </h3>
            <p style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ─── FOOTER ─── */}
      <p style={{
        paddingBottom: 40,
        fontSize: 13,
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
      }}>
        ExoMind is a service of LivForMor Media.
      </p>
    </div>
  );
}
