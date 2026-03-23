import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Load Nunito Sans from Google Fonts
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';

const SUPABASE_STORAGE_URL = 'https://yrfobzuiqcuhylstiukn.supabase.co/storage/v1/object/public/blueprints';

// Grade color mapping
const getGradeColor = (grade) => {
    if (!grade) return null;
    const g = grade.replace(/[^A-Fa-f+-]/g, '').toUpperCase();
    if (g.startsWith('A')) return { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#34d399', label: g };
    if (g.startsWith('B')) return { bg: 'rgba(16, 185, 129, 0.10)', border: '#059669', text: '#6ee7b7', label: g };
    if (g.startsWith('C')) return { bg: 'rgba(234, 179, 8, 0.12)', border: '#eab308', text: '#fde047', label: g };
    if (g.startsWith('D')) return { bg: 'rgba(239, 68, 68, 0.12)', border: '#ef4444', text: '#fca5a5', label: g };
    if (g.startsWith('F')) return { bg: 'rgba(239, 68, 68, 0.18)', border: '#dc2626', text: '#f87171', label: g };
    return null;
};

// Parse grade from heading text like "Trust: B+" or "Speed Grade: F"
const parseGradeFromText = (text) => {
    const str = typeof text === 'string' ? text : extractText(text);
    const match = str.match(/:\s*([A-Fa-f][+-]?)\s*$/);
    if (match) return match[1].toUpperCase();
    const matchGrade = str.match(/Grade:\s*([A-Fa-f][+-]?)/i);
    if (matchGrade) return matchGrade[1].toUpperCase();
    return null;
};

// Extract plain text from React children
const extractText = (children) => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(extractText).join('');
    if (children?.props?.children) return extractText(children.props.children);
    return '';
};

export default function BlueprintViewer() {
    const [searchParams] = useSearchParams();
    const file = searchParams.get('file');
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Inject Google Fonts link into <head>
    useEffect(() => {
        if (!document.querySelector(`link[href*="Nunito+Sans"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = FONT_URL;
            document.head.appendChild(link);
        }
    }, []);

    useEffect(() => {
        if (!file) {
            setError('No blueprint file specified. Please check your tracking link.');
            setLoading(false);
            return;
        }

        const fetchBlueprint = async () => {
            try {
                const res = await fetch(`${SUPABASE_STORAGE_URL}/${file}`);
                if (!res.ok) throw new Error(`HTTP Error ${res.status}: Could not fetch ${file}`);
                const text = await res.text();
                setMarkdown(text);
            } catch (err) {
                setError(`Fetch failed for file "${file}": ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBlueprint();
    }, [file]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d3b40] flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c5b896] mb-6"></div>
                <h2 className="text-[#c5b896] text-xl font-bold tracking-wider uppercase">Loading Blueprint...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0d3b40] flex flex-col items-center justify-center p-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-lg text-center backdrop-blur-md">
                    <h2 className="text-[#c5b896] text-2xl font-bold mb-4">Blueprint Not Found</h2>
                    <p className="text-white/80 mb-8">{error}</p>
                    <a href="/" className="inline-block bg-[#0f766e] hover:bg-[#0d655e] text-white px-8 py-3 rounded-full font-bold transition-all">
                        Return Homepage
                    </a>
                </div>
            </div>
        );
    }

    // Custom renderers for React Markdown to inject premium styling
    const renderers = {
        h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-extrabold text-[#c5b896] mb-8 leading-tight">{children}</h1>,

        h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold text-[#c5b896] mt-16 mb-6 pb-3 border-b-2 border-[#c5b896]/20">
                {children}
            </h2>
        ),

        h3: ({ children }) => {
            const text = extractText(children);
            const grade = parseGradeFromText(text);
            const colors = grade ? getGradeColor(grade) : null;

            if (colors) {
                // Strip grade from label text
                const labelText = text.replace(/:\s*[A-Fa-f][+-]?\s*$/, '').replace(/Grade:\s*[A-Fa-f][+-]?/i, '').trim();
                return (
                    <div style={{
                        background: colors.bg,
                        borderLeft: `4px solid ${colors.border}`,
                        borderRadius: '12px',
                        padding: '16px 20px',
                        marginTop: '24px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}>
                        <span style={{
                            background: `${colors.border}22`,
                            border: `2px solid ${colors.border}`,
                            borderRadius: '10px',
                            padding: '6px 14px',
                            fontSize: '20px',
                            fontWeight: '900',
                            color: colors.text,
                            letterSpacing: '0.05em',
                            minWidth: '50px',
                            textAlign: 'center',
                            fontFamily: '"Nunito Sans", sans-serif',
                        }}>
                            {colors.label}
                        </span>
                        <span style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#e2d5b0',
                            fontFamily: '"Nunito Sans", sans-serif',
                        }}>
                            {labelText}
                        </span>
                    </div>
                );
            }

            return <h3 className="text-xl md:text-2xl font-bold text-[#e2d5b0] mt-10 mb-4">{children}</h3>;
        },

        h4: ({ children }) => (
            <h4 className="text-lg font-bold text-[#c5b896] mt-6 mb-2">{children}</h4>
        ),

        p: ({ children }) => <p className="text-white/80 text-lg leading-relaxed mb-6">{children}</p>,

        ul: ({ children }) => <ul className="list-disc pl-6 mb-8 text-white/80 text-lg space-y-3 marker:text-[#c5b896]">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-8 text-white/80 text-lg space-y-3 marker:text-[#c5b896] font-bold">{children}</ol>,
        li: ({ children }) => <li className="pl-2"><span className="font-normal">{children}</span></li>,

        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,

        blockquote: ({ children }) => (
            <div style={{
                background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.12) 0%, rgba(13, 59, 64, 0.25) 100%)',
                borderLeft: '4px solid #14b8a6',
                borderRadius: '0 16px 16px 0',
                padding: '20px 24px',
                margin: '24px 0',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>
                <div className="text-white/90 text-lg italic leading-relaxed" style={{ fontFamily: '"Nunito Sans", sans-serif' }}>
                    {children}
                </div>
            </div>
        ),

        a: ({ href, children }) => {
            const isYouTube = href && (href.includes('youtube.com') || href.includes('youtu.be'));
            if (isYouTube) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-[#CC0000] to-[#FF0000] hover:from-[#AA0000] hover:to-[#DD0000] text-white px-8 py-3 rounded-full font-bold text-base shadow-[0_0_25px_rgba(204,0,0,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(255,0,0,0.5)] uppercase tracking-wider mt-4"
                    >
                        ▶ Watch on YouTube
                    </a>
                );
            }
            return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#2dd4bf] hover:text-white underline decoration-[#0f766e] decoration-2 underline-offset-4 transition-all">{children}</a>;
        },

        hr: () => (
            <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #c5b896 30%, #c5b896 70%, transparent 100%)',
                margin: '40px 0',
                opacity: 0.4,
            }} />
        ),

        table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-xl border border-white/10" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
                <table className="w-full text-left border-collapse">{children}</table>
            </div>
        ),
        thead: ({ children }) => (
            <thead style={{ background: 'linear-gradient(135deg, rgba(197, 184, 150, 0.15) 0%, rgba(197, 184, 150, 0.08) 100%)', borderBottom: '2px solid rgba(197, 184, 150, 0.3)' }}>
                {children}
            </thead>
        ),
        tbody: ({ children }) => <tbody className="divide-y divide-white/5">{children}</tbody>,
        tr: ({ children }) => <tr className="hover:bg-white/5 transition-colors even:bg-white/[0.02]">{children}</tr>,
        th: ({ children }) => <th className="text-[#c5b896] font-bold text-sm uppercase tracking-wider px-5 py-4">{children}</th>,
        td: ({ children }) => <td className="text-white/85 text-base px-5 py-4 leading-relaxed">{children}</td>,
    };

    return (
        <div className="min-h-screen py-12 md:py-24" style={{
            background: 'linear-gradient(170deg, #0d3b40 0%, #0a3a3f 40%, #0d3b40 100%)',
            fontFamily: '"Nunito Sans", sans-serif'
        }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Banner */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-t-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d3b40] via-[#c5b896] to-[#0d3b40]"></div>
                    <img
                        src="/images/LivForMorMediaLogo.png"
                        alt="LivForMor Media"
                        className="h-10 mx-auto mb-8 opacity-90"
                    />
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Patient Acquisition Blueprint</h1>
                    <p className="text-[#c5b896] uppercase tracking-[0.2em] font-bold text-sm md:text-base">Custom Market Research & Strategy</p>
                </div>

                {/* Main Content Body */}
                <div className="bg-[#0a3a3f]/80 backdrop-blur-md border-x border-b border-white/10 rounded-b-3xl p-8 md:p-14 shadow-2xl">
                    <div className="prose prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={renderers}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>

                    {/* Bottom Call to Action */}
                    <div className="mt-20 p-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl text-center">
                        <h2 className="text-3xl font-bold text-[#c5b896] mb-4">Want More Strategies Like This?</h2>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            We share in-depth patient acquisition strategies, market breakdowns, and growth playbooks for behavioral health clinics every week.
                        </p>
                        <a
                            href="https://www.youtube.com/@orielmor-livformormedia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-[#CC0000] to-[#FF0000] hover:from-[#AA0000] hover:to-[#DD0000] text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(204,0,0,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,0,0,0.5)] uppercase tracking-wider"
                        >
                            ▶ Watch on YouTube
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
