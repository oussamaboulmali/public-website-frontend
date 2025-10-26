# Migration Plan: Next.js to Vue.js

## Overview

This document outlines the migration strategy from the existing Next.js + Tailwind CSS website to a Vue.js + Tailwind CSS version while maintaining the same backend APIs, design, and functionality.

---

## 1. Current Next.js Architecture Analysis

### 1.1 Project Structure
```
/workspace/
├── src/app/                    # Next.js App Router pages
│   ├── layout.js              # Root layout with Header/Footer
│   ├── page.js                # Home page
│   ├── [...slugs]/            # Dynamic article routes
│   ├── video/                 # Video pages
│   ├── galeries-photos/       # Gallery pages
│   ├── infographie/           # Infographic pages
│   ├── cahier-multimedia/     # Multimedia notebook pages
│   ├── dossier/               # Dossier pages
│   ├── archive/               # Archive pages
│   ├── tags/                  # Tag pages
│   └── search/                # Search page
├── compoenents/               # React components (typo in original)
│   ├── Home/                  # Home page sections
│   ├── Posts/                 # Article components
│   ├── Videos/                # Video components
│   ├── Galeries/              # Gallery components
│   ├── Infographies/          # Infographic components
│   ├── Cahiers/               # Cahier components
│   ├── Dossiers/              # Dossier components
│   ├── Menu/                  # Navigation components
│   ├── Footer/                # Footer component
│   └── ui/                    # Shared UI components
├── Api/                       # API client functions
├── lib/                       # Configuration utilities
├── locales/                   # Translations and language config
└── utils/                     # Helper functions
```

### 1.2 Key Technologies
- **Next.js**: v15.2.3 (App Router)
- **React**: v19.0.0
- **Tailwind CSS**: v4.0.17 (with new @tailwindcss/postcss plugin)
- **DaisyUI**: v5.0.9
- **Server Components**: Extensive use for data fetching
- **Image Optimization**: Next.js Image component
- **Fonts**: Google Fonts (Roboto, Noto Kufi Arabic)

### 1.3 Features
- Multi-language support (Arabic, Tamazight variants, English, French, Spanish, Russian)
- RTL (Right-to-Left) and LTR (Left-to-Right) support
- Server-side rendering (SSR)
- Dynamic routing with slugs
- Authentication with cookies
- Image proxying through API
- SEO metadata generation
- Social media integration
- Google Analytics

---

## 2. Vue.js Architecture Design

### 2.1 New Project Structure
```
/workspace/vue-app/
├── src/
│   ├── main.js                # Vue app entry point
│   ├── App.vue                # Root component
│   ├── router/                # Vue Router configuration
│   │   └── index.js           # Route definitions
│   ├── stores/                # Pinia state management
│   │   └── config.js          # Global configuration store
│   ├── views/                 # Page components (route targets)
│   │   ├── HomeView.vue
│   │   ├── ArticleView.vue
│   │   ├── VideoView.vue
│   │   ├── GaleriesView.vue
│   │   ├── InfographieView.vue
│   │   ├── CahierView.vue
│   │   ├── DossierView.vue
│   │   ├── ArchiveView.vue
│   │   ├── TagsView.vue
│   │   ├── SearchView.vue
│   │   ├── AboutView.vue
│   │   └── NotFound.vue
│   ├── components/            # Vue components
│   │   ├── Home/              # Home sections
│   │   ├── Posts/             # Article components
│   │   ├── Videos/            # Video components
│   │   ├── Galeries/          # Gallery components
│   │   ├── Infographies/      # Infographic components
│   │   ├── Cahiers/           # Cahier components
│   │   ├── Dossiers/          # Dossier components
│   │   ├── Menu/              # Navigation
│   │   ├── Footer/            # Footer
│   │   └── UI/                # Shared UI components
│   ├── api/                   # API client (Axios)
│   │   └── fetchData.js
│   ├── locales/               # Translations
│   │   ├── lang.js
│   │   └── translation.js
│   ├── utils/                 # Utility functions
│   └── assets/                # Static assets
│       ├── css/
│       │   └── main.css       # Tailwind imports
│       └── images/
├── public/                    # Public static files
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
├── package.json               # Dependencies
├── .env.example               # Environment variables template
└── .gitignore
```

### 2.2 Technology Stack
- **Vue.js**: v3.5.13 (Composition API)
- **Vite**: v6.0.5 (Build tool)
- **Vue Router**: v4.5.0 (Client-side routing)
- **Pinia**: v2.2.8 (State management)
- **Axios**: v1.7.9 (HTTP client)
- **Tailwind CSS**: v3.4.17 (Note: Using v3 for better stability)
- **DaisyUI**: v5.0.9

---

## 3. Migration Strategy

### 3.1 Phase 1: Setup & Configuration ✅ COMPLETED
- [x] Create vue-app folder structure
- [x] Initialize package.json with dependencies
- [x] Configure Vite with base path `/fr`
- [x] Setup Tailwind CSS v3 with DaisyUI
- [x] Configure PostCSS
- [x] Create environment variables template
- [x] Setup Vue Router with all routes
- [x] Create Pinia store for configuration
- [x] Setup API client with Axios

### 3.2 Phase 2: Core Components (To Do)
**Priority: HIGH**

#### 3.2.1 Layout Components
- [ ] **App.vue**: Root component with layout wrapper
- [ ] **Header/Navigation**: Desktop and mobile headers
  - Server component → Client component with async data
  - Menu fetching logic
- [ ] **Footer**: Static footer with links
- [ ] **NewsTicker**: Fixed bottom bar
- [ ] **GoToTop**: Scroll-to-top button

#### 3.2.2 Shared UI Components
- [ ] **ImageWithFallback**: Image component with error handling
- [ ] **FormattedDate**: Date formatting component
- [ ] **BannerAd**: Advertisement display
- [ ] **ShareButtons**: Social sharing
- [ ] **TranslateDropdown**: Language switcher
- [ ] **Pagination**: List pagination
- [ ] **Breadcrumb**: Navigation breadcrumb
- [ ] **ViewCounter**: View count display
- [ ] **ProtectedContent**: Subscriber-only content
- [ ] **SearchForm**: Search input component

### 3.3 Phase 3: Home Page (To Do)
**Priority: HIGH**

- [ ] **HomeView.vue**: Main page container
- [ ] **ALaUne**: Featured articles section
- [ ] **ALaUneSecondaire**: Secondary featured articles
- [ ] **Actualités**: News section
- [ ] **Dossier**: Dossiers section
- [ ] **Video_Galerie**: Videos and galleries combined
- [ ] **Infographie_cahier**: Infographics and notebooks

### 3.4 Phase 4: Content Type Pages (To Do)
**Priority: MEDIUM**

#### Articles/Posts
- [ ] **ArticleView.vue**: Article detail page
- [ ] **PostContent**: Article content display
- [ ] **PostsList**: Article list/grid
- [ ] **CardArticle**: Article card component
- [ ] **FullText**: Full article text with HTML parsing
- [ ] **PostGalerie**: Article gallery
- [ ] **PostRelatedArticles**: Related articles section

#### Videos
- [ ] **VideoView.vue**: Video page/list
- [ ] **VideoContent**: Video player and details
- [ ] **VideoCard**: Video card component
- [ ] **VideoList**: Video listing
- [ ] **VideoRelatedArticles**: Related videos

#### Galleries
- [ ] **GaleriesView.vue**: Gallery page/list
- [ ] **GalerieContent**: Gallery viewer
- [ ] **GalerieCard**: Gallery card
- [ ] **GalerieList**: Gallery listing
- [ ] **GalerieRelatedArticles**: Related galleries

#### Infographics
- [ ] **InfographieView.vue**: Infographic page/list
- [ ] **InfographieContent**: Infographic display
- [ ] **InfographieCard**: Infographic card
- [ ] **InfographieList**: Infographic listing
- [ ] **InfographieRelatedArticles**: Related infographics

#### Cahiers (Multimedia Notebooks)
- [ ] **CahierView.vue**: Cahier page/list
- [ ] **CahierContent**: Cahier content display
- [ ] **CahierCard**: Cahier card
- [ ] **CahierList**: Cahier listing
- [ ] **CahierRelatedArticles**: Related cahiers
- [ ] **LivreCahier**: Cahier book component

#### Dossiers
- [ ] **DossierView.vue**: Dossier page/list
- [ ] **DossierContent**: Dossier content display
- [ ] **DossierCard**: Dossier card
- [ ] **DossierList**: Dossier listing
- [ ] **DossierRelatedArticles**: Related dossiers

### 3.5 Phase 5: Search & Archives (To Do)
**Priority: MEDIUM**

- [ ] **SearchView.vue**: Search results page
- [ ] **SearchWrapper**: Search functionality wrapper
- [ ] **ArchiveView.vue**: Archive page
- [ ] **ArchivePosts**: Archive listing
- [ ] **SearchArchiveWrapper**: Archive search

### 3.6 Phase 6: Tags & Additional Features (To Do)
**Priority: LOW**

- [ ] **TagsView.vue**: Tag page
- [ ] **TagPosts**: Posts by tag
- [ ] **TagPostCard**: Tag-specific post card
- [ ] **AboutView.vue**: About page

### 3.7 Phase 7: Authentication & Protected Content (To Do)
**Priority: MEDIUM**

- [ ] Cookie management utilities
- [ ] Authentication store (Pinia)
- [ ] Login/Register components
- [ ] Protected route guards
- [ ] Subscriber content gating

### 3.8 Phase 8: Utilities & Helpers (To Do)
**Priority: HIGH**

- [ ] **crypto.js**: Port crypto utilities
- [ ] **helpers.js**: Port helper functions
- [ ] **translation.js**: Translation utilities
- [ ] HTML sanitization (DOMPurify)
- [ ] Date formatting utilities
- [ ] URL helpers

### 3.9 Phase 9: SEO & Meta Tags (To Do)
**Priority: HIGH**

- [ ] Vue Meta or Unhead integration
- [ ] Dynamic page titles
- [ ] Open Graph meta tags
- [ ] Robots meta configuration
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] Robots.txt

### 3.10 Phase 10: Performance & Optimization (To Do)
**Priority: MEDIUM**

- [ ] Lazy loading for routes
- [ ] Image lazy loading
- [ ] Component code splitting
- [ ] API response caching
- [ ] PWA features (optional)
- [ ] Bundle size optimization

### 3.11 Phase 11: Testing & Quality Assurance (To Do)
**Priority: LOW**

- [ ] Unit tests (Vitest)
- [ ] Component tests
- [ ] E2E tests (Cypress/Playwright)
- [ ] Accessibility testing
- [ ] Cross-browser testing
- [ ] RTL/LTR layout testing

---

## 4. Key Differences: Next.js vs Vue.js

### 4.1 Routing

| Feature | Next.js | Vue.js |
|---------|---------|--------|
| **Router** | File-based App Router | Vue Router (programmatic) |
| **Dynamic Routes** | `[...slugs]/page.js` | `:slug` in route config |
| **Navigation** | `<Link>` component | `<router-link>` component |
| **Programmatic** | `useRouter().push()` | `router.push()` |
| **Route Params** | `useParams()` | `route.params` |
| **Query Params** | `useSearchParams()` | `route.query` |

**Migration Notes:**
- Convert file-based routes to Vue Router configuration
- Replace `Link` with `router-link`
- Update all navigation logic

### 4.2 Data Fetching

| Feature | Next.js | Vue.js |
|---------|---------|--------|
| **Fetch Location** | Server Components | Client-side (onMounted) |
| **Method** | async/await in component | Composition API lifecycle |
| **Loading State** | React Suspense | Manual state management |
| **Error Handling** | Error boundaries | try/catch blocks |

**Migration Notes:**
- Move all server-side fetching to client-side with loading states
- Use `onMounted()` or `setup()` for data fetching
- Implement loading skeletons/spinners
- Add error boundaries

### 4.3 Component Syntax

| Feature | Next.js (React) | Vue.js |
|---------|-----------------|--------|
| **Component File** | `.js` or `.jsx` | `.vue` (SFC) |
| **Template** | JSX in return | `<template>` section |
| **Logic** | Function body | `<script setup>` |
| **Styles** | CSS-in-JS or modules | `<style>` section |
| **Props** | Function params | `defineProps()` |
| **State** | `useState()` | `ref()` or `reactive()` |
| **Effects** | `useEffect()` | `watch()` or `onMounted()` |
| **Computed** | useMemo() | `computed()` |

**Migration Example:**

**Next.js:**
```javascript
export default function Component({ data }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // side effect
  }, [count])
  
  return <div>{count}</div>
}
```

**Vue.js:**
```vue
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: Object
})

const count = ref(0)

watch(count, (newVal) => {
  // side effect
})
</script>
```

### 4.4 Image Handling

| Feature | Next.js | Vue.js |
|---------|---------|--------|
| **Component** | `<Image>` from next/image | `<img>` tag |
| **Optimization** | Automatic | Manual or plugin |
| **Lazy Load** | Built-in | loading="lazy" attribute |
| **Responsive** | srcset auto-generated | Manual or plugin |

**Migration Notes:**
- Replace `<Image>` with standard `<img>` tags
- Add `loading="lazy"` for lazy loading
- Consider using `vite-plugin-image-optimizer`
- Implement image fallback logic

### 4.5 Metadata & SEO

| Feature | Next.js | Vue.js |
|---------|---------|--------|
| **Meta Tags** | `generateMetadata()` | Vue Meta / Unhead |
| **Title** | Metadata object | `useHead()` composable |
| **Dynamic SEO** | Export async function | Composable in component |

**Migration Notes:**
- Install `@vueuse/head` or `@unhead/vue`
- Convert metadata functions to composables
- Implement per-page meta tags

### 4.6 Environment Variables

| Feature | Next.js | Vue.js (Vite) |
|---------|---------|---------------|
| **Prefix** | `NEXT_` | `VITE_` |
| **Client Access** | `NEXT_PUBLIC_` prefix | All `VITE_` vars |
| **Server Only** | No prefix | Not available client-side |
| **Access** | `process.env.NEXT_...` | `import.meta.env.VITE_...` |

**Migration Notes:**
- Rename all environment variables from `NEXT_*` to `VITE_*`
- Update all references in code
- Create new `.env.example`

### 4.7 Styling

| Feature | Next.js | Vue.js |
|---------|---------|--------|
| **Global CSS** | Import in layout.js | Import in main.js |
| **Scoped CSS** | CSS Modules | `<style scoped>` |
| **Tailwind** | Same | Same |
| **CSS-in-JS** | Styled-components | Not common |

**Migration Notes:**
- Convert `globals.css` to `main.css`
- Tailwind classes remain the same
- No major changes needed

---

## 5. Shared Resources & Reusability

### 5.1 Can Be Reused (Minimal Changes)

#### ✅ Configuration Files
- **locales/lang.js**: Language configuration (copy as-is)
- **locales/translation.js**: Translation strings (adapt imports)
- **.env variables**: Rename NEXT_* to VITE_*

#### ✅ Utilities
- **utils/crypto.js**: Crypto functions (no changes)
- **utils/helpers.js**: Helper functions (remove Next.js specific)
- **utils/helpersClient.js**: Client utilities (adapt for Vue)

#### ✅ Styling
- **Tailwind classes**: All classes remain identical
- **globals.css**: RTL/LTR styles (copy structure)
- **DaisyUI components**: Same configuration

#### ✅ Static Assets
- **public/** folder: All images, fonts, PDFs (copy directly)

#### ✅ API Logic
- **Endpoint URLs**: Same backend APIs
- **Request/Response structure**: Identical
- **Authentication flow**: Same cookie mechanism

### 5.2 Requires Rewriting

#### ⚠️ Components
- All React components → Vue SFC components
- JSX syntax → Vue template syntax
- React hooks → Vue Composition API

#### ⚠️ Data Fetching
- Server Components → Client-side fetching
- `fetchData()` function → Axios wrapper (similar structure)

#### ⚠️ Routing
- File-based routes → Programmatic routes
- `<Link>` → `<router-link>`

#### ⚠️ State Management
- React Context (if any) → Pinia stores

---

## 6. API Integration

### 6.1 Backend APIs (Unchanged)
Both Next.js and Vue.js versions use the **same backend APIs**:

- `GET /home` - Home page data
- `GET /home/header` - Header/menu data
- `GET /:slug` - Article details
- `GET /videos` - Video list
- `GET /galeries` - Gallery list
- `GET /infographies` - Infographic list
- `GET /cahiers` - Cahier list
- `GET /dossiers` - Dossier list
- `GET /archives` - Archive data
- `GET /search` - Search results
- `GET /tags/:tag` - Tag-based posts
- Image proxy: `/api/image/:path`

### 6.2 Authentication
- Cookie-based authentication
- Cookie name from environment variable
- Same session management

### 6.3 Axios Configuration
The new Vue.js API client (`src/api/fetchData.js`) maintains:
- Same request/response structure
- Cookie injection
- Error handling
- Response format: `{ data, status, error }`

---

## 7. Development Workflow

### 7.1 Running Both Applications

**Next.js Version:**
```bash
cd /workspace
npm run dev  # Port 3020
```

**Vue.js Version:**
```bash
cd /workspace/vue-app
npm install
npm run dev  # Port 3021
```

### 7.2 Building for Production

**Next.js:**
```bash
npm run build
npm run start  # Port 4001
```

**Vue.js:**
```bash
npm run build
npm run preview  # Port 4002
```

### 7.3 Development Process
1. Keep Next.js version running as reference
2. Develop Vue.js components in parallel
3. Test both versions against same API
4. Compare visual output and functionality
5. Deploy both versions independently

---

## 8. Deployment Considerations

### 8.1 Build Output
- **Next.js**: `.next/` directory (SSR ready)
- **Vue.js**: `dist/` directory (SPA)

### 8.2 Server Requirements
- **Next.js**: Node.js server required
- **Vue.js**: Static hosting (Nginx, Apache, Vercel, Netlify)

### 8.3 Base Path Configuration
Both use `/fr` as base path:
- Next.js: `basePath` in next.config.mjs
- Vue.js: `base` in vite.config.js

### 8.4 Environment Variables
Set up different `.env` files per environment:
- `.env.development`
- `.env.production`

---

## 9. Testing Strategy

### 9.1 Functional Testing
- [ ] All pages render correctly
- [ ] Navigation works (links, routes)
- [ ] API calls successful
- [ ] Images load properly
- [ ] Forms submit correctly
- [ ] Search functionality works

### 9.2 Visual Testing
- [ ] Layout matches Next.js version
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] RTL layout displays correctly
- [ ] Fonts load correctly (Arabic, Latin)
- [ ] Colors and styling match

### 9.3 Performance Testing
- [ ] Page load times acceptable
- [ ] Bundle size optimized
- [ ] Images lazy load
- [ ] No memory leaks
- [ ] Smooth navigation

### 9.4 Cross-browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## 10. Timeline Estimation

| Phase | Estimated Time | Priority |
|-------|---------------|----------|
| Setup & Configuration | ✅ Done | High |
| Core Components | 2-3 days | High |
| Home Page | 1-2 days | High |
| Content Pages | 3-4 days | Medium |
| Search & Archives | 1-2 days | Medium |
| Tags & Features | 1 day | Low |
| Authentication | 1-2 days | Medium |
| Utilities & Helpers | 1 day | High |
| SEO & Meta Tags | 1-2 days | High |
| Performance | 1-2 days | Medium |
| Testing | 2-3 days | Medium |
| **Total** | **15-25 days** | |

---

## 11. Risks & Mitigation

### 11.1 Potential Issues

| Risk | Impact | Mitigation |
|------|--------|------------|
| SSR to CSR transition | SEO impact | Implement SSR with Nuxt.js (alternative) |
| Image optimization loss | Performance | Use Vite image plugins |
| Different behavior | User experience | Thorough testing |
| API compatibility | Functionality | Same API structure maintained |

### 11.2 Fallback Plan
If Vue.js migration faces issues:
- Keep Next.js version as production
- Use Vue.js as alternative/testing version
- Consider Nuxt.js for SSR capabilities

---

## 12. Future Enhancements

### 12.1 Optional Upgrades
- **Nuxt.js**: For SSR/SSG capabilities
- **TypeScript**: For type safety
- **Vitest**: For unit testing
- **Storybook**: For component documentation
- **PWA**: Progressive Web App features

### 12.2 Performance Optimizations
- Service Workers for offline support
- Redis caching for API responses
- CDN integration
- Image optimization service

---

## 13. Maintenance Strategy

### 13.1 Code Synchronization
When updating features:
1. Update Next.js version first (primary)
2. Port changes to Vue.js version
3. Test both versions
4. Deploy together

### 13.2 Dependency Updates
- Regular security updates
- Test compatibility before updating
- Keep both versions in sync

---

## 14. Conclusion

This migration plan provides a comprehensive roadmap for creating a Vue.js version of the APS news website. The Vue.js implementation will:

✅ **Maintain** the same design and functionality
✅ **Use** the same backend APIs
✅ **Support** all existing features (multi-language, RTL/LTR, etc.)
✅ **Coexist** with the Next.js version
✅ **Provide** an alternative frontend stack option

The modular approach allows incremental development and testing, ensuring a smooth transition without disrupting the existing Next.js application.

---

**Document Version**: 1.0  
**Last Updated**: 2025-10-26  
**Status**: Ready for Implementation
