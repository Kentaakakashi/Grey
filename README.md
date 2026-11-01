<div align="center">

# 🎨 Graphic Designer Portfolio Website

### A free, open-source Next.js portfolio template built for graphic designers

**Beautiful · Editable · Self-Hosted · No coding required after setup**

[![License: Airflute Personal Use](https://img.shields.io/badge/License-Airflute%20Personal%20Use-blueviolet?style=for-the-badge)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](./CONTRIBUTING.md)

**· [📖 Admin Setup](./docs/ADMIN_SETUP.md) · [🐛 Report Bug](https://github.com/airflute/portfolio-website-for-graphic-designers/issues) · [💌 Contact Us](mailto:business@patamde.com)**

</div>

---

![Portfolio Template Preview](./docs/preview.png)

---

## ✨ What Is This?

**Graphic Designer Portfolio Website** is a production-ready, open-source portfolio template crafted specifically for graphic designers, visual artists, illustrators, and creative professionals. Built on **Next.js 15**, it delivers blazing-fast performance, stunning animations, and a fully functional 
**admin panel** — so you can update your portfolio content without touching a single line of code.

Whether you're a freelancer showcasing your brand identity work, a motion designer presenting your reel, or an illustrator building your online presence — this template has you covered.

> 💡 **Need a fully custom design?** We at [Airflute Technologies](https://patamde.com) specialise in building beautiful, bespoke portfolio websites for graphic designers. [Get in touch →](mailto:business@patamde.com)

---

## 🚀 Features

| Feature | Details |
|---------|---------|
| ⚡ **Ultra-fast** | Next.js 15 static export — loads in milliseconds |
| 🎨 **Dark & Light modes** | Smooth theme toggle with system preference detection |
| ✏️ **Admin panel** | Edit all content from a browser — no code needed |
| 🖥️ **Responsive design** | Pixel-perfect on mobile, tablet, and desktop |
| 🎬 **Smooth animations** | Framer Motion powered micro-interactions |
| 🖱️ **Custom cursor** | Unique animated cursor for a premium feel |
| 📍 **Dot scroll nav** | Elegant section navigation for single-page layout |
| 🔒 **Secure admin** | PHP sessions with HttpOnly + SameSite=Strict cookies |
| 🗄️ **MySQL backend** | PHP API for content storage — no Node.js server needed |
| 🌐 **SEO ready** | Open Graph, Twitter Cards, sitemap, robots.txt built-in |
| 📱 **PWA manifest** | Installable as a Progressive Web App |
| 🚢 **One-command deploy** | `npm run export:hostinger` for Hostinger shared hosting |

---

## 📋 What You Can Showcase

This template is designed for **graphic designers** who want to present:

- 🎨 **Brand Identity** — logos, color systems, typography
- 📐 **Print Design** — posters, brochures, packaging
- 💻 **Digital Design** — UI/UX, web graphics, social media
- 🎬 **Motion Graphics** — animated logos, video titles
- ✍️ **Illustration** — editorial, commercial, personal work
- 📸 **Photography** — creative and commercial photography

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.9 |
| **Styling** | TailwindCSS v4 |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Fonts** | Poppins + Space Grotesk (Google Fonts) |
| **Backend API** | PHP 8+ |
| **Database** | MySQL (via PDO) |
| **Hosting** | Hostinger Shared Hosting (recommended) |

---

## 🚦 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm 10 or later
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/airflute/portfolio-website-for-graphic-designers.git
cd portfolio-website-for-graphic-designers
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your site URL:
```env
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### 4. Run the Dev Server

```bash
npm run dev
# Open http://localhost:3007
```

### 5. Customise Your Content

Open `app/layout.tsx` and update the metadata (look for the `👉 Replace` comments):
- Your name / studio name
- Your tagline and description
- Your domain
- SEO keywords relevant to your design work

---

## 🚀 Deployment Guides

### 🟠 Hostinger (Recommended — Full Support)

Hostinger shared hosting supports both **static files** and **PHP**, making it the perfect host for this template with full admin panel functionality.

**Step 1** — Build the Hostinger package:
```bash
npm run export:hostinger
```

This generates an `out/` folder containing:
- Static Next.js pages (`index.html`, `_next/`, `admin/`, etc.)
- PHP API files (`api/`)

**Step 2** — Upload to Hostinger:
1. Log in to [hPanel](https://hpanel.hostinger.com/)
2. Go to **File Manager → public_html**
3. Upload the **contents** of `out/` into `public_html/`

**Step 3** — Set up the admin panel:
Follow the **[Admin Setup Guide →](./docs/ADMIN_SETUP.md)** to configure your database and create your admin account.

**Step 4** — Visit your site:
- Frontend: `https://your-domain.com`
- Admin: `https://your-domain.com/admin/login`

---

### 🔵 Firebase App Hosting

> [!NOTE]
> Firebase App Hosting serves the static frontend beautifully, but the PHP admin API requires a PHP-compatible server.
>
> **Want a complete Firebase setup with admin panel?**  
> We can set this up for you — contact us at [business@patamde.com](mailto:business@patamde.com) or visit [patamde.com](https://patamde.com).

For static-only frontend deployment on Firebase:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run export:hostinger
firebase deploy --only hosting
```

---

### ⚫ Vercel

> [!NOTE]
> Vercel supports Next.js natively and will serve the frontend perfectly. However, the PHP API backend is **not supported** on Vercel's serverless infrastructure.
>
> **Want a full Vercel deployment with a working admin panel?**  
> We handle full-stack Vercel deployments with alternative API backends — reach out at [business@patamde.com](mailto:business@patamde.com).

For static frontend only:
```bash
npm install -g vercel
vercel deploy
```

---

### 🟡 Cloudflare Pages / Workers

> [!NOTE]
> Cloudflare Pages runs on V8 isolates — **PHP is not supported**. The admin panel requires PHP.
>
> **Want your portfolio on Cloudflare with a fully working admin?**  
> We build custom Cloudflare Workers-compatible API backends for portfolio sites. Contact us: [business@patamde.com](mailto:business@patamde.com) | [patamde.com](https://patamde.com).

For static frontend deployment on Cloudflare Pages:
```bash
npm run export:hostinger
npx wrangler pages deploy out
```

---

## 🔐 Admin Panel

The admin panel lets you edit **every piece of content** on your portfolio site from a browser — no coding needed.

| What you can edit | |
|---|---|
| Hero section (name, tagline, CTA) | ✅ |
| About section (bio, photo, skills) | ✅ |
| Portfolio projects (images, titles, descriptions) | ✅ |
| Services offered | ✅ |
| Client testimonials | ✅ |
| Contact details & social links | ✅ |

**[📖 Full Admin Setup Guide →](./docs/ADMIN_SETUP.md)**

### Quick Admin Setup

1. Configure `api/config.php` with your database credentials
2. Run the setup endpoint once:
   ```bash
   curl -X POST https://your-domain.com/api/setup.php \
     -H "Content-Type: application/json" \
     -d '{
       "setup_key": "YOUR_SETUP_KEY",
       "username": "admin",
       "password": "UseAStrongPassword123!"
     }'
   ```
3. Log in at `https://your-domain.com/admin/login`
4. Start editing your portfolio! 🎉

---

## 🎨 Customisation

### Change Your Name & Tagline

Edit `app/layout.tsx` — follow the `// 👉 Replace` comments:
```typescript
title: {
  default: 'Your Name | Graphic Designer Portfolio', // 👉 Replace
},
description: 'Your bio here...',                     // 👉 Replace
```

### Change Colors & Theme

Edit `app/globals.css` — update the CSS custom properties:
```css
:root {
  --color-accent: /* your accent color */;
  --color-background: /* your background */;
}
```

### Change Fonts

Edit `app/layout.tsx` — swap the Google Fonts imports:
```typescript
import { YourFont } from 'next/font/google';
```

### Add Your Domain to CORS

Edit `api/config.php`:
```php
define('CORS_ALLOWED_ORIGINS', [
    'https://your-domain.com',
    'https://www.your-domain.com',
]);
```

---

## 📁 Project Structure

```
portfolio-website-for-graphic-designers/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── globals.css      # Global styles & design tokens
│   ├── layout.tsx       # Root layout + SEO metadata  ← edit your name here
│   ├── page.tsx         # Main portfolio page
│   ├── manifest.ts      # PWA manifest
│   ├── robots.ts        # SEO robots.txt
│   └── sitemap.ts       # XML sitemap
├── components/
│   ├── HomePage.tsx     # Main portfolio component  ← all sections here
│   ├── CustomCursor.tsx # Custom animated cursor
│   ├── DotScrollNav.tsx # Side dot navigation
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── LanguageProvider.tsx
├── api/                 # PHP backend (Hostinger)
│   ├── config.php       ← set your DB credentials here
│   ├── setup.php        # One-time admin setup
│   ├── login.php        # Admin authentication
│   ├── get_content.php  # Fetch portfolio content
│   └── update_content.php # Save content changes
├── docs/
│   ├── ADMIN_SETUP.md   # Admin panel setup guide
│   └── preview.png      # Template preview screenshot
├── scripts/
│   └── prepare-hostinger-export.mjs  # Hostinger build script
├── .env.example         # Environment variables template
├── LICENSE              # Airflute Personal Use License
├── CONTRIBUTING.md      # How to contribute
└── README.md            # This file
```

---

## 🔒 Security

- Admin sessions use **HttpOnly + SameSite=Strict** cookies
- `setup.php` is protected by a secret `SETUP_KEY` — rotate after use
- `api/.htaccess` blocks direct access to internal PHP files
- Database queries use **PDO prepared statements** to prevent SQL injection
- Never commit `api/config.php` with real credentials

---

## 📜 License

This project is licensed under the **Airflute Personal Use License**.

✅ **Allowed:**
- Personal portfolio use
- Self-hosting and modification
- Sharing your modified version (with attribution)

❌ **Not allowed:**
- Commercial use or client projects (without a commercial license)
- Selling or sublicensing this template
- Removing the attribution

**Attribution required** on any public deployment:
> "Built with a template by [Airflute Technologies](https://patamde.com)"

For **commercial licensing** or **client project use**, contact us:  
📧 [business@patamde.com](mailto:business@patamde.com)

[Read the full license →](./LICENSE)

---

## 💼 Need a Custom Portfolio Website?

You found this template because you want a **great portfolio website** — but maybe you want something more unique, tailored to your brand, or with features this template doesn't have yet.

**We build beautiful, bespoke portfolio websites for graphic designers.**

At [Airflute Technologies](https://patamde.com), we specialize in:
- 🎨 Custom design from scratch — uniquely yours
- ✨ Advanced animations and interactions
- 📱 Mobile-first, pixel-perfect layouts
- 🚀 Full deployment and hosting setup
- 🛠️ Ongoing maintenance and updates

**📧 [business@patamde.com](mailto:business@patamde.com)**  
**🌐 [patamde.com](https://patamde.com)**

*Let's build something beautiful together.*

---

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, new feature, or documentation improvement.

[Read the contributing guide →](./CONTRIBUTING.md)

---

## 🙏 Acknowledgements

Built with love using:
- [Next.js](https://nextjs.org/) — The React Framework
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS
- [Lucide React](https://lucide.dev/) — Beautiful icons

---

<div align="center">

**Made with ❤️ by [Airflute Technologies](https://patamde.com)**

[Website](https://patamde.com) · [Email](mailto:business@patamde.com) · [Issues](https://github.com/airflute/portfolio-website-for-graphic-designers/issues)

*Free for personal use — see [LICENSE](./LICENSE) for details*

</div>
