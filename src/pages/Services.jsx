import React, { useState, useEffect, useRef } from 'react';
import LiquidGradient from '../components/ui/flow-gradient-hero-section';
import {
    Brain, Target, Radio, BookOpen, ArrowRight, CheckCircle,
    ShieldCheck, Users, Zap, TrendingUp, Heart, Eye, Lightbulb,
    HandHeart, ChevronDown, ChevronUp, Sparkles, Star, X,
    ArrowDown, Phone, Mail, Building2, Stethoscope, Award,
    Clock, Gift, Flame, Calendar, MessageSquare, DollarSign, Menu,
    XCircle
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

const BOOKING_LINK = 'https://api.leadconnectorhq.com/widget/booking/BoIzcOY27dpoXaayB9sV';

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
    };
}

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Qualification Logic ───────────────────────────────────
function isQualified(data) {
    if (data.clinicOperational === 'no' || data.clinicOperational === 'planning') return false;
    if (data.monthlyBudget === '0-2000') return false;
    if (data.teamStructure === 'solo') return false;
    if (data.services.length === 0) return false;
    return true;
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
            source_page: 'services',
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
                    content_name: 'Services Assessment',
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
                        content_name: 'Services Assessment',
                        content_category: 'Qualified',
                        value: 0, currency: 'USD',
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
        textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center',
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
                            ? 'Answer 4 quick questions to see if your clinic qualifies.'
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
                                            { value: 'full-team', label: 'We have a full clinical & admin team' },
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
                                    Continue <ArrowRight size={20} />
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
                                            I agree to receive SMS and email communications from LivForMor Media. Msg & data rates may apply. I know I can remove myself at any moment.
                                        </span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
                                    <button type="button" onClick={() => setStep(1)} style={{
                                        padding: '14px 24px', border: '1px solid #d1d5db', borderRadius: 50,
                                        fontWeight: 700, color: '#6b7280', background: 'white',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                                    }}>
                                        <ArrowDown size={18} style={{ transform: 'rotate(90deg)' }} /> Back
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
// HERO SECTION — WOW-FACTOR REDESIGN
// ═══════════════════════════════════════════════════════════

// Animated stat counter hook
function useCountUp(end, duration = 2000, startDelay = 800) {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            let start = 0;
            const startTime = performance.now();
            const step = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * end));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, startDelay);
        return () => clearTimeout(timeout);
    }, [end, duration, startDelay]);
    return count;
}

// Floating gold particles
function HeroParticles() {
    const particles = React.useMemo(() =>
        Array.from({ length: 24 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: 2 + Math.random() * 3,
            delay: Math.random() * 6,
            duration: 4 + Math.random() * 5,
            opacity: 0.15 + Math.random() * 0.35,
        })), []);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: 'absolute',
                    left: `${p.left}%`, top: `${p.top}%`,
                    width: p.size, height: p.size,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${BRAND.gold}, transparent)`,
                    opacity: p.opacity,
                    animation: `heroParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                }} />
            ))}
        </div>
    );
}

// Glowing orbs behind text
function HeroOrbs() {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Large gold orb — top left */}
            <div style={{
                position: 'absolute', left: '-5%', top: '10%',
                width: 400, height: 400, borderRadius: '50%',
                background: `radial-gradient(circle, rgba(197,184,150,0.12) 0%, transparent 70%)`,
                filter: 'blur(60px)',
                animation: 'heroOrbPulse 6s ease-in-out infinite',
            }} />
            {/* Teal orb — bottom right */}
            <div style={{
                position: 'absolute', right: '-8%', bottom: '5%',
                width: 500, height: 500, borderRadius: '50%',
                background: `radial-gradient(circle, rgba(11,43,46,0.25) 0%, transparent 70%)`,
                filter: 'blur(80px)',
                animation: 'heroOrbPulse 8s ease-in-out 2s infinite',
            }} />
            {/* Small bright gold accent — center right */}
            <div style={{
                position: 'absolute', right: '15%', top: '30%',
                width: 200, height: 200, borderRadius: '50%',
                background: `radial-gradient(circle, rgba(197,184,150,0.18) 0%, transparent 70%)`,
                filter: 'blur(40px)',
                animation: 'heroOrbPulse 5s ease-in-out 1s infinite',
            }} />
        </div>
    );
}

function HeroSection() {
    const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });
    const sectionRef = React.useRef(null);

    const handleMouseMove = React.useCallback((e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    }, []);

    // Parallax offsets from center (subtle)
    const px = (mousePos.x - 0.5) * 20;
    const py = (mousePos.y - 0.5) * 12;

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background: BRAND.dark,
            }}
        >
            {/* LiquidGradient base */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <LiquidGradient />
            </div>

            {/* Glowing orbs */}
            <HeroOrbs />

            {/* Floating particles */}
            <HeroParticles />

            {/* Main content */}
            <div style={{
                position: 'relative', zIndex: 3,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                padding: '120px 24px 100px',
                minHeight: '100vh',
            }}>
                {/* Subtle grid overlay */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.03,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }} />

                {/* Logo — slides down */}
                <div style={{
                    animation: 'heroSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    opacity: 0,
                    transform: `translate(${px * 0.3}px, ${py * 0.3}px)`,
                }}>
                    <img src={LOGO_URL} alt="LivForMor Media"
                        style={{ height: 48, marginBottom: 40, filter: 'brightness(1.15) drop-shadow(0 0 20px rgba(197,184,150,0.3))' }} />
                </div>

                {/* Badge — pops in */}
                <div style={{
                    animation: 'heroPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards',
                    opacity: 0,
                    transform: `translate(${px * 0.2}px, ${py * 0.2}px)`,
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(197,184,150,0.25)', borderRadius: 50,
                        padding: '10px 24px', marginBottom: 36, fontSize: 14,
                        fontWeight: 600, color: BRAND.gold,
                        boxShadow: '0 0 30px rgba(197,184,150,0.1)',
                        animation: 'heroBadgeGlow 3s ease-in-out infinite',
                    }}>
                        <Sparkles size={16} style={{ animation: 'heroSparkleRotate 3s linear infinite' }} />
                        For Spravato, Ketamine & TMS Clinics
                    </div>
                </div>

                {/* Headline — cinematic split entrance with parallax */}
                <div style={{
                    transform: `translate(${px * 0.5}px, ${py * 0.5}px)`,
                    transition: 'transform 0.15s ease-out',
                }}>
                    <h1 style={{
                        fontSize: 'clamp(34px, 5.5vw, 68px)', fontWeight: 800,
                        color: 'white', lineHeight: 1.08, maxWidth: 850, marginBottom: 28,
                        letterSpacing: '-0.03em',
                    }}>
                        <span style={{
                            display: 'inline-block',
                            animation: 'heroWordSlideRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards',
                            opacity: 0,
                        }}>We Get You </span>
                        <span style={{
                            display: 'inline-block',
                            background: `linear-gradient(135deg, ${BRAND.gold}, #e8dcc0, ${BRAND.gold})`,
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'heroWordSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards, heroShimmer 3s ease-in-out 2s infinite',
                            opacity: 0,
                        }}>10-15 Qualified Patients</span>{' '}
                        <span style={{
                            display: 'inline-block',
                            animation: 'heroWordSlideLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards',
                            opacity: 0,
                        }}>Every Month</span>{' '}
                        <span style={{
                            display: 'inline-block',
                            animation: 'heroWordFadeIn 1s ease 1s forwards',
                            opacity: 0,
                        }}>— Or You Don't Pay</span>
                    </h1>
                </div>

                {/* Subtitle — fades in */}
                <div style={{
                    animation: 'heroFadeUp 0.8s ease 1.1s forwards',
                    opacity: 0,
                    transform: `translate(${px * 0.15}px, ${py * 0.15}px)`,
                }}>
                    <p style={{
                        fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.75)',
                        maxWidth: 620, lineHeight: 1.7, marginBottom: 48,
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                        Most clinic ads fail because they market treatments like products.
                        We use psychology-first marketing to make patients <em style={{ fontStyle: 'italic', color: BRAND.gold }}>believe</em> they can heal — before they ever walk through your door.
                    </p>
                </div>


                {/* CTA — scrolls to PROCESS section, not contact */}
                <div style={{
                    animation: 'heroCtaEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards',
                    opacity: 0,
                }}>
                    <button onClick={() => scrollTo('problem')} style={{
                        background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                        color: BRAND.dark, border: 'none', borderRadius: 50,
                        padding: '20px 44px', fontSize: 18, fontWeight: 800,
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12,
                        boxShadow: '0 8px 32px rgba(197,184,150,0.3)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        animation: 'heroCtaGlow 2.5s ease-in-out 3s infinite',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 16px 48px rgba(197,184,150,0.5)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(197,184,150,0.3)';
                        }}
                    >
                        {/* Shine sweep overlay */}
                        <span style={{
                            position: 'absolute', top: 0, left: '-100%',
                            width: '100%', height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            animation: 'heroButtonSweep 3s ease-in-out 3.5s infinite',
                        }} />
                        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                            See How We Help Clinics Grow <ArrowRight size={18} />
                        </span>
                    </button>
                </div>

                {/* Qualifying bullets — subtle, below CTA */}
                <div style={{
                    animation: 'heroFadeUp 0.6s ease 2.2s forwards',
                    opacity: 0,
                    marginTop: 32,
                }}>
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center',
                        maxWidth: 700,
                    }}>
                        {[
                            'No long-term contracts',
                            'Ketamine, Spravato & TMS clinics',
                            '$2,000/mo min ad budget',
                        ].map((bullet, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500,
                            }}>
                                <CheckCircle size={14} color={BRAND.gold} style={{ flexShrink: 0, opacity: 0.6 }} />
                                {bullet}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={{
                    position: 'absolute', bottom: 32,
                    animation: 'heroFadeUp 0.6s ease 2.5s forwards',
                    opacity: 0,
                }}>
                    <div onClick={() => scrollTo('problem')} style={{
                        cursor: 'pointer', color: 'rgba(255,255,255,0.25)',
                        animation: 'bounce 2s infinite 3s',
                        transition: 'color 0.3s',
                    }}
                        onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                        onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                    >
                        <ArrowDown size={28} />
                    </div>
                </div>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// PROBLEM / AGITATION SECTION
// ═══════════════════════════════════════════════════════════
function ProblemSection() {
    const problems = [
        {
            icon: <X size={28} />,
            title: "You're Not Selling Furniture",
            body: "Your ads talk about FDA approvals, insurance details, and rapid relief. While accurate, they sound like every other ad for every other treatment patients have already tried — and failed.",
            color: '#ef4444',
        },
        {
            icon: <Heart size={28} />,
            title: "Patients Believe They Can't Heal",
            body: "They've been labeled 'treatment-resistant.' Depression became part of their identity. When you say 'we can help,' they think: why would your treatment be any different?",
            color: '#f59e0b',
        },
        {
            icon: <Eye size={28} />,
            title: "They Can't See the Difference",
            body: "SSRIs are FDA-approved. Therapy is FDA-approved. They tried those and it didn't work. If they already believe nothing works, no amount of clinical facts will change their mind.",
            color: '#8b5cf6',
        },
    ];

    return (
        <section id="problem" style={{
            padding: '100px 24px', background: BRAND.lightBg,
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: `rgba(15,118,110,0.08)`, border: `1px solid rgba(15,118,110,0.15)`,
                            borderRadius: 50, padding: '6px 16px', fontSize: 13,
                            fontWeight: 700, color: BRAND.teal, marginBottom: 16,
                            // @ts-ignore
                            textTransform: 'uppercase', letterSpacing: 1,
                        }}>
                            Our Process
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
                            color: BRAND.dark, lineHeight: 1.15, marginBottom: 16,
                        }}>
                            Why Your Ads Aren't Working
                        </h2>
                        <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 550, margin: '0 auto' }}>
                            It's not a budget problem. It's not a targeting problem. It's a <strong>belief</strong> problem.
                        </p>
                    </div>
                </FadeIn>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 24,
                }}>
                    {problems.map((p, i) => (
                        <FadeIn key={i} delay={i * 0.15}>
                            <div style={{
                                background: 'white', borderRadius: 20, padding: 32,
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                                height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)'; }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 14,
                                    background: `${p.color}10`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: p.color, marginBottom: 20,
                                }}>{p.icon}</div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: BRAND.dark, marginBottom: 12 }}>
                                    {p.title}
                                </h3>
                                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7 }}>
                                    {p.body}
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
// SOCIAL PROOF
// ═══════════════════════════════════════════════════════════
function SocialProofSection() {
    const stats = [
        { value: '122', label: 'Qualified Leads Generated', sub: 'In just 6 weeks' },
        { value: '$11', label: 'Cost Per Lead', sub: 'Landing page qualified leads' },
        { value: '$1M+', label: 'Ad Spend Managed', sub: 'Across 63 industries' },
        { value: '6', label: 'Clinics Per Month', sub: 'Maximum capacity by design' },
    ];

    return (
        <section style={{
            padding: '80px 24px',
            background: `linear-gradient(135deg, ${BRAND.teal}08, ${BRAND.gold}08)`,
        }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <h2 style={{
                            fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800,
                            color: BRAND.dark, marginBottom: 8,
                        }}>
                            Real Results, Not Promises
                        </h2>
                        <p style={{ fontSize: 16, color: '#6b7280' }}>
                            Numbers from actual clinic partnerships.
                        </p>
                    </div>
                </FadeIn>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 20,
                }}>
                    {stats.map((s, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div style={{
                                background: 'white', borderRadius: 16, padding: 28,
                                textAlign: 'center', border: '1px solid #e5e7eb',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{
                                    fontSize: 36, fontWeight: 900, color: BRAND.teal,
                                    marginBottom: 4, lineHeight: 1,
                                }}>{s.value}</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.dark, marginBottom: 4 }}>
                                    {s.label}
                                </div>
                                <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.sub}</div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
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
                                className="care-card"
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


function GuaranteeSection() {
    const requirements = [
        {
            icon: <TrendingUp size={20} />,
            title: 'Invest $70/day in targeted ads',
            body: 'We create, manage, and optimize everything. You just approve the budget.',
        },
        {
            icon: <Phone size={20} />,
            title: 'Have a responsive front desk',
            body: 'Call leads within 15 minutes. Speed-to-lead is the #1 factor in conversion.',
        },
        {
            icon: <Stethoscope size={20} />,
            title: 'Film authentic videos',
            body: 'We write the scripts, edit the footage, and guide you at every step. You just hit record on your phone.',
        },
    ];

    return (
        <section style={{
            padding: '100px 24px',
            background: `linear-gradient(135deg, ${BRAND.dark} 0%, #0a2f33 100%)`,
        }}>
            <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                <FadeIn>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(197,184,150,0.12)', border: '1px solid rgba(197,184,150,0.2)',
                        borderRadius: 50, padding: '6px 16px', fontSize: 13,
                        fontWeight: 700, color: BRAND.gold, marginBottom: 24,
                        textTransform: 'uppercase', letterSpacing: 1,
                    }}>
                        <ShieldCheck size={14} /> Our Guarantee
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
                        color: 'white', lineHeight: 1.15, marginBottom: 16,
                    }}>
                        10-15 Qualified Patients in 30 Days{' '}
                        <span style={{ color: BRAND.gold }}>— Or We Work For Free</span>
                    </h2>
                    <p style={{
                        fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 56,
                        maxWidth: 550, margin: '0 auto 56px',
                    }}>
                        No contracts. No obligations. Just results.
                    </p>
                </FadeIn>

                {/* Requirements */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 20, marginBottom: 56,
                }}>
                    {requirements.map((r, i) => (
                        <FadeIn key={i} delay={i * 0.12}>
                            <div style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 16, padding: 24, textAlign: 'left',
                            }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
                                }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: `${BRAND.gold}20`, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        color: BRAND.gold,
                                    }}>{r.icon}</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{r.title}</div>
                                </div>
                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                                    {r.body}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Scarcity */}
                <FadeIn delay={0.4}>
                    <div style={{
                        background: `linear-gradient(135deg, ${BRAND.gold}15, ${BRAND.gold}05)`,
                        border: `1px solid ${BRAND.gold}30`,
                        borderRadius: 16, padding: '20px 28px', display: 'inline-flex',
                        alignItems: 'center', gap: 12,
                    }}>
                        <Users size={20} color={BRAND.gold} />
                        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                            We only take <span style={{ color: BRAND.gold, fontWeight: 800 }}>6 clinics per month</span> — because we refuse to sacrifice quality for scale.
                        </span>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// PARTNERSHIP CRITERIA
// ═══════════════════════════════════════════════════════════
function PartnershipCriteriaSection() {
    return (
        <section style={{ padding: '96px 24px', background: 'white' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                <FadeIn>
                    <h2 style={{ fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 12, fontFamily: 'Georgia,serif' }}>
                        Partnership Criteria
                    </h2>
                    <div style={{ width: 80, height: 4, background: BRAND.gold, margin: '0 auto 16px' }} />
                    <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, margin: '0 auto 48px' }}>
                        We only accept cash-pay clinics where we're confident we can deliver exceptional results.
                    </p>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 800, margin: '0 auto' }}>
                        <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 16, padding: 28, textAlign: 'left' }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#16a34a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <CheckCircle size={20} /> We're A Great Fit If...
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: 15, color: '#374151' }}>
                                {[
                                    'You offer cash-pay Ketamine or TMS',
                                    'Your clinic is currently operational',
                                    'You have $2,000+/mo for ad spend',
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
                                    'Your ad budget is under $2,000/month',
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
                </FadeIn>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// INLINE ASSESSMENT FORM (Qualification + Contact)
// ═══════════════════════════════════════════════════════════
function ContactSection() {
    const [form, setForm] = useState({
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const serviceOptions = [
        'TMS Therapy', 'Ketamine Infusions', 'Spravato (Esketamine)',
        'Psychedelic-Assisted Therapy',
    ];

    const handleChange = (name, value) => {
        if (name === 'services') {
            const current = [...form.services];
            const idx = current.indexOf(value);
            if (idx > -1) current.splice(idx, 1);
            else current.push(value);
            setForm(prev => ({ ...prev, services: current }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const utms = getUTMParams();
        const qualified = isQualified(form);

        const payload = {
            ...form,
            ...utms,
            services: form.services.join(', '),
            qualified: qualified ? 'yes' : 'no',
            source_page: 'services',
            submitted_at: new Date().toISOString(),
        };

        // 1. GHL webhook
        try {
            await fetch('/api/ghl-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) { console.error('GHL error:', err); }

        // 2. Client-side FB pixel + 3. Server-side CAPI — only for qualified leads
        if (qualified) {
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Lead', {
                    content_name: 'Services Assessment',
                    content_category: 'Qualified',
                    value: 0, currency: 'USD',
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
                        email: form.email,
                        phone: form.phone,
                        firstName: form.firstName,
                        lastName: form.lastName,
                        fbc: getCookie('_fbc'),
                        fbp: getCookie('_fbp'),
                        client_ua: navigator.userAgent,
                        event_source_url: window.location.href,
                        content_name: 'Services Assessment',
                        content_category: 'Qualified',
                        value: 0, currency: 'USD',
                    }),
                });
            } catch (err) { console.error('CAPI error:', err); }
        }

        setIsSubmitting(false);

        if (qualified) {
            window.location.href = '/ThankYou';
        } else {
            window.location.href = '/ThankYouBasic';
        }
    };

    const inputStyle = {
        width: '100%', padding: '14px 16px', borderRadius: 12,
        border: '2px solid #e5e7eb', fontSize: 15, fontFamily: 'inherit',
        outline: 'none', transition: 'border-color 0.2s',
        background: 'white',
    };

    const sectionLabel = {
        fontSize: 15, fontWeight: 700, color: BRAND.dark,
        marginBottom: 10, display: 'block',
    };

    const optionCard = (selected) => ({
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
        border: `2px solid ${selected ? BRAND.teal : '#e5e7eb'}`,
        background: selected ? `${BRAND.teal}08` : 'white',
        transition: 'all 0.2s',
    });

    const isFormValid = () => (
        form.clinicOperational &&
        form.monthlyBudget &&
        form.teamStructure &&
        form.services.length > 0 &&
        form.firstName &&
        form.lastName &&
        form.email &&
        form.phone
    );

    return (
        <section id="contact" style={{
            padding: '100px 24px',
            background: `linear-gradient(180deg, ${BRAND.lightBg} 0%, #eef1f5 100%)`,
        }}>
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                <FadeIn>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: `${BRAND.teal}12`, color: BRAND.teal,
                            padding: '8px 20px', borderRadius: 50, fontSize: 13,
                            fontWeight: 700, marginBottom: 20,
                        }}>
                            <Sparkles size={14} /> LIMITED SPOTS AVAILABLE
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
                            color: BRAND.dark, marginBottom: 12,
                        }}>
                            Ready to Get More Patients?
                        </h2>
                        <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 550, margin: '0 auto' }}>
                            Complete the form below so we can understand your clinic and prepare a custom growth plan for your strategy call.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <form onSubmit={handleSubmit} style={{
                        background: 'white', borderRadius: 24,
                        padding: 'clamp(28px, 5vw, 52px)',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.06)',
                    }}>

                        {/* ── SECTION 1: Qualification ── */}
                        <div style={{
                            marginBottom: 36, paddingBottom: 32,
                            borderBottom: '1px solid #f0f0f0',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                marginBottom: 24,
                            }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: BRAND.teal, color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 14, fontWeight: 800,
                                }}>1</div>
                                <span style={{ fontSize: 17, fontWeight: 700, color: BRAND.dark }}>
                                    Tell Us About Your Clinic
                                </span>
                            </div>

                            {/* Q1: Clinic Operational */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={sectionLabel}>Is your clinic currently operational?</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {[{ value: 'yes', label: "Yes, we're open and seeing patients" },
                                    { value: 'no', label: "No, we haven't opened yet" },
                                    { value: 'planning', label: "We're in the planning phase" }].map(opt => (
                                        <label key={opt.value} style={optionCard(form.clinicOperational === opt.value)}
                                            onClick={() => handleChange('clinicOperational', opt.value)}>
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                border: `2px solid ${form.clinicOperational === opt.value ? BRAND.teal : '#d1d5db'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                {form.clinicOperational === opt.value && (
                                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.teal }} />
                                                )}
                                            </div>
                                            <span style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q2: Monthly Budget */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={sectionLabel}>What is your monthly budget to invest in ads?</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {[{ value: '0-2000', label: '$0 – $2,000/month' },
                                    { value: '2000+', label: '$2,000+/month' }].map(opt => (
                                        <label key={opt.value} style={optionCard(form.monthlyBudget === opt.value)}
                                            onClick={() => handleChange('monthlyBudget', opt.value)}>
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                border: `2px solid ${form.monthlyBudget === opt.value ? BRAND.teal : '#d1d5db'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                {form.monthlyBudget === opt.value && (
                                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.teal }} />
                                                )}
                                            </div>
                                            <span style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q3: Team Structure */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={sectionLabel}>What best describes your team?</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {[{ value: 'solo', label: 'Solo practitioner (no staff)' },
                                    { value: 'small', label: 'Small team (1-5 staff members)' },
                                    { value: 'medium', label: 'Medium team (6-15 staff members)' },
                                    { value: 'large', label: 'Large team (15+ staff members)' }].map(opt => (
                                        <label key={opt.value} style={optionCard(form.teamStructure === opt.value)}
                                            onClick={() => handleChange('teamStructure', opt.value)}>
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                border: `2px solid ${form.teamStructure === opt.value ? BRAND.teal : '#d1d5db'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                {form.teamStructure === opt.value && (
                                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.teal }} />
                                                )}
                                            </div>
                                            <span style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Q4: Services */}
                            <div>
                                <label style={sectionLabel}>What services does your clinic offer?</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                                    {serviceOptions.map(svc => {
                                        const selected = form.services.includes(svc);
                                        return (
                                            <div key={svc} onClick={() => handleChange('services', svc)} style={{
                                                padding: '10px 18px', borderRadius: 50,
                                                border: `2px solid ${selected ? BRAND.teal : '#e5e7eb'}`,
                                                background: selected ? `${BRAND.teal}10` : 'white',
                                                color: selected ? BRAND.teal : '#6b7280',
                                                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex', alignItems: 'center', gap: 6,
                                            }}>
                                                {selected && <CheckCircle size={14} />}
                                                {svc}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ── SECTION 2: Contact Details ── */}
                        <div>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                marginBottom: 24,
                            }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: BRAND.gold, color: BRAND.dark,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 14, fontWeight: 800,
                                }}>2</div>
                                <span style={{ fontSize: 17, fontWeight: 700, color: BRAND.dark }}>
                                    Your Contact Details
                                </span>
                            </div>

                            {/* Name row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                                <div>
                                    <label style={sectionLabel}>First Name *</label>
                                    <input required style={inputStyle} placeholder="John" value={form.firstName}
                                        onFocus={e => e.target.style.borderColor = BRAND.teal}
                                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                        onChange={e => handleChange('firstName', e.target.value)} />
                                </div>
                                <div>
                                    <label style={sectionLabel}>Last Name *</label>
                                    <input required style={inputStyle} placeholder="Smith" value={form.lastName}
                                        onFocus={e => e.target.style.borderColor = BRAND.teal}
                                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                        onChange={e => handleChange('lastName', e.target.value)} />
                                </div>
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={sectionLabel}>Email *</label>
                                <input required type="email" style={inputStyle} placeholder="john@yourclinic.com" value={form.email}
                                    onFocus={e => e.target.style.borderColor = BRAND.teal}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                    onChange={e => handleChange('email', e.target.value)} />
                            </div>

                            {/* Phone */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={sectionLabel}>Phone *</label>
                                <input required type="tel" style={inputStyle} placeholder="(555) 123-4567" value={form.phone}
                                    onFocus={e => e.target.style.borderColor = BRAND.teal}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                    onChange={e => handleChange('phone', e.target.value)} />
                            </div>

                            {/* Website */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={sectionLabel}>Clinic Website</label>
                                <input style={inputStyle} placeholder="https://yourclinic.com" value={form.website}
                                    onFocus={e => e.target.style.borderColor = BRAND.teal}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                    onChange={e => handleChange('website', e.target.value)} />
                            </div>

                            {/* SMS Consent */}
                            <label style={{
                                display: 'flex', alignItems: 'flex-start', gap: 12,
                                cursor: 'pointer', padding: '14px 16px', borderRadius: 12,
                                background: '#f9fafb', border: '1px solid #f0f0f0',
                                marginBottom: 28,
                            }}>
                                <input type="checkbox" checked={form.smsConsent}
                                    onChange={e => handleChange('smsConsent', e.target.checked)}
                                    style={{ marginTop: 3, accentColor: BRAND.teal, width: 18, height: 18 }} />
                                <span style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                                    I agree to receive SMS and email communications from LivForMor Media. Msg & data rates may apply.
                                </span>
                            </label>

                            {/* Submit */}
                            <button type="submit" disabled={isSubmitting || !isFormValid()} style={{
                                width: '100%', padding: '18px 24px', borderRadius: 14,
                                background: isFormValid()
                                    ? `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`
                                    : '#e5e7eb',
                                color: isFormValid() ? BRAND.dark : '#9ca3af',
                                border: 'none', fontSize: 17,
                                fontWeight: 800, cursor: (isSubmitting || !isFormValid()) ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                transition: 'all 0.3s',
                                boxShadow: isFormValid() ? '0 4px 20px rgba(197,184,150,0.3)' : 'none',
                            }} onMouseOver={e => { if (!isSubmitting && isFormValid()) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                {isSubmitting ? 'Submitting...' : 'Submit & Book My Free Strategy Call'}
                                {!isSubmitting && <ArrowRight size={18} />}
                            </button>

                            <p style={{ textAlign: 'center', fontSize: 13, color: BRAND.gold, marginTop: 16, fontWeight: 600 }}>
                                We only onboard 6 clinics a month
                            </p>
                        </div>
                    </form>
                </FadeIn>
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════
function FAQSection() {
    const [openIdx, setOpenIdx] = useState(null);

    const faqs = [
        {
            q: 'What exactly is the Belief Bridge Method?',
            a: 'It\'s a psychology-first marketing approach specifically designed for mental health clinics. Instead of leading with clinical features like "FDA Approved," we create campaigns that challenge patients\' belief that they can\'t heal, build a vision of a better life, and guide them to take action. This approach generates significantly more qualified leads because it addresses the real barrier — belief, not information.',
        },
        {
            q: 'How is this different from what other agencies do?',
            a: 'Most agencies apply the same playbook they use for dentists, chiropractors, or med spas. Mental health patients are fundamentally different — they\'ve often been labeled "treatment-resistant" and believe nothing will work. Our entire framework (Belief Bridge + C.A.R.E.) is built specifically for this unique psychology.',
        },
        {
            q: 'What does "10-15 qualified patients" actually mean?',
            a: 'These are patients who have filled out a form, been qualified through our screening process, and are genuinely seeking treatment at your clinic. Not just leads — actual people ready to book consultations.',
        },
        {
            q: 'Why do you only work with 6 clinics per month?',
            a: 'We\'re a focused team, not a factory. Each clinic gets our full creative attention — custom scripts, personalized strategy, dedicated campaign management. Scaling beyond 6 clinics would mean cutting corners, and we refuse to do that.',
        },
        {
            q: 'What do I need to do on my end?',
            a: 'Three things: (1) Approve a minimum ad budget of about $70/day. (2) Have your front desk call leads within 15 minutes. (3) Film short, authentic videos from your phone — we write every script and edit all the footage.',
        },
        {
            q: 'What if I don\'t get results?',
            a: 'If we don\'t deliver at least 10 qualified patients in 30 days, you don\'t pay us a single dime. No contracts, no obligations. We take on the risk because we\'re confident in our method.',
        },
    ];

    return (
        <section style={{ padding: '80px 24px', background: 'white' }}>
            <div style={{ maxWidth: 750, margin: '0 auto' }}>
                <FadeIn>
                    <h2 style={{
                        fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800,
                        color: BRAND.dark, textAlign: 'center', marginBottom: 48,
                    }}>
                        Frequently Asked Questions
                    </h2>
                </FadeIn>

                {faqs.map((f, i) => (
                    <FadeIn key={i} delay={i * 0.05}>
                        <div style={{
                            borderBottom: '1px solid #e5e7eb', padding: '20px 0',
                        }}>
                            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                                width: '100%', display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', background: 'none', border: 'none',
                                cursor: 'pointer', textAlign: 'left', padding: 0,
                            }}>
                                <span style={{ fontSize: 16, fontWeight: 600, color: BRAND.dark, paddingRight: 16 }}>
                                    {f.q}
                                </span>
                                <span style={{ color: '#9ca3af', flexShrink: 0 }}>
                                    {openIdx === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </span>
                            </button>
                            {openIdx === i && (
                                <p style={{
                                    fontSize: 15, color: '#6b7280', lineHeight: 1.7,
                                    marginTop: 12, paddingRight: 40,
                                }}>
                                    {f.a}
                                </p>
                            )}
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}


// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════
function PageFooter() {
    return (
        <footer style={{
            padding: '40px 24px', background: BRAND.dark,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
        }}>
            <img src={LOGO_URL} alt="LivForMor Media" style={{ height: 32, marginBottom: 16, opacity: 0.7 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                © {new Date().getFullYear()} LivForMor Media. All rights reserved.
            </p>
        </footer>
    );
}


// ═══════════════════════════════════════════════════════════
// MAIN SERVICES PAGE
// ═══════════════════════════════════════════════════════════
export default function Services() {
    const [showBanner, setShowBanner] = useState(true);
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);

    // SEO
    useEffect(() => {
        document.title = 'LivForMor Media | 10-15 Qualified Patients Monthly — Or You Don\'t Pay';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Specialized marketing for Spravato, Ketamine & TMS clinics. Using the Belief Bridge Method and C.A.R.E. Framework, we deliver 10-15 qualified patients per month — or you don\'t pay.');
        }
    }, []);

    // Show floating CTA after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingCTA(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ fontFamily: "'Nunito Sans', sans-serif", overflowX: 'hidden' }}>
            {/* CSS Animations */}
            <style>{`
                /* ═══ HERO WOW-FACTOR ANIMATIONS ═══ */
                @keyframes heroSlideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroPopIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes heroWordSlideRight {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes heroWordSlideLeft {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes heroWordSlideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroWordFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes heroShimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes heroFadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroStatSlideUp {
                    from { opacity: 0; transform: translateY(32px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes heroCtaEntrance {
                    from { opacity: 0; transform: translateY(20px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes heroCtaGlow {
                    0%, 100% { box-shadow: 0 8px 32px rgba(197,184,150,0.3); }
                    50% { box-shadow: 0 8px 48px rgba(197,184,150,0.5), 0 0 60px rgba(197,184,150,0.15); }
                }
                @keyframes heroButtonSweep {
                    0% { left: -100%; }
                    30% { left: 150%; }
                    100% { left: 150%; }
                }
                @keyframes heroParticleFloat {
                    0%, 100% { transform: translateY(0) scale(1); opacity: var(--particle-opacity, 0.3); }
                    50% { transform: translateY(-20px) scale(1.3); opacity: calc(var(--particle-opacity, 0.3) * 1.5); }
                }
                @keyframes heroOrbPulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                @keyframes heroBadgeGlow {
                    0%, 100% { box-shadow: 0 0 30px rgba(197,184,150,0.1); }
                    50% { box-shadow: 0 0 40px rgba(197,184,150,0.25), 0 0 60px rgba(197,184,150,0.08); }
                }
                @keyframes heroSparkleRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* ═══ GENERAL ANIMATIONS ═══ */
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-8px); }
                    60% { transform: translateY(-4px); }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 20px rgba(197,184,150,0.3); }
                    50% { box-shadow: 0 0 40px rgba(197,184,150,0.6), 0 0 60px rgba(197,184,150,0.2); }
                }
                @keyframes subtlePulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.85; }
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes slideInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes floatCTA {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-4px); }
                }
                @keyframes borderGlow {
                    0%, 100% { border-color: rgba(197,184,150,0.2); }
                    50% { border-color: rgba(197,184,150,0.5); }
                }
                @keyframes badgePulse {
                    0%, 100% { box-shadow: 0 0 0 0 currentColor; }
                    50% { box-shadow: 0 0 16px 4px currentColor; }
                }
                .belief-card:hover .belief-icon {
                    transform: scale(1.08) rotate(3deg);
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .care-card {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }
                .care-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(255,255,255,0.18) !important;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
                }
                .care-badge {
                    animation: badgePulse 3s ease-in-out infinite;
                }
            `}</style>

            {/* ─── URGENCY BANNER ─── */}
            {showBanner && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                    background: `linear-gradient(135deg, ${BRAND.gold} 0%, #d4c48a 50%, ${BRAND.gold} 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'gradientShift 6s ease-in-out infinite',
                    padding: '14px 24px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 12, flexWrap: 'wrap',
                    boxShadow: '0 4px 20px rgba(197,184,150,0.4)',
                }}>
                    <span style={{ fontSize: 15, color: BRAND.dark, fontWeight: 700, textAlign: 'center' }}>
                        🔥 Book within 48 hours & get <span style={{ fontWeight: 900, textDecoration: 'underline' }}>10 FREE organic video scripts</span> to warm up your leads
                    </span>
                    <button onClick={() => setShowBanner(false)} style={{
                        background: 'none', border: 'none', color: 'rgba(11,43,46,0.5)',
                        cursor: 'pointer', padding: 4, lineHeight: 1,
                    }}><X size={16} /></button>
                </div>
            )}
            {showBanner && <div style={{ height: 52 }} />}

            <HeroSection />
            <ProblemSection />
            <BeliefBridgeSection />
            <CareFrameworkSection />
            <SocialProofSection />
            <FounderStorySection />
            <GuaranteeSection />
            <PartnershipCriteriaSection />
            <ContactSection />
            <FAQSection />
            <PageFooter />

            {/* ─── FLOATING CTA BUTTON ─── */}
            {showFloatingCTA && (
                <button onClick={() => scrollTo('contact')} style={{
                    position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 999,
                    background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldDark})`,
                    color: BRAND.dark, border: 'none', borderRadius: 50,
                    padding: '16px 28px', fontSize: 15, fontWeight: 800,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 8px 32px rgba(197,184,150,0.4)',
                    animation: 'pulseGlow 2.5s ease-in-out infinite, floatCTA 3s ease-in-out infinite',
                }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateX(-50%) scale(1)'; }}
                >
                    I Want More Patients <ArrowRight size={16} />
                </button>
            )}
        </div>
    );
}
