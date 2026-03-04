import React, { useEffect } from 'react';
import {
    CheckCircle, Play, ArrowRight, Clock, Sparkles, AlertTriangle,
    FileText, Instagram, ExternalLink
} from 'lucide-react';

const BRAND = {
    dark: '#0d3b40',
    teal: '#0f766e',
    tealLight: '#2dd4bf',
    gold: '#c5b896',
    goldDark: '#b5a882',
};

const YOUTUBE_VIDEOS = [
    {
        title: "How to 3x Your Clinic's Lead Quality in Less Than 10 Minutes",
        description: 'Discover the fastest way to filter out tire-kickers and attract patients who actually convert.',
        url: 'https://www.youtube.com/watch?v=J4S0nqjbo30',
        duration: '10 min',
    },
    {
        title: 'Why Your Ketamine & TMS Ads Bring Bad Leads (The Belief Bridge Method)',
        description: 'Learn why most clinic ads fail — and the exact framework we use to fix it.',
        url: 'https://www.youtube.com/watch?v=V8y22fkfZWo',
        duration: '12 min',
    },
    {
        title: "Your Agency Is Lying About Why Campaigns Don't Work",
        description: "Here's what you need to look for so you never get burned again.",
        url: 'https://www.youtube.com/watch?v=3lbRBntR8h4',
        duration: '8 min',
    },
];

const INSTAGRAM_URL = 'https://www.instagram.com/livformormedia';

export default function ThankYouBooked() {
    useEffect(() => {
        document.title = "You're Booked! | LivForMor Media";

        const params = new URLSearchParams(window.location.search);
        const isQualified = params.get('q') === '1';

        if (isQualified) {
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Schedule', {
                    content_name: 'Strategy Call Booked',
                    content_category: 'Qualified',
                    value: 0,
                    currency: 'USD',
                });
            }
            try {
                const getCookie = (name) => {
                    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                    return match ? match[2] : '';
                };
                fetch('/api/fb-capi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event_name: 'Schedule',
                        fbc: getCookie('_fbc'),
                        fbp: getCookie('_fbp'),
                        client_ua: navigator.userAgent,
                        event_source_url: window.location.href,
                        content_name: 'Strategy Call Booked',
                        content_category: 'Qualified',
                        value: 0,
                        currency: 'USD',
                    }),
                });
            } catch (err) {
                console.error('CAPI Schedule error:', err);
            }
        }
    }, []);

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
                    0%, 100% { box-shadow: 0 0 20px rgba(45,212,191,0.3); }
                    50% { box-shadow: 0 0 40px rgba(45,212,191,0.6), 0 0 60px rgba(45,212,191,0.2); }
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

            {/* ─── SUCCESS ICON ─── */}
            <div style={{
                width: 90, height: 90, borderRadius: '50%',
                background: `linear-gradient(135deg, ${BRAND.tealLight}, #14b8a6)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28, boxShadow: `0 8px 32px rgba(45,212,191,0.4)`,
                animation: 'fadeSlideIn 0.6s ease-out, pulseGlow 3s ease-in-out infinite',
            }}>
                <CheckCircle size={48} color="white" />
            </div>

            {/* ─── HEADLINE ─── */}
            <h1 style={{
                fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900,
                color: 'white', textAlign: 'center', marginBottom: 12,
                animation: 'fadeSlideIn 0.6s ease-out 0.1s backwards',
            }}>
                You're <span style={{
                    background: `linear-gradient(90deg, ${BRAND.gold}, #e2d5b0, ${BRAND.gold})`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s linear infinite',
                }}>Confirmed!</span>
            </h1>

            <p style={{
                fontSize: 18, color: 'rgba(255,255,255,0.7)', textAlign: 'center',
                maxWidth: 560, marginBottom: 24, lineHeight: 1.7,
                animation: 'fadeSlideIn 0.6s ease-out 0.2s backwards',
            }}>
                Your strategy call is locked in. Check your email for confirmation details.
            </p>

            {/* ─── BLUEPRINT REMINDER CARD ─── */}
            <div style={{
                maxWidth: 580, width: '100%', marginBottom: 36,
                animation: 'fadeSlideIn 0.6s ease-out 0.25s backwards',
            }}>
                <div style={{
                    background: `linear-gradient(135deg, rgba(197,184,150,0.1), rgba(15,118,110,0.06))`,
                    border: `1px solid ${BRAND.gold}40`,
                    borderRadius: 18, padding: '24px 24px',
                    display: 'flex', alignItems: 'center', gap: 18,
                }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                        background: `linear-gradient(135deg, ${BRAND.gold}20, ${BRAND.goldDark}15)`,
                        border: `1px solid ${BRAND.gold}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <FileText size={24} color={BRAND.gold} />
                    </div>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                            Your Blueprint Is Being Finalized
                        </div>
                        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                            Your custom Patient Acquisition Blueprint — including competitor analysis, GMB insights,
                            and a full implementation plan — will be ready for your call.
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── PRE-CALL HOMEWORK ─── */}
            <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: `2px solid ${BRAND.gold}50`,
                borderRadius: 24, padding: '32px 28px', maxWidth: 600, width: '100%',
                marginBottom: 40,
                animation: 'fadeSlideIn 0.6s ease-out 0.3s backwards',
            }}>
                {/* Alert Banner */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))`,
                    border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14,
                    padding: '14px 18px', marginBottom: 24,
                }}>
                    <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24', lineHeight: 1.4 }}>
                        REQUIRED: Watch these before your call so you come prepared.
                        <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>
                            {' '}Clients who watch these close 3× faster.
                        </span>
                    </span>
                </div>

                <h2 style={{
                    fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8,
                    textAlign: 'center',
                }}>
                    <Sparkles size={18} style={{ display: 'inline', verticalAlign: 'middle', color: BRAND.gold, marginRight: 8 }} />
                    Your 3 Pre-Call Videos
                </h2>
                <p style={{
                    fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center',
                    marginBottom: 28, lineHeight: 1.5,
                }}>
                    These explain exactly how we work and why we're different.<br />
                    You'll walk into the call with total clarity.
                </p>

                {/* Video Cards */}
                {YOUTUBE_VIDEOS.map((video, i) => (
                    <a
                        key={i}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 16,
                            padding: '18px 20px', marginBottom: i < YOUTUBE_VIDEOS.length - 1 ? 12 : 0,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 16, textDecoration: 'none',
                            transition: 'all 0.25s ease',
                            cursor: 'pointer',
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = 'rgba(45,212,191,0.08)';
                            e.currentTarget.style.borderColor = `${BRAND.tealLight}40`;
                            e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        {/* Play Button */}
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                            background: `linear-gradient(135deg, ${BRAND.tealLight}30, ${BRAND.tealLight}10)`,
                            border: `2px solid ${BRAND.tealLight}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Play size={20} color={BRAND.tealLight} fill={BRAND.tealLight} />
                        </div>

                        {/* Text */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                                Video {i + 1}: {video.title}
                            </div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                                {video.description}
                            </div>
                        </div>

                        {/* Duration + Arrow */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                            <span style={{
                                fontSize: 12, color: 'rgba(255,255,255,0.4)',
                                display: 'flex', alignItems: 'center', gap: 4,
                            }}>
                                <Clock size={12} /> {video.duration}
                            </span>
                            <ArrowRight size={16} color={BRAND.tealLight} />
                        </div>
                    </a>
                ))}
            </div>

            {/* ─── INSTAGRAM CTA (Secondary) ─── */}
            <div style={{
                maxWidth: 520, width: '100%',
                animation: 'fadeSlideIn 0.6s ease-out 0.45s backwards',
                textAlign: 'center', marginBottom: 24,
            }}>
                <p style={{
                    fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 16, lineHeight: 1.6,
                }}>
                    Want daily clinic growth tips while you wait for your call?
                </p>
                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '14px 28px',
                        background: `linear-gradient(135deg, rgba(131,58,180,0.2), rgba(253,29,29,0.15), rgba(252,176,69,0.15))`,
                        border: '1px solid rgba(131,58,180,0.3)',
                        borderRadius: 14, textDecoration: 'none',
                        fontSize: 15, fontWeight: 700, color: 'white',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer',
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(131,58,180,0.2)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <Instagram size={20} />
                    Follow @livformormedia
                    <ExternalLink size={14} style={{ opacity: 0.6 }} />
                </a>
            </div>

            {/* ─── FOOTER ─── */}
            <p style={{
                marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)',
                textAlign: 'center', maxWidth: 440, lineHeight: 1.6,
            }}>
                <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                Total watch time: ~25 minutes. This is the difference between a productive call and a wasted one.
            </p>
        </div>
    );
}
