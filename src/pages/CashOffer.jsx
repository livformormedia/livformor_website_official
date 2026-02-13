import React, { useState, useEffect, useRef } from 'react';
import {
    Stethoscope, CheckCircle, XCircle, ChevronDown, ArrowRight,
    ShieldCheck, BarChart3, X, ChevronRight, ArrowLeft,
    Calculator, Users, DollarSign, Target, Zap, TrendingUp,
    Activity, Award, HelpCircle, Lightbulb, Heart, HandHeart,
    BookOpen, Radio, Sparkles, ChevronUp, ArrowDown
} from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────
const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png';
const FOUNDER_IMAGE = '/oriel-founder.jpg';

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

// ─── Qualification Logic ───────────────────────────────────
function isQualified(data) {
    if (data.clinicOperational === 'no' || data.clinicOperational === 'planning') return false;
    if (data.monthlyBudget === '0-3000') return false;
    if (data.teamStructure === 'solo') return false;
    if (data.services.length === 0) return false;
    return true;
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
// BELIEF BRIDGE METHOD
// ═══════════════════════════════════════════════════════════
function BeliefBridgeSection() {
    const steps = [
        {
            num: '01',
            title: 'Challenge the Conviction',
            description: 'We break through the wall of "nothing will work for me." Through real patient stories and evidence-based messaging, we show them that treatment-resistant doesn\'t mean beyond help.',
            icon: <Lightbulb size={28} />,
            color: '#f59e0b',
        },
        {
            num: '02',
            title: 'Build New Hope',
            description: 'We paint a vivid picture of what life looks like on the other side — not just symptom relief, but genuine joy, connection, and freedom. We make healing feel real and possible.',
            icon: <Heart size={28} />,
            color: '#10b981',
        },
        {
            num: '03',
            title: 'Guide Into Action',
            description: 'When you\'re depressed, everything is harder. We create a frictionless path from "maybe this could work" to "I just booked my consultation" — with compassion at every step.',
            icon: <HandHeart size={28} />,
            color: '#6366f1',
        },
    ];

    return (
        <section style={{
            padding: '100px 24px',
            background: `linear-gradient(180deg, white 0%, ${BRAND.lightBg} 100%)`,
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 72 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: `rgba(15,118,110,0.08)`, border: `1px solid rgba(15,118,110,0.15)`,
                            borderRadius: 50, padding: '6px 16px', fontSize: 13,
                            fontWeight: 700, color: BRAND.teal, marginBottom: 16,
                            textTransform: 'uppercase', letterSpacing: 1,
                        }}>
                            Our Secret Weapon
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
                            color: BRAND.dark, lineHeight: 1.15, marginBottom: 16,
                        }}>
                            The Belief Bridge Method™
                        </h2>
                        <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                            Instead of selling treatments, we help patients <strong>believe they can heal</strong>.
                            That shift changes everything.
                        </p>
                    </div>
                </FadeIn>

                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute', left: '50%', top: 0, bottom: 0,
                        width: 2,
                        background: `linear-gradient(180deg, ${BRAND.gold}60, ${BRAND.teal}60, ${BRAND.gold}60)`,
                        backgroundSize: '100% 200%',
                    }} />

                    {steps.map((step, i) => (
                        <FadeIn key={i} delay={i * 0.2}>
                            <div style={{
                                display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                                gap: 40, alignItems: 'center', marginBottom: i < 2 ? 64 : 0,
                                flexWrap: 'wrap', justifyContent: 'center',
                            }}>
                                <div style={{ flex: '1 1 400px', maxWidth: 480 }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
                                    }}>
                                        <span style={{
                                            fontSize: 48, fontWeight: 900, color: `${step.color}20`,
                                            lineHeight: 1, fontFamily: 'monospace',
                                        }}>{step.num}</span>
                                    </div>
                                    <h3 style={{
                                        fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800,
                                        color: BRAND.dark, marginBottom: 16,
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7 }}>
                                        {step.description}
                                    </p>
                                </div>

                                <div style={{ flex: '0 0 auto' }}>
                                    <div style={{
                                        width: 160, height: 160, borderRadius: 32,
                                        background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                                        border: `2px solid ${step.color}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: step.color,
                                        boxShadow: `0 12px 40px ${step.color}15, inset 0 0 30px ${step.color}05`,
                                    }}>
                                        {React.cloneElement(step.icon, { size: 56, strokeWidth: 1.5 })}
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
// C.A.R.E. FRAMEWORK
// ═══════════════════════════════════════════════════════════
function CareFrameworkSection() {
    const [expanded, setExpanded] = useState(null);

    const steps = [
        {
            letter: 'C',
            word: 'Clarity',
            icon: <Target size={24} />,
            short: 'Define your ideal patient and speak their language.',
            detail: 'We define exactly who your ideal patients are — and craft messaging that speaks to what they\'re really feeling. No generic copy. No assumptions. Real insights that connect.',
            gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
        },
        {
            letter: 'A',
            word: 'Authority',
            icon: <Award size={24} />,
            short: 'Position your clinic as the trusted expert.',
            detail: 'We position your clinic as the trusted expert — without relying on generic buzzwords like "FDA Approved." Instead, we build genuine credibility through patient stories, education, and proof.',
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        },
        {
            letter: 'R',
            word: 'Reach',
            icon: <Radio size={24} />,
            short: 'Targeted campaigns that deliver treatment-ready patients.',
            detail: 'We launch targeted paid ad campaigns that bring treatment-ready patients to your front door, month after month. Precision targeting meets compelling creative — so every dollar works harder.',
            gradient: 'linear-gradient(135deg, #10b981, #059669)',
        },
        {
            letter: 'E',
            word: 'Education',
            icon: <BookOpen size={24} />,
            short: 'Marketing that builds trust before the first visit.',
            detail: 'We create marketing that educates, lowers resistance, builds trust, and makes patients take the first step toward healing — before they even walk into your clinic.',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
        },
    ];

    return (
        <section style={{
            padding: '100px 24px',
            background: BRAND.dark,
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(197,184,150,0.1)', border: '1px solid rgba(197,184,150,0.2)',
                            borderRadius: 50, padding: '6px 16px', fontSize: 13,
                            fontWeight: 700, color: BRAND.gold, marginBottom: 16,
                            textTransform: 'uppercase', letterSpacing: 1,
                        }}>
                            Our Framework
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
                            color: 'white', lineHeight: 1.15, marginBottom: 16,
                        }}>
                            The C.A.R.E. Framework
                        </h2>
                        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 550, margin: '0 auto' }}>
                            Four pillars that transform how clinics attract and convert patients.
                        </p>
                        <p style={{
                            fontSize: 14, color: BRAND.gold, marginTop: 12,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            fontWeight: 600, opacity: 0.8,
                        }}>
                            <span style={{ fontSize: 18 }}>👇</span> Tap each letter below to explore
                        </p>
                    </div>
                </FadeIn>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 20,
                }}>
                    {steps.map((s, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div
                                onClick={() => setExpanded(expanded === i ? null : i)}
                                style={{
                                    background: expanded === i
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 20, padding: 28, cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                }}
                            >
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16,
                                }}>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: 14,
                                        background: s.gradient, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: 24, fontWeight: 900, color: 'white',
                                    }}>{s.letter}</div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{s.word}</div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)' }}>
                                        {expanded === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
                                    marginBottom: expanded === i ? 16 : 0,
                                }}>
                                    {s.short}
                                </p>

                                {expanded === i && (
                                    <p style={{
                                        fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7,
                                        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16,
                                    }}>
                                        {s.detail}
                                    </p>
                                )}
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ═══════════════════════════════════════════════════════════
// FOUNDER STORY
// ═══════════════════════════════════════════════════════════
function FounderStorySection() {
    return (
        <section style={{ padding: '100px 24px', background: 'white' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: `rgba(15,118,110,0.08)`, border: `1px solid rgba(15,118,110,0.15)`,
                            borderRadius: 50, padding: '6px 16px', fontSize: 13,
                            fontWeight: 700, color: BRAND.teal, marginBottom: 16,
                            textTransform: 'uppercase', letterSpacing: 1,
                        }}>
                            <Heart size={14} /> Why This Exists
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
                            color: BRAND.dark, lineHeight: 1.2,
                        }}>
                            This Isn't Just Business. It's Personal.
                        </h2>
                    </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div style={{
                        display: 'flex', gap: 48, alignItems: 'flex-start',
                        flexWrap: 'wrap', justifyContent: 'center',
                    }}>
                        <div style={{ flex: '0 0 auto' }}>
                            <div style={{
                                width: 200, height: 200, borderRadius: 24, overflow: 'hidden',
                                border: `3px solid ${BRAND.gold}40`,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                            }}>
                                <img src={FOUNDER_IMAGE} alt="Oriel Mor"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 16 }}>
                                <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>Oriel Mor</div>
                                <div style={{ fontSize: 14, color: BRAND.teal, fontWeight: 600 }}>Founder & CEO</div>
                            </div>
                        </div>

                        <div style={{ flex: '1 1 400px' }}>
                            <div style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: 20 }}>
                                    I spent 6 years in sales and advertising, managing over $1M in paid campaigns across 63 industries. I chased marketing for the freedom and the thrill of building campaigns. I had all the freedom in the world.
                                </p>
                                <p style={{ marginBottom: 20 }}>
                                    But I didn't have purpose.
                                </p>
                                <p style={{ marginBottom: 20 }}>
                                    Then something changed. One of my closest friends — Idan — developed a painful dependency on antidepressants. He's 21 and still stuck because the system won't change his path, and he's too scared to change it on his own.
                                </p>
                                <p style={{
                                    fontSize: 17, fontWeight: 600, color: BRAND.dark,
                                    borderLeft: `3px solid ${BRAND.gold}`,
                                    paddingLeft: 20, marginBottom: 20,
                                }}>
                                    That's exactly why LivForMor Media was born — to help clinics like yours restore belief and hope before the first consultation ever happens.
                                </p>
                                <p>
                                    If you're serious about growing your clinic in a sustainable, ethical way — let's build something that actually matters.
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// ASSESSMENT MODAL (Qualification + Contact)
// ═══════════════════════════════════════════════════════════
function AssessmentModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        clinicOperational: '',
        monthlyBudget: '',
        teamStructure: '',
        services: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
        smsConsent: false,
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep(1);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    const handleChange = (name, value) => {
        if (name === 'services') {
            const current = [...formData.services];
            const idx = current.indexOf(value);
            if (idx > -1) current.splice(idx, 1);
            else current.push(value);
            setFormData(prev => ({ ...prev, services: current }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const isStep1Valid = () => {
        return (
            formData.clinicOperational &&
            formData.monthlyBudget &&
            formData.teamStructure &&
            formData.services.length > 0
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const utms = getUTMParams();
        const qualified = isQualified(formData);

        const payload = {
            ...formData,
            ...utms,
            qualified: qualified ? 'yes' : 'no',
            source_page: 'cash-offer',
            submitted_at: new Date().toISOString(),
        };

        // 1. GHL webhook
        try {
            await fetch('/api/ghl-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error('GHL error:', err);
        }

        // 2. Client-side FB pixel + 3. Server-side CAPI — only for qualified leads
        if (qualified) {
            // @ts-ignore
            if (typeof window !== 'undefined' && window.fbq) {
                // @ts-ignore
                window.fbq('track', 'Lead', {
                    content_name: 'Cash Offer Assessment',
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
                await fetch('/api/fb-capi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event_name: 'Lead',
                        email: formData.email,
                        phone: formData.phone,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        fbc: getCookie('_fbc'),
                        fbp: getCookie('_fbp'),
                        client_ua: navigator.userAgent,
                        event_source_url: window.location.href,
                        content_name: 'Cash Offer Assessment',
                        content_category: 'Qualified',
                        value: 0,
                        currency: 'USD',
                    }),
                });
            } catch (err) {
                console.error('CAPI error:', err);
            }
        }

        setIsSubmitting(false);
        onClose();

        if (qualified) {
            window.location.href = '/ThankYou';
        } else {
            window.location.href = '/ThankYouBasic';
        }
    };

    if (!isOpen) return null;

    const optionCard = (selected) => ({
        display: 'flex', alignItems: 'center', padding: '14px 16px',
        border: `2px solid ${selected ? BRAND.teal : '#e5e7eb'}`,
        borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
        background: selected ? 'rgba(15,118,110,0.06)' : 'white',
        gap: 12,
    });

    const inputStyle = {
        width: '100%', height: 48, padding: '0 16px', border: '1px solid #d1d5db',
        borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'inherit',
        transition: 'border-color 0.2s',
    };

    const sectionLabel = {
        display: 'block', fontSize: 13, fontWeight: 700, color: BRAND.teal,
        // @ts-ignore
        textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'rgba(13,59,64,0.85)', backdropFilter: 'blur(6px)',
            padding: 16, overflowY: 'auto',
        }}>
            <div style={{
                position: 'relative', width: '100%', maxWidth: 600, background: 'white',
                borderRadius: 20, boxShadow: '0 25px 60px rgba(0,0,0,0.35)', maxHeight: '92vh',
                overflowY: 'auto', border: '1px solid #e5e7eb',
            }}>
                <button onClick={onClose} style={{
                    position: 'sticky', top: 0, float: 'right', background: 'white', border: 'none',
                    cursor: 'pointer', padding: 16, borderRadius: '0 20px 0 12px', zIndex: 10,
                }}>
                    <X size={22} color="#6b7280" />
                </button>

                <div style={{ padding: '24px 28px 28px', clear: 'both' }}>
                    {/* Progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: 13, fontWeight: 700,
                                background: BRAND.teal, color: 'white',
                            }}>1</div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: step === 1 ? BRAND.dark : '#9ca3af' }}>Qualification</span>
                        </div>
                        <div style={{ flex: 1, height: 2, background: step >= 2 ? BRAND.teal : '#e5e7eb', margin: '0 12px', borderRadius: 2 }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: 13, fontWeight: 700,
                                background: step === 2 ? BRAND.teal : '#f3f4f6', color: step === 2 ? 'white' : '#9ca3af',
                            }}>2</div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: step === 2 ? BRAND.dark : '#9ca3af' }}>Contact Info</span>
                        </div>
                    </div>

                    <h2 style={{ fontSize: 22, fontWeight: 700, color: BRAND.dark, marginBottom: 6, fontFamily: 'Georgia,serif' }}>
                        {step === 1 ? 'See If You Qualify' : 'Your Contact Details'}
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: 28, fontSize: 15 }}>
                        {step === 1
                            ? 'Answer 4 quick questions to see if your clinic qualifies for our performance model.'
                            : 'Where should we send your custom growth plan?'}
                    </p>

                    <form onSubmit={handleSubmit}>
                        {step === 1 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

                                {/* Q1: Clinic Operational */}
                                <div>
                                    <label style={sectionLabel}>1. Is your clinic currently operational?</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {[
                                            { value: 'yes', label: 'Yes — we are currently seeing patients' },
                                            { value: 'no', label: 'No — we are not open yet' },
                                            { value: 'planning', label: "I'm planning to launch soon" },
                                        ].map(opt => (
                                            <label key={opt.value} style={optionCard(formData.clinicOperational === opt.value)}
                                                onClick={() => handleChange('clinicOperational', opt.value)}>
                                                <input type="radio" name="clinicOp" checked={formData.clinicOperational === opt.value} readOnly
                                                    style={{ width: 18, height: 18, accentColor: BRAND.teal, flexShrink: 0 }} />
                                                <span style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Q2: Monthly Ad Budget */}
                                <div>
                                    <label style={sectionLabel}>2. What is your monthly budget to invest in ads?</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {[
                                            { value: '0-3000', label: '$0 – $3,000/month' },
                                            { value: '3000+', label: '$3,000+/month' },
                                        ].map(opt => (
                                            <label key={opt.value} style={optionCard(formData.monthlyBudget === opt.value)}
                                                onClick={() => handleChange('monthlyBudget', opt.value)}>
                                                <input type="radio" name="budget" checked={formData.monthlyBudget === opt.value} readOnly
                                                    style={{ width: 18, height: 18, accentColor: BRAND.teal, flexShrink: 0 }} />
                                                <span style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Q3: Solo or Team */}
                                <div>
                                    <label style={sectionLabel}>3. Are you working on your own or do you have a team?</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {[
                                            { value: 'solo', label: 'I handle everything myself (provider, admin, billing)' },
                                            { value: 'small-team', label: 'I have 1–2 support staff (front desk, intake coordinator)' },
                                            { value: 'full-team', label: 'We have a full clinical \u0026 admin team' },
                                        ].map(opt => (
                                            <label key={opt.value} style={optionCard(formData.teamStructure === opt.value)}
                                                onClick={() => handleChange('teamStructure', opt.value)}>
                                                <input type="radio" name="team" checked={formData.teamStructure === opt.value} readOnly
                                                    style={{ width: 18, height: 18, accentColor: BRAND.teal, flexShrink: 0 }} />
                                                <span style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Q4: Services */}
                                <div>
                                    <label style={sectionLabel}>4. What cash-pay services do you offer? (select all)</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {[
                                            { value: 'ketamine', label: 'Ketamine Infusions' },
                                            { value: 'tms', label: 'TMS' },
                                        ].map(t => (
                                            <div key={t.value} style={optionCard(formData.services.includes(t.value))}
                                                onClick={() => handleChange('services', t.value)}>
                                                <input type="checkbox" checked={formData.services.includes(t.value)} readOnly
                                                    style={{ width: 18, height: 18, accentColor: BRAND.teal, flexShrink: 0, pointerEvents: 'none' }} />
                                                <span style={{ color: '#374151', fontWeight: 500, fontSize: 15 }}>{t.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button type="button" disabled={!isStep1Valid()} onClick={() => setStep(2)}
                                    style={{
                                        width: '100%', padding: '16px 0', background: isStep1Valid()
                                            ? `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`
                                            : '#d1d5db',
                                        color: isStep1Valid() ? BRAND.dark : '#9ca3af',
                                        fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 12,
                                        cursor: isStep1Valid() ? 'pointer' : 'not-allowed',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        marginTop: 4,
                                    }}>
                                    Continue <ChevronRight size={20} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>First Name *</label>
                                        <input type="text" value={formData.firstName} required
                                            onChange={e => handleChange('firstName', e.target.value)} style={inputStyle} placeholder="John" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Last Name *</label>
                                        <input type="text" value={formData.lastName} required
                                            onChange={e => handleChange('lastName', e.target.value)} style={inputStyle} placeholder="Smith" />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Practice Website</label>
                                    <input type="text" value={formData.website} placeholder="www.yourclinic.com"
                                        onChange={e => handleChange('website', e.target.value)} style={inputStyle} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Email Address *</label>
                                    <input type="email" value={formData.email} required
                                        onChange={e => handleChange('email', e.target.value)} style={inputStyle} placeholder="john@yourclinic.com" />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Phone Number *</label>
                                    <input type="tel" value={formData.phone} required
                                        onChange={e => handleChange('phone', e.target.value)} style={inputStyle} placeholder="(555) 123-4567" />
                                </div>

                                <div style={{ padding: 14, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12 }}>
                                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}
                                        onClick={() => setFormData(prev => ({ ...prev, smsConsent: !prev.smsConsent }))}>
                                        <input type="checkbox" checked={formData.smsConsent} readOnly required
                                            style={{ marginTop: 3, width: 18, height: 18, accentColor: BRAND.teal, flexShrink: 0 }} />
                                        <span style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                                            I agree to receive SMS communications from LivForMor Media regarding my inquiry. Data rates may apply. I can opt-out at any time.
                                        </span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
                                    <button type="button" onClick={() => setStep(1)} style={{
                                        padding: '14px 24px', border: '1px solid #d1d5db', borderRadius: 50,
                                        fontWeight: 700, color: '#6b7280', background: 'white',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                                    }}>
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                    <button type="submit" disabled={isSubmitting} style={{
                                        flex: 1, padding: '14px 0',
                                        background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                                        color: BRAND.dark, fontWeight: 700, fontSize: 16, border: 'none',
                                        borderRadius: 50, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}>
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════════
// ROI CALCULATOR — Slider-based funnel calculator
// ═══════════════════════════════════════════════════════════
function ROICalculator({ onAssessmentClick }) {
    const [leadCount, setLeadCount] = useState(50);
    const [leadToBooked, setLeadToBooked] = useState(60);
    const [bookedToShow, setBookedToShow] = useState(70);
    const [showToClose, setShowToClose] = useState(70);
    const [ltv, setLtv] = useState(4500);
    const [adSpend, setAdSpend] = useState(3000);

    const bookingFee = 49;
    const showFee = 199;

    const appointmentCount = Math.round(leadCount * (leadToBooked / 100));
    const showUpCount = Math.round(appointmentCount * (bookedToShow / 100));
    const closedCount = Math.round(showUpCount * (showToClose / 100));

    const revenue = closedCount * ltv;
    const perfFee = (appointmentCount * bookingFee) + (showUpCount * showFee);
    const totalCost = perfFee + adSpend;
    const profit = revenue - totalCost;
    const roi = totalCost > 0 ? Math.round((profit / totalCost) * 100) : 0;

    const sliderTrack = (value, max = 100) => ({
        background: `linear-gradient(to right, ${BRAND.teal} 0%, ${BRAND.teal} ${(value / max) * 100}%, #e5e7eb ${(value / max) * 100}%, #e5e7eb 100%)`,
    });

    const SliderField = ({ label, value, onChange, min = 0, max = 100, step = 1, suffix = '%', icon }) => {
        const inputRef = React.useRef(null);
        const displayRef = React.useRef(null);
        const isDragging = React.useRef(false);

        // Keep the display in sync without re-rendering
        const updateDisplay = (val) => {
            if (displayRef.current) {
                displayRef.current.textContent = suffix === '$' ? `$${Number(val).toLocaleString()}` : `${val}${suffix}`;
            }
        };

        // On touch/mouse start, switch to uncontrolled mode
        const handleStart = () => {
            isDragging.current = true;
        };

        // While dragging, only update the display text — no React state
        const handleInput = (e) => {
            updateDisplay(e.target.value);
        };

        // On release, commit the final value to React state
        const handleEnd = () => {
            if (isDragging.current && inputRef.current) {
                isDragging.current = false;
                onChange(+inputRef.current.value);
            }
        };

        // Sync input when value changes from outside (e.g. initial render)
        React.useEffect(() => {
            if (inputRef.current && !isDragging.current) {
                inputRef.current.value = value;
                updateDisplay(value);
            }
        }, [value]);

        return (
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <label style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {icon} {label}
                    </label>
                    <span ref={displayRef} style={{
                        fontSize: 22, fontWeight: 800, color: BRAND.teal,
                        background: 'rgba(15,118,110,0.08)', padding: '4px 14px', borderRadius: 8,
                    }}>{suffix === '$' ? `$${value.toLocaleString()}` : `${value}${suffix}`}</span>
                </div>
                <input ref={inputRef} type="range" min={min} max={max} step={step} defaultValue={value}
                    onInput={handleInput}
                    onTouchStart={handleStart}
                    onMouseDown={handleStart}
                    onTouchEnd={handleEnd}
                    onMouseUp={handleEnd}
                    onChange={handleEnd}
                    style={{
                        width: '100%', height: 8, borderRadius: 4, appearance: 'none',
                        cursor: 'pointer', outline: 'none', touchAction: 'none',
                        ...sliderTrack(value, max),
                    }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{suffix === '$' ? `$${min.toLocaleString()}` : `${min}${suffix}`}</span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{suffix === '$' ? `$${max.toLocaleString()}` : `${max}${suffix}`}</span>
                </div>
            </div>
        );
    };

    return (
        <section id="calculator" style={{ padding: '80px 24px', background: BRAND.lightBg }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 12, fontFamily: 'Georgia,serif' }}>
                    Calculate Your ROI
                </h2>
                <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 600, margin: '0 auto 40px' }}>
                    Drag the sliders to model your clinic's patient funnel and see your projected profit.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, alignItems: 'start' }}>
                    {/* INPUT PANEL */}
                    <div style={{ background: 'white', padding: 28, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'left' }}>
                        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8, color: BRAND.dark }}>
                            <Calculator size={20} color={BRAND.teal} /> Your Funnel Inputs
                        </h3>

                        {/* Leads — number input */}
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <label style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Activity size={16} color={BRAND.teal} /> Leads Per Month
                                </label>
                            </div>
                            <input type="number" value={leadCount} min={1}
                                onChange={e => setLeadCount(Math.max(1, +e.target.value || 1))}
                                style={{
                                    width: '100%', height: 52, padding: '0 16px', border: `2px solid #e5e7eb`,
                                    borderRadius: 12, fontSize: 24, fontWeight: 800, color: BRAND.dark,
                                    outline: 'none', fontFamily: 'inherit', textAlign: 'center',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = BRAND.teal}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                            <span style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic', display: 'block', marginTop: 4 }}>
                                Total leads from your ad campaigns
                            </span>
                        </div>

                        {/* Funnel Sliders */}
                        <SliderField label="Lead → Booked Appointment" value={leadToBooked} onChange={setLeadToBooked}
                            icon={<Target size={16} color={BRAND.teal} />} />
                        <SliderField label="Booked → Shows Up" value={bookedToShow} onChange={setBookedToShow}
                            icon={<Users size={16} color={BRAND.teal} />} />
                        <SliderField label="Shows Up → Closes" value={showToClose} onChange={setShowToClose}
                            icon={<Award size={16} color={BRAND.teal} />} />

                        {/* LTV Slider */}
                        <SliderField label="Avg. Patient Lifetime Value" value={ltv} onChange={setLtv}
                            min={1000} max={15000} step={250} suffix="$"
                            icon={<TrendingUp size={16} color={BRAND.teal} />} />

                        {/* Ad Spend */}
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <label style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <DollarSign size={16} color={BRAND.teal} /> Monthly Ad Spend
                                </label>
                            </div>
                            <input type="number" value={adSpend} min={0}
                                onChange={e => setAdSpend(Math.max(0, +e.target.value || 0))}
                                style={{
                                    width: '100%', height: 52, padding: '0 16px', border: '2px solid #e5e7eb',
                                    borderRadius: 12, fontSize: 24, fontWeight: 800, color: BRAND.dark,
                                    outline: 'none', fontFamily: 'inherit', textAlign: 'center',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = BRAND.teal}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                            <span style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic', display: 'block', marginTop: 4 }}>
                                Your monthly ad budget (Meta, Google, etc.)
                            </span>
                        </div>
                    </div>

                    {/* RESULTS PANEL */}
                    <div>
                        {/* Funnel Flow */}
                        <div style={{ background: 'white', padding: 24, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 16, textAlign: 'left' }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <BarChart3 size={18} color={BRAND.teal} /> Your Funnel Breakdown
                            </h3>
                            {[
                                { label: 'Leads', value: leadCount, color: '#6366f1' },
                                { label: 'Appointments Booked', value: appointmentCount, color: '#0ea5e9' },
                                { label: 'Patients Show Up', value: showUpCount, color: '#f59e0b' },
                                { label: 'Patients Closed', value: closedCount, color: '#22c55e' },
                            ].map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'white',
                                        background: step.color, flexShrink: 0,
                                    }}>{step.value}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{step.label}</div>
                                        <div style={{
                                            height: 6, borderRadius: 3, marginTop: 4,
                                            background: '#f3f4f6', overflow: 'hidden',
                                        }}>
                                            <div style={{
                                                height: '100%', borderRadius: 3,
                                                width: `${leadCount > 0 ? (step.value / leadCount) * 100 : 0}%`,
                                                background: step.color, transition: 'width 0.3s ease',
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Financial Results */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                            <div style={{ background: 'white', padding: 18, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#9ca3af', textTransform: 'uppercase' }}>REVENUE</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: BRAND.teal }}>${revenue.toLocaleString()}</div>
                            </div>
                            <div style={{ background: 'white', padding: 18, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#9ca3af', textTransform: 'uppercase' }}>AD SPEND</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#374151' }}>${adSpend.toLocaleString()}</div>
                            </div>
                            <div style={{ background: 'white', padding: 18, borderRadius: 12, textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#9ca3af', textTransform: 'uppercase' }}>PERF. FEES</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#374151' }}>${perfFee.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Profit breakdown */}
                        <div style={{ background: 'white', padding: 24, borderRadius: 14, border: `2px solid ${profit > 0 ? '#22c55e' : '#ef4444'}`, position: 'relative' }}>
                            <div style={{
                                position: 'absolute', top: -12, left: 20, background: profit > 0 ? '#22c55e' : '#ef4444', color: 'white',
                                padding: '4px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                            }}>{profit > 0 ? 'NET PROFIT' : 'NET LOSS'}</div>

                            <div style={{ paddingTop: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 4 }}>Your Estimated Profit</div>
                                <div style={{ fontSize: 48, fontWeight: 800, color: profit > 0 ? '#0d9488' : '#ef4444' }}>
                                    ${profit.toLocaleString()}
                                </div>
                                <div style={{ fontSize: 14, color: '#9ca3af', marginTop: 4 }}>{roi}% ROI</div>
                            </div>
                        </div>

                        <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
                            *Performance fees: ${bookingFee}/booked + ${showFee}/show. Ad spend included in total cost.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: 40 }}>
                    <button onClick={onAssessmentClick} style={{
                        padding: '16px 48px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 50,
                        cursor: 'pointer', boxShadow: '0 8px 30px rgba(197,184,150,0.5)',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                        See If You Qualify <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <style>{`
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    outline: none;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px; height: 24px; border-radius: 50%;
                    background: ${BRAND.teal}; cursor: grab;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    margin-top: -8px;
                }
                input[type="range"]::-webkit-slider-thumb:active {
                    cursor: grabbing;
                    transform: scale(1.15);
                    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
                }
                input[type="range"]::-moz-range-thumb {
                    width: 24px; height: 24px; border-radius: 50%;
                    background: ${BRAND.teal}; cursor: grab;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }
                input[type="range"]::-moz-range-thumb:active {
                    cursor: grabbing;
                    transform: scale(1.15);
                }
                input[type="range"]::-webkit-slider-runnable-track {
                    height: 8px;
                    border-radius: 4px;
                }
                input[type="range"]::-moz-range-track {
                    height: 8px;
                    border-radius: 4px;
                }
            `}</style>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════════
const FAQ_DATA = [
    {
        q: 'How does the performance-based model work?',
        a: 'You only pay when we deliver results. There are two fees: $49 when a qualified patient books an in-person consultation, and $199 when that patient actually shows up at your clinic. If we don\'t generate bookings, you don\'t pay. It\'s that simple.',
    },
    {
        q: 'Do I still need to pay for ad spend?',
        a: 'Yes — ad spend goes directly to Meta (Facebook/Instagram) and is separate from our performance fees. We recommend a minimum of $3,000/month in ad spend to generate meaningful volume. You control the budget, we optimize the campaigns.',
    },
    {
        q: 'How quickly will I start seeing results?',
        a: 'Most clinics see their first booked appointments within the first 7–14 days of launching. Results compound over time as we optimize your campaigns, refine targeting, and build retargeting audiences. Months 2–3 typically show significant improvement.',
    },
    {
        q: 'What makes you different from other marketing agencies?',
        a: 'Three things: (1) We exclusively serve cash-pay Ketamine and TMS clinics — our funnels, copy, and targeting are purpose-built for your exact patient. (2) We only get paid when you get results. (3) We limit ourselves to 5 active clinic partners to ensure deep, focused attention on each.',
    },
    {
        q: 'What if a patient books but doesn\'t show up?',
        a: 'You only pay the $49 booking fee for that appointment. The $199 show fee is only charged when the patient physically arrives at your clinic. We also implement automated reminder sequences (SMS + email) to maximize show rates.',
    },
    {
        q: 'Is there a long-term contract?',
        a: 'No. We work on a month-to-month basis. Our performance-based model means we have to earn your business every single month. If we\'re not delivering, you can walk away — no cancellation fees, no penalties.',
    },
    {
        q: 'How do I get started?',
        a: 'Click "See If You Qualify" to complete a short assessment. If your clinic is a good fit, we\'ll schedule a strategy call to walk through your goals, review your current marketing, and outline a custom plan. The onboarding process takes about 5–7 business days from start to first ad live.',
    },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section style={{ padding: '80px 24px', background: 'white' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h2 style={{ fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 12, fontFamily: 'Georgia,serif' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                    <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 500, margin: '0 auto' }}>
                        Everything you need to know about working with us.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {FAQ_DATA.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i}
                                style={{
                                    border: `1px solid ${isOpen ? BRAND.teal : '#e5e7eb'}`,
                                    borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s',
                                    boxShadow: isOpen ? '0 4px 16px rgba(15,118,110,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// MAIN CASH OFFER PAGE
// ═══════════════════════════════════════════════════════════
export default function CashOffer() {
    const [modalOpen, setModalOpen] = useState(false);
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);

    useEffect(() => {
        document.title = 'LivForMor Media — Performance-Based Patient Generation for Cash-Pay Clinics';
        const handleScroll = () => setShowFloatingCTA(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = () => setModalOpen(true);

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
                    <img src={LOGO_URL} alt="LivForMor Media"
                        style={{ height: 64, margin: '0 auto 40px', opacity: 0.9, filter: 'brightness(0) invert(1)' }} />

                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                        padding: '8px 24px', borderRadius: 50, fontSize: 14, fontWeight: 600,
                        letterSpacing: 1, textTransform: 'uppercase', marginBottom: 32,
                        border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                        <Stethoscope size={16} color={BRAND.gold} /> Exclusively for Cash-Pay Ketamine & TMS Clinics
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(32px,5vw,68px)', fontWeight: 700, lineHeight: 1.1,
                        marginBottom: 48, fontFamily: 'Georgia,serif',
                    }}>
                        Stop Paying Marketing Retainers.<br />
                        <span style={{ color: BRAND.gold }}>Start Paying For Actual Growth.</span>
                    </h1>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 40px', marginBottom: 48 }}>
                        {[
                            { icon: <CheckCircle size={18} color={BRAND.gold} />, text: 'Cash-Pay Clinics Only' },
                            { icon: <XCircle size={18} color={BRAND.gold} />, text: 'No Retainers Ever' },
                            { icon: <XCircle size={18} color={BRAND.gold} />, text: 'No Long-Term Contracts' },
                            { icon: <CheckCircle size={18} color={BRAND.gold} />, text: 'You Only Pay Per Result' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#d1d5db' }}>
                                {item.icon} {item.text}
                            </div>
                        ))}
                    </div>

                    <button onClick={() => scrollTo('pricing')} style={{
                        padding: '18px 44px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 12,
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                        boxShadow: '0 8px 30px rgba(197,184,150,0.4)',
                    }}>
                        See How The Performance Model Works <ChevronDown size={20} />
                    </button>
                </div>
            </section>


            {/* ─── PRICING MODEL ─────────────────────────── */}
            <section id="pricing" style={{ padding: '96px 24px', background: 'white' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 12, fontFamily: 'Georgia,serif' }}>
                        The Performance Model
                    </h2>
                    <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                    <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, margin: '0 auto 48px' }}>
                        You only pay when we deliver. No setup fees. No retainers. No contracts.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                        <div style={{
                            background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 16, padding: 32,
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute', top: 16, right: 16, background: '#22c55e', color: 'white',
                                padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                            }}>STEP 01</div>
                            <div style={{ fontSize: 48, fontWeight: 800, color: BRAND.dark, marginBottom: 8 }}>$49</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Per Booked Appointment</div>
                            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>Only paid when a patient books an in-person consultation with you.</p>

                        </div>

                        <div style={{
                            background: BRAND.dark, border: `2px solid ${BRAND.gold}`, borderRadius: 16, padding: 32,
                            position: 'relative', overflow: 'hidden', color: 'white',
                        }}>
                            <div style={{
                                position: 'absolute', top: 16, right: 16, background: BRAND.gold, color: BRAND.dark,
                                padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                            }}>STEP 02</div>
                            <div style={{ fontSize: 48, fontWeight: 800, marginBottom: 8 }}>$199</div>
                            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Per Attended Appointment</div>
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 16, lineHeight: 1.5 }}>Only paid when the patient actually shows up to your clinic.</p>

                        </div>
                    </div>

                    <div style={{ marginTop: 40 }}>
                        <button onClick={openModal} style={{
                            padding: '16px 48px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                            color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 50,
                            cursor: 'pointer', boxShadow: '0 8px 30px rgba(197,184,150,0.4)',
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                        }}>
                            See If You Qualify <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>


            {/* ─── ROI CALCULATOR ────────────────────────── */}
            <ROICalculator onAssessmentClick={openModal} />

            {/* ─── BELIEF BRIDGE ─────────────────────────── */}
            <BeliefBridgeSection />

            {/* ─── CARE FRAMEWORK ───────────────────────── */}
            <CareFrameworkSection />


            {/* ─── WHY SECTION ─────────────────────────────── */}
            <section style={{ padding: '96px 24px', background: 'white' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 36, fontWeight: 700, color: BRAND.dark, textAlign: 'center',
                        marginBottom: 12, fontFamily: 'Georgia,serif',
                    }}>
                        Why Cash-Pay Clinics Choose Us
                    </h2>
                    <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 48px' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
                        {[
                            { icon: <DollarSign size={24} />, title: 'Zero Risk', desc: 'No retainers, no setup fees. You invest in ad spend — we invest our time, tech, and talent. We only get paid when you get patients.' },
                            { icon: <Target size={24} />, title: 'Cash-Pay Specialists', desc: 'We exclusively serve cash-pay Ketamine and TMS clinics. Our systems, copy, and funnels are built for your exact patient.' },
                            { icon: <Users size={24} />, title: 'Full-Stack System', desc: 'Ads, landing pages, CRM automation, appointment booking, and AI-powered follow-up — all done for you. Not just leads, but patients in chairs.' },
                            { icon: <Zap size={24} />, title: 'Speed To Result', desc: 'Most clients see their first booked appointments within 72 hours of launch. We move fast because our revenue depends on your success.' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: 28, borderRadius: 16, border: '1px solid #e5e7eb',
                                background: '#fafafa', transition: 'box-shadow 0.3s',
                            }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', background: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.dark})`,
                                    color: 'white', marginBottom: 16,
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── FOUNDER SECTION ───────────────────────── */}
            <FounderStorySection />


            {/* ─── QUALIFICATION CRITERIA ────────────────── */}
            <section style={{ padding: '96px 24px', background: 'white' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 12, fontFamily: 'Georgia,serif' }}>
                        Partnership Criteria
                    </h2>
                    <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                    <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, margin: '0 auto 48px' }}>
                        We only accept cash-pay clinics where we're confident we can deliver exceptional results.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 800, margin: '0 auto' }}>
                        <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 16, padding: 28, textAlign: 'left' }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#16a34a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <CheckCircle size={20} /> We're A Great Fit If...
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: 15, color: '#374151' }}>
                                {[
                                    'You offer cash-pay Ketamine or TMS',
                                    'Your clinic is currently operational',
                                    'You have $3,000+/mo for ad spend',
                                    'You have intake staff or a team',
                                    'You want a performance-based partner',
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                                        <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 3 }} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ background: '#fef2f2', border: '2px solid #fecaca', borderRadius: 16, padding: 28, textAlign: 'left' }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#dc2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <XCircle size={20} /> Not A Fit If...
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: 15, color: '#374151' }}>
                                {[
                                    'Your clinic isn\'t open yet',
                                    'Your ad budget is under $3,000/month',
                                    'You\'re a solo provider with no support staff',
                                    'You offer insurance-based services only',
                                    'You don\'t offer cash-pay treatments',
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                                        <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 3 }} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* ─── FAQ SECTION ──────────────────────────────── */}
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
                        ⚡ Limited Capacity — We Only Take 6 Clinics Per Month
                    </div>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, fontFamily: 'Georgia,serif' }}>
                        Ready to Fill Your Schedule with Cash-Pay Patients?
                    </h2>
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
                        Take the free qualification assessment. If you're a fit, we'll build your custom patient generation plan — for free.
                    </p>
                    <button onClick={openModal} style={{
                        padding: '18px 48px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 50,
                        cursor: 'pointer', boxShadow: '0 8px 30px rgba(197,184,150,0.4)',
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                        Take The Assessment <ArrowRight size={20} />
                    </button>
                </div>
            </section>


            {/* ─── FLOATING CTA ──────────────────────────── */}
            {showFloatingCTA && (
                <div style={{
                    position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 50, animation: 'fadeInUp 0.3s ease',
                }}>
                    <button onClick={openModal} style={{
                        padding: '14px 32px', background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 50,
                        cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <ShieldCheck size={18} /> See If You Qualify
                    </button>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>

            <AssessmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}
