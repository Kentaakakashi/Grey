'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { Target, Share2, Search, PenTool, Code, Zap, Menu, X, Globe, Play, Check, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import Image from 'next/image';
import CustomCursor from './CustomCursor';
import DotScrollNav from './DotScrollNav';

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-8 h-8" />,
  Share2: <Share2 className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
  PenTool: <PenTool className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />
};

export default function HomePage({ initialData }: { initialData: any }) {
  const { lang, setLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentItems = Array.isArray(initialData?.content) ? initialData.content : [];
  const contentMap = new Map<string, any>();

  for (const item of contentItems) {
    if (typeof item?.key === 'string') {
      contentMap.set(item.key, item);
    }
  }

  const getContent = (key: string, defaultEn: string, defaultHi: string): string => {
    const item = contentMap.get(key);
    if (!item) return lang === 'en' ? defaultEn : defaultHi;
    return String(lang === 'en' ? item.en_value : item.hi_value || '');
  };

  const getListContent = (key: string, defaultEn: string, defaultHi: string): string[] => {
    const value = getContent(key, defaultEn, defaultHi);
    const items = value
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length > 0) {
      return items;
    }

    return defaultEn
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // 👉 This fallback brand name is shown before admin content loads — edit via admin panel
  const brandName = (initialData?.settings?.logo_text || 'Your Name').trim() || 'Your Name';
  const logoImageUrl = (initialData?.settings?.logo_image_url || '').trim();
  const faviconUrl = (initialData?.settings?.favicon_url || '').trim();
  const ogImageUrl = (initialData?.settings?.og_image_url || '').trim();

  // Dynamically update favicon and OG image from admin settings
  useEffect(() => {
    if (faviconUrl) {
      const updateLink = (rel: string) => {
        let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = faviconUrl;
      };
      updateLink('icon');
      updateLink('shortcut icon');
      updateLink('apple-touch-icon');
    }
    if (ogImageUrl) {
      const updateMeta = (property: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = ogImageUrl;
      };
      updateMeta('og:image');
      updateMeta('twitter:image');
    }
  }, [faviconUrl, ogImageUrl]);
  const currentYear = new Date().getFullYear();

  const heroRef = useRef<HTMLHeadingElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const scrollSections = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'clients', label: 'Clients' },
    { id: 'process', label: 'Process' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQs' },
  ];

  const feature1Tags = getListContent(
    'feature1_tags',
    'Facebook Ads|Google Ads|Conversion Tracking',
    'Facebook Ads|Google Ads|Conversion Tracking'
  );
  const feature2Tags = getListContent(
    'feature2_tags',
    'Brand Identity|Ad Creatives|Video Production',
    'Brand Identity|Ad Creatives|Video Production'
  );
  const marqueeItems = getListContent(
    'clients_marquee_items',
    'Brand One|Brand Two|Brand Three|Brand Four|Brand Five|Brand Six',
    'Brand One|Brand Two|Brand Three|Brand Four|Brand Five|Brand Six'
  );
  const marqueeLoopItems = [...marqueeItems, ...marqueeItems];

  const processSteps = [
    {
      num: '01',
      title: getContent('process_step_1_title', 'Discovery & Strategy', 'खोज और रणनीति'),
      desc: getContent(
        'process_step_1_desc',
        'We analyze your business and design a focused growth roadmap.',
        'हम आपके व्यवसाय का विश्लेषण करके एक केंद्रित विकास रोडमैप तैयार करते हैं।'
      )
    },
    {
      num: '02',
      title: getContent('process_step_2_title', 'Execution & Launch', 'निष्पादन और लॉन्च'),
      desc: getContent(
        'process_step_2_desc',
        'Our team launches creative assets and tracking with precision.',
        'हमारी टीम रचनात्मक एसेट्स और ट्रैकिंग सिस्टम को सटीकता के साथ लॉन्च करती है।'
      )
    },
    {
      num: '03',
      title: getContent('process_step_3_title', 'Scale & Optimize', 'स्केल और ऑप्टिमाइज़'),
      desc: getContent(
        'process_step_3_desc',
        'We continuously optimize performance and scale winning systems.',
        'हम लगातार प्रदर्शन को ऑप्टिमाइज़ करते हैं और सफल सिस्टम को स्केल करते हैं।'
      )
    }
  ];

  const whyTypicalItems = getListContent(
    'why_typical_items',
    'Slow turnaround times|Outdated generic strategies|Opaque reporting|Hard to reach support',
    'धीमी डिलीवरी|पुरानी और सामान्य रणनीतियां|अस्पष्ट रिपोर्टिंग|सपोर्ट तक पहुंचना कठिन'
  );
  const whyItems = getListContent(
    'why_items',
    'Lightning-fast execution|Data-backed methods|Transparent live dashboards|Dedicated priority support',
    'बिजली जैसी तेज निष्पादन|डेटा-आधारित तरीके|पारदर्शी लाइव डैशबोर्ड|समर्पित प्राथमिकता सपोर्ट'
  );
  const footerServiceItems = getListContent(
    'footer_services_items',
    'Paid Advertising|Technical SEO|Brand Identity',
    'पेड विज्ञापन|टेक्निकल SEO|ब्रांड आइडेंटिटी'
  );
  const interestOptions = getListContent(
    'contact_interest_options',
    'Paid Advertising / Scaling|SEO & Organic Growth|Creative & Design|Web & Automation Systems',
    'पेड विज्ञापन / स्केलिंग|SEO और ऑर्गेनिक ग्रोथ|क्रिएटिव और डिजाइन|वेब और ऑटोमेशन सिस्टम'
  );

  const faqs: Array<{ q: string; a: string }> = initialData?.faqs?.map((faq: any) => ({
    q: lang === 'en' ? faq.en_q : faq.hi_q,
    a: lang === 'en' ? faq.en_a : faq.hi_a
  })) || [];

  // 👉 Default contact email — update via admin panel settings
  const contactEmail = (initialData?.settings?.contact_email || '').trim() || 'business@patamde.com';
  const contactPhone = (initialData?.settings?.contact_phone || '').trim();
  const whatsappNumberRaw = (initialData?.settings?.whatsapp_number || '').trim();
  const whatsappDigits = whatsappNumberRaw.replace(/\D/g, '');
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : '';

  const socialLinks = [
    { label: 'LinkedIn', href: (initialData?.settings?.linkedin_url || '').trim() },
    { label: 'Instagram', href: (initialData?.settings?.instagram_url || '').trim() },
    { label: 'Facebook', href: (initialData?.settings?.facebook_url || '').trim() },
    { label: 'X', href: (initialData?.settings?.x_url || '').trim() },
    { label: 'YouTube', href: (initialData?.settings?.youtube_url || '').trim() },
  ].filter((item) => item.href && item.href !== '#');

  const handleLeadSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!whatsappDigits) {
      alert(getContent('whatsapp_missing_alert', 'WhatsApp number is not configured yet. Please contact us by email.', 'व्हाट्सएप नंबर अभी सेट नहीं है। कृपया ईमेल से संपर्क करें।'));
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get('full_name') || '').trim();
    const email = String(formData.get('work_email') || '').trim();
    const phone = String(formData.get('phone_number') || '').trim();
    const interest = String(formData.get('interest') || '').trim();

    const message = [
      getContent('whatsapp_message_title', 'New Strategy Call Request', 'नई स्ट्रेटेजी कॉल रिक्वेस्ट'),
      '',
      `${getContent('whatsapp_message_name_label', 'Name', 'नाम')}: ${fullName}`,
      `${getContent('whatsapp_message_email_label', 'Email', 'ईमेल')}: ${email}`,
      `${getContent('whatsapp_message_phone_label', 'Phone', 'फोन')}: ${phone}`,
      `${getContent('whatsapp_message_interest_label', 'Interest', 'रुचि')}: ${interest}`,
      `${getContent('whatsapp_message_website_label', 'Website', 'वेबसाइट')}: ${window.location.origin}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    event.currentTarget.reset();
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white">
      <CustomCursor />
      <DotScrollNav sections={scrollSections} />

      {/* Header */}
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <header className="w-full max-w-5xl bg-[#111111]/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-full px-6 py-3 flex items-center justify-between border border-white/10">
          <a href="#" className="flex items-center gap-2">
            {logoImageUrl ? (
              <Image src={logoImageUrl} alt={brandName} width={120} height={32} className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span className="font-display font-black text-lg tracking-tight text-white uppercase">{brandName}</span>
              </>
            )}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">{getContent('nav_services_label', 'Services', 'सेवाएं')}</a>
            <a href="#clients" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">{getContent('nav_clients_label', 'Clients', 'ग्राहक')}</a>
            <a href="#why-us" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">{getContent('nav_why_label', 'Why Us?', 'हम क्यों?')}</a>
            <a href="#reviews" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">{getContent('nav_reviews_label', 'Reviews', 'समीक्षा')}</a>
            <a href="#faq" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">{getContent('nav_faq_label', 'FAQs', 'सामान्य प्रश्न')}</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="hidden md:flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'HI' : 'EN'}
            </button>
            <button onClick={() => setIsModalOpen(true)} className="hidden md:block px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-all">
              {getContent('nav_contact_label', 'Chat Now', 'अभी चैट करें')}
            </button>
            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full mt-4 left-4 right-4 bg-[#111111] rounded-2xl shadow-2xl py-4 px-6 flex flex-col gap-4 md:hidden border border-white/10"
            >
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-white">{getContent('nav_services_label', 'Services', 'सेवाएं')}</a>
              <a href="#clients" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-white">{getContent('nav_clients_label', 'Clients', 'ग्राहक')}</a>
              <a href="#why-us" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-white">{getContent('nav_why_label', 'Why Us?', 'हम क्यों?')}</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-white">{getContent('nav_reviews_label', 'Reviews', 'समीक्षा')}</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-white">{getContent('nav_faq_label', 'FAQs', 'सामान्य प्रश्न')}</a>
              <hr className="border-white/10" />
              <button
                onClick={() => { setLang(lang === 'en' ? 'hi' : 'en'); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-base font-medium text-[#F27D26]"
              >
                <Globe className="w-5 h-5" />
                {lang === 'en'
                  ? getContent('nav_switch_to_hi', 'Switch to Hindi', 'हिंदी में बदलें')
                  : getContent('nav_switch_to_en', 'Switch to English', 'अंग्रेजी में बदलें')}
              </button>
              <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="w-full px-6 py-3 rounded-xl bg-white text-black font-bold text-center">
                {getContent('nav_contact_label', 'Chat Now', 'अभी चैट करें')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#050505]">
        {/* Dark High-Tech Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url(${initialData?.settings?.hero_image_url || 'https://picsum.photos/seed/noise/1000/1000'})` }}></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#F27D26]/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse" />
            {getContent('hero_badge', 'Performance Marketing Agency', 'परफॉर्मेंस मार्केटिंग एजेंसी')}
          </motion.div>

          <motion.h1
            ref={heroRef}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-6xl md:text-[90px] font-display font-black tracking-tighter leading-[1.25] mb-8 max-w-5xl mx-auto uppercase"
          >
            {getContent('hero_title', 'Elevate Your Brand With Premium Designs', 'अधिकतम लाभ के लिए अपने विज्ञापनों को अनुकूलित करें।')
              .split(' ')
              .map((word, i, arr) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={heroInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
                >
                  {word}{i < arr.length - 1 ? '\u00A0' : ''}
                </motion.span>
              ))}
            {/* Animated SVG underline centered below heading */}
            <motion.span
              className="block w-full mt-2"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <svg
                className="mx-auto w-[70%] md:w-[50%] h-[12px] md:h-[18px]"
                viewBox="0 0 400 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 14C65 4 135 2 200 8C265 14 335 4 398 12"
                  stroke="#F27D26"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={heroInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium space-y-2"
          >
            <p className="font-bold text-[#F27D26]">{getContent('hero_stats_line', '5+ years | 511+ Brands | 60+ Crore Ad spent', '5+ years | 511+ Brands | 60+ Crore Ad spent')}</p>
            <p>{getContent('hero_subtitle', 'A dedicated team of specialists, delivering remarkable work to our clients worldwide!', 'दुनिया भर में उल्लेखनीय काम देने वाले विशेषज्ञों की एक समर्पित टीम!')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
              {getContent('hero_cta', 'Book a Strategy Call', 'रणनीति कॉल बुक करें')}
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <a href="#clients" className="px-8 py-4 rounded-full bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              {getContent('hero_secondary_cta', 'View Case Studies', 'केस स्टडी देखें')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 pt-10 border-t border-white/10"
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">{getContent('partners_label', 'Certified Partners', 'सर्टिफाइड पार्टनर्स')}</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-xl font-bold text-white"><Globe className="w-8 h-8" /> {getContent('partner_meta_name', 'Meta', 'Meta')} <span className="text-sm font-normal text-gray-400">{getContent('partner_meta_subtitle', 'Business Partner', 'बिजनेस पार्टनर')}</span></div>
              <div className="flex items-center gap-2 text-xl font-bold text-white"><div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black text-xs">S</div> {getContent('partner_shopify_name', 'Shopify', 'Shopify')} <span className="text-sm font-normal text-gray-400">{getContent('partner_shopify_subtitle', 'Partners', 'पार्टनर्स')}</span></div>
              <div className="flex items-center gap-2 text-xl font-bold text-white"><div className="w-8 h-8 bg-white rounded-sm"></div> {getContent('partner_google_name', 'Google', 'Google')} <span className="text-sm font-normal text-gray-400">{getContent('partner_google_subtitle', 'Partner', 'पार्टनर')}</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#0A0A0A] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
                {getContent('services_tag', 'Our Services', 'हमारी सेवाएं')}
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white leading-tight uppercase">
                {getContent('services_title', 'Our Expertise', 'हमारी विशेषज्ञता')}
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-md font-medium">
              {getContent('services_subtitle', 'Comprehensive design solutions tailored to your unique business needs.', 'आपकी विशिष्ट व्यावसायिक आवश्यकताओं के अनुरूप व्यापक डिज़ाइन समाधान।')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialData.services.map((service: any, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group p-10 rounded-[32px] bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col h-full cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-500 relative z-10">
                  {iconMap[service.icon] || <Target className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-white tracking-tight relative z-10">
                  {lang === 'en' ? service.en_title : service.hi_title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed font-medium mt-auto relative z-10">
                  {lang === 'en' ? service.en_desc : service.hi_desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Rows */}
      <section className="py-32 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 space-y-40">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
                {getContent('feature1_tag', 'Performance', 'प्रदर्शन')}
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-8 leading-[1.1] text-white uppercase">
                {getContent('feature1_title', 'Data-Driven Paid Ads', 'डेटा-संचालित सशुल्क विज्ञापन')}
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium">
                {getContent('feature1_desc', 'Ready to give your brand the spotlight it deserves? Dive into our Paid Ads extravaganza and let your message dominate your industry\'s digital universe with extreme precision.', 'क्या आप अपने ब्रांड को वह पहचान दिलाने के लिए तैयार हैं जिसका वह हकदार है? हमारे सशुल्क विज्ञापनों में गोता लगाएँ और अपने संदेश को अत्यधिक सटीकता के साथ अपने उद्योग के डिजिटल ब्रह्मांड पर हावी होने दें।')}
              </p>
              <div className="flex flex-wrap gap-4">
                {feature1Tags.map((tag) => (
                  <span key={tag} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 hover:bg-white hover:text-black transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex-1 relative w-full">
              <div className="aspect-[4/3] rounded-[30px] overflow-hidden border border-white/10 relative group bg-[#111111]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={initialData?.settings?.marketing_image_url || 'https://picsum.photos/seed/marketing/1200/900'}
                  alt="Marketing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
                {getContent('feature2_tag', 'Creative', 'रचनात्मक')}
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-8 leading-[1.1] text-white uppercase">
                {getContent('feature2_title', 'Eye-Catching Designs', 'आकर्षक डिजाइन')}
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium">
                {getContent('feature2_desc', 'We craft visuals that speak directly to your ideal customers. Transform your aesthetic into an extraordinary brand identity that drives massive action.', 'हम ऐसे दृश्य बनाते हैं जो सीधे आपके आदर्श ग्राहकों से बात करते हैं। अपने सौंदर्य को एक असाधारण ब्रांड पहचान में बदलें जो बड़े पैमाने पर कार्रवाई को प्रेरित करता है।')}
              </p>
              <div className="flex flex-wrap gap-4">
                {feature2Tags.map((tag) => (
                  <span key={tag} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 hover:bg-white hover:text-black transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex-1 relative w-full">
              <div className="aspect-[4/3] rounded-[30px] overflow-hidden border border-white/10 relative group bg-[#111111]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={initialData?.settings?.creative_image_url || 'https://picsum.photos/seed/creative/1200/900'}
                  alt="Creative"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies / Clients */}
      <section id="clients" className="py-32 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
            {getContent('clients_tag', 'Success Stories', 'सफलता की कहानियां')}
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-20 uppercase">
            {getContent('clients_title', 'Brands We Elevated', 'ब्रांड जिन्हें हमने ऊंचा किया')}
          </h2>

          {/* Brand Logos Grid */}
          {initialData?.brand_logos?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-24 max-w-6xl mx-auto">
              {initialData.brand_logos.map((logo: any, idx: number) => (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="brand-logo-card group relative flex items-center justify-center rounded-2xl p-6 h-32 transition-all duration-300"
                >
                  <div className="relative h-16 w-full">
                    <Image
                      src={logo.image_url}
                      alt={logo.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative w-full overflow-hidden mb-24 py-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                className="flex gap-16 whitespace-nowrap w-max items-center"
              >
                {marqueeLoopItems.map((item, idx) => (
                  <div key={`${item}-${idx}`} className="text-4xl font-display font-black text-white/10 hover:text-white/40 transition-colors uppercase tracking-widest">
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialData?.case_studies?.map((card: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/[0.02] border border-white/5 rounded-[32px] p-10 text-left hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group"
              >
                <div className="w-full h-56 bg-black/50 rounded-2xl mb-8 relative overflow-hidden border border-white/5">
                  <Image
                    src={card.image_url || `https://picsum.photos/seed/${card.name.replace(' ', '')}/600/400`}
                    alt={card.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/10">
                  {card.metric}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 tracking-tight text-white">{card.name}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-[#050505] text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
            {getContent('process_tag', 'Methodology', 'कार्यप्रणाली')}
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-24 uppercase">
            {getContent('process_title', 'How We Work', 'हम कैसे काम करते हैं')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-white/10" />

            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <div className="w-24 h-24 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-display font-black text-white mb-10 group-hover:bg-white group-hover:text-black transition-colors">
                  {step.num}
                </div>
                <h3 className="text-2xl font-display font-bold mb-6 tracking-tight text-white">{step.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-32 bg-[#0A0A0A] text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
            {getContent('why_tag', 'The Difference', 'अंतर')}
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-20 uppercase">
            {getContent('why_us_title', 'Why Choose Us?', 'हमें क्यों चुनें?')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-12">
              <h3 className="text-xl font-bold text-gray-500 mb-10 uppercase tracking-widest">{getContent('why_typical_title', 'Typical Agencies', 'सामान्य एजेंसियां')}</h3>
              <ul className="space-y-8">
                {whyTypicalItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-gray-400 text-xl font-medium">
                    <div className="w-10 h-10 rounded-full bg-white/5 text-gray-500 flex items-center justify-center shrink-0"><X className="w-5 h-5" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-[32px] p-12 shadow-[0_0_50px_rgba(255,255,255,0.1)] transform md:scale-105 relative overflow-hidden text-black">
              <h3 className="text-xl font-display font-black mb-10 uppercase tracking-widest">{getContent('why_title', 'Why Choose Us.', 'हमें क्यों चुनें')}</h3>
              <ul className="space-y-8 relative z-10">
                {whyItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-black text-xl font-bold">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0"><Check className="w-5 h-5" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews */}
      <section id="reviews" className="py-32 bg-[#050505] text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
            {getContent('reviews_tag', 'Testimonials', 'प्रशंसापत्र')}
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-20 uppercase">
            {getContent('reviews_title', 'Hear From The Best', 'सर्वश्रेष्ठ से सुनें')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[initialData?.settings?.video_thumbnail_1 || 'https://picsum.photos/seed/video1/1200/675', initialData?.settings?.video_thumbnail_2 || 'https://picsum.photos/seed/video2/1200/675'].map((thumbnail, i) => (
              <div key={i} className="aspect-video bg-white/[0.02] rounded-[32px] overflow-hidden relative group cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                <Image
                  src={thumbnail}
                  alt="Video Thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500 border border-white/10 group-hover:border-transparent">
                    <Play className="w-8 h-8 text-white fill-white ml-1 group-hover:text-black group-hover:fill-black transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-[#0A0A0A] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-[#F27D26]" />
              {getContent('faq_tag', 'Got Questions?', 'प्रश्न हैं?')}
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white uppercase">
              {getContent('faq_title', 'Frequently Asked Questions', 'अक्सर पूछे जाने वाले प्रश्न')}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${openFaq === idx ? 'border-white/20' : 'hover:border-white/10'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-xl text-white"
                >
                  {faq.q}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${openFaq === idx ? 'bg-white text-black' : 'bg-white/5 text-white'}`}>
                    {openFaq === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="px-8 pb-6 text-gray-400 text-lg leading-relaxed font-medium"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-[40px] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white/5 blur-[120px] rounded-full transform -rotate-12" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter leading-[1.1] uppercase">
                {getContent('contact_title', 'Ready to Transform Your Brand?', 'क्या आप अपने ब्रांड को बदलने के लिए तैयार हैं?')}
              </h2>
              <p className="text-xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto">
                {getContent('contact_subtitle', "Let's discuss your project and see how we can help you achieve your goals.", 'आइए आपके प्रोजेक्ट पर चर्चा करें और देखें कि हम आपके लक्ष्यों को प्राप्त करने में कैसे मदद कर सकते हैं।')}
              </p>

              <button onClick={() => setIsModalOpen(true)} className="px-12 py-6 rounded-full bg-white text-black font-display font-black text-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto uppercase tracking-wider">
                {getContent('contact_cta', 'Get in Touch', 'संपर्क करें')}
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] text-gray-400 py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                {logoImageUrl ? (
                  <Image src={logoImageUrl} alt={brandName} width={150} height={40} className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-display font-black text-lg">
                      {brandName[0] || 'T'}
                    </div>
                    <span className="text-xl font-display font-black tracking-tight text-white uppercase">
                      {brandName}
                    </span>
                  </>
                )}
              </a>
              <p className="text-gray-500 max-w-sm">
                {getContent('footer_desc', 'Building high-converting digital ecosystems for modern brands globally.', 'विश्व स्तर पर आधुनिक ब्रांडों के लिए उच्च-परिवर्तित डिजिटल पारिस्थितिकी तंत्र का निर्माण।')}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">{getContent('footer_services_title', 'Services', 'सेवाएं')}</h4>
              <ul className="space-y-4">
                {footerServiceItems.map((item) => (
                  <li key={item}><a href="#services" className="hover:text-[#F27D26] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">{getContent('footer_connect_title', 'Connect', 'संपर्क')}</h4>
              <ul className="space-y-4">
                <li><a href={`mailto:${contactEmail}`} className="hover:text-[#F27D26] transition-colors">{contactEmail}</a></li>
                {contactPhone && (
                  <li><a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="hover:text-[#F27D26] transition-colors">{contactPhone}</a></li>
                )}
                {whatsappHref && (
                  <li><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-[#F27D26] transition-colors">{getContent('footer_whatsapp_label', 'WhatsApp Chat', 'व्हाट्सएप चैट')}</a></li>
                )}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="text-center md:text-left space-y-1">
              <p>© {currentYear} {brandName}. All rights reserved.</p>
              <p>
                <a
                  href="https://www.linkedin.com/in/pawan-joshee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  Designed and developed by AirFlute Technologies.
                </a>
              </p>
            </div>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 md:justify-end">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#111111] border border-white/10 rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-[#F27D26] hover:text-black transition-colors z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 bg-[#050505] p-12 text-white flex flex-col justify-center relative overflow-hidden border-r border-white/5">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/modal/800/800')] opacity-5 mix-blend-luminosity bg-cover bg-center" />
                <div className="relative z-10">
                  <h2 className="text-4xl font-display font-black mb-6 leading-tight uppercase">{getContent('modal_title', "Let's build something incredible.", 'आइए कुछ बेहतरीन बनाएं।')}</h2>
                  <p className="text-gray-400 text-lg mb-12">{getContent('modal_subtitle', 'Book a discovery call to see how our systems can directly impact your bottom line.', 'एक डिस्कवरी कॉल बुक करें और जानें कि हमारे सिस्टम आपके बिजनेस परिणामों पर कैसे प्रभाव डालते हैं।')}</p>

                  <div className="space-y-8">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-[#F27D26] mb-2">{getContent('modal_project_inquiries', 'Project Inquiries', 'प्रोजेक्ट पूछताछ')}</span>
                      <a href={`mailto:${contactEmail}`} className="text-xl font-medium hover:text-[#F27D26] transition-colors">{contactEmail}</a>
                      {contactPhone && (
                        <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="mt-3 block text-lg font-medium hover:text-[#F27D26] transition-colors">
                          {contactPhone}
                        </a>
                      )}
                      {whatsappHref && (
                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 block text-lg font-medium hover:text-[#F27D26] transition-colors">
                          {getContent('modal_whatsapp_label', 'WhatsApp', 'व्हाट्सएप')}: {whatsappNumberRaw}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-[1.2] p-12 overflow-y-auto">
                <h3 className="text-3xl font-display font-black text-white mb-4 uppercase">{getContent('modal_request_title', 'Request a Strategy Call', 'स्ट्रेटेजी कॉल के लिए अनुरोध करें')}</h3>
                <p className="text-gray-400 mb-8">{getContent('modal_request_desc', 'Fill out the form below and an expert will reach out within 24 hours.', 'नीचे दिया गया फॉर्म भरें और हमारी टीम 24 घंटों के भीतर संपर्क करेगी।')}</p>

                <form className="space-y-6" onSubmit={handleLeadSubmit}>
                  <div>
                    <input name="full_name" type="text" required placeholder={getContent('form_name_placeholder', 'Full Name', 'पूरा नाम')} className="w-full px-6 py-4 bg-[#050505] border border-white/10 rounded-2xl focus:outline-none focus:border-[#F27D26] transition-all text-white placeholder:text-gray-600" />
                  </div>
                  <div>
                    <input name="work_email" type="email" required placeholder={getContent('form_email_placeholder', 'Work Email', 'वर्क ईमेल')} className="w-full px-6 py-4 bg-[#050505] border border-white/10 rounded-2xl focus:outline-none focus:border-[#F27D26] transition-all text-white placeholder:text-gray-600" />
                  </div>
                  <div>
                    <input name="phone_number" type="tel" required placeholder={getContent('form_phone_placeholder', 'Phone Number', 'फोन नंबर')} className="w-full px-6 py-4 bg-[#050505] border border-white/10 rounded-2xl focus:outline-none focus:border-[#F27D26] transition-all text-white placeholder:text-gray-600" />
                  </div>
                  <div>
                    <select name="interest" required defaultValue="" className="w-full px-6 py-4 bg-[#050505] border border-white/10 rounded-2xl focus:outline-none focus:border-[#F27D26] transition-all text-white appearance-none">
                      <option value="" disabled className="text-gray-600">{getContent('form_interest_placeholder', 'Select Primary Interest', 'मुख्य रुचि चुनें')}</option>
                      {interestOptions.map((option, idx) => (
                        <option key={`${option}-${idx}`} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full py-4 rounded-2xl bg-white text-black font-display font-black text-lg hover:scale-105 transition-all uppercase tracking-wider">
                    {getContent('form_submit_label', 'Submit Request', 'अनुरोध सबमिट करें')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
