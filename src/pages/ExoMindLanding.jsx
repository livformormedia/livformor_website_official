import React, { useState, useEffect, useRef } from 'react';
import {
    CheckCircle, XCircle, ChevronDown, ArrowRight,
    ShieldCheck, X, ChevronRight, ArrowLeft,
    Users, Target, Zap, TrendingUp,
    Award, Lightbulb, Heart, HelpCircle,
    Brain, Eye, Crosshair, ChevronUp,
    AlertTriangle, BarChart3, Megaphone
} from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────
const LOGO_URL = '/images/LivForMorMediaLogo.png';
const FOUNDER_IMAGE = '/oriel-founder.jpg';
const TREATMENT_IMAGE = '/exomind-treatment.jpg';

const BRAND = {
    dark: '#0d3b40',
    teal: '#0f766e',
    gold: '#c5b896',
    goldDark: '#b5a882',
    lightBg: '#f8f9fb',
    white: '#ffffff',
};

// ─── UTM Capture ───────────────────────────────────────────
function getUTMParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_content: params.get('utm_content') || '',
        utm_term: params.get('utm_term') || '',
        fbclid: params.get('fbclid') || '',
        gclid: params.get('gclid') || '',
    };
}

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ─── Animated Section Wrapper ──────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            ...style,
        }}>
            {children}
        </div>
    );
}


// ═══════════════════════════════════════════════════════════
// A.I.M. ANIMATED SVG DIAGRAM (from opt-in page)
// ═══════════════════════════════════════════════════════════
function AIMDiagram() {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 0, margin: '0 auto 40px', maxWidth: 580,
        }}>
            {['A', 'I', 'M'].map((letter, i) => {
                const labels = ['Audience', 'Intent', 'Mindset'];
                return (
                    <React.Fragment key={letter}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 110, height: 110, borderRadius: '50%',
                                background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12), rgba(255,255,255,0.03) 60%, transparent)',
                                border: '1.5px solid rgba(197,184,150,0.45)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backdropFilter: 'blur(6px)',
                                boxShadow: '0 0 20px rgba(197,184,150,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
                            }}>
                                <span style={{
                                    fontSize: 38, fontWeight: 900, lineHeight: 1,
                                    background: `linear-gradient(135deg, ${BRAND.gold}, #d4c9a8)`,
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>{letter}</span>
                            </div>
                            <span style={{
                                fontSize: 11, fontWeight: 800, letterSpacing: 2.5,
                                textTransform: 'uppercase', color: BRAND.gold, opacity: 0.75,
                            }}>{labels[i]}</span>
                        </div>
                        {i < 2 && (
                            <div style={{ display: 'flex', alignItems: 'center', margin: '0 -4px', marginBottom: 22 }}>
                                <svg viewBox="0 0 40 20" fill="none" style={{ width: 40, height: 20 }}>
                                    <line x1="4" y1="10" x2="30" y2="10" stroke="rgba(197,184,150,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                                    <polygon points="28,6 36,10 28,14" fill="rgba(197,184,150,0.5)" />
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

function AIMFrameworkSection() {
    const steps = [
        {
            letter: 'A', word: 'Audience',
            icon: <Crosshair size={28} />,
            description: 'We identify the exact patients who need ExoMind — high-net-worth individuals actively searching for non-invasive brain performance solutions. No broad targeting. No wasted ad spend.',
        },
        {
            letter: 'I', word: 'Intent',
            icon: <Eye size={28} />,
            description: 'We intercept patients at the moment of highest intent — when they\'re researching alternatives to medication, reading about TMS, or looking for clinics near them. We meet them where they already are.',
        },
        {
            letter: 'M', word: 'Mindset',
            icon: <Brain size={28} />,
            description: 'We craft messaging that speaks to their internal dialogue — the fear, the skepticism, the hope. By the time they book, they\'ve already decided ExoMind is for them.',
        },
    ];

    return (
        <section style={{ padding: '100px 24px', background: BRAND.dark }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(197,184,150,0.1)', border: '1px solid rgba(197,184,150,0.2)',
                            borderRadius: 50, padding: '6px 16px', fontSize: 13,
                            fontWeight: 700, color: BRAND.gold, marginBottom: 16,
                            textTransform: 'uppercase', letterSpacing: 1,
                        }}>
                            Our Method
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
                            color: 'white', lineHeight: 1.15, marginBottom: 16,
                        }}>
                            The A.I.M. Method™
                        </h2>
                        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 550, margin: '0 auto 40px' }}>
                            Three pillars that turn strangers into booked ExoMind patients.
                        </p>

                        {/* A.I.M. SVG Diagram from opt-in page */}
                        <AIMDiagram />
                    </div>
                </FadeIn>

                {/* Descriptions below diagram */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 32, marginTop: 24,
                }}>
                    {steps.map((step, i) => (
                        <FadeIn key={i} delay={i * 0.15}>
                            <div style={{
                                padding: 28, borderRadius: 20, textAlign: 'center',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(197,184,150,0.15)',
                            }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14, margin: '0 auto 16px',
                                    background: `linear-gradient(135deg, ${BRAND.gold}25, ${BRAND.teal}15)`,
                                    border: `1.5px solid ${BRAND.gold}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: BRAND.gold,
                                }}>
                                    {React.cloneElement(step.icon, { size: 24, strokeWidth: 1.8 })}
                                </div>
                                <h3 style={{
                                    fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 8,
                                }}>
                                    <span style={{ color: BRAND.gold }}>{step.letter}</span> — {step.word}
                                </h3>
                                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                                    {step.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// INLINE FORM SECTION (Conversion Wise — visible on page)
// ═══════════════════════════════════════════════════════════
function InlineFormSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        clinicName: '', cityState: '', website: '', smsConsent: false,
    });

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const utms = getUTMParams();
        const eventId = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);

        const payload = {
            ...formData,
            ...utms,
            qualified: 'yes',
            source_page: 'exomind-grow-inline',
            submitted_at: new Date().toISOString(),
        };

        const getCookie = (name) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : '';
        };

        // 1. GHL webhook
        try {
            await fetch('/api/ghl-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) { console.error('GHL error:', err); }

        // 2. FB Pixel + CAPI
        if (typeof window !== 'undefined' && window['fbq']) {
            window['fbq']('track', 'Lead', {
                content_name: 'ExoMind Grow Inline Form',
                content_category: 'Qualified',
                value: 0, currency: 'USD',
            }, { eventID: eventId });
        }

        const capiBase = {
            event_name: 'Lead', event_id: eventId,
            email: formData.email, phone: formData.phone,
            firstName: formData.firstName, lastName: formData.lastName,
            fbc: getCookie('_fbc'), fbp: getCookie('_fbp'),
            client_ua: navigator.userAgent,
            event_source_url: window.location.href,
            content_name: 'ExoMind Grow Inline Form',
            content_category: 'Qualified', value: 0, currency: 'USD',
        };

        try {
            await fetch('/api/fb-capi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(capiBase),
            });
        } catch (err) { console.error('CAPI error:', err); }

        try {
            await fetch('/api/fb-capi-qualified', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...capiBase, ...utms }),
            });
        } catch (err) { console.error('CAPI (qualified) error:', err); }

        // 3. Blueprint + Dashboard queue
        fetch('/api/generate-blueprint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, source: 'ExoMind Grow Inline' }),
            keepalive: true,
        }).catch(err => console.error("Research trigger error", err));

        fetch('https://yrfobzuiqcuhylstiukn.supabase.co/functions/v1/queue-dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clinic_name: formData.clinicName || `${formData.firstName} ${formData.lastName}`.trim(),
                clinic_domain: formData.website,
                services: ['exomind'],
                city_state: formData.cityState || '',
                contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
                contact_email: formData.email,
            }),
            keepalive: true,
        }).catch(err => console.error("Dashboard queue error", err));

        setIsSubmitting(false);
        window.location.href = '/exomind-thank-you';
    };

    const inputStyle = {
        width: '100%', height: 50, padding: '0 16px', border: '2px solid rgba(255,255,255,0.15)',
        borderRadius: 12, fontSize: 15, outline: 'none', fontFamily: 'inherit',
        background: 'rgba(255,255,255,0.06)', color: 'white',
        transition: 'border-color 0.2s',
    };

    return (
        <section id="growth-plan" style={{
            padding: '96px 24px',
            background: `linear-gradient(170deg, ${BRAND.dark} 0%, #0a3a3f 50%, ${BRAND.dark} 100%)`,
        }}>
            <div style={{
                maxWidth: 1000, margin: '0 auto',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: 48, alignItems: 'center',
            }}>
                {/* Left — Value prop */}
                <FadeIn>
                    <div style={{ color: 'white' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(197,184,150,0.12)', border: `1px solid ${BRAND.gold}30`,
                            borderRadius: 50, padding: '6px 16px', fontSize: 12,
                            fontWeight: 700, color: BRAND.gold, marginBottom: 20,
                            textTransform: 'uppercase', letterSpacing: 1.5,
                        }}>
                            Free — No Obligation
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800,
                            lineHeight: 1.2, marginBottom: 20,
                        }}>
                            Get Your Custom <span style={{ color: BRAND.gold }}>ExoMind Growth Plan</span>
                        </h2>
                        <p style={{
                            fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 28,
                        }}>
                            We'll research your market, analyze your competitors, and build a step-by-step plan to fill your ExoMind chairs — delivered on a live strategy call.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                'Deep-dive into your local market & patient demand',
                                'Competitor ad & messaging breakdown',
                                'Custom implementation roadmap for your clinic',
                                'Live walkthrough with a dedicated strategist',
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    <CheckCircle size={18} color={BRAND.gold} style={{ flexShrink: 0, marginTop: 2 }} />
                                    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Right — Form */}
                <FadeIn delay={0.15}>
                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 24, padding: '36px 32px',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
                    }}>
                        <h3 style={{
                            fontSize: 20, fontWeight: 800, color: 'white',
                            textAlign: 'center', marginBottom: 24,
                        }}>
                            Fill Out Your Details Below
                        </h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <input type="text" required placeholder="First Name *"
                                    value={formData.firstName}
                                    onChange={e => handleChange('firstName', e.target.value)}
                                    style={inputStyle} />
                                <input type="text" required placeholder="Last Name *"
                                    value={formData.lastName}
                                    onChange={e => handleChange('lastName', e.target.value)}
                                    style={inputStyle} />
                            </div>

                            <input type="text" required placeholder="Clinic Name *"
                                value={formData.clinicName}
                                onChange={e => handleChange('clinicName', e.target.value)}
                                style={inputStyle} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <input type="text" placeholder="Website"
                                    value={formData.website}
                                    onChange={e => handleChange('website', e.target.value)}
                                    style={inputStyle} />
                                <input type="text" required placeholder="City & State *"
                                    value={formData.cityState}
                                    onChange={e => handleChange('cityState', e.target.value)}
                                    style={inputStyle} />
                            </div>

                            <input type="email" required placeholder="Email Address *"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                style={inputStyle} />

                            <input type="tel" required placeholder="Phone Number *"
                                value={formData.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                style={inputStyle} />

                            <div style={{
                                padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10,
                            }}>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}
                                    onClick={() => setFormData(prev => ({ ...prev, smsConsent: !prev.smsConsent }))}>
                                    <input type="checkbox" checked={formData.smsConsent} readOnly required
                                        style={{ marginTop: 3, width: 16, height: 16, accentColor: BRAND.teal, flexShrink: 0 }} />
                                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                                        I agree to receive SMS from LivForMor Media. Data rates may apply. Opt-out anytime.
                                    </span>
                                </label>
                            </div>

                            <button type="submit" disabled={isSubmitting} style={{
                                width: '100%', padding: '16px 0', marginTop: 4,
                                background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                                color: BRAND.dark, fontWeight: 700, fontSize: 17, border: 'none',
                                borderRadius: 12, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                boxShadow: '0 8px 30px rgba(197,184,150,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}>
                                {isSubmitting ? 'Submitting...' : 'Get Your ExoMind Growth Plan'} <ArrowRight size={20} />
                            </button>

                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: 0 }}>
                                🔒 Your info is 100% confidential. No spam, ever.
                            </p>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// "THE COMMON APPROACH VS WHAT WE DO" — Contrast Section
// ═══════════════════════════════════════════════════════════
function StrategicDifferenceSection() {
    const contrasts = [
        {
            common: 'Target broad "depression" or "anxiety" keywords',
            ours: 'Identify high-net-worth individuals actively researching non-invasive neurotherapy',
            icon: <Crosshair size={20} />,
        },
        {
            common: 'Run the same ad templates for every clinic',
            ours: 'Build custom creative around your ExoMind protocol, outcomes, and local market',
            icon: <Megaphone size={20} />,
        },
        {
            common: 'Deliver "leads" with no qualification or follow-up',
            ours: 'Pre-screen every inquiry so only treatment-ready patients reach your team',
            icon: <ShieldCheck size={20} />,
        },
    ];

    return (
        <section style={{ padding: '100px 24px', background: 'white' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.15)',
                            borderRadius: 50, padding: '6px 16px', fontSize: 13,
                            fontWeight: 700, color: BRAND.teal, marginBottom: 16,
                            textTransform: 'uppercase', letterSpacing: 1,
                        }}>
                            <Target size={14} /> How We Think Differently
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
                            color: BRAND.dark, lineHeight: 1.2, marginBottom: 16,
                        }}>
                            The Common Approach vs. What We Do
                        </h2>
                    </div>
                </FadeIn>

                {/* Founder intro — brief */}
                <FadeIn delay={0.1}>
                    <div style={{
                        display: 'flex', gap: 24, alignItems: 'center',
                        marginBottom: 48, padding: '24px 28px',
                        background: BRAND.lightBg, borderRadius: 20,
                        border: '1px solid #e5e7eb',
                        flexWrap: 'wrap', justifyContent: 'center',
                    }}>
                        <div style={{
                            width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                            border: `2px solid ${BRAND.gold}40`,
                        }}>
                            <img src={FOUNDER_IMAGE} alt="Oriel Mor"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: '1 1 300px' }}>
                            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                                <strong style={{ color: BRAND.dark }}>Oriel Mor, Founder & CEO</strong> — After managing over $1M in paid campaigns across 70 industries, I built LivForMor Media to bring performance-level marketing to clinics that actually change lives. Here's how our approach is different:
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* Contrast cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {contrasts.map((c, i) => (
                        <FadeIn key={i} delay={i * 0.12}>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                                gap: 0, borderRadius: 16, overflow: 'hidden',
                                border: '1px solid #e5e7eb',
                                minHeight: 120,
                            }}>
                                {/* Common approach side */}
                                <div style={{
                                    padding: '24px 28px', background: '#fef2f2',
                                    display: 'flex', alignItems: 'flex-start', gap: 12,
                                }}>
                                    <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                                            The Common Approach
                                        </div>
                                        <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                                            {c.common}
                                        </p>
                                    </div>
                                </div>

                                {/* VS divider */}
                                <div style={{
                                    width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: '#f3f4f6', fontWeight: 900, fontSize: 13, color: '#9ca3af',
                                }}>
                                    VS
                                </div>

                                {/* Our approach */}
                                <div style={{
                                    padding: '24px 28px', background: '#f0fdf4',
                                    display: 'flex', alignItems: 'flex-start', gap: 12,
                                }}>
                                    <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                                            What We Do
                                        </div>
                                        <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                            {c.ours}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════════
const FAQ_DATA = [
    {
        q: 'What exactly do I get with the free growth plan?',
        a: 'You get a custom market research report covering your local demand, competitor analysis (what ads they\'re running, how they\'re positioning), your Google Business Profile performance, and a step-by-step implementation roadmap — all walked through live on a 15-20 minute strategy call with a dedicated strategist.',
    },
    {
        q: 'How is this different from what my current agency does?',
        a: 'Most agencies run the same playbook across every clinic. We build systems specifically for ExoMind — targeting high-net-worth individuals who are actively researching non-invasive neurotherapy, not just anyone with "depression." Our campaigns, copy, and funnels are purpose-built for your protocol and your local market.',
    },
    {
        q: 'Do I have to pay for ad spend separately?',
        a: 'Yes — ad spend goes directly to Meta (Facebook/Instagram) and is separate from our fees. We recommend a minimum of $3,000/month in ad spend to generate meaningful patient volume. You control the budget, we optimize the campaigns.',
    },
    {
        q: 'How quickly will I start seeing patients?',
        a: 'Most clinics see their first booked appointments within the first 7–14 days of launching. Results compound over time as we optimize your campaigns and build retargeting audiences. Months 2–3 typically show significant improvement.',
    },
    {
        q: 'Is there a long-term contract?',
        a: 'No. We work on a month-to-month basis. Our model means we have to earn your business every single month. If we\'re not delivering, you can walk away — no cancellation fees, no penalties.',
    },
    {
        q: 'I\'m not sure ExoMind patients respond to paid ads — does this actually work?',
        a: 'ExoMind patients are some of the highest-intent prospects online. They\'re actively searching for alternatives to medication, researching TMS, and looking for clinics near them. The issue isn\'t whether they\'re online — it\'s whether your current marketing is reaching them with the right message, on the right platform, at the right time. That\'s exactly what the A.I.M. Method solves.',
    },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section style={{ padding: '80px 24px', background: BRAND.lightBg }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 12, fontFamily: 'Georgia,serif' }}>
                            Frequently Asked Questions
                        </h2>
                        <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                        <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 500, margin: '0 auto' }}>
                            Everything you need to know before getting started.
                        </p>
                    </div>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {FAQ_DATA.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <FadeIn key={i} delay={i * 0.05}>
                                <div style={{
                                    border: `1px solid ${isOpen ? BRAND.teal : '#e5e7eb'}`,
                                    borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s',
                                    boxShadow: isOpen ? '0 4px 16px rgba(15,118,110,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
                                    background: 'white',
                                }}>
                                    <button onClick={() => setOpenIndex(isOpen ? null : i)}
                                        style={{
                                            width: '100%', padding: '20px 24px', border: 'none',
                                            background: isOpen ? 'rgba(15,118,110,0.04)' : 'white',
                                            cursor: 'pointer', textAlign: 'left', display: 'flex',
                                            alignItems: 'center', justifyContent: 'space-between', gap: 16,
                                        }}>
                                        <span style={{
                                            fontSize: 16, fontWeight: 600, color: BRAND.dark, lineHeight: 1.4,
                                            display: 'flex', alignItems: 'center', gap: 10,
                                        }}>
                                            <HelpCircle size={18} color={BRAND.teal} style={{ flexShrink: 0 }} />
                                            {faq.q}
                                        </span>
                                        <ChevronDown size={20} color={BRAND.teal}
                                            style={{
                                                transition: 'transform 0.3s ease', flexShrink: 0,
                                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            }} />
                                    </button>
                                    <div style={{
                                        maxHeight: isOpen ? 300 : 0, overflow: 'hidden',
                                        transition: 'max-height 0.3s ease',
                                    }}>
                                        <div style={{ padding: '0 24px 20px 52px' }}>
                                            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, margin: 0 }}>
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

                {/* CTA after FAQ */}
                <FadeIn delay={0.3}>
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <button onClick={() => scrollTo('growth-plan')} style={{
                            padding: '16px 48px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                            color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 50,
                            cursor: 'pointer', boxShadow: '0 8px 30px rgba(197,184,150,0.4)',
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                        }}>
                            Get Your ExoMind Growth Plan <ArrowRight size={20} />
                        </button>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════
export default function ExoMindLanding() {
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);

    useEffect(() => {
        document.title = 'How to Get 10–15 New Cash-Pay ExoMind Patients Every Month | LivForMor Media';
        const handleScroll = () => setShowFloatingCTA(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ fontFamily: "'Nunito Sans', Georgia, serif", color: '#111827' }}>

            {/* ─── HERO ──────────────────────────────────── */}
            <section style={{
                position: 'relative', overflow: 'hidden', background: BRAND.dark,
                minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '48px 24px',
            }}>
                <div style={{
                    position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                    background: 'rgba(13,59,64,0.3)', transform: 'skewX(12deg) translateX(80px)',
                }} />

                <div style={{
                    position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto',
                    textAlign: 'center', color: 'white', zIndex: 10,
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                        padding: '8px 24px', borderRadius: 50, fontSize: 14, fontWeight: 600,
                        letterSpacing: 1, textTransform: 'uppercase', marginBottom: 32,
                        border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                        <Brain size={16} color={BRAND.gold} /> For ExoMind Clinics
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(30px,5vw,58px)', fontWeight: 800, lineHeight: 1.12,
                        marginBottom: 24, fontFamily: 'Georgia,serif',
                    }}>
                        How to Get <span style={{ color: BRAND.gold }}>10–15 New Cash-Pay ExoMind Patients</span> Every Month — Without Burning Budget on Leads Who Can't Afford Treatment
                    </h1>

                    <p style={{
                        fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.7)',
                        maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.65,
                    }}>
                        We build the patient acquisition system so you can focus on what you do best — changing lives. Get your free custom growth plan below.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 40px', marginBottom: 48 }}>
                        {[
                            { icon: <CheckCircle size={18} color={BRAND.gold} />, text: 'Custom Market Research' },
                            { icon: <CheckCircle size={18} color={BRAND.gold} />, text: 'Competitor Intelligence' },
                            { icon: <CheckCircle size={18} color={BRAND.gold} />, text: 'Implementation Roadmap' },
                            { icon: <CheckCircle size={18} color={BRAND.gold} />, text: 'Dedicated Strategist' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#d1d5db' }}>
                                {item.icon} {item.text}
                            </div>
                        ))}
                    </div>

                    <button onClick={() => scrollTo('growth-plan')} style={{
                        padding: '18px 44px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 12,
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: '0 8px 30px rgba(197,184,150,0.4)',
                    }}>
                        Get Your ExoMind Growth Plan <ArrowRight size={20} />
                    </button>
                </div>
            </section>


            {/* ─── PREMIUM TREATMENT IMAGE + PROBLEM / PAIN SECT ────────── */}
            <section style={{ padding: '96px 24px', background: `linear-gradient(135deg, ${BRAND.dark}, #0f172a)`, position: 'relative', overflow: 'hidden' }}>
                {/* Tech Grid Background Overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }} />
                
                {/* Animated Glowing Orbs (Holographic feel) */}
                <div style={{
                    position: 'absolute', top: '5%', left: '15%', width: 400, height: 400,
                    background: BRAND.gold, filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500,
                    background: BRAND.teal, filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%',
                    animation: 'float 10s ease-in-out infinite reverse'
                }} />

                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes borderRotate {
                        100% { transform: rotate(1turn); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-30px) scale(1.05); }
                    }
                    .premium-card {
                        position: relative;
                        padding: 36px 32px;
                        border-radius: 20px;
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        text-align: left;
                        height: 100%;
                        overflow: hidden;
                        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
                        z-index: 1;
                    }
                    .premium-card::before {
                        content: '';
                        position: absolute;
                        top: -50%; left: -50%; width: 200%; height: 200%;
                        background: conic-gradient(from 0deg, transparent 70%, ${BRAND.gold} 90%, transparent 100%);
                        animation: borderRotate 4s linear infinite;
                        opacity: 0;
                        transition: opacity 0.4s ease;
                        z-index: -1;
                    }
                    .premium-card::after {
                        content: '';
                        position: absolute;
                        inset: 1px;
                        background: rgba(15, 23, 42, 0.95);
                        border-radius: 19px;
                        z-index: -1;
                    }
                    .premium-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                        border-color: rgba(255,255,255,0.15);
                    }
                    .premium-card:hover::before {
                        opacity: 1;
                    }
                    .icon-ring-container {
                        position: relative;
                        width: 68px;
                        height: 68px;
                        margin-bottom: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    @keyframes ringRotate1 { 100% { transform: rotate(360deg); } }
                    @keyframes ringRotate2 { 100% { transform: rotate(-360deg); } }
                    .holographic-ring-1 {
                        position: absolute; inset: 0;
                        border: 1px dashed rgba(255,255,255,0.2);
                        border-radius: 50%;
                        animation: ringRotate1 15s linear infinite;
                        transition: border-color 0.3s ease;
                    }
                    .holographic-ring-2 {
                        position: absolute; inset: -8px;
                        border: 1px solid rgba(255,255,255,0.05);
                        border-left-color: rgba(255,255,255,0.3);
                        border-radius: 50%;
                        animation: ringRotate2 20s linear infinite;
                        transition: all 0.3s ease;
                    }
                    .premium-card:hover .holographic-ring-1 { border-color: ${BRAND.gold}; border-style: solid; opacity: 0.5; }
                    .premium-card:hover .holographic-ring-2 { border-color: rgba(197,184,150,0.1); border-left-color: ${BRAND.gold}; border-right-color: ${BRAND.gold}; }
                    .premium-card:hover .icon-inner { color: ${BRAND.dark} !important; background: ${BRAND.gold} !important; box-shadow: 0 0 20px rgba(197,184,150,0.4); }
                `}} />

                <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    
                    {/* ExoMind treatment hero image inside the dark section */}
                    <FadeIn>
                        <div style={{
                            borderRadius: 24, overflow: 'hidden',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            maxHeight: 460,
                            marginBottom: 80,
                            position: 'relative'
                        }}>
                            <img src={TREATMENT_IMAGE} alt="ExoMind TMS Treatment"
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover', objectPosition: 'center 20%',
                                    display: 'block',
                                }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                                pointerEvents: 'none'
                            }} />
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 50, padding: '8px 20px', fontSize: 13,
                            fontWeight: 700, color: BRAND.gold, marginBottom: 24,
                            textTransform: 'uppercase', letterSpacing: 1.5,
                            backdropFilter: 'blur(10px)',
                        }}>
                            <AlertTriangle size={14} /> The Real Problem
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800,
                            color: 'white', lineHeight: 1.15, marginBottom: 20,
                        }}>
                            Why Most ExoMind Marketing <span style={{ color: BRAND.gold }}>Fails</span>
                        </h2>
                        <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.7)', maxWidth: 650, margin: '0 auto 64px', lineHeight: 1.6 }}>
                            It's not the treatment. It's how clinics try to market it. Standard psychiatric marketing strategies break down when applied to high-ticket precision care.
                        </p>
                    </FadeIn>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                        {[
                            {
                                icon: <Users size={28} />,
                                title: 'Wrong Audience',
                                desc: 'Marketing to anyone with "depression" instead of specific high-net-worth individuals actively seeking non-invasive brain optimization.',
                            },
                            {
                                icon: <BarChart3 size={28} />,
                                title: 'Wrong Platform',
                                desc: 'Posting on Instagram for engagement instead of running precision-targeted intent campaigns where your ideal patients are searching.',
                            },
                            {
                                icon: <Megaphone size={28} />,
                                title: 'Wrong Message',
                                desc: 'Ads that just educate about the technology instead of speaking directly to the fear, skepticism, and hope your patients feel.',
                            },
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.15}>
                                <div className="premium-card">
                                    <div className="icon-ring-container">
                                        <div className="holographic-ring-1" />
                                        <div className="holographic-ring-2" />
                                        <div className="icon-inner" style={{
                                            width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'white',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        }}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 14 }}>{item.title}</h3>
                                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── A.I.M. FRAMEWORK ─────────────────────── */}
            <AIMFrameworkSection />


            {/* ─── WHAT YOU GET ───────────────────────────── */}
            <section style={{ padding: '96px 24px', background: 'white' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <FadeIn>
                        <div style={{ textAlign: 'center', marginBottom: 48 }}>
                            <h2 style={{
                                fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
                                color: BRAND.dark, lineHeight: 1.2, marginBottom: 12,
                            }}>
                                What You Get
                            </h2>
                            <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                            <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 550, margin: '0 auto' }}>
                                A complete growth system — not just "more leads."
                            </p>
                        </div>
                    </FadeIn>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                        {[
                            { icon: <Target size={22} />, title: 'Custom Market Research', desc: 'Deep-dive into your local market, patient demographics, and untapped demand for ExoMind.' },
                            { icon: <BarChart3 size={22} />, title: 'Competitor Intelligence', desc: 'What your top competitors are doing — their ads, messaging, positioning — and where they\'re leaving gaps.' },
                            { icon: <Zap size={22} />, title: 'Implementation Roadmap', desc: 'Step-by-step plan to go from "not enough patients" to a predictable pipeline of booked ExoMind sessions.' },
                            { icon: <Award size={22} />, title: 'Dedicated Strategist', desc: 'A single point of contact who understands your clinic, your market, and your goals — not a rotating team of juniors.' },
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div style={{
                                    padding: 28, borderRadius: 16, background: BRAND.lightBg,
                                    border: '1px solid #e5e7eb', display: 'flex', gap: 16, alignItems: 'flex-start',
                                }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', background: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.dark})`,
                                        color: 'white', flexShrink: 0,
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 17, fontWeight: 700, color: BRAND.dark, marginBottom: 6 }}>{item.title}</h3>
                                        <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── INLINE FORM (Conversion Wise) ─────────── */}
            <InlineFormSection />


            {/* ─── STRATEGIC DIFFERENCE (Common Approach) ─── */}
            <StrategicDifferenceSection />


            {/* ─── FAQ ───────────────────────────────────── */}
            <FAQSection />


            {/* ─── SCARCITY CTA ──────────────────────────── */}
            <section style={{
                padding: '64px 24px', background: BRAND.dark, textAlign: 'center', color: 'white',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-block', background: 'rgba(197,184,150,0.2)', border: `1px solid ${BRAND.gold}`,
                        padding: '8px 20px', borderRadius: 50, fontSize: 14, fontWeight: 700, color: BRAND.gold,
                        marginBottom: 24,
                    }}>
                        ⚡ Limited Capacity
                    </div>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, fontFamily: 'Georgia,serif' }}>
                        Ready to Fill Your ExoMind Schedule?
                    </h2>
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
                        Get your free growth plan. If we're a fit, we'll build your patient acquisition system — you only pay when it works.
                    </p>
                    <button onClick={() => scrollTo('growth-plan')} style={{
                        padding: '18px 48px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 50,
                        cursor: 'pointer', boxShadow: '0 8px 30px rgba(197,184,150,0.4)',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                        Get Your ExoMind Growth Plan <ArrowRight size={20} />
                    </button>
                </div>
            </section>


            {/* ─── FLOATING CTA ──────────────────────────── */}
            {showFloatingCTA && (
                <div style={{
                    position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 50, animation: 'fadeInUp 0.3s ease',
                }}>
                    <button onClick={() => scrollTo('growth-plan')} style={{
                        padding: '14px 32px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 50,
                        cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <ShieldCheck size={18} /> Get Your ExoMind Growth Plan
                    </button>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
        </div>
    );
}
