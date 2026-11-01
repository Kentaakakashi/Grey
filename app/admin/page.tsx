'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, LogOut, Loader2, LayoutDashboard, Settings, FileText, Plus, Trash2, Briefcase, ChevronDown, ImageIcon } from 'lucide-react';
import { createEmptySiteData, normalizeSiteData, type SiteData } from '@/lib/site-data';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
const apiUrl = (path: string) => `${API_BASE}${path}`;

type ContentGroup = {
  id: string;
  title: string;
  description: string;
  matches: (key: string) => boolean;
};

const CONTENT_GROUPS: ContentGroup[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Header menu and language labels',
    matches: (key) => key.startsWith('nav_'),
  },
  {
    id: 'hero',
    title: 'Hero & Partners',
    description: 'Hero section and partner badge copy',
    matches: (key) => key.startsWith('hero_') || key === 'partners_label' || key.startsWith('partner_'),
  },
  {
    id: 'services',
    title: 'Services Section',
    description: 'Services heading and feature row copy',
    matches: (key) => key.startsWith('services_') || key.startsWith('feature1_') || key.startsWith('feature2_'),
  },
  {
    id: 'clients',
    title: 'Clients & Case Studies Section',
    description: 'Clients marquee and section headings',
    matches: (key) => key.startsWith('clients_'),
  },
  {
    id: 'process',
    title: 'Process Section',
    description: 'Methodology section headings and steps',
    matches: (key) => key.startsWith('process_'),
  },
  {
    id: 'why-us',
    title: 'Why Us Section',
    description: 'Comparison section copy',
    matches: (key) => key.startsWith('why_'),
  },
  {
    id: 'reviews',
    title: 'Reviews Section',
    description: 'Testimonials section labels',
    matches: (key) => key.startsWith('reviews_'),
  },
  {
    id: 'faq',
    title: 'FAQ Section',
    description: 'FAQ section headings',
    matches: (key) => key.startsWith('faq_'),
  },
  {
    id: 'contact-modal',
    title: 'Contact & Modal',
    description: 'CTA, modal, form and WhatsApp copy',
    matches: (key) => key.startsWith('contact_') || key.startsWith('modal_') || key.startsWith('form_') || key.startsWith('whatsapp_'),
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Footer labels and legal text',
    matches: (key) => key.startsWith('footer_'),
  },
];

const formatContentKey = (key: string) =>
  key
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default function AdminDashboard() {
  const [data, setData] = useState<SiteData>(createEmptySiteData());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [fetchError, setFetchError] = useState('');
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'services', 'settings'
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const bootstrapAdmin = async () => {
      try {
        setFetchError('');

        const sessionRes = await fetch(apiUrl('/api/session.php'), {
          credentials: 'include',
          signal: controller.signal,
        });

        if (!sessionRes.ok) {
          router.replace('/admin/login');
          return;
        }

        const sessionData = await sessionRes.json();
        if (!sessionData?.authenticated) {
          router.replace('/admin/login');
          return;
        }

        const contentRes = await fetch(apiUrl('/api/get_content.php'), {
          signal: controller.signal,
        });

        if (contentRes.ok) {
          const apiData = await contentRes.json();

          if (mounted && apiData && typeof apiData === 'object') {
            setData(normalizeSiteData(apiData));
          }
        } else if (contentRes.status === 404) {
          if (mounted) {
            setFetchError('No published content found yet. Publish content once from admin after setup.');
            setData(createEmptySiteData());
          }
        } else {
          throw new Error('Unable to load content from server');
        }
      } catch (error) {
        if ((error as Error)?.name === 'AbortError') {
          return;
        }

        console.error('Error fetching data:', error);
        if (mounted) {
          setFetchError('Could not load latest server data. Please refresh and try again.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    bootstrapAdmin();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch(apiUrl('/api/logout.php'), {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore logout network failures and redirect anyway.
    }

    router.push('/admin/login');
  };

  const handleContentChange = (index: number, field: 'en_value' | 'hi_value', value: string) => {
    const newData = { ...data };
    newData.content[index][field] = value;
    setData(newData);
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newData = { ...data };
    newData.services[index] = { ...newData.services[index], [field]: value };
    setData(newData);
  };

  const handleCaseStudyChange = (index: number, field: string, value: string) => {
    const newData = { ...data };
    newData.case_studies[index] = { ...newData.case_studies[index], [field]: value };
    setData(newData);
  };

  const handleFaqChange = (index: number, field: string, value: string) => {
    const newData = { ...data };
    newData.faqs[index] = { ...newData.faqs[index], [field]: value };
    setData(newData);
  };

  const handleBrandLogoChange = (index: number, field: string, value: string) => {
    const newData = { ...data };
    newData.brand_logos[index] = { ...newData.brand_logos[index], [field]: value };
    setData(newData);
  };

  const handleSettingChange = (field: string, value: string) => {
    const newData = { ...data };
    newData.settings = { ...newData.settings, [field]: value };
    setData(newData);
  };

  const indexedContentItems = data.content.map((item, index) => ({ item, index }));

  const groupedContent = CONTENT_GROUPS
    .map((group) => ({
      ...group,
      items: indexedContentItems.filter(({ item }) => group.matches(String(item.key || ''))),
    }))
    .filter((group) => group.items.length > 0);

  const groupedContentKeys = new Set(
    groupedContent.flatMap((group) => group.items.map(({ item }) => String(item.key || '')))
  );

  const uncategorizedContent = indexedContentItems.filter(
    ({ item }) => !groupedContentKeys.has(String(item.key || ''))
  );

  const contentSectionIds = [
    ...groupedContent.map((group) => `group:${group.id}`),
    ...(uncategorizedContent.length > 0 ? ['group:uncategorized'] : []),
    'media:hero',
    'media:reviews',
  ];

  const isSectionCollapsed = (sectionId: string) => Boolean(collapsedSections[sectionId]);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const setAllContentSectionsCollapsed = (collapsed: boolean) => {
    setCollapsedSections((prev) => {
      const next = { ...prev };

      for (const sectionId of contentSectionIds) {
        next[sectionId] = collapsed;
      }

      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(apiUrl('/api/update_content.php'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const responseData = await res.json().catch(() => null);

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!res.ok || !responseData?.success) {
        throw new Error(responseData?.message || 'Failed to save');
      }

      setMessage({ type: 'success', text: 'Content updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update content. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505] text-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white/[0.02] border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black text-xl">
            A
          </div>
          <span className="font-display font-black text-xl tracking-tight uppercase">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'content' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Content Editor
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'services' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            Services
          </button>
          <button
            onClick={() => setActiveTab('case_studies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'case_studies' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Briefcase className="w-5 h-5" />
            Case Studies
          </button>
          <button
            onClick={() => setActiveTab('brand_logos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'brand_logos' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <ImageIcon className="w-5 h-5" />
            Brand Logos
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'faqs' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen relative">
        {/* Background Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-display font-black tracking-tighter uppercase">
                {activeTab === 'content' && 'Content Editor'}
                {activeTab === 'services' && 'Services'}
                {activeTab === 'case_studies' && 'Case Studies'}
                {activeTab === 'brand_logos' && 'Brand Logos'}
                {activeTab === 'faqs' && 'FAQs'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-400 mt-2 font-medium">
                {activeTab === 'content' && 'Manage categorized website copy and section media links'}
                {activeTab === 'services' && 'Manage your service offerings'}
                {activeTab === 'case_studies' && 'Manage your case studies'}
                {activeTab === 'brand_logos' && 'Manage client brand logos for the marquee section'}
                {activeTab === 'faqs' && 'Manage your frequently asked questions'}
                {activeTab === 'settings' && 'Configure brand, contact, and social settings'}
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black hover:scale-105 transition-all disabled:opacity-70 disabled:hover:scale-100 uppercase tracking-wider"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Changes
            </button>
          </div>

          {message.text && (
            <div className={`p-4 rounded-2xl mb-8 font-bold text-center ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          {fetchError && (
            <div className="p-4 rounded-2xl mb-8 font-bold text-center bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
              {fetchError}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAllContentSectionsCollapsed(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => setAllContentSectionsCollapsed(true)}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Collapse All
                </button>
              </div>

              {groupedContent.map((group) => {
                const sectionId = `group:${group.id}`;
                const collapsed = isSectionCollapsed(sectionId);

                return (
                  <div key={group.id} className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => toggleSection(sectionId)}
                      aria-expanded={!collapsed}
                      className={`w-full p-8 bg-white/[0.01] flex items-center justify-between gap-4 text-left ${collapsed ? '' : 'border-b border-white/5'}`}
                    >
                      <div>
                        <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">{group.title}</h2>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">{group.description}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </button>

                    {!collapsed && (
                      <div className="p-8 space-y-8">
                        {group.items.map(({ item, index }) => (
                          <div key={`${group.id}-${String(item.key)}`} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">{formatContentKey(String(item.key || ''))}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">English</label>
                                <textarea
                                  value={item.en_value || ''}
                                  onChange={(e) => handleContentChange(index, 'en_value', e.target.value)}
                                  className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hindi (हिंदी)</label>
                                <textarea
                                  value={item.hi_value || ''}
                                  onChange={(e) => handleContentChange(index, 'hi_value', e.target.value)}
                                  className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                                  dir="auto"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {uncategorizedContent.length > 0 && (() => {
                const sectionId = 'group:uncategorized';
                const collapsed = isSectionCollapsed(sectionId);

                return (
                  <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => toggleSection(sectionId)}
                      aria-expanded={!collapsed}
                      className={`w-full p-8 bg-white/[0.01] flex items-center justify-between gap-4 text-left ${collapsed ? '' : 'border-b border-white/5'}`}
                    >
                      <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Other Content Keys</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </button>

                    {!collapsed && (
                      <div className="p-8 space-y-8">
                        {uncategorizedContent.map(({ item, index }) => (
                          <div key={`other-${String(item.key)}`} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">{formatContentKey(String(item.key || ''))}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">English</label>
                                <textarea
                                  value={item.en_value || ''}
                                  onChange={(e) => handleContentChange(index, 'en_value', e.target.value)}
                                  className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hindi (हिंदी)</label>
                                <textarea
                                  value={item.hi_value || ''}
                                  onChange={(e) => handleContentChange(index, 'hi_value', e.target.value)}
                                  className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                                  dir="auto"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {(() => {
                const sectionId = 'media:hero';
                const collapsed = isSectionCollapsed(sectionId);

                return (
                  <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => toggleSection(sectionId)}
                      aria-expanded={!collapsed}
                      className={`w-full p-8 bg-white/[0.01] flex items-center justify-between gap-4 text-left ${collapsed ? '' : 'border-b border-white/5'}`}
                    >
                      <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Hero & Feature Media</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </button>

                    {!collapsed && (
                      <div className="p-8 space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hero Background Image URL</label>
                          <input
                            type="url"
                            value={data.settings.hero_image_url}
                            onChange={(e) => handleSettingChange('hero_image_url', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Marketing Image URL</label>
                            <input
                              type="url"
                              value={data.settings.marketing_image_url}
                              onChange={(e) => handleSettingChange('marketing_image_url', e.target.value)}
                              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Creative Process Image URL</label>
                            <input
                              type="url"
                              value={data.settings.creative_image_url}
                              onChange={(e) => handleSettingChange('creative_image_url', e.target.value)}
                              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {(() => {
                const sectionId = 'media:reviews';
                const collapsed = isSectionCollapsed(sectionId);

                return (
                  <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => toggleSection(sectionId)}
                      aria-expanded={!collapsed}
                      className={`w-full p-8 bg-white/[0.01] flex items-center justify-between gap-4 text-left ${collapsed ? '' : 'border-b border-white/5'}`}
                    >
                      <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Reviews Media</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </button>

                    {!collapsed && (
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Video Thumbnail 1 URL</label>
                            <input
                              type="url"
                              value={data.settings.video_thumbnail_1}
                              onChange={(e) => handleSettingChange('video_thumbnail_1', e.target.value)}
                              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Video 1 URL</label>
                            <input
                              type="url"
                              value={data.settings.video_url_1}
                              onChange={(e) => handleSettingChange('video_url_1', e.target.value)}
                              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Video Thumbnail 2 URL</label>
                            <input
                              type="url"
                              value={data.settings.video_thumbnail_2}
                              onChange={(e) => handleSettingChange('video_thumbnail_2', e.target.value)}
                              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Video 2 URL</label>
                            <input
                              type="url"
                              value={data.settings.video_url_2}
                              onChange={(e) => handleSettingChange('video_url_2', e.target.value)}
                              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Services Management</h2>
                <button
                  onClick={() => {
                    const newId = data.services.length > 0 ? Math.max(...data.services.map(s => s.id)) + 1 : 1;
                    setData({
                      ...data,
                      services: [...data.services, { id: newId, en_title: 'New Service', hi_title: 'नई सेवा', en_desc: 'Description here...', hi_desc: 'विवरण यहाँ...', icon: 'Star' }]
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>
              <div className="p-8 space-y-8">
                {data.services.map((service, index) => (
                  <div key={service.id} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group">
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const newServices = data.services.filter(s => s.id !== service.id);
                          setData({ ...data, services: newServices });
                        }}
                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Remove Service"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs">{index + 1}</div>
                      Service #{index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">English Title</label>
                          <input
                            type="text"
                            value={service.en_title}
                            onChange={(e) => handleServiceChange(index, 'en_title', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">English Description</label>
                          <textarea
                            value={service.en_desc}
                            onChange={(e) => handleServiceChange(index, 'en_desc', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Icon Name (Lucide)</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-mono text-sm"
                            placeholder="e.g., Palette, Layout, Code"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hindi Title</label>
                          <input
                            type="text"
                            value={service.hi_title}
                            onChange={(e) => handleServiceChange(index, 'hi_title', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            dir="auto"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hindi Description</label>
                          <textarea
                            value={service.hi_desc}
                            onChange={(e) => handleServiceChange(index, 'hi_desc', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                            dir="auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'case_studies' && (
            <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Case Studies Management</h2>
                <button
                  onClick={() => {
                    const newId = data.case_studies.length > 0 ? Math.max(...data.case_studies.map(s => s.id)) + 1 : 1;
                    setData({
                      ...data,
                      case_studies: [...data.case_studies, { id: newId, name: 'New Brand', metric: 'Metric', desc: 'Description here...', image_url: 'https://picsum.photos/seed/Brand/600/400' }]
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Case Study
                </button>
              </div>
              <div className="p-8 space-y-8">
                {data.case_studies.map((study, index) => (
                  <div key={study.id} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group">
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const newStudies = data.case_studies.filter(s => s.id !== study.id);
                          setData({ ...data, case_studies: newStudies });
                        }}
                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Remove Case Study"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs">{index + 1}</div>
                      Case Study #{index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Brand Name</label>
                          <input
                            type="text"
                            value={study.name}
                            onChange={(e) => handleCaseStudyChange(index, 'name', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Metric / Highlight</label>
                          <input
                            type="text"
                            value={study.metric}
                            onChange={(e) => handleCaseStudyChange(index, 'metric', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Description</label>
                          <textarea
                            value={study.desc}
                            onChange={(e) => handleCaseStudyChange(index, 'desc', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Image URL</label>
                          <input
                            type="url"
                            value={study.image_url}
                            onChange={(e) => handleCaseStudyChange(index, 'image_url', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">FAQs Management</h2>
                <button
                  onClick={() => {
                    const newId = data.faqs.length > 0 ? Math.max(...data.faqs.map((s: any) => s.id)) + 1 : 1;
                    setData({
                      ...data,
                      faqs: [...data.faqs, { id: newId, en_q: 'New Question', hi_q: 'नया प्रश्न', en_a: 'Answer here...', hi_a: 'उत्तर यहाँ...' }]
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>
              <div className="p-8 space-y-8">
                {data.faqs.map((faq: any, index: number) => (
                  <div key={faq.id} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group">
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const newFaqs = data.faqs.filter((s: any) => s.id !== faq.id);
                          setData({ ...data, faqs: newFaqs });
                        }}
                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Remove FAQ"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs">{index + 1}</div>
                      FAQ #{index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">English Question</label>
                          <input
                            type="text"
                            value={faq.en_q}
                            onChange={(e) => handleFaqChange(index, 'en_q', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">English Answer</label>
                          <textarea
                            value={faq.en_a}
                            onChange={(e) => handleFaqChange(index, 'en_a', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hindi Question</label>
                          <input
                            type="text"
                            value={faq.hi_q}
                            onChange={(e) => handleFaqChange(index, 'hi_q', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                            dir="auto"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Hindi Answer</label>
                          <textarea
                            value={faq.hi_a}
                            onChange={(e) => handleFaqChange(index, 'hi_a', e.target.value)}
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all min-h-[120px] font-medium resize-y"
                            dir="auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'brand_logos' && (
            <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Brand Logos</h2>
                <button
                  onClick={() => {
                    const newId = data.brand_logos.length > 0 ? Math.max(...data.brand_logos.map((b: any) => b.id)) + 1 : 1;
                    setData({
                      ...data,
                      brand_logos: [...data.brand_logos, { id: newId, name: 'Brand Name', image_url: '' }]
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Logo
                </button>
              </div>
              <div className="p-8 space-y-6">
                {data.brand_logos.map((logo: any, index: number) => (
                  <div key={logo.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group">
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const newLogos = data.brand_logos.filter((b: any) => b.id !== logo.id);
                          setData({ ...data, brand_logos: newLogos });
                        }}
                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Remove Logo"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-center">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Name</label>
                        <input
                          type="text"
                          value={logo.name}
                          onChange={(e) => handleBrandLogoChange(index, 'name', e.target.value)}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">Image URL</label>
                        <input
                          type="url"
                          value={logo.image_url}
                          onChange={(e) => handleBrandLogoChange(index, 'image_url', e.target.value)}
                          placeholder="https://example.com/logo.png"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium placeholder:text-gray-600"
                        />
                      </div>
                      {logo.image_url && (
                        <div className="flex items-end">
                          <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                            <img src={logo.image_url} alt={logo.name} className="max-w-full max-h-full object-contain" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {data.brand_logos.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="font-bold">No brand logos yet</p>
                    <p className="text-sm mt-1">Click &quot;Add Logo&quot; to add your first brand logo</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                  <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Branding &amp; Identity</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Logo Image URL</label>
                    <input
                      type="url"
                      value={data.settings.logo_image_url}
                      onChange={(e) => handleSettingChange('logo_image_url', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium placeholder:text-gray-600"
                    />
                    {data.settings.logo_image_url && (
                      <div className="mt-3 p-3 rounded-xl border border-white/10 bg-white/5 inline-block">
                        <img src={data.settings.logo_image_url} alt="Logo preview" className="h-10 w-auto object-contain" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Favicon URL</label>
                    <input
                      type="url"
                      value={data.settings.favicon_url}
                      onChange={(e) => handleSettingChange('favicon_url', e.target.value)}
                      placeholder="https://example.com/favicon.ico"
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium placeholder:text-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-2">Used as browser tab icon, Apple touch icon, and PWA icon. SVG, PNG, or ICO recommended.</p>
                    {data.settings.favicon_url && (
                      <div className="mt-3 p-3 rounded-xl border border-white/10 bg-white/5 inline-block">
                        <img src={data.settings.favicon_url} alt="Favicon preview" className="h-8 w-8 object-contain" />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">OG Image URL (Social Share Image)</label>
                    <input
                      type="url"
                      value={data.settings.og_image_url}
                      onChange={(e) => handleSettingChange('og_image_url', e.target.value)}
                      placeholder="https://example.com/og-image.png (1200×630 recommended)"
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium placeholder:text-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-2">Shown when link is shared on social media. Recommended size: 1200×630 pixels.</p>
                    {data.settings.og_image_url && (
                      <div className="mt-3 p-3 rounded-xl border border-white/10 bg-white/5 inline-block">
                        <img src={data.settings.og_image_url} alt="OG image preview" className="h-24 w-auto object-contain rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                  <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">General Settings</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Logo Text</label>
                    <input
                      type="text"
                      value={data.settings.logo_text}
                      onChange={(e) => handleSettingChange('logo_text', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Contact Email</label>
                    <input
                      type="email"
                      value={data.settings.contact_email}
                      onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Contact Phone</label>
                    <input
                      type="text"
                      value={data.settings.contact_phone}
                      onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">WhatsApp Number</label>
                    <input
                      type="text"
                      value={data.settings.whatsapp_number}
                      onChange={(e) => handleSettingChange('whatsapp_number', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-xl">
                <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                  <h2 className="font-display font-black text-xl uppercase tracking-widest text-gray-300">Social Links</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">LinkedIn URL</label>
                    <input
                      type="url"
                      value={data.settings.linkedin_url}
                      onChange={(e) => handleSettingChange('linkedin_url', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Instagram URL</label>
                    <input
                      type="url"
                      value={data.settings.instagram_url}
                      onChange={(e) => handleSettingChange('instagram_url', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Facebook URL</label>
                    <input
                      type="url"
                      value={data.settings.facebook_url}
                      onChange={(e) => handleSettingChange('facebook_url', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">X URL</label>
                    <input
                      type="url"
                      value={data.settings.x_url}
                      onChange={(e) => handleSettingChange('x_url', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">YouTube URL</label>
                    <input
                      type="url"
                      value={data.settings.youtube_url}
                      onChange={(e) => handleSettingChange('youtube_url', e.target.value)}
                      className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 text-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
