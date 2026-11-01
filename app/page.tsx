'use client';

import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/components/LanguageProvider';
import HomePage from '@/components/HomePage';
import { normalizeSiteData, type SiteData } from '@/lib/site-data';
import { DEMO_DATA } from '@/lib/demo-data';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const apiUrl = (path: string) => `${API_BASE}${path}`;

export default function Page() {
  const [initialData, setInitialData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  // isDemoMode is true when the API is unavailable — shows a subtle banner
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl('/api/get_content.php'), {
          signal: controller.signal,
        });

        if (!res.ok) {
          // API returned an error — fall back to demo data
          console.warn(
            `[Portfolio] API returned ${res.status}. Showing demo data.`
          );
          setInitialData(DEMO_DATA);
          setIsDemoMode(true);
          return;
        }

        const apiData = await res.json();
        setInitialData(normalizeSiteData(apiData));
        setIsDemoMode(false);
      } catch (error) {
        if ((error as Error)?.name === 'AbortError') {
          return;
        }
        // Network error or no backend — fall back to demo data
        console.warn(
          '[Portfolio] Could not reach API. Showing demo / preview data.',
          error
        );
        setInitialData(DEMO_DATA);
        setIsDemoMode(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <LanguageProvider>
      {/* Demo mode banner — only visible when running without a backend */}
      {isDemoMode && (
        <div className="sticky top-0 left-0 right-0 z-[9999] bg-amber-500 text-black text-center text-xs font-semibold py-2 px-4">
          👋 Preview mode — showing demo data. Set up the admin panel to publish your own content.{' '}
          <a
            href="https://github.com/pawan-joshee/portfolio-website-for-graphic-designers/blob/main/docs/ADMIN_SETUP.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Setup guide →
          </a>
        </div>
      )}
      <HomePage initialData={initialData!} />
    </LanguageProvider>
  );
}
