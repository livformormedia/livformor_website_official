import React, { useState, useEffect } from 'react';
import {
  CheckCircle, Clock, Gift, Sparkles, Flame, 
  Search, BarChart3, MapPin, FileText, Zap, ArrowRight, Calendar
} from 'lucide-react';

const BRAND = {
  dark: '#0d3b40',
  teal: '#0f766e',
  tealLight: '#2dd4bf',
  gold: '#c5b896',
  goldDark: '#b5a882',
  lightBg: '#f8f9fb',
  white: '#ffffff',
};

const GHL_IFRAME_SRC = 'https://api.leadconnectorhq.com/widget/booking/h80MYRBTDN9NXYcqvZ9E';

export default function ExoMindThankYou() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 59, seconds: 59 });

  // SEO & Tracking
  useEffect(() => {
    document.title = "You're Almost In! | ExoMind Growth — LivForMor Media";
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: 'ExoMind Thank You - Qualified' });
    }
    // Load GHL form_embed.js for calendar widget
    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://link.msgsndr.com/js/form_embed.js';
      s.type = 'text/javascript';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // 1hr countdown timer
  useEffect(() => {
    const endTime = localStorage.getItem('exomind_grow_bonus_1hr_end');
    let target;
    if (endTime) {
      target = parseInt(endTime, 10);
    } else {
      target = Date.now() + 1 * 60 * 60 * 1000;
      localStorage.setItem('exomind_grow_bonus_1hr_end', target.toString());
    }
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const blueprintItems = [
    { icon: <Search size={20} />, title: 'Clinic Strengths & Weaknesses', desc: 'Deep audit of your current marketing, website, and patient journey' },
    { icon: <BarChart3 size={20} />, title: 'Competitor Intelligence', desc: 'What your top competitors are doing — ads, messaging, positioning' },
    { icon: <MapPin size={20} />, title: 'Market Opportunity Analysis', desc: 'Local demand signals, search volume, and untapped ExoMind patient pools' },
    { icon: <FileText size={20} />, title: 'Custom Implementation Plan', desc: 'Step-by-step roadmap to predictable ExoMind patient flow for YOUR clinic' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(170deg, ${BRAND.dark} 0%, #0a3a3f 40%, ${BRAND.dark} 100%)`,
      fontFamily: "'Nunito Sans', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 20px 60px',
    }}>
      <style>{`
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 20px rgba(197,184,150,0.3); }
                    50% { box-shadow: 0 0 40px rgba(197,184,150,0.6), 0 0 60px rgba(197,184,150,0.2); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes buildProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes dotPulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>

      {/* Logo */}
      <img src="/images/LivForMorMediaLogo.png" alt="LivForMor Media"
        style={{ height: 44, marginBottom: 32, opacity: 0.9 }} />

      {/* ─── GREEN CONFIRMATION ─── */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: 50, padding: '10px 24px', marginBottom: 28,
        animation: 'fadeSlideIn 0.5s ease-out',
      }}>
        <CheckCircle size={20} color="#22c55e" />
        <span style={{ fontSize: 15, fontWeight: 700, color: '#22c55e', letterSpacing: 0.5 }}>
          Application Received — You're Not Done Yet
        </span>
      </div>

      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: 'white',
        textAlign: 'center', lineHeight: 1.2, marginBottom: 12, maxWidth: 560,
        animation: 'fadeSlideIn 0.5s ease-out 0.1s backwards',
      }}>
        One More Step Before We Can Build Your Plan
      </h1>

      <p style={{
        fontSize: 18, color: 'rgba(255,255,255,0.65)', textAlign: 'center',
        maxWidth: 460, marginBottom: 36, lineHeight: 1.6,
        animation: 'fadeSlideIn 0.5s ease-out 0.15s backwards',
      }}>
        Book your strategy call below. This is where we walk you through your custom ExoMind growth plan — live, on the call.
      </p>


      {/* ─── RESEARCH BUILDING CARD ─── */}
      <div style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, padding: '28px 32px', maxWidth: 520, width: '100%',
        marginBottom: 36,
        animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards, pulseGlow 3s ease-in-out infinite',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        }}>
          <Sparkles size={20} color={BRAND.gold} />
          <span style={{ fontSize: 14, fontWeight: 700, color: BRAND.gold, textTransform: 'uppercase', letterSpacing: 1 }}>
            Building Your Custom Report
          </span>
          <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: '50%', background: BRAND.gold,
                animation: `dotPulse 1.2s ease-in-out ${i * 0.3}s infinite`,
              }} />
            ))}
          </div>
        </div>

        <div style={{
          height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', marginBottom: 24,
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.tealLight})`,
            animation: 'buildProgress 12s ease-in-out infinite',
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {blueprintItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '12px 14px', borderRadius: 12,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ color: BRAND.gold, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ─── NEXT STEPS ─── */}
      <div style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, padding: '28px 32px', maxWidth: 520, width: '100%',
        marginBottom: 36,
        animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 16 }}>
          <Zap size={16} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
          What Happens Next
        </h3>
        {[
          { num: '1', text: 'Book your strategy call below (15–20 min)' },
          { num: '2', text: 'We research your market, competitors & opportunities' },
          { num: '3', text: 'On the call, we walk you through your custom plan — live' },
        ].map((step, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: i < 2 ? 12 : 0,
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 13, fontWeight: 800,
              background: `linear-gradient(135deg, ${BRAND.gold}30, ${BRAND.goldDark}30)`,
              color: BRAND.gold, flexShrink: 0,
            }}>{step.num}</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
              {step.text}
            </p>
          </div>
        ))}

        {/* Mutual commitment */}
        <div style={{
          marginTop: 20,
          background: `rgba(197,184,150,0.1)`, padding: '16px 20px',
          borderRadius: 12, borderLeft: `4px solid ${BRAND.gold}`
        }}>
          <p style={{ fontSize: 15, color: BRAND.gold, lineHeight: 1.5, fontWeight: 700, margin: 0 }}>
            If you show up without reviewing your report, we will end the call and rebook you. This only works if we both come prepared.
          </p>
        </div>
      </div>


      {/* ─── BONUS: 10 SCRIPTS ─── */}
      <div style={{
        background: 'rgba(255,255,255,0.06)', border: `2px solid ${BRAND.gold}40`,
        borderRadius: 24, padding: '28px 32px', maxWidth: 520, width: '100%',
        textAlign: 'center', marginBottom: 36,
        animation: 'fadeSlideIn 0.6s ease-out 0.4s backwards',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: `linear-gradient(135deg, ${BRAND.gold}20, ${BRAND.goldDark}20)`,
          border: `1px solid ${BRAND.gold}30`, borderRadius: 50,
          padding: '8px 18px', fontSize: 13, fontWeight: 700, color: BRAND.gold,
          marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1,
        }}>
          <Gift size={14} /> Bonus
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 900, color: 'white', marginBottom: 12 }}>
          <Flame size={24} style={{ display: 'inline', verticalAlign: 'middle', color: '#f59e0b', marginRight: 8 }} />
          10 FREE Organic Video Scripts
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 24, lineHeight: 1.6 }}>
          Book within the next hour <strong style={{ color: 'white' }}>and</strong> show up prepared —
          and we'll send you 10 proven video scripts to warm up leads on your social media.
        </p>

        {/* Countdown */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {[
            { val: pad(timeLeft.hours), label: 'Hours' },
            { val: pad(timeLeft.minutes), label: 'Minutes' },
            { val: pad(timeLeft.seconds), label: 'Seconds' },
          ].map((t, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 36, fontWeight: 900, color: BRAND.gold,
                fontFeatureSettings: '"tnum"', fontVariantNumeric: 'tabular-nums',
                lineHeight: 1.2,
              }}>{t.val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── EMBEDDED CALENDAR ─── */}
      <div style={{
        maxWidth: 660, width: '100%', marginBottom: 40,
        animation: 'fadeSlideIn 0.6s ease-out 0.45s backwards',
      }}>
        <h3 style={{
          fontSize: 20, fontWeight: 800, color: 'white', textAlign: 'center',
          marginBottom: 20,
        }}>
          <Calendar size={18} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
          Book Your Strategy Call Below
        </h3>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          <iframe
            src={GHL_IFRAME_SRC}
            style={{
              width: '100%', minHeight: 700, border: 'none',
              overflow: 'hidden',
            }}
            scrolling="no"
            id="exomind_grow_calendar_embed"
            title="Book your ExoMind strategy call"
          />
        </div>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.3)',
        textAlign: 'center', maxWidth: 400,
      }}>
        <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
        Calls are 15-20 minutes. Pick a time that works for you.
      </p>
    </div>
  );
}
