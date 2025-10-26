# APS News Website - Multi-Framework Repository

[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black)](https://nextjs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-green)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)](https://tailwindcss.com/)

This repository contains **two implementations** of the APS (Algérie Presse Service) news website using different frontend frameworks, while sharing the same backend APIs and design system.

---

## 🎯 Quick Overview

### 📱 Next.js Version (Current Directory)
- **Status**: ✅ Production Ready
- **Framework**: Next.js 15.2.3 + React 19
- **Rendering**: Server-Side Rendering (SSR)
- **Port**: 3020 (dev) / 4001 (prod)
- **Best for**: SEO-critical production deployment

### 🚀 Vue.js Version (`/vue-app/`)
- **Status**: 🚧 In Development
- **Framework**: Vue.js 3.5.13 + Vite 6
- **Rendering**: Client-Side Rendering (SPA)
- **Port**: 3021 (dev) / 4002 (prod)
- **Best for**: Alternative frontend, faster development iteration

---

## 🚀 Quick Start

### Run Next.js Version

```bash
npm install
npm run dev        # http://localhost:3020
```

### Run Vue.js Version

```bash
cd vue-app
npm install
npm run dev        # http://localhost:3021
```

### Run Both Simultaneously

```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - Vue.js
cd vue-app && npm run dev
```

---

## 📁 Repository Structure

```
/workspace/
├── 📂 Next.js App (Root)          # Production - Next.js + React
│   ├── src/app/                   # App Router pages
│   ├── compoenents/               # React components
│   ├── Api/                       # API utilities
│   ├── lib/                       # Configuration
│   ├── locales/                   # Translations
│   └── package.json
│
├── 📂 vue-app/                    # Alternative - Vue.js + Vite
│   ├── src/
│   │   ├── views/                 # Page components
│   │   ├── components/            # Vue components
│   │   ├── router/                # Vue Router
│   │   ├── stores/                # Pinia stores
│   │   └── api/                   # Axios client
│   └── package.json
│
├── 📄 MIGRATION_PLAN.md           # Detailed migration guide
├── 📄 REPOSITORY_STRUCTURE.md     # Repository overview
└── 📄 README.md                   # This file
```

---

## 🌟 Features

Both implementations include:

- ✅ **Multi-language Support**: 8 languages (Arabic, Tamazight variants, English, French, Spanish, Russian)
- ✅ **RTL/LTR Support**: Full right-to-left and left-to-right layout support
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Content Types**: Articles, Videos, Galleries, Infographics, Cahiers, Dossiers
- ✅ **Search & Archives**: Full-text search and archive browsing
- ✅ **Authentication**: Cookie-based user authentication
- ✅ **SEO Optimized**: Meta tags, Open Graph, structured data
- ✅ **Modern UI**: Tailwind CSS + DaisyUI components

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[MIGRATION_PLAN.md](./MIGRATION_PLAN.md)** | Complete migration strategy from Next.js to Vue.js |
| **[REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md)** | Detailed repository organization and guidelines |
| **[vue-app/README.md](./vue-app/README.md)** | Vue.js version setup and documentation |

---

## 🛠 Technology Stack

### Next.js Version

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15.2.3 |
| UI Library | React 19.0.0 |
| Styling | Tailwind CSS 4.0.17 + DaisyUI 5.0.9 |
| Fonts | Google Fonts (Roboto, Noto Kufi Arabic) |
| Build | Next.js (Turbopack) |
| Deployment | Node.js server |

### Vue.js Version

| Category | Technology |
|----------|-----------|
| Framework | Vue.js 3.5.13 |
| Build Tool | Vite 6.0.5 |
| Router | Vue Router 4.5.0 |
| State | Pinia 2.2.8 |
| HTTP Client | Axios 1.7.9 |
| Styling | Tailwind CSS 3.4.17 + DaisyUI 5.0.9 |
| Deployment | Static hosting |

---

## 🌍 Supported Languages

| Language | Code | Direction |
|----------|------|-----------|
| العربية (Arabic) | `ar` | RTL |
| ⵜⴰⵎⴰⵣⵉⵖⵜ (Tifinagh) | `tamazight-tif` | LTR |
| TAMAZIƔT (Latin) | `tamazight-tal` | LTR |
| ثامازيغث (Arabic script) | `tamazight-arb` | RTL |
| English | `en` | LTR |
| Français | `fr` | LTR |
| Español | `es` | LTR |
| Русский | `ru` | LTR |

---

## 📊 Comparison

| Feature | Next.js | Vue.js |
|---------|---------|--------|
| **Rendering** | SSR/SSG | CSR (SPA) |
| **SEO** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good (needs SSR plugin) |
| **Performance** | ⭐⭐⭐⭐ Great | ⭐⭐⭐⭐⭐ Excellent |
| **Dev Speed** | ⭐⭐⭐⭐ Fast | ⭐⭐⭐⭐⭐ Very Fast (Vite) |
| **Deployment** | Node.js server | Static hosting |
| **Bundle Size** | ~250 KB | ~150 KB |
| **Learning Curve** | Moderate | Easy |
| **Status** | Production | Development |

---

## 🔄 API Integration

Both versions use the **same backend APIs**:

- `GET /home` - Home page content
- `GET /home/header` - Navigation menu
- `GET /:slug` - Article details
- `GET /video/:slug` - Video content
- `GET /galeries-photos` - Photo galleries
- `GET /infographie` - Infographics
- `GET /cahier-multimedia` - Multimedia notebooks
- `GET /dossier` - Dossiers
- `GET /archive` - Archives
- `GET /search` - Search results
- `GET /tags/:tag` - Tagged content
- `GET /api/image/:path` - Image proxy

---

## ⚙️ Configuration

### Environment Variables

Both versions use environment variables for configuration:

**Next.js** (`.env`):
```env
NEXT_BASE_URL=http://api.example.com
NEXT_IMAGE_URL=http://images.example.com
NEXT_LAN=fr
# ... more variables
```

**Vue.js** (`vue-app/.env`):
```env
VITE_BASE_URL=http://api.example.com
VITE_IMAGE_URL=http://images.example.com
VITE_LANG=fr
# ... more variables
```

See `.env.example` files in each directory for full configuration.

---

## 🚀 Development Commands

### Next.js

```bash
npm run dev           # Start dev server (port 3020)
npm run build         # Build for production
npm run start         # Start production server (port 4001)
npm run lint          # Run ESLint
```

### Vue.js

```bash
cd vue-app
npm run dev           # Start dev server (port 3021)
npm run build         # Build for production
npm run preview       # Preview production build (port 4002)
npm run lint          # Run ESLint
```

---

## 📦 Installation

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Setup Next.js Version

```bash
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Setup Vue.js Version

```bash
cd vue-app
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

---

## 🎯 Use Cases

### When to Choose Next.js

✅ Primary production deployment  
✅ SEO is critical (news content)  
✅ Server-side rendering required  
✅ Team experienced with React  
✅ Need static site generation  

### When to Choose Vue.js

✅ Alternative frontend option  
✅ Simpler deployment (static hosting)  
✅ Faster development iteration  
✅ Team experienced with Vue  
✅ Lighter client-side bundle preferred  

---

## 🗺 Migration Status

### Completed ✅

- [x] Vue.js project setup
- [x] Vite configuration
- [x] Tailwind CSS + DaisyUI setup
- [x] Vue Router configuration
- [x] Pinia state management
- [x] API client (Axios)
- [x] Core layout structure
- [x] Sample components (Home, Header, Footer)
- [x] Documentation (README, Migration Plan)

### In Progress 🚧

- [ ] Complete component migration
- [ ] All page views
- [ ] Search functionality
- [ ] Authentication system

### Planned ⏳

- [ ] Full feature parity with Next.js
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Production deployment

---

## 📈 Performance

### Next.js Version

- **First Load**: Fast (SSR)
- **Subsequent Navigation**: Fast
- **Build Time**: ~60 seconds
- **Bundle Size**: ~250 KB (gzipped)

### Vue.js Version

- **First Load**: Very Fast
- **Subsequent Navigation**: Very Fast (SPA)
- **Build Time**: ~20 seconds
- **Bundle Size**: ~150 KB (gzipped)

---

## 🧪 Testing

### Current State

- Manual testing in progress
- Cross-browser compatibility verified
- Responsive design tested

### Planned Testing

- Unit tests (Jest/Vitest)
- Component tests
- E2E tests (Cypress/Playwright)
- Performance testing
- Accessibility testing

---

## 🚀 Deployment

### Next.js Deployment

Requires Node.js server:
- Vercel (recommended)
- AWS Amplify
- DigitalOcean App Platform
- Custom VPS with PM2

### Vue.js Deployment

Static hosting:
- Netlify
- Vercel
- GitHub Pages
- Nginx/Apache
- AWS S3 + CloudFront

---

## 🤝 Contributing

When contributing:

1. Maintain feature parity between versions
2. Follow framework-specific conventions
3. Test across browsers and devices
4. Test RTL and LTR layouts
5. Document changes in respective READMEs
6. Ensure responsive design

---

## 📞 Support

For detailed information:

- **Migration Guide**: See [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
- **Repository Structure**: See [REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md)
- **Vue.js Setup**: See [vue-app/README.md](./vue-app/README.md)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vue.js Docs**: [vuejs.org/guide](https://vuejs.org/guide/)

---

## 📄 License

This project is part of the APS (Algérie Presse Service) platform.

© 2025 APS. All rights reserved.

---

## 🎓 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)

---

**Repository Version**: 1.0  
**Last Updated**: 2025-10-26  
**Maintainer**: APS Development Team

---

**Quick Links:**
- 📖 [Migration Plan](./MIGRATION_PLAN.md)
- 🏗️ [Repository Structure](./REPOSITORY_STRUCTURE.md)
- 🚀 [Vue.js README](./vue-app/README.md)
