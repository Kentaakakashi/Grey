/**
 * Demo / fallback data for local development and open-source preview.
 *
 * This data is shown automatically when the PHP API backend is not available
 * (e.g., local dev without a database, or fresh clones by new users).
 *
 * ✏️  Customize this file to match your own portfolio before deploying,
 *     or edit everything through the admin panel once it's live.
 *
 * Built by AIrflute Technologies — patamde.com | business@patamde.com
 */

import { type SiteData, normalizeSiteData } from './site-data';

const raw = {
  settings: {
    logo_text: 'Your Name',
    logo_image_url: '',
    favicon_url: '',
    og_image_url: '',

    // 👉 Replace with your contact details
    contact_email: 'your.email@example.com',
    contact_phone: '',
    whatsapp_number: '',

    // 👉 Replace with your social profiles
    linkedin_url: '',
    instagram_url: '',
    facebook_url: '',
    x_url: '',
    youtube_url: '',

    // Images — using high-quality Unsplash photos as placeholders
    // Replace these with your own images via the admin panel
    hero_image_url:
      'https://placehold.co/1200x800/111111/FFFFFF?text=Replace+Image',
    marketing_image_url:
      'https://placehold.co/800x600/111111/FFFFFF?text=Replace+Image',
    creative_image_url:
      'https://placehold.co/800x600/111111/FFFFFF?text=Replace+Image',
    video_thumbnail_1:
      'https://placehold.co/600x450/111111/FFFFFF?text=Replace+Image',
    video_thumbnail_2:
      'https://placehold.co/600x450/111111/FFFFFF?text=Replace+Image',
    video_url_1: '',
    video_url_2: '',
  },

  // ── Editable text content ──────────────────────────────────────────────────
  content: [
    // Hero section
    { key: 'hero_tagline', en_value: 'Graphic Designer & Visual Artist', hi_value: 'ग्राफिक डिज़ाइनर और विज़ुअल आर्टिस्ट' },
    { key: 'hero_description', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },
    { key: 'hero_cta_primary', en_value: 'View My Work', hi_value: 'मेरा काम देखें' },
    { key: 'hero_cta_secondary', en_value: 'Get In Touch', hi_value: 'संपर्क करें' },
    // Hero stats line — shown below tagline
    { key: 'hero_stats_line', en_value: '5+ Years | 200+ Projects | 50+ Happy Clients', hi_value: '5+ साल | 200+ प्रोजेक्ट | 50+ खुश क्लाइंट' },
    { key: 'hero_subtitle', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },

    // About / feature blocks
    { key: 'feature1_title', en_value: 'Brand Identity', hi_value: 'ब्रांड आइडेंटिटी' },
    { key: 'feature1_desc', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },
    { key: 'feature1_tags', en_value: 'Logo Design|Color Systems|Typography', hi_value: 'लोगो डिज़ाइन|कलर सिस्टम|टाइपोग्राफी' },
    { key: 'feature2_title', en_value: 'Creative Production', hi_value: 'क्रिएटिव प्रोडक्शन' },
    { key: 'feature2_desc', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },
    { key: 'feature2_tags', en_value: 'Print Design|Digital Ads|Illustration', hi_value: 'प्रिंट डिज़ाइन|डिजिटल ऐड्स|इलस्ट्रेशन' },

    // Clients marquee
    { key: 'clients_marquee_items', en_value: 'Studio Nova|Aether Co.|Bloom Agency|Vertex Labs|Lunar Works|Drift Brand|Forma Studio|Peak Creative', hi_value: 'Studio Nova|Aether Co.|Bloom Agency|Vertex Labs|Lunar Works|Drift Brand|Forma Studio|Peak Creative' },

    // Process
    { key: 'process_step_1_title', en_value: 'Discover & Define', hi_value: 'खोज और परिभाषा' },
    { key: 'process_step_1_desc', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },
    { key: 'process_step_2_title', en_value: 'Design & Refine', hi_value: 'डिज़ाइन और परिष्करण' },
    { key: 'process_step_2_desc', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },
    { key: 'process_step_3_title', en_value: 'Deliver & Launch', hi_value: 'डिलीवरी और लॉन्च' },
    { key: 'process_step_3_desc', en_value: 'Add your text here.', hi_value: 'अपना टेक्स्ट यहाँ जोड़ें।' },

    // Why Us
    { key: 'why_typical_items', en_value: 'Generic templates, not custom work|Slow revisions with long waits|No strategic thinking, just execution|Hard to reach after project starts', hi_value: 'जेनेरिक टेम्पलेट, कस्टम काम नहीं|धीमे रिविज़न|कोई रणनीतिक सोच नहीं|प्रोजेक्ट शुरू होने के बाद संपर्क करना कठिन' },
    { key: 'why_items', en_value: 'Bespoke design, built from scratch|Fast turnaround without cutting corners|Strategy-led creative direction|Direct line to your designer, always', hi_value: 'शुरू से बना कस्टम डिज़ाइन|कोनों को काटे बिना तेज़ डिलीवरी|रणनीति-आधारित क्रिएटिव डायरेक्शन|हमेशा सीधा संपर्क' },
    { key: 'why_title', en_value: 'Pawan Joshee.', hi_value: 'पवन जोशी।' },

    // Contact modal
    { key: 'nav_contact_label', en_value: 'Let\'s Talk', hi_value: 'बात करें' },
    { key: 'contact_interest_options', en_value: 'Brand Identity & Logo|Print & Packaging|Social Media Design|Illustration & Art Direction', hi_value: 'ब्रांड आइडेंटिटी और लोगो|प्रिंट और पैकेजिंग|सोशल मीडिया डिज़ाइन|इलस्ट्रेशन और आर्ट डायरेक्शन' },

    // Footer
    { key: 'footer_services_items', en_value: 'Brand Identity|Print Design|Digital Illustration', hi_value: 'ब्रांड आइडेंटिटी|प्रिंट डिज़ाइन|डिजिटल इलस्ट्रेशन' },
  ],

  // ── Services ───────────────────────────────────────────────────────────────
  services: [
    {
      id: 1,
      icon: 'PenTool',
      en_title: 'Brand Identity',
      hi_title: 'ब्रांड आइडेंटिटी',
      en_description: 'Add your text here.',
      hi_description: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 2,
      icon: 'Target',
      en_title: 'Print & Packaging',
      hi_title: 'प्रिंट और पैकेजिंग',
      en_description: 'Add your text here.',
      hi_description: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 3,
      icon: 'Share2',
      en_title: 'Social Media Design',
      hi_title: 'सोशल मीडिया डिज़ाइन',
      en_description: 'Add your text here.',
      hi_description: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 4,
      icon: 'Zap',
      en_title: 'Ad Creatives',
      hi_title: 'ऐड क्रिएटिव',
      en_description: 'Add your text here.',
      hi_description: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 5,
      icon: 'Search',
      en_title: 'Illustration',
      hi_title: 'इलस्ट्रेशन',
      en_description: 'Add your text here.',
      hi_description: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 6,
      icon: 'Code',
      en_title: 'Motion & Animation',
      hi_title: 'मोशन और एनीमेशन',
      en_description: 'Add your text here.',
      hi_description: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
  ],

  // ── Case Studies / Portfolio ───────────────────────────────────────────────
  // NOTE: The component reads card.name, card.desc, card.metric — not en_client/en_result.
  // Fields below match exactly what HomePage.tsx expects.
  case_studies: [
    {
      id: 1,
      name: 'Studio Nova',
      desc: 'Add your text here.',
      metric: 'Architecture',
      en_client: 'Studio Nova',
      hi_client: 'Studio Nova',
      en_result: 'Add your text here.',
      hi_result: 'अपना टेक्स्ट यहाँ जोड़ें।',
      en_industry: 'Architecture',
      hi_industry: 'वास्तुकला',
      image_url: 'https://placehold.co/600x450/111111/FFFFFF?text=Replace+Image',
    },
    {
      id: 2,
      name: 'Bloom Agency',
      desc: 'Add your text here.',
      metric: 'Marketing',
      en_client: 'Bloom Agency',
      hi_client: 'Bloom Agency',
      en_result: 'Add your text here.',
      hi_result: 'अपना टेक्स्ट यहाँ जोड़ें।',
      en_industry: 'Marketing',
      hi_industry: 'मार्केटिंग',
      image_url: 'https://placehold.co/600x450/111111/FFFFFF?text=Replace+Image',
    },
    {
      id: 3,
      name: 'Vertex Labs',
      desc: 'Add your text here.',
      metric: 'Consumer Goods',
      en_client: 'Vertex Labs',
      hi_client: 'Vertex Labs',
      en_result: 'Add your text here.',
      hi_result: 'अपना टेक्स्ट यहाँ जोड़ें।',
      en_industry: 'Consumer Goods',
      hi_industry: 'उपभोक्ता वस्तुएं',
      image_url: 'https://placehold.co/600x450/111111/FFFFFF?text=Replace+Image',
    },
  ],

  // ── FAQs ──────────────────────────────────────────────────────────────────
  faqs: [
    {
      id: 1,
      en_q: 'How long does a brand identity project take?',
      hi_q: 'ब्रांड आइडेंटिटी प्रोजेक्ट में कितना समय लगता है?',
      en_a: 'Add your text here.',
      hi_a: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 2,
      en_q: 'What file formats will I receive?',
      hi_q: 'मुझे कौन से फ़ाइल फॉर्मेट मिलेंगे?',
      en_a: 'Add your text here.'ll receive all source files (AI, PSD) plus export-ready formats (SVG, PNG, PDF, WebP) for every deliverable — ready for print and digital use.',
      hi_a: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 3,
      en_q: 'How many revision rounds are included?',
      hi_q: 'कितने रिविज़न राउंड शामिल हैं?',
      en_a: 'Add your text here.'ll discuss this upfront.',
      hi_a: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 4,
      en_q: 'Do you work with international clients?',
      hi_q: 'क्या आप अंतर्राष्ट्रीय क्लाइंट के साथ काम करते हैं?',
      en_a: 'Add your text here.',
      hi_a: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
    {
      id: 5,
      en_q: 'Can I use this template for my own portfolio?',
      hi_q: 'क्या मैं इस टेम्पलेट का उपयोग अपने पोर्टफोलियो के लिए कर सकता हूँ?',
      en_a: 'Add your text here.',
      hi_a: 'अपना टेक्स्ट यहाँ जोड़ें।',
    },
  ],

  // ── Brand Logos ────────────────────────────────────────────────────────────
  // Set to [] so the animated text marquee renders instead of broken image cards.
  // Add real logo image_url values here (or via admin panel) to show actual logos.
  brand_logos: [],
};

/**
 * The fully normalized demo SiteData object.
 * Import this wherever you need fallback data.
 */
export const DEMO_DATA: SiteData = normalizeSiteData(raw);
