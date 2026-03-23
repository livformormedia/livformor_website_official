import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SUPABASE_STORAGE_URL = 'https://yrfobzuiqcuhylstiukn.supabase.co/storage/v1/object/public/blueprints';

export default function DashboardViewer() {
    const [searchParams] = useSearchParams();
    const file = searchParams.get('file');
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!file) {
            setError('No dashboard file specified. Please check your tracking link.');
            setLoading(false);
            return;
        }

        const fetchDashboard = async () => {
            try {
                const res = await fetch(`${SUPABASE_STORAGE_URL}/${file}`);
                if (!res.ok) throw new Error('Dashboard could not be found or has expired.');
                const text = await res.text();

                // Inject a <base> tag so relative paths like "audio.mp3" resolve directly to Supabase Storage
                const folderPath = file.split('/').slice(0, -1).join('/') + '/';
                const baseUrl = `${SUPABASE_STORAGE_URL}/${folderPath}`;

                const htmlWithBase = text.replace('<head>', `<head><base href="${baseUrl}">`);
                setHtmlContent(htmlWithBase);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [file]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#08080c] flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-6"></div>
                <h2 className="text-[#D4AF37] text-xl font-bold tracking-wider uppercase">Loading Dashboard...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#08080c] flex flex-col items-center justify-center p-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-lg text-center backdrop-blur-md">
                    <h2 className="text-[#D4AF37] text-2xl font-bold mb-4">Dashboard Not Found</h2>
                    <p className="text-white/80 mb-8">{error}</p>
                    <a href="/" className="inline-block bg-[#6B2FA0] hover:bg-[#52237a] text-white px-8 py-3 rounded-full font-bold transition-all">
                        Return Homepage
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-[#08080c]">
            <iframe
                srcDoc={htmlContent}
                className="w-full h-full border-none"
                title="LivForMor Clinic Dashboard"
                sandbox="allow-scripts allow-same-origin allow-downloads"
            />
        </div>
    );
}
