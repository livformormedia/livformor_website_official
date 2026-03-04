import React, { useEffect } from 'react';
import {
    Clock, CheckCircle, Star, Sparkles,
    Search, BarChart3, MapPin, FileText, Zap, ArrowRight
} from 'lucide-react';

const BRAND = {
    dark: '#0d3b40',
    teal: '#0f766e',
    tealLight: '#2dd4bf',
    gold: '#c5b896',
    goldDark: '#b5a882',
};

export default function ThankYouBasic() {
    useEffect(() => {
        document.title = 'Thank You! | LivForMor Media';
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', { content_name: 'Thank You - Basic' });
        }
    }, []);

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
            {/* ─── WHAT HAPPENS NEXT ─── */}
            <div style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24, padding: '32px 28px', maxWidth: 520, width: '100%',
                textAlign: 'center', marginBottom: 36,
                animation: 'fadeSlideIn 0.6s ease-out 0.35s backwards',
            }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 12 }}>
                    What Happens Next?
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 24 }}>
                    Our team is reviewing your information right now. If we see an opportunity to help your clinic grow,
                    we'll reach out within <strong style={{ color: BRAND.gold }}>24 hours</strong> with a personalized recommendation.
                </p>

                {[
                    'We review your clinic profile and market data',
                    'If there\'s a fit, we reach out with a custom plan',
                    'No pressure — just honest insights about your growth potential',
                ].map((item, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        marginBottom: 12, fontSize: 15, color: 'rgba(255,255,255,0.75)',
                        textAlign: 'left',
                    }}>
                        <CheckCircle size={18} color={BRAND.tealLight} style={{ flexShrink: 0, marginTop: 2 }} />
                        {item}
                    </div>
                ))}
            </div>

            {/* ─── FOLLOW US ─── */}
            <div style={{
                maxWidth: 520, width: '100%',
                textAlign: 'center',
                animation: 'fadeSlideIn 0.6s ease-out 0.45s backwards',
            }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 16 }}>
                    In the Meantime, Follow Us for Free Tips
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <a href="https://www.instagram.com/livformormedia" target="_blank" rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 50, padding: '10px 22px', fontSize: 14, fontWeight: 700,
                            color: 'white', textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}>
                        📸 Instagram
                    </a>
                    <a href="https://www.youtube.com/@LivForMorMedia" target="_blank" rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 50, padding: '10px 22px', fontSize: 14, fontWeight: 700,
                            color: 'white', textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}>
                        ▶️ YouTube
                    </a>
                </div>
            </div>

            {/* Footer */}
            <p style={{
                marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.3)',
                textAlign: 'center', maxWidth: 400,
            }}>
                <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                We only partner with clinics where we're confident we can deliver results.
            </p>
        </div>
    );
}
