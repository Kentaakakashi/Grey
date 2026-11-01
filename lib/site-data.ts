export type GenericRecord = Record<string, any>;

export type SiteSettings = {
    logo_text: string;
    logo_image_url: string;
    favicon_url: string;
    og_image_url: string;
    contact_email: string;
    contact_phone: string;
    whatsapp_number: string;
    linkedin_url: string;
    instagram_url: string;
    facebook_url: string;
    x_url: string;
    youtube_url: string;
    hero_image_url: string;
    marketing_image_url: string;
    creative_image_url: string;
    video_thumbnail_1: string;
    video_thumbnail_2: string;
    video_url_1: string;
    video_url_2: string;
    [key: string]: string;
};

export type SiteData = {
    content: GenericRecord[];
    services: GenericRecord[];
    case_studies: GenericRecord[];
    faqs: GenericRecord[];
    brand_logos: GenericRecord[];
    settings: SiteSettings;
};

const EMPTY_SETTINGS: SiteSettings = {
    logo_text: '',
    logo_image_url: '',
    favicon_url: '',
    og_image_url: '',
    contact_email: '',
    contact_phone: '',
    whatsapp_number: '',
    linkedin_url: '',
    instagram_url: '',
    facebook_url: '',
    x_url: '',
    youtube_url: '',
    hero_image_url: '',
    marketing_image_url: '',
    creative_image_url: '',
    video_thumbnail_1: '',
    video_thumbnail_2: '',
    video_url_1: '',
    video_url_2: '',
};

export const createEmptySiteData = (): SiteData => ({
    content: [],
    services: [],
    case_studies: [],
    faqs: [],
    brand_logos: [],
    settings: { ...EMPTY_SETTINGS },
});

export const normalizeSiteData = (raw: unknown): SiteData => {
    if (!raw || typeof raw !== 'object') {
        return createEmptySiteData();
    }

    const source = raw as Record<string, any>;
    const settingsSource =
        source.settings && typeof source.settings === 'object'
            ? (source.settings as Record<string, any>)
            : {};

    const settings: SiteSettings = { ...EMPTY_SETTINGS };

    for (const [key, value] of Object.entries(settingsSource)) {
        if (typeof value === 'string') {
            settings[key] = value;
        }
    }

    const contentSource = Array.isArray(source.content) ? (source.content as GenericRecord[]) : [];

    const contentMap = new Map<string, GenericRecord>();
    for (const item of contentSource) {
        const key = typeof item?.key === 'string' ? item.key : '';
        if (!key) continue;

        contentMap.set(key, {
            ...item,
            key,
            en_value: typeof item.en_value === 'string' ? item.en_value : '',
            hi_value: typeof item.hi_value === 'string' ? item.hi_value : '',
        });
    }

    const normalizedContent = Array.from(contentMap.values());

    return {
        content: normalizedContent,
        services: Array.isArray(source.services) ? (source.services as GenericRecord[]) : [],
        case_studies: Array.isArray(source.case_studies) ? (source.case_studies as GenericRecord[]) : [],
        faqs: Array.isArray(source.faqs) ? (source.faqs as GenericRecord[]) : [],
        brand_logos: Array.isArray(source.brand_logos) ? (source.brand_logos as GenericRecord[]) : [],
        settings,
    };
};
