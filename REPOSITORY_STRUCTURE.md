# APS Website - Multi-Framework Repository

This repository contains two implementations of the APS (Algérie Presse Service) news website:
1. **Next.js + Tailwind CSS** (Original, Production)
2. **Vue.js + Tailwind CSS** (New, Alternative)

Both implementations share the same backend APIs and maintain identical design and functionality.

---

## 📁 Repository Structure

```
/workspace/
├── 📂 Next.js Application (Root)
│   ├── src/app/                    # Next.js App Router pages
│   ├── compoenents/                # React components
│   ├── Api/                        # API utilities
│   ├── lib/                        # Configuration
│   ├── locales/                    # Translations
│   ├── utils/                      # Helper functions
│   ├── public/                     # Static assets
│   ├── package.json
│   ├── next.config.mjs
│   └── README.md
│
├── 📂 vue-app/                     # Vue.js Application
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── router/
│   │   ├── stores/
│   │   ├── views/
│   │   ├── components/
│   │   ├── api/
│   │   ├── locales/
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md               # Vue.js documentation
│
├── 📄 MIGRATION_PLAN.md           # Comprehensive migration guide
├── 📄 REPOSITORY_STRUCTURE.md     # This file
└── 📄 README.md                   # Original Next.js README
```

---

## 🚀 Quick Start Guide

### Next.js Version (Production)

```bash
# From repository root
npm install
npm run dev      # Development: http://localhost:3020
npm run build    # Production build
npm start        # Production: http://localhost:4001
```

### Vue.js Version (Alternative)

```bash
# From repository root
cd vue-app
npm install
npm run dev      # Development: http://localhost:3021
npm run build    # Production build
npm run preview  # Production: http://localhost:4002
```

---

## 📊 Technology Comparison

| Feature | Next.js Version | Vue.js Version |
|---------|----------------|----------------|
| **Framework** | Next.js 15.2.3 | Vue.js 3.5.13 |
| **Build Tool** | Next.js (Turbopack) | Vite 6.0.5 |
| **Rendering** | SSR + SSG | SPA (CSR) |
| **Routing** | File-based App Router | Vue Router 4.5.0 |
| **State** | React hooks | Pinia 2.2.8 |
| **Styling** | Tailwind CSS v4 | Tailwind CSS v3 |
| **UI Library** | DaisyUI 5.0.9 | DaisyUI 5.0.9 |
| **Dev Port** | 3020 | 3021 |
| **Prod Port** | 4001 | 4002 |
| **Deploy** | Node.js server | Static hosting |

---

## 🎯 Use Cases

### When to Use Next.js Version

✅ **Primary/Production deployment**  
✅ SEO is critical (server-side rendering)  
✅ Need static site generation (SSG)  
✅ Prefer React ecosystem  
✅ Team familiar with Next.js  

### When to Use Vue.js Version

✅ **Alternative frontend option**  
✅ Prefer Vue.js ecosystem  
✅ Need simpler deployment (static hosting)  
✅ Faster development iteration (Vite)  
✅ Team familiar with Vue.js  
✅ Lighter bundle size preferred  

---

## 🔄 Shared Resources

Both implementations share:

### ✅ Backend APIs
- Same API endpoints
- Same authentication mechanism
- Same response formats
- Same image proxy

### ✅ Design System
- Identical Tailwind CSS classes
- Same DaisyUI configuration
- Same color scheme (`#1D589F` primary)
- Same responsive breakpoints

### ✅ Assets
- Logo and images in `public/`
- Fonts (Roboto, Noto Kufi Arabic)
- PDF files
- Static resources

### ✅ Configuration
- Language support (8 languages)
- RTL/LTR layouts
- Environment variables (adapted)
- Base path: `/fr`

---

## 📝 Key Documents

### 1. [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
Comprehensive migration guide covering:
- Architecture analysis
- Component mapping Next.js → Vue.js
- Routing differences
- Data fetching strategies
- Phase-by-phase implementation plan
- Timeline and resource estimates

### 2. [vue-app/README.md](./vue-app/README.md)
Complete Vue.js documentation:
- Installation instructions
- Configuration guide
- Development workflow
- API integration
- Deployment strategies
- Troubleshooting

### 3. [README.md](./README.md)
Original Next.js documentation

---

## 🌍 Multi-Language Support

Both applications support:

| Language | Code | Direction | Path |
|----------|------|-----------|------|
| العربية (Arabic) | `ar` | RTL | `/` |
| ⵜⴰⵎⴰⵣⵉⵖⵜ (Tifinagh) | `tamazight-tif` | LTR | `/tamazight-tif` |
| TAMAZIƔT (Latin) | `tamazight-tal` | LTR | `/tamazight-tal` |
| ثامازيغث (Arabic) | `tamazight-arb` | RTL | `/tamazight-arb` |
| English | `en` | LTR | `/en` |
| Français | `fr` | LTR | `/fr` |
| Español | `es` | LTR | `/es` |
| Русский | `ru` | LTR | `/ru` |

---

## 🔧 Development Workflow

### Option 1: Run Both Simultaneously

```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - Vue.js
cd vue-app && npm run dev
```

Both will run simultaneously on different ports for comparison.

### Option 2: Work on One at a Time

Choose the framework you need and run only that version.

### Best Practice: Feature Parity

When adding new features:
1. Implement in Next.js version (primary)
2. Port to Vue.js version (secondary)
3. Test both implementations
4. Ensure visual and functional parity

---

## 🚀 Deployment Strategies

### Strategy 1: Parallel Deployment
- Deploy both versions independently
- Use different subdomains or paths
- A/B test between versions
- Gradual migration of users

**Example:**
- Next.js: `https://www.aps.dz/fr/`
- Vue.js: `https://vue.aps.dz/fr/`

### Strategy 2: Sequential Deployment
- Keep Next.js in production
- Use Vue.js for testing/staging
- Switch when Vue.js version is complete
- Maintain Next.js as fallback

### Strategy 3: Feature Flags
- Deploy both behind feature flags
- Toggle between versions per user
- Collect metrics and feedback
- Choose winner based on data

---

## 📦 Dependencies Management

### Updating Dependencies

#### Next.js Version:
```bash
npm outdated
npm update
npm run build  # Test build
npm run dev    # Test development
```

#### Vue.js Version:
```bash
cd vue-app
npm outdated
npm update
npm run build  # Test build
npm run dev    # Test development
```

### Security Updates

Run regularly:
```bash
npm audit
npm audit fix
```

---

## 🧪 Testing

### Next.js Version
```bash
npm run lint
# Add: npm test (when tests are implemented)
```

### Vue.js Version
```bash
cd vue-app
npm run lint
# Add: npm test (when tests are implemented)
```

---

## 🎨 Styling Guidelines

Both versions use:
- **Tailwind CSS**: Utility-first styling
- **DaisyUI**: Pre-built components
- **Custom CSS**: RTL/LTR support, scrollbar hiding

### Consistent Styling

Use the same Tailwind classes across both:
```html
<!-- Next.js -->
<div className="bg-white rounded-[5px] shadow-md p-4">

<!-- Vue.js -->
<div class="bg-white rounded-[5px] shadow-md p-4">
```

---

## 📈 Performance Comparison

### Bundle Size (Estimated)

| Metric | Next.js | Vue.js |
|--------|---------|--------|
| **Initial Load** | ~250 KB | ~150 KB |
| **Framework** | React 19 | Vue 3 |
| **Runtime** | Server + Client | Client only |
| **First Paint** | Faster (SSR) | Fast (SPA) |
| **Subsequent Navigation** | Fast | Very fast |

### Build Time

| Operation | Next.js | Vue.js |
|-----------|---------|--------|
| **Cold Start** | ~30s | ~5s |
| **Hot Reload** | ~2s | ~1s |
| **Production Build** | ~60s | ~20s |

---

## 🔍 SEO Considerations

### Next.js (Better for SEO)
- ✅ Server-side rendering
- ✅ Static site generation
- ✅ Meta tags rendered server-side
- ✅ Content visible to crawlers immediately

### Vue.js (Requires Extra Setup)
- ⚠️ Client-side rendering (default)
- ✅ Can add SSR with Nuxt.js
- ✅ Can pre-render with plugins
- ⚠️ Meta tags injected client-side

**Recommendation**: Use Next.js for production if SEO is critical.

---

## 🛠 Maintenance

### Regular Tasks

#### Weekly
- [ ] Check for security updates
- [ ] Review error logs
- [ ] Monitor performance metrics

#### Monthly
- [ ] Update dependencies
- [ ] Review and merge changes between versions
- [ ] Performance optimization review

#### Quarterly
- [ ] Major dependency updates
- [ ] Feature parity check
- [ ] User feedback review

---

## 📞 Support & Contact

For technical questions:
1. Check respective README files
2. Review MIGRATION_PLAN.md
3. Check framework documentation:
   - Next.js: https://nextjs.org/docs
   - Vue.js: https://vuejs.org/guide/

---

## 🗺 Migration Roadmap

### Phase 1: Foundation ✅ COMPLETED
- [x] Setup Vue.js project structure
- [x] Configure Vite + Tailwind
- [x] Create router configuration
- [x] Setup Pinia stores
- [x] Configure API client
- [x] Create documentation

### Phase 2: Core Components (Next)
- [ ] Layout components (Header, Footer)
- [ ] Home page sections
- [ ] Shared UI components

### Phase 3: Content Pages
- [ ] Article pages
- [ ] Video pages
- [ ] Gallery pages
- [ ] Infographic pages
- [ ] Cahier pages
- [ ] Dossier pages

### Phase 4: Features
- [ ] Search functionality
- [ ] Archives
- [ ] Tags
- [ ] Authentication
- [ ] Protected content

### Phase 5: Optimization
- [ ] Performance tuning
- [ ] SEO implementation
- [ ] Testing
- [ ] Production deployment

**Estimated Total Time**: 15-25 days

---

## 🎓 Learning Resources

### For Next.js Developers Learning Vue.js
- [Vue for React Developers](https://vuejs.org/guide/introduction.html)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router from React Router](https://router.vuejs.org/guide/)

### For Vue.js Developers Learning Next.js
- [Next.js for Vue Developers](https://nextjs.org/learn)
- [React Docs](https://react.dev/)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 📊 Project Status

| Component | Next.js | Vue.js | Status |
|-----------|---------|--------|--------|
| **Setup** | ✅ | ✅ | Complete |
| **Routing** | ✅ | ✅ | Complete |
| **API Client** | ✅ | ✅ | Complete |
| **Layout** | ✅ | 🚧 | In Progress |
| **Home Page** | ✅ | 🚧 | In Progress |
| **Content Pages** | ✅ | ⏳ | Planned |
| **Search** | ✅ | ⏳ | Planned |
| **Auth** | ✅ | ⏳ | Planned |
| **SEO** | ✅ | ⏳ | Planned |
| **Testing** | ⏳ | ⏳ | Planned |
| **Production** | ✅ | ⏳ | Planned |

**Legend:**
- ✅ Complete
- 🚧 In Progress
- ⏳ Planned
- ❌ Blocked

---

## 🤝 Contributing

When contributing to either version:

1. **Maintain Feature Parity**: Keep both versions functionally identical
2. **Follow Style Guides**: Next.js (React) and Vue.js conventions
3. **Test Thoroughly**: Test changes in both versions when applicable
4. **Document Changes**: Update relevant README files
5. **Responsive Design**: Test mobile, tablet, and desktop
6. **RTL/LTR**: Test both text directions
7. **Multi-language**: Test with different languages

---

## 📄 License

This project is part of the APS (Algérie Presse Service) platform.  
© 2025 APS. All rights reserved.

---

**Last Updated**: 2025-10-26  
**Repository Version**: 1.0  
**Next.js Version**: Production  
**Vue.js Version**: Development
