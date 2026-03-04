import React, { useState, useEffect } from 'react';
import {
    Calendar, Clock, Gift, Sparkles, Flame, Star, AlertTriangle, CheckCircle,
    Search, BarChart3, MapPin, FileText, Zap, ArrowRight
} from 'lucide-react';

const BRAND = {
    dark: '#0d3b40',
    teal: '#0f766e',
    tealLight: '#2dd4bf',
    gold: '#c5b896',
    goldDark: '#b5a882',
};

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/bookings/livformor-intro-meeting0cpxof';

export default function ThankYouBasic() {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 59, seconds: 59 });

    useEffect(() => {
        document.title = 'Thank You! | LivForMor Media';
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', { content_name: 'Thank You - Basic' });
        }
    }, []);

    // 1hr countdown timer
    useEffect(() => {
        const endTime = localStorage.getItem('livformor_basic_bonus_1hr_end');
        let target;
        if (endTime) {
            target = parseInt(endTime, 10);
        } else {
            target = Date.now() + 1 * 60 * 60 * 1000;
            localStorage.setItem('livformor_basic_bonus_1hr_end', target.toString());
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
        { icon: <FileText size={20} />, title: 'Custom Implementation Plan', desc: 'Step-by-step roadmap tailored to your clinic\'s growth potential' },
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
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
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
                maxWidth: 540, marginBottom: 32, lineHeight: 1.6,
                animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
            }}>
                We'd love to chat about how we can help your clinic grow.
                Book your call below — let's explore the best path forward.
            </p>

            {/* ═══ BLUEPRINT SURPRISE CARD ═══ */}
            <div style={{
                maxWidth: 580, width: '100%', marginBottom: 36,
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
                        <Zap size={13} /> Being Built for You Right Now
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(20px, 3.5vw, 26px)', fontWeight: 900,
                        color: 'white', marginBottom: 8, lineHeight: 1.3,
                    }}>
                        <Sparkles size={20} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
                        Your Custom Clinic Growth Report
                    </h2>

                    <p style={{
                        fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7,
                        marginBottom: 24, maxWidth: 500,
                    }}>
                        We're already analyzing your clinic and building a <strong style={{ color: 'white' }}>custom
                            research report</strong> — completely tailored to your practice. Book the call and we'll
                        walk through it together.
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.tealLight }}>
                                    Building your report
                                    <span style={{ animation: 'dotPulse 1.5s ease-in-out infinite' }}>...</span>
                                </span>
                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                                    Ready by call time
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

            {/* ─── URGENCY ALERT ─── */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14,
                padding: '12px 20px', marginBottom: 32, maxWidth: 520, width: '100%',
                animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
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
                animation: 'fadeSlideIn 0.6s ease-out 0.35s backwards',
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
                    10 FREE Organic Video Scripts On Top
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
                    Book in the next hour and you get 10 organic video scripts to warm up leads on your social media,
                    on top of everything else.
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

            {/* ─── BOOK CALL CTA ─── */}
            <div style={{
                maxWidth: 580, width: '100%', marginBottom: 40,
                animation: 'fadeSlideIn 0.6s ease-out 0.4s backwards',
                textAlign: 'center',
            }}>
                <h3 style={{
                    fontSize: 20, fontWeight: 800, color: 'white',
                    marginBottom: 20,
                }}>
                    <Sparkles size={18} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
                    Book Your Patient Generation Call Below
                </h3>

                <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                        padding: '20px 48px',
                        background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 800, fontSize: 18,
                        border: 'none', borderRadius: 16,
                        textDecoration: 'none', cursor: 'pointer',
                        boxShadow: `0 8px 32px rgba(197,184,150,0.35)`,
                        transition: 'all 0.3s ease',
                        animation: 'pulseGlow 3s ease-in-out infinite',
                        width: '100%', maxWidth: 440,
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(197,184,150,0.5)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(197,184,150,0.35)';
                    }}
                >
                    <Calendar size={22} />
                    Book Your Call Now
                    <ArrowRight size={20} />
                </a>
                <p style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 12,
                }}>
                    Takes 30 seconds — pick a time that works for you
                </p>
            </div>

            {/* ─── WHAT TO EXPECT ─── */}
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
                    'We walk through your Custom Clinic Growth Report together',
                    'You get a clear picture of where your clinic stands',
                    'We discuss the best growth path — tailored to you',
                    'You walk away with actionable insights either way',
                ].map((item, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        marginBottom: 14, fontSize: 15, color: 'rgba(255,255,255,0.75)',
                    }}>
                        <CheckCircle size={18} color={BRAND.tealLight} style={{ flexShrink: 0, marginTop: 2 }} />
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
