import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Gift, Sparkles, Flame, Star, AlertTriangle, CheckCircle } from 'lucide-react';

const BRAND = {
    dark: '#0b2b2e',
    teal: '#2dd4bf',
    gold: '#c5b896',
    goldDark: '#a89970',
};

const BOOKING_SLUG = 'livformor-intro-meeting0cpxof';
const CALENDAR_EMBED = `https://api.leadconnectorhq.com/widget/booking/${BOOKING_SLUG}`;

export default function ThankYouBasic() {
    const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 });

    // SEO — NO Lead pixel here
    useEffect(() => {
        document.title = 'Thank You! | LivForMor Media';

        // Track PageView only — intentionally NO Lead event
        // @ts-ignore
        if (typeof window !== 'undefined' && window.fbq) {
            // @ts-ignore
            window.fbq('track', 'ViewContent', { content_name: 'Thank You - Basic' });
        }
    }, []);

    // 48hr countdown timer
    useEffect(() => {
        const endTime = localStorage.getItem('livformor_basic_bonus_end');
        let target;
        if (endTime) {
            target = parseInt(endTime, 10);
        } else {
            target = Date.now() + 48 * 60 * 60 * 1000;
            localStorage.setItem('livformor_basic_bonus_end', target.toString());
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
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>

            {/* ─── ICON ─── */}
            <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24, boxShadow: `0 8px 32px rgba(197,184,150,0.3)`,
                animation: 'fadeSlideIn 0.6s ease-out',
            }}>
                <Star size={40} color="white" />
            </div>

            {/* ─── HEADLINE ─── */}
            <h1 style={{
                fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 900,
                color: 'white', textAlign: 'center', marginBottom: 12,
                animation: 'fadeSlideIn 0.6s ease-out 0.1s backwards',
            }}>
                One Last Step to <span style={{
                    background: `linear-gradient(90deg, ${BRAND.gold}, #e2d5b0, ${BRAND.gold})`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s linear infinite',
                }}>Secure Your Spot!</span>
            </h1>

            <p style={{
                fontSize: 18, color: 'rgba(255,255,255,0.7)', textAlign: 'center',
                maxWidth: 540, marginBottom: 16, lineHeight: 1.6,
                animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
            }}>
                We'd love to chat about how we can help your clinic grow.
                Book your Patient Generation Call below — let's explore the best path forward.
            </p>

            {/* ─── URGENCY ALERT ─── */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14,
                padding: '12px 20px', marginBottom: 32, maxWidth: 520, width: '100%',
                animation: 'fadeSlideIn 0.6s ease-out 0.25s backwards',
            }}>
                <AlertTriangle size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#fbbf24' }}>
                    Spots fill up fast — book now while availability lasts.
                </span>
            </div>

            {/* ─── BONUS CARD + COUNTDOWN ─── */}
            <div style={{
                background: 'rgba(255,255,255,0.06)', border: `2px solid ${BRAND.gold}40`,
                borderRadius: 24, padding: '28px 32px', maxWidth: 520, width: '100%',
                textAlign: 'center', marginBottom: 36,
                animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: `linear-gradient(135deg, ${BRAND.gold}20, ${BRAND.goldDark}20)`,
                    border: `1px solid ${BRAND.gold}30`, borderRadius: 50,
                    padding: '8px 18px', fontSize: 13, fontWeight: 700, color: BRAND.gold,
                    marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1,
                }}>
                    <Gift size={14} /> Limited Time Bonus
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>
                    <Flame size={20} style={{ display: 'inline', verticalAlign: 'middle', color: '#f59e0b', marginRight: 6 }} />
                    10 FREE Warm-Up Video Scripts
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
                    Book within 48 hours and we'll create scripts that warm up leads <em>before</em> they see your ads.
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
                animation: 'fadeSlideIn 0.6s ease-out 0.4s backwards',
            }}>
                <h3 style={{
                    fontSize: 20, fontWeight: 800, color: 'white', textAlign: 'center',
                    marginBottom: 20,
                }}>
                    <Sparkles size={18} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
                    Book Your Patient Generation Call Below
                </h3>

                <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}>
                    <iframe
                        src={CALENDAR_EMBED}
                        style={{
                            width: '100%', minHeight: 700, border: 'none',
                            background: 'white', borderRadius: 20,
                        }}
                        scrolling="no"
                        title="Book your call"
                    />
                </div>
            </div>

            {/* ─── WHAT YOU GET ─── */}
            <div style={{
                maxWidth: 520, width: '100%',
                animation: 'fadeSlideIn 0.6s ease-out 0.5s backwards',
            }}>
                <h3 style={{
                    fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 20,
                    textAlign: 'center',
                }}>
                    What Happens on the Call
                </h3>
                {[
                    'We audit your current patient acquisition strategy',
                    'You get a custom blueprint for your clinic\'s growth',
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

            {/* Footer */}
            <p style={{
                marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.3)',
                textAlign: 'center', maxWidth: 400,
            }}>
                <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                Calls are 15-20 minutes. No commitment required.
            </p>
        </div>
    );
}
