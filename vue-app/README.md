# APS News Website - Vue.js Version

Vue.js + Tailwind CSS implementation of the APS (Algérie Presse Service) news website, sharing the same backend APIs as the Next.js version.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Routing](#routing)
- [State Management](#state-management)
- [Multi-language Support](#multi-language-support)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🌟 Overview

This is a Vue.js implementation of the APS news website, designed to coexist with the Next.js version while using the same backend APIs. It provides a modern, responsive, and performant user interface for news content delivery.

## ✨ Features

- 🎨 **Modern UI**: Built with Vue 3 + Tailwind CSS + DaisyUI
- 🌍 **Multi-language**: Supports Arabic, Tamazight (3 variants), English, French, Spanish, Russian
- 🔄 **RTL/LTR**: Full support for right-to-left and left-to-right languages
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast**: Lightning-fast development and build times with Vite
- 🔍 **SEO-ready**: Prepared for meta tags and SEO optimization
- 🎯 **Type-safe**: Structured codebase ready for TypeScript migration
- 🔐 **Authentication**: Cookie-based authentication system
- 📰 **Content Types**: Articles, Videos, Galleries, Infographics, Cahiers, Dossiers

## 🛠 Tech Stack

- **Framework**: Vue.js 3.5.13 (Composition API)
- **Build Tool**: Vite 6.0.5
- **Routing**: Vue Router 4.5.0
- **State Management**: Pinia 2.2.8
- **HTTP Client**: Axios 1.7.9
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: DaisyUI 5.0.9
- **Utilities**: 
  - DOMPurify (HTML sanitization)
  - js-cookie (Cookie management)
  - crypto-js (Encryption)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Navigate to the vue-app directory

```bash
cd /workspace/vue-app
```

### 2. Install dependencies

```bash
npm install
```

This will install all required packages defined in `package.json`.

### 3. Create environment file

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure your environment variables (see [Configuration](#configuration) section).

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `vue-app` directory with the following variables:

```env
# API Configuration
VITE_BASE_URL=http://your-api-domain.com/api
VITE_IMAGE_URL=http://your-api-domain.com/images
VITE_LANG=fr

# APS Social Media Links
VITE_APS_VIDEOS=https://www.youtube.com/@aps
VITE_APS_PHOTOS=https://photos.aps.dz
VITE_APS_ONLINE=https://www.aps.dz
VITE_APS_ARCHIVES=https://archives.aps.dz
VITE_APS_FB=https://facebook.com/aps
VITE_APS_X=https://x.com/aps
VITE_APS_YTB=https://youtube.com/@aps
VITE_APS_LINKEDIN=https://linkedin.com/company/aps

# Domain Configuration
VITE_DOMAINE=https://www.aps.dz
VITE_COOKIE_NAME=aps_session
VITE_FRONT_NUMBER=1

# Google Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

### Important Notes:

- All environment variables must be prefixed with `VITE_` to be accessible in the application
- Never commit `.env` files to version control
- Use `.env.example` as a template for required variables
- Different environments can have different `.env` files (`.env.development`, `.env.production`)

## 💻 Development

### Start the development server

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:3021`
- **Network**: Available on your local network

### Development Features

- ⚡ **Hot Module Replacement (HMR)**: Changes reflect instantly
- 🔍 **Vue DevTools**: Browser extension support
- 📝 **Console logging**: Debug information in browser console

### Useful Development Commands

```bash
# Run with specific port
npm run dev -- --port 3025

# Run with host exposed
npm run dev -- --host

# Clear Vite cache and restart
rm -rf node_modules/.vite && npm run dev
```

## 🏗 Building for Production

### Build the application

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

Preview server will run on `http://localhost:4002`

### Build Output

The `dist/` directory contains:
- `index.html` - Entry HTML file
- `assets/` - Optimized JS, CSS, and other assets
- Static files from `public/`

### Build Optimization

The build process includes:
- ✅ Code minification
- ✅ Tree-shaking (removes unused code)
- ✅ CSS extraction and optimization
- ✅ Asset optimization
- ✅ Vendor code splitting

## 📁 Project Structure

```
vue-app/
├── public/                      # Static assets (copied as-is)
│   ├── logo-a.png
│   └── ...other static files
├── src/
│   ├── main.js                 # Application entry point
│   ├── App.vue                 # Root component
│   ├── router/
│   │   └── index.js           # Route definitions
│   ├── stores/
│   │   └── config.js          # Pinia store for global config
│   ├── views/                 # Page components (route targets)
│   │   ├── HomeView.vue       # Home page
│   │   ├── ArticleView.vue    # Article detail page
│   │   ├── VideoView.vue      # Video page
│   │   ├── GaleriesView.vue   # Gallery page
│   │   ├── NotFound.vue       # 404 page
│   │   └── ...
│   ├── components/            # Reusable components
│   │   ├── Home/              # Home page sections
│   │   │   └── ALaUne.vue
│   │   ├── Posts/             # Article components
│   │   ├── Videos/            # Video components
│   │   ├── Menu/              # Navigation
│   │   │   └── DesktopHeader.vue
│   │   ├── Footer/
│   │   │   └── Footer.vue
│   │   └── UI/                # Shared UI components
│   │       ├── BannerAd.vue
│   │       ├── GoToTop.vue
│   │       └── Barres/
│   ├── api/
│   │   └── fetchData.js       # Axios API client
│   ├── locales/
│   │   ├── lang.js            # Language configuration
│   │   └── translation.js     # Translation strings
│   ├── utils/                 # Utility functions
│   └── assets/
│       ├── css/
│       │   └── main.css       # Tailwind imports + custom styles
│       └── images/
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies and scripts
├── .env.example               # Environment variables template
├── .gitignore
└── README.md                  # This file
```

## 🔌 API Integration

### API Client

The application uses Axios for HTTP requests. The client is configured in `src/api/fetchData.js`.

### Usage Example

```javascript
import { fetchData } from '@/api/fetchData'

// In a component
const response = await fetchData(config.value.baseUrl + 'home')

if (response.error) {
  console.error(response.error)
} else {
  data.value = response.data
}
```

### Response Format

All API calls return a standardized response:

```javascript
{
  data: {...},      // Response data
  status: 200,      // HTTP status code
  error: null       // Error message (if any)
}
```

### API Endpoints

The application consumes the following endpoints:

- `GET /home` - Home page data
- `GET /home/header` - Navigation menu
- `GET /:slug` - Article details
- `GET /video/:slug` - Video details
- `GET /galeries-photos` - Gallery list
- `GET /infographie` - Infographic list
- `GET /cahier-multimedia` - Cahier list
- `GET /dossier` - Dossier list
- `GET /archive` - Archive data
- `GET /search?q=query` - Search results
- `GET /tags/:tag` - Posts by tag
- `GET /api/image/:path` - Image proxy

### Image Handling

Images are served through an API proxy:

```vue
<img :src="`/${envConfig.lang}/api/image/${imageUrl}`" />
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS v3 for utility-first styling.

#### Configuration

Tailwind is configured in `tailwind.config.js`:

```javascript
{
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D589F',
      }
    }
  },
  plugins: [require('daisyui')]
}
```

#### Custom Styles

Global styles are in `src/assets/css/main.css`:

- Tailwind imports
- RTL/LTR support
- Custom utilities
- Scrollbar hiding
- Social embeds styling

### DaisyUI Components

DaisyUI provides pre-built components:

```vue
<button class="btn btn-primary">Click me</button>
<div class="card">...</div>
<div class="loading loading-spinner"></div>
```

### RTL Support

RTL (Right-to-Left) is supported for Arabic and Tamazight-Arabic:

```vue
<div :dir="dir" class="rtl:text-right ltr:text-left">
  Content
</div>
```

The `dir` value is computed from the language configuration.

## 🛣 Routing

### Vue Router Configuration

Routes are defined in `src/router/index.js`:

```javascript
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/:slug', name: 'article', component: ArticleView },
  { path: '/video/:slug', name: 'video', component: VideoView },
  // ... more routes
]
```

### Base Path

The application uses `/fr` as the base path (configured in `vite.config.js`):

```javascript
base: '/fr'
```

All URLs are prefixed with `/fr`.

### Navigation

#### Template Navigation

```vue
<router-link to="/">Home</router-link>
<router-link :to="`/article/${slug}`">Article</router-link>
```

#### Programmatic Navigation

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to a route
router.push('/')
router.push({ name: 'article', params: { slug: 'my-article' } })

// Go back
router.back()
```

### Route Parameters

```javascript
import { useRoute } from 'vue-router'

const route = useRoute()

// Access params
const slug = route.params.slug

// Access query
const search = route.query.q
```

### Scroll Behavior

The router is configured to scroll to top on navigation:

```javascript
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }
  return { top: 0 }
}
```

## 🗄 State Management

### Pinia Stores

The application uses Pinia for state management.

#### Config Store

Located in `src/stores/config.js`:

```javascript
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const config = computed(() => configStore.config)

// Access config
config.value.baseUrl
config.value.lang
```

#### Creating New Stores

```javascript
// stores/articles.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref([])
  
  function addArticle(article) {
    articles.value.push(article)
  }
  
  return { articles, addArticle }
})
```

## 🌍 Multi-language Support

### Supported Languages

The application supports 8 languages:

| Code | Language | Direction |
|------|----------|-----------|
| `ar` | العربية (Arabic) | RTL |
| `tamazight-tif` | ⵜⴰⵎⴰⵣⵉⵖⵜ (Tamazight Tifinagh) | LTR |
| `tamazight-tal` | TAMAZIƔT (Tamazight Latin) | LTR |
| `tamazight-arb` | ثامازيغث (Tamazight Arabic) | RTL |
| `en` | English | LTR |
| `fr` | Français (French) | LTR |
| `es` | Español (Spanish) | LTR |
| `ru` | Русский (Russian) | LTR |

### Language Configuration

Languages are defined in `src/locales/lang.js`:

```javascript
const locales = {
  fr: { label: "Français", dir: "ltr", path: "/fr" },
  ar: { label: "العربية", dir: "rtl", path: "/" },
  // ...
}
```

### Using Language Direction

```vue
<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/config'
import locales from '@/locales/lang'

const configStore = useConfigStore()
const config = computed(() => configStore.config)
const dir = computed(() => locales[config.value.lang]?.dir || 'ltr')
</script>

<template>
  <div :dir="dir">Content</div>
</template>
```

### Translations

Translation strings are in `src/locales/translation.js`.

Usage example:

```javascript
import translations from '@/locales/translation'

const title = translations.home.title
```

## 🚀 Deployment

### Static Hosting

Since this is an SPA (Single Page Application), it can be deployed to any static hosting service.

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # Base path /fr
    location /fr {
        try_files $uri $uri/ /fr/index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache Configuration

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /fr/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /fr/index.html [L]
</IfModule>
```

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Configure `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/fr/(.*)", "destination": "/fr/index.html" }
  ]
}
```

### Netlify Deployment

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/fr/*"
  to = "/fr/index.html"
  status = 200
```

2. Deploy via Netlify CLI or Git integration.

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t aps-vue .
docker run -p 8080:80 aps-vue
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Port 3021 is already in use`

**Solution**:
```bash
# Change port in package.json or use:
npm run dev -- --port 3025
```

#### 2. API Connection Failed

**Error**: `Network Error` or `CORS error`

**Solution**:
- Check `.env` file has correct `VITE_BASE_URL`
- Verify backend API is running
- Check CORS configuration on backend
- Use Vite proxy in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-url',
      changeOrigin: true
    }
  }
}
```

#### 3. Images Not Loading

**Solution**:
- Check `VITE_IMAGE_URL` in `.env`
- Verify image path format: `/${lang}/api/image/${path}`
- Check browser console for 404 errors

#### 4. Build Fails

**Error**: Various build errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Try building again
npm run build
```

#### 5. Styles Not Applied

**Solution**:
- Check `src/assets/css/main.css` is imported in `main.js`
- Verify Tailwind CSS is configured in `tailwind.config.js`
- Rebuild CSS: `npm run dev` (HMR should update)

#### 6. Router Not Working

**Solution**:
- Check `base: '/fr'` in `vite.config.js`
- Verify routes in `src/router/index.js`
- Check server redirect rules for SPA

### Debug Mode

Enable Vue DevTools for debugging:

1. Install Vue DevTools browser extension
2. Open browser DevTools
3. Navigate to "Vue" tab
4. Inspect components, routes, and Pinia stores

### Logging

Add debug logs:

```javascript
console.log('Debug:', data)
console.error('Error:', error)
console.warn('Warning:', warning)
```

For production, remove console logs or use:

```javascript
if (import.meta.env.DEV) {
  console.log('Development only log')
}
```

---

## 📚 Additional Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)

---

## 📝 License

This project is part of the APS (Algérie Presse Service) platform.

---

## 🤝 Contributing

When contributing to this project:

1. Follow Vue.js style guide
2. Use Composition API (`<script setup>`)
3. Maintain consistency with Next.js version design
4. Test across different browsers
5. Test RTL/LTR layouts
6. Document new features

---

## 📞 Support

For issues or questions:
- Check this README first
- Review the [Migration Plan](../MIGRATION_PLAN.md)
- Check browser console for errors
- Verify environment variables

---

**Happy coding! 🚀**
