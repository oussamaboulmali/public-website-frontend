# Quick Start Guide

This is a quick reference for getting started with either version of the APS website.

---

## 🚀 5-Minute Setup

### Next.js Version

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start development
npm run dev

# 4. Open browser
# http://localhost:3020
```

### Vue.js Version

```bash
# 1. Navigate to vue-app
cd vue-app

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start development
npm run dev

# 5. Open browser
# http://localhost:3021
```

---

## 🎯 Common Tasks

### Adding a New Component

**Next.js:**
```bash
# Create component file
touch compoenents/MyComponent/MyComponent.js

# Use in page
import MyComponent from '@/compoenents/MyComponent/MyComponent'
```

**Vue.js:**
```bash
# Create component file
touch vue-app/src/components/MyComponent.vue

# Use in page
import MyComponent from '@/components/MyComponent.vue'
```

### Fetching Data

**Next.js (Server Component):**
```javascript
import { fetchData } from '../../Api/fetchData'

export default async function Page() {
  const { data } = await fetchData('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

**Vue.js:**
```vue
<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '@/api/fetchData'

const data = ref(null)

onMounted(async () => {
  const response = await fetchData('https://api.example.com/data')
  data.value = response.data
})
</script>

<template>
  <div>{{ data?.title }}</div>
</template>
```

### Creating a New Route

**Next.js (File-based):**
```bash
# Create page file
mkdir -p src/app/my-page
touch src/app/my-page/page.js

# Route automatically available at /fr/my-page
```

**Vue.js (Router config):**
```javascript
// vue-app/src/router/index.js
{
  path: '/my-page',
  name: 'myPage',
  component: () => import('@/views/MyPageView.vue')
}
```

### Navigation

**Next.js:**
```jsx
import Link from 'next/link'

<Link href="/my-page">Go to page</Link>

// Programmatic
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/my-page')
```

**Vue.js:**
```vue
<router-link to="/my-page">Go to page</router-link>

<!-- Programmatic -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/my-page')
</script>
```

---

## 📦 Useful Commands

### Next.js

```bash
npm run dev           # Development server
npm run build         # Production build
npm run start         # Run production build
npm run lint          # Lint code
```

### Vue.js

```bash
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Preview production
npm run lint          # Lint code
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Next.js:**
```bash
npm run dev -- -p 3025
```

**Vue.js:**
```bash
npm run dev -- --port 3025
```

### Clear Cache

**Next.js:**
```bash
rm -rf .next node_modules/.cache
npm run dev
```

**Vue.js:**
```bash
rm -rf node_modules/.vite dist
npm run dev
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Important Files

### Next.js

| File | Purpose |
|------|---------|
| `next.config.mjs` | Next.js configuration |
| `src/app/layout.js` | Root layout |
| `src/app/page.js` | Home page |
| `lib/config.js` | Environment config |
| `Api/fetchData.js` | API client |

### Vue.js

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite configuration |
| `src/main.js` | App entry point |
| `src/App.vue` | Root component |
| `src/router/index.js` | Routes |
| `src/stores/config.js` | Config store |
| `src/api/fetchData.js` | API client |

---

## 🎨 Styling Quick Reference

### Tailwind Classes (Both)

```html
<!-- Layout -->
<div class="flex flex-col space-y-4">
<div class="grid grid-cols-2 gap-4">

<!-- Colors -->
<div class="bg-blue-500 text-white">
<div class="bg-primary text-white">

<!-- Spacing -->
<div class="p-4 m-2">
<div class="px-6 py-3">

<!-- Responsive -->
<div class="hidden md:block">
<div class="w-full md:w-1/2">

<!-- RTL Support -->
<div :dir="dir" class="rtl:text-right ltr:text-left">
```

### DaisyUI Components (Both)

```html
<button class="btn btn-primary">Button</button>
<div class="card">Card</div>
<div class="alert alert-info">Alert</div>
<div class="loading loading-spinner"></div>
```

---

## 🌍 Multi-language

### Getting Current Language

**Next.js:**
```javascript
import { getConfig } from '@/lib/config'

const { envConfig } = await getConfig()
const lang = envConfig.lang // 'fr', 'ar', 'en', etc.
```

**Vue.js:**
```javascript
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const lang = configStore.config.lang
```

### RTL/LTR Direction

**Both:**
```javascript
import locales from '@/locales/lang'

const dir = locales[lang]?.dir // 'rtl' or 'ltr'
```

```html
<div :dir="dir">
  Content automatically adjusts for RTL/LTR
</div>
```

---

## 🔧 Environment Variables

### Naming Convention

**Next.js:**
```env
NEXT_BASE_URL=...
NEXT_PUBLIC_DOMAINE=...  # Client-accessible
```

**Vue.js:**
```env
VITE_BASE_URL=...
VITE_DOMAINE=...  # All VITE_* are client-accessible
```

### Accessing in Code

**Next.js:**
```javascript
const baseUrl = process.env.NEXT_BASE_URL
const domaine = process.env.NEXT_PUBLIC_DOMAINE
```

**Vue.js:**
```javascript
const baseUrl = import.meta.env.VITE_BASE_URL
const domaine = import.meta.env.VITE_DOMAINE
```

---

## 📸 Working with Images

### Next.js

```jsx
import Image from 'next/image'

<Image
  src="/fr/api/image/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Vue.js

```vue
<img
  :src="`/fr/api/image/path/to/image.jpg`"
  alt="Description"
  loading="lazy"
  class="w-full h-auto"
/>
```

---

## 🔍 API Calls Cheat Sheet

### Basic GET Request

**Next.js:**
```javascript
import { fetchData } from '@/Api/fetchData'

const { data, status, error } = await fetchData(url)
```

**Vue.js:**
```javascript
import { fetchData } from '@/api/fetchData'

const { data, status, error } = await fetchData(url)
```

### With Authentication

Both use cookies automatically. No extra configuration needed.

### Error Handling

```javascript
const response = await fetchData(url)

if (response.error) {
  console.error('Error:', response.error)
  // Handle error
} else {
  // Use response.data
}
```

---

## 🎯 Component Patterns

### Reusable Component

**Next.js:**
```jsx
// compoenents/Button/Button.js
export default function Button({ text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="btn btn-primary"
    >
      {text}
    </button>
  )
}
```

**Vue.js:**
```vue
<!-- components/Button.vue -->
<template>
  <button 
    @click="onClick"
    class="btn btn-primary"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String,
  onClick: Function
})
</script>
```

### Page Component

**Next.js:**
```jsx
// src/app/my-page/page.js
export default async function MyPage() {
  const data = await fetchData('...')
  
  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  )
}
```

**Vue.js:**
```vue
<!-- src/views/MyPageView.vue -->
<template>
  <div>
    <h1>{{ data?.title }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '@/api/fetchData'

const data = ref(null)

onMounted(async () => {
  const response = await fetchData('...')
  data.value = response.data
})
</script>
```

---

## 🚀 Deployment Quick Reference

### Next.js (Vercel)

```bash
npm run build
vercel --prod
```

### Vue.js (Netlify)

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Both (Docker)

```bash
docker build -t aps-website .
docker run -p 80:80 aps-website
```

---

## 📚 Documentation Links

- **Full Migration Plan**: [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
- **Repository Structure**: [REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md)
- **Vue.js Setup**: [vue-app/README.md](./vue-app/README.md)
- **Main README**: [README.md](./README.md)

---

## 💡 Tips

1. **Hot Reload**: Both frameworks support hot reload. Save and see changes instantly.
2. **Console Logging**: Use `console.log()` liberally during development.
3. **Vue DevTools**: Install browser extension for Vue.js debugging.
4. **React DevTools**: Install browser extension for Next.js debugging.
5. **Tailwind IntelliSense**: Install VS Code extension for Tailwind autocomplete.
6. **Test Both Versions**: Run both frameworks side-by-side to compare.

---

**Need more help?** Check the detailed documentation files linked above.

**Happy coding! 🚀**
