import React, { useState, useEffect } from 'react';
import {
  CheckCircle, Clock, Gift, Sparkles, Flame, AlertTriangle,
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

export default function ThankYou() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 59, seconds: 59 });

  // SEO & Tracking
  useEffect(() => {
    document.title = "You're Almost In! | LivForMor Media";
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: 'Thank You - Qualified' });
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
    const endTime = localStorage.getItem('livformor_qualified_bonus_1hr_end');
    let target;
    if (endTime) {
      target = parseInt(endTime, 10);
    } else {
      target = Date.now() + 1 * 60 * 60 * 1000;
      localStorage.setItem('livformor_qualified_bonus_1hr_end', target.toString());
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
    { icon: <MapPin size={20} />, title: 'Google Business Profile Analysis', desc: 'Your GMB performance, review signals, and local SEO gaps' },
    { icon: <FileText size={20} />, title: 'Custom Implementation Plan', desc: 'Step-by-step roadmap to 10-15 new patients/month for YOUR clinic' },
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

      {/* ─── "YOU'RE NOT DONE YET" HOOK ─── */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, boxShadow: `0 8px 32px rgba(197,184,150,0.3)`,
        animation: 'fadeSlideIn 0.6s ease-out',
      }}>
        <AlertTriangle size={38} color="white" />
      </div>

      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900,
        color: 'white', textAlign: 'center', marginBottom: 12,
        animation: 'fadeSlideIn 0.6s ease-out 0.1s backwards',
      }}>
        Wait — <span style={{
          background: `linear-gradient(90deg, ${BRAND.gold}, #e2d5b0, ${BRAND.gold})`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 3s linear infinite',
        }}>You're Not Done Yet</span>
      </h1>

      <p style={{
        fontSize: 18, color: 'rgba(255,255,255,0.85)', textAlign: 'center',
        maxWidth: 540, marginBottom: 8, lineHeight: 1.6,
        animation: 'fadeSlideIn 0.6s ease-out 0.15s backwards',
        fontWeight: 600,
      }}>
        We have a surprise for you.
      </p>
      <p style={{
        fontSize: 16, color: 'rgba(255,255,255,0.55)', textAlign: 'center',
        maxWidth: 520, marginBottom: 36, lineHeight: 1.7,
        animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
      }}>
        Our team is currently building an extensive, custom market research report — built from scratch, specifically for <strong style={{ color: 'white' }}>your clinic</strong>. Here's what's inside:
      </p>

      {/* ═══ MARKET RESEARCH PLAN CARD ═══ */}
      <div style={{
        maxWidth: 580, width: '100%', marginBottom: 32,
        animation: 'fadeSlideIn 0.6s ease-out 0.25s backwards',
      }}>
        <div style={{
          background: `linear-gradient(135deg, rgba(197,184,150,0.08), rgba(15,118,110,0.06))`,
          border: `2px solid ${BRAND.gold}50`,
          borderRadius: 24, padding: '32px 28px', position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}>
          {/* Corner accent */}
          <div style={{
            position: 'absolute', top: -1, right: -1, width: 80, height: 80,
            background: `linear-gradient(225deg, ${BRAND.gold}20 0%, transparent 60%)`,
            borderBottomLeftRadius: 60,
          }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `linear-gradient(135deg, ${BRAND.gold}18, ${BRAND.goldDark}18)`,
            border: `1px solid ${BRAND.gold}35`, borderRadius: 50,
            padding: '8px 18px', fontSize: 12, fontWeight: 800, color: BRAND.gold,
            marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1.5,
          }}>
            <Zap size={13} /> Your Custom Market Research
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(20px, 3.5vw, 26px)', fontWeight: 900,
            color: 'white', marginBottom: 8, lineHeight: 1.3,
          }}>
            <Sparkles size={20} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
            Custom Clinic Growth Report
          </h2>

          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7,
            marginBottom: 24, maxWidth: 500,
          }}>
            This isn't a generic PDF. We're building a <strong style={{ color: 'white' }}>deep, personalized analysis</strong> of your clinic,
            your competitors, and your market — from scratch.
          </p>

          {/* Blueprint Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {blueprintItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `linear-gradient(135deg, ${BRAND.teal}25, ${BRAND.teal}10)`,
                  border: `1px solid ${BRAND.teal}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: BRAND.tealLight,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 3 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            background: 'rgba(255,255,255,0.06)', borderRadius: 10,
            padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginBottom: 8,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.tealLight }}>
                  Building your report
                  <span style={{ animation: 'dotPulse 1.5s ease-in-out infinite' }}>...</span>
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  Ready in a few hours
                </span>
              </div>
              <div style={{
                height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 4,
                  background: `linear-gradient(90deg, ${BRAND.teal}, ${BRAND.tealLight})`,
                  animation: 'buildProgress 4s ease-out forwards',
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ IMPORTANT: HOW YOU'LL RECEIVE IT ═══ */}
      <div style={{
        maxWidth: 560, width: '100%', marginBottom: 32,
        animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
      }}>
        <div style={{
          background: 'rgba(245,158,11,0.08)',
          border: '2px solid rgba(245,158,11,0.25)',
          borderRadius: 20, padding: '28px 24px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          }}>
            <AlertTriangle size={20} color="#f59e0b" />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 1 }}>
              Important — Read This
            </span>
          </div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 14 }}>
              Your custom report will be ready in the <strong style={{ color: 'white' }}>next few hours</strong>.
              Here's how you'll get it:
            </p>
            <div style={{ paddingLeft: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { num: '1', text: "We\u2019ll send you an SMS when it\u2019s ready" },
                { num: '2', text: 'The SMS will tell you to check your email' },
                { num: '3', text: <><strong style={{ color: 'white' }}>Reply to the email</strong> to confirm you received it — that's the only way we know you got it</> },
              ].map((step) => (
                <div key={step.num} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${BRAND.gold}30, ${BRAND.goldDark}30)`,
                    border: `1px solid ${BRAND.gold}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, color: BRAND.gold,
                  }}>{step.num}</div>
                  <span style={{ paddingTop: 3 }}>{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MUTUAL COMMITMENT ═══ */}
      <div style={{
        maxWidth: 560, width: '100%', marginBottom: 36,
        animation: 'fadeSlideIn 0.6s ease-out 0.35s backwards',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '28px 24px',
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 14 }}>
            🤝 This Is a Two-Way Street
          </h3>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 16,
          }}>
            We're putting real time and effort into building this report for you — competitor data, market gaps,
            custom recommendations. All of it specific to your clinic.
          </p>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 16,
          }}>
            In return, we ask one thing: <strong style={{ color: 'white' }}>go through the report before the call</strong>.
            Not because we're better than anyone — but because this only works if we're both prepared.
            If we're going to spend time on your market together, you should come knowing what's in there.
          </p>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontStyle: 'italic',
          }}>
            If you show up without reviewing it, we won't be able to give you the full value of the call.
            It's not about gatekeeping — it's about making sure <em>your</em> time is well spent too.
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

        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>
          <Flame size={20} style={{ display: 'inline', verticalAlign: 'middle', color: '#f59e0b', marginRight: 6 }} />
          10 FREE Organic Video Scripts
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
          Book within the next hour <strong style={{ color: 'rgba(255,255,255,0.85)' }}>and</strong> actually show up to the call prepared —
          and we'll send you 10 organic video scripts to warm up leads on your social media. On top of everything else.
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
          Book Your Call Below
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
            id="h80MYRBTDN9NXYcqvZ9E_embed"
            title="Book your strategy call"
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