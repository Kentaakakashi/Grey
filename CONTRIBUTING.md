# Contributing to Graphic Designer Portfolio Template

> **By Airflute Technologies** — [patamde.com](https://patamde.com) | [business@patamde.com](mailto:business@patamde.com)

First off, thank you for taking the time to contribute! 🎉  
This is a community-driven open-source template for graphic designers. All kinds of contributions are welcome — bug fixes, UI improvements, documentation, and new features.

---

## Ways to Contribute

| Type | Description |
|------|-------------|
| 🐛 **Bug Reports** | Found something broken? Open an issue with steps to reproduce |
| 💡 **Feature Requests** | Have an idea? Share it as a GitHub Discussion or issue |
| 🎨 **UI/Design Improvements** | Better animations, layouts, colour schemes |
| 📝 **Documentation** | Improve README, setup guides, or add examples |
| 🔧 **Code Fixes** | Fix bugs, improve performance, or refactor code |
| 🌐 **Translations** | Add support for additional languages |

---

## Getting Started

### 1. Fork & Clone

```bash
# Fork the repo on GitHub, then clone your fork:
git clone https://github.com/YOUR-USERNAME/portfolio-website-for-graphic-designers.git
cd portfolio-website-for-graphic-designers
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 4. Run Locally

```bash
npm run dev
# Open http://localhost:3007
```

---

## Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. Make your changes, following the code style guidelines below.

3. Commit with a clear message:
   ```bash
   git commit -m "feat: add dark mode toggle animation"
   git commit -m "fix: correct mobile nav overflow"
   git commit -m "docs: clarify setup.php usage"
   ```

4. Push and open a Pull Request against the `main` branch.

---

## Code Style

- **TypeScript** for all React/Next.js components
- **TailwindCSS** for styling (avoid inline styles where possible)
- **Framer Motion** for animations
- Keep components in `/components`, pages in `/app`
- No `any` TypeScript types unless absolutely necessary
- Run `npm run lint` before submitting a PR

---

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Include a clear description of **what** changed and **why**
- If fixing a bug, reference the issue number: `Fixes #123`
- Screenshots or screen recordings are appreciated for UI changes
- Ensure `npm run build` passes without errors

---

## Reporting Security Issues

**Do not open a public issue for security vulnerabilities.**  
Instead, email us directly at [business@patamde.com](mailto:business@patamde.com) with details.

---

## Code of Conduct

Be kind, inclusive, and constructive. We're all here to help graphic designers have beautiful websites. 🎨

---

## Questions?

Feel free to reach out:
- 📧 [business@patamde.com](mailto:business@patamde.com)
- 🌐 [patamde.com](https://patamde.com)

We also offer **fully custom portfolio website builds** for graphic designers. If you'd like a completely bespoke design, get in touch!
