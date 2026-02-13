import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Clock, Gift, ArrowRight, Sparkles, Flame } from 'lucide-react';

const BRAND = {
  dark: '#0b2b2e',
  teal: '#2dd4bf',
  gold: '#c5b896',
  goldDark: '#a89970',
};

const BOOKING_LINK = 'https://api.leadconnectorhq.com/widget/bookings/livformor-intro-meeting';

export default function ThankYou() {
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 });

  // SEO & Tracking
  useEffect(() => {
    document.title = "You're Almost In! | LivForMor Media";

    // Track PageView only — Lead event fires in form handler
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
      // @ts-ignore
      window.fbq('track', 'ViewContent', { content_name: 'Thank You - Qualified' });
    }
  }, []);

  // 48hr countdown timer
  useEffect(() => {
    const endTime = localStorage.getItem('livformor_bonus_end');
    let target;
    if (endTime) {
      target = parseInt(endTime, 10);
    } else {
      target = Date.now() + 48 * 60 * 60 * 1000;
      localStorage.setItem('livformor_bonus_end', target.toString());
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

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${BRAND.dark} 0%, #0a3a3f 30%, ${BRAND.dark} 100%)`,
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
            `}</style>

      {/* Success Icon */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: `linear-gradient(135deg, ${BRAND.teal}, #14b8a6)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, boxShadow: `0 8px 32px rgba(45,212,191,0.3)`,
        animation: 'fadeSlideIn 0.6s ease-out',
      }}>
        <CheckCircle size={40} color="white" />
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900,
        color: 'white', textAlign: 'center', marginBottom: 12,
        animation: 'fadeSlideIn 0.6s ease-out 0.1s backwards',
      }}>
        You're Almost In — <span style={{ color: BRAND.gold }}>One Last Step!</span>
      </h1>

      <p style={{
        fontSize: 18, color: 'rgba(255,255,255,0.7)', textAlign: 'center',
        maxWidth: 540, marginBottom: 40, lineHeight: 1.6,
        animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
      }}>
        You've been pre-qualified for our program. Book your strategy call below to lock in your spot and claim your bonus.
      </p>

      {/* ─── BONUS CARD ─── */}
      <div style={{
        background: 'rgba(255,255,255,0.06)', border: `2px solid ${BRAND.gold}40`,
        borderRadius: 24, padding: '32px 36px', maxWidth: 520, width: '100%',
        textAlign: 'center', marginBottom: 40,
        animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: `linear-gradient(135deg, ${BRAND.gold}20, ${BRAND.goldDark}20)`,
          border: `1px solid ${BRAND.gold}30`, borderRadius: 50,
          padding: '8px 18px', fontSize: 13, fontWeight: 700, color: BRAND.gold,
          marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1,
        }}>
          <Gift size={14} /> Limited Time Bonus
        </div>

        <h2 style={{
          fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8,
        }}>
          <Flame size={20} style={{ display: 'inline', verticalAlign: 'middle', color: '#f59e0b', marginRight: 6 }} />
          10 FREE Organic Video Scripts
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
          Book within 48 hours to get scripts that warm up leads <em>before</em> they see your ads.
        </p>

        {/* Countdown */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24,
        }}>
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

        <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
          color: BRAND.dark, border: 'none', borderRadius: 50,
          padding: '16px 36px', fontSize: 17, fontWeight: 800,
          textDecoration: 'none', cursor: 'pointer',
          animation: 'pulseGlow 2.5s ease-in-out infinite',
          transition: 'transform 0.2s',
        }}
          onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Calendar size={18} /> Book My Strategy Call Now <ArrowRight size={16} />
        </a>
      </div>

      {/* ─── WHAT TO EXPECT ─── */}
      <div style={{
        maxWidth: 520, width: '100%',
        animation: 'fadeSlideIn 0.6s ease-out 0.4s backwards',
      }}>
        <h3 style={{
          fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 20,
          textAlign: 'center',
        }}>
          <Sparkles size={16} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
          What Happens on the Call
        </h3>
        {[
          'We audit your current patient acquisition strategy',
          'You get a custom blueprint for 10-15 patients/month',
          'We discuss if we\'re the right fit — zero pressure',
          'You walk away with actionable insights either way',
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            marginBottom: 14, fontSize: 15, color: 'rgba(255,255,255,0.75)',
          }}>
            <CheckCircle size={18} color={BRAND.teal} style={{ flexShrink: 0, marginTop: 2 }} />
            {item}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p style={{
        marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.3)',
        textAlign: 'center', maxWidth: 400,
      }}>
        <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
        Calls are 15-20 minutes. Pick a time that works for you.
      </p>
    </div>
  );
}