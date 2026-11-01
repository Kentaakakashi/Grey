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
    logo_text: 'Pawan Joshee',
    logo_image_url: '',
    favicon_url: '',
    og_image_url: '',

    // 👉 Replace with your contact details
    contact_email: 'business@patamde.com',
    contact_phone: '+91-92511-13641',
    whatsapp_number: '9251113641',

    // 👉 Replace with your social profiles
    linkedin_url: 'https://www.linkedin.com/in/pawan-joshee/',
    instagram_url: 'https://instagram.com',
    facebook_url: '',
    x_url: 'https://x.com',
    youtube_url: '',

    // Images — using high-quality Unsplash photos as placeholders
    // Replace these with your own images via the admin panel
    hero_image_url:
      'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80',
    marketing_image_url:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    creative_image_url:
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80',
    video_thumbnail_1:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    video_thumbnail_2:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    video_url_1: '',
    video_url_2: '',
  },

  // ── Editable text content ──────────────────────────────────────────────────
  content: [
    // Hero section
    { key: 'hero_tagline', en_value: 'Graphic Designer & Visual Artist', hi_value: 'ग्राफिक डिज़ाइनर और विज़ुअल आर्टिस्ट' },
    { key: 'hero_description', en_value: 'I craft brand identities, visual systems, and creative campaigns that make people stop scrolling and start feeling.', hi_value: 'मैं ब्रांड आइडेंटिटी, विज़ुअल सिस्टम और क्रिएटिव कैंपेन बनाता हूँ जो लोगों को रुकने और महसूस करने पर मजबूर करते हैं।' },
    { key: 'hero_cta_primary', en_value: 'View My Work', hi_value: 'मेरा काम देखें' },
    { key: 'hero_cta_secondary', en_value: 'Get In Touch', hi_value: 'संपर्क करें' },
    // Hero stats line — shown below tagline
    { key: 'hero_stats_line', en_value: '5+ Years | 200+ Projects | 50+ Happy Clients', hi_value: '5+ साल | 200+ प्रोजेक्ट | 50+ खुश क्लाइंट' },
    { key: 'hero_subtitle', en_value: 'A graphic designer dedicated to creating visual identities that resonate, inspire, and leave a lasting impression.', hi_value: 'एक ग्राफिक डिज़ाइनर जो ऐसी विज़ुअल पहचान बनाने के लिए समर्पित है जो प्रभावित करे, प्रेरित करे और स्थायी छाप छोड़े।' },

    // About / feature blocks
    { key: 'feature1_title', en_value: 'Brand Identity', hi_value: 'ब्रांड आइडेंटिटी' },
    { key: 'feature1_desc', en_value: 'Logos, color systems, and typography that communicate who you are at a glance.', hi_value: 'लोगो, कलर सिस्टम और टाइपोग्राफी जो एक नज़र में बताए कि आप कौन हैं।' },
    { key: 'feature1_tags', en_value: 'Logo Design|Color Systems|Typography', hi_value: 'लोगो डिज़ाइन|कलर सिस्टम|टाइपोग्राफी' },
    { key: 'feature2_title', en_value: 'Creative Production', hi_value: 'क्रिएटिव प्रोडक्शन' },
    { key: 'feature2_desc', en_value: 'Ad creatives, social media graphics, and visual content designed to convert.', hi_value: 'ऐड क्रिएटिव, सोशल मीडिया ग्राफिक्स और विज़ुअल कंटेंट जो कनवर्ट करता है।' },
    { key: 'feature2_tags', en_value: 'Print Design|Digital Ads|Illustration', hi_value: 'प्रिंट डिज़ाइन|डिजिटल ऐड्स|इलस्ट्रेशन' },

    // Clients marquee
    { key: 'clients_marquee_items', en_value: 'Studio Nova|Aether Co.|Bloom Agency|Vertex Labs|Lunar Works|Drift Brand|Forma Studio|Peak Creative', hi_value: 'Studio Nova|Aether Co.|Bloom Agency|Vertex Labs|Lunar Works|Drift Brand|Forma Studio|Peak Creative' },

    // Process
    { key: 'process_step_1_title', en_value: 'Discover & Define', hi_value: 'खोज और परिभाषा' },
    { key: 'process_step_1_desc', en_value: 'Deep-dive into your brand, audience, and goals to build a creative brief that guides every decision.', hi_value: 'आपके ब्रांड, दर्शकों और लक्ष्यों में गहराई से उतरकर एक क्रिएटिव ब्रीफ तैयार करते हैं।' },
    { key: 'process_step_2_title', en_value: 'Design & Refine', hi_value: 'डिज़ाइन और परिष्करण' },
    { key: 'process_step_2_desc', en_value: 'Concepts are sketched, designed, and polished through collaborative rounds of feedback.', hi_value: 'कॉन्सेप्ट बनाए जाते हैं, डिज़ाइन किए जाते हैं और फीडबैक के दौर से गुज़रकर पॉलिश किए जाते हैं।' },
    { key: 'process_step_3_title', en_value: 'Deliver & Launch', hi_value: 'डिलीवरी और लॉन्च' },
    { key: 'process_step_3_desc', en_value: 'Final assets handed off in every format you need, ready for print, web, and everything in between.', hi_value: 'अंतिम एसेट्स हर फॉर्मेट में दिए जाते हैं — प्रिंट, वेब और इसके बीच सब कुछ के लिए तैयार।' },

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
      en_description: 'Complete brand systems — logo, colors, typography, and usage guidelines that create instant recognition.',
      hi_description: 'पूर्ण ब्रांड सिस्टम — लोगो, रंग, टाइपोग्राफी और उपयोग दिशानिर्देश।',
    },
    {
      id: 2,
      icon: 'Target',
      en_title: 'Print & Packaging',
      hi_title: 'प्रिंट और पैकेजिंग',
      en_description: 'Brochures, posters, business cards, and packaging design that makes your brand tangible and memorable.',
      hi_description: 'ब्रोशर, पोस्टर, बिज़नेस कार्ड और पैकेजिंग डिज़ाइन जो आपके ब्रांड को स्पर्शनीय बनाता है।',
    },
    {
      id: 3,
      icon: 'Share2',
      en_title: 'Social Media Design',
      hi_title: 'सोशल मीडिया डिज़ाइन',
      en_description: 'Scroll-stopping graphics, templates, and visual strategies built for Instagram, LinkedIn, and beyond.',
      hi_description: 'स्क्रॉल रोकने वाले ग्राफिक्स और विज़ुअल स्ट्रेटेजी Instagram, LinkedIn और अन्य के लिए।',
    },
    {
      id: 4,
      icon: 'Zap',
      en_title: 'Ad Creatives',
      hi_title: 'ऐड क्रिएटिव',
      en_description: 'High-converting ad visuals for Meta, Google, and digital campaigns designed to stop the scroll and drive clicks.',
      hi_description: 'Meta, Google और डिजिटल कैंपेन के लिए हाई-कनवर्टिंग ऐड विज़ुअल।',
    },
    {
      id: 5,
      icon: 'Search',
      en_title: 'Illustration',
      hi_title: 'इलस्ट्रेशन',
      en_description: 'Custom editorial, commercial, and character illustrations that give your brand a truly unique visual voice.',
      hi_description: 'कस्टम एडिटोरियल, कमर्शियल और कैरेक्टर इलस्ट्रेशन जो आपके ब्रांड को एक अनोखी आवाज़ देते हैं।',
    },
    {
      id: 6,
      icon: 'Code',
      en_title: 'Motion & Animation',
      hi_title: 'मोशन और एनीमेशन',
      en_description: 'Animated logos, motion graphics, and social content that bring your brand to life across every screen.',
      hi_description: 'एनिमेटेड लोगो, मोशन ग्राफिक्स और सोशल कंटेंट जो हर स्क्रीन पर आपके ब्रांड को जीवंत करते हैं।',
    },
  ],

  // ── Case Studies / Portfolio ───────────────────────────────────────────────
  // NOTE: The component reads card.name, card.desc, card.metric — not en_client/en_result.
  // Fields below match exactly what HomePage.tsx expects.
  case_studies: [
    {
      id: 1,
      name: 'Studio Nova',
      desc: 'Full rebrand — new identity adopted globally across 12 markets.',
      metric: 'Architecture',
      en_client: 'Studio Nova',
      hi_client: 'Studio Nova',
      en_result: 'Full rebrand — new identity adopted globally',
      hi_result: 'पूर्ण रिब्रांड — नई पहचान वैश्विक स्तर पर अपनाई गई',
      en_industry: 'Architecture',
      hi_industry: 'वास्तुकला',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    },
    {
      id: 2,
      name: 'Bloom Agency',
      desc: 'Brand identity system + 12-month social media visual strategy.',
      metric: 'Marketing',
      en_client: 'Bloom Agency',
      hi_client: 'Bloom Agency',
      en_result: 'Brand identity + 12-month social media system',
      hi_result: 'ब्रांड आइडेंटिटी + 12 महीने का सोशल मीडिया सिस्टम',
      en_industry: 'Marketing',
      hi_industry: 'मार्केटिंग',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    },
    {
      id: 3,
      name: 'Vertex Labs',
      desc: 'Product packaging redesign — 40% increase in shelf pick-up rate.',
      metric: 'Consumer Goods',
      en_client: 'Vertex Labs',
      hi_client: 'Vertex Labs',
      en_result: 'Product packaging redesign — 40% shelf pick-up increase',
      hi_result: 'प्रोडक्ट पैकेजिंग रीडिज़ाइन — 40% शेल्फ पिक-अप वृद्धि',
      en_industry: 'Consumer Goods',
      hi_industry: 'उपभोक्ता वस्तुएं',
      image_url: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=80',
    },
  ],

  // ── FAQs ──────────────────────────────────────────────────────────────────
  faqs: [
    {
      id: 1,
      en_q: 'How long does a brand identity project take?',
      hi_q: 'ब्रांड आइडेंटिटी प्रोजेक्ट में कितना समय लगता है?',
      en_a: 'A full brand identity project typically takes 2–4 weeks depending on scope and revision rounds. We always agree on a timeline before starting.',
      hi_a: 'एक पूर्ण ब्रांड आइडेंटिटी प्रोजेक्ट में आमतौर पर 2–4 सप्ताह लगते हैं। शुरू करने से पहले हम हमेशा टाइमलाइन पर सहमत होते हैं।',
    },
    {
      id: 2,
      en_q: 'What file formats will I receive?',
      hi_q: 'मुझे कौन से फ़ाइल फॉर्मेट मिलेंगे?',
      en_a: 'You\'ll receive all source files (AI, PSD) plus export-ready formats (SVG, PNG, PDF, WebP) for every deliverable — ready for print and digital use.',
      hi_a: 'आपको सभी सोर्स फ़ाइलें (AI, PSD) के साथ-साथ एक्सपोर्ट-रेडी फॉर्मेट (SVG, PNG, PDF, WebP) मिलेंगे।',
    },
    {
      id: 3,
      en_q: 'How many revision rounds are included?',
      hi_q: 'कितने रिविज़न राउंड शामिल हैं?',
      en_a: 'Most packages include 2–3 structured revision rounds. Additional rounds can be added if needed — we\'ll discuss this upfront.',
      hi_a: 'अधिकांश पैकेज में 2–3 संरचित रिविज़न राउंड शामिल हैं। ज़रूरत पड़ने पर अतिरिक्त राउंड जोड़े जा सकते हैं।',
    },
    {
      id: 4,
      en_q: 'Do you work with international clients?',
      hi_q: 'क्या आप अंतर्राष्ट्रीय क्लाइंट के साथ काम करते हैं?',
      en_a: 'Absolutely! I work with clients worldwide. All communication is handled via email, video calls, and a shared project workspace.',
      hi_a: 'बिल्कुल! मैं दुनिया भर के क्लाइंट के साथ काम करता हूँ। सभी संचार ईमेल, वीडियो कॉल और एक साझा प्रोजेक्ट वर्कस्पेस के माध्यम से होता है।',
    },
    {
      id: 5,
      en_q: 'Can I use this template for my own portfolio?',
      hi_q: 'क्या मैं इस टेम्पलेट का उपयोग अपने पोर्टफोलियो के लिए कर सकता हूँ?',
      en_a: 'Yes! This template is open-source and free for personal use under the AIrflute Personal Use License. For commercial use, contact business@patamde.com.',
      hi_a: 'हाँ! यह टेम्पलेट AIrflute Personal Use License के तहत पर्सनल उपयोग के लिए ओपन-सोर्स और मुफ़्त है।',
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
