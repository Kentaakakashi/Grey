import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        // 👉 Replace with your name and description
        name: 'Your Name | Graphic Designer Portfolio',
        short_name: 'Portfolio',
        description:
            'Graphic designer specializing in brand identity, visual storytelling, and creative design. Available for freelance projects worldwide.',
        start_url: '/',
        display: 'standalone',
        background_color: '#050505',
        theme_color: '#050505',
        lang: 'en',
        icons: [],
    };
}
