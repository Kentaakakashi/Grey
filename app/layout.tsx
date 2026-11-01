import type { Metadata, Viewport } from 'next';
import { Poppins, Space_Grotesk } from 'next/font/google';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css'; // Global styles

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

// 👉 Replace 'https://patamde.com' with your own domain once deployed
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://patamde.com';

// 👉 Customize your site metadata below — replace all placeholder values
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Your Name | Graphic Designer Portfolio', // 👉 Replace with your name & title
    template: '%s | Your Name',                        // 👉 Replace with your name
  },
  description:
    'Graphic designer specializing in brand identity, visual storytelling, and creative design. Available for freelance projects worldwide.', // 👉 Replace with your bio
  keywords: [
    'Graphic designer portfolio',
    'Brand identity designer',
    'Visual designer',
    'Logo designer',
    'Creative portfolio',
    'Freelance graphic designer',
    'Typography design',
    'Motion graphics',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Your Name', // 👉 Replace with your name or studio name
    title: 'Your Name | Graphic Designer Portfolio',   // 👉 Replace
    description:
      'Graphic designer crafting visual experiences that resonate — branding, print, digital, and beyond.', // 👉 Replace
    images: [],
    locale: 'en_IN', // 👉 Update locale if needed (e.g., 'hi-IN')
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name | Graphic Designer Portfolio',   // 👉 Replace
    description:
      'Graphic designer crafting visual experiences that resonate — branding, print, digital, and beyond.', // 👉 Replace
    images: [],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {},
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${spaceGrotesk.variable}`}
      data-theme="dark"
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key='portfolio-theme';var stored=localStorage.getItem(key);var theme=(stored==='light'||stored==='dark')?stored:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',theme);document.documentElement.style.colorScheme=theme;}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
      </head>
      <body className="font-sans antialiased bg-[#050505] text-white" suppressHydrationWarning>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
