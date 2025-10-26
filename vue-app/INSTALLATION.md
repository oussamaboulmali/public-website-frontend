# Vue.js Version - Installation Guide

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

Check your versions:
```bash
node --version
npm --version
```

---

## Step-by-Step Installation

### Step 1: Navigate to the vue-app directory

```bash
cd /workspace/vue-app
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Vue.js 3.5.13
- Vite 6.0.5
- Vue Router 4.5.0
- Pinia 2.2.8
- Axios 1.7.9
- Tailwind CSS 3.4.17
- DaisyUI 5.0.9
- And all other dependencies

**Expected time**: 1-2 minutes

### Step 3: Create Environment File

```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit the `.env` file with your API configuration:

```bash
# Open in your preferred editor
nano .env
# or
vim .env
# or
code .env
```

**Required variables:**
```env
VITE_BASE_URL=http://your-api-domain.com/api
VITE_IMAGE_URL=http://your-api-domain.com/images
VITE_LANG=fr
```

**Optional variables:**
```env
VITE_APS_VIDEOS=https://www.youtube.com/@aps
VITE_APS_PHOTOS=https://photos.aps.dz
VITE_APS_ONLINE=https://www.aps.dz
VITE_APS_ARCHIVES=https://archives.aps.dz
VITE_APS_FB=https://facebook.com/aps
VITE_APS_X=https://x.com/aps
VITE_APS_YTB=https://youtube.com/@aps
VITE_APS_LINKEDIN=https://linkedin.com/company/aps
VITE_DOMAINE=https://www.aps.dz
VITE_COOKIE_NAME=aps_session
VITE_FRONT_NUMBER=1
VITE_GA_ID=G-XXXXXXXXXX
```

### Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v6.0.5  ready in XXX ms

  ➜  Local:   http://localhost:3021/fr/
  ➜  Network: http://192.168.x.x:3021/fr/
  ➜  press h + enter to show help
```

### Step 6: Open in Browser

Navigate to: **http://localhost:3021/fr/**

---

## Verification Checklist

After installation, verify the following:

- [ ] Development server starts without errors
- [ ] Home page loads at http://localhost:3021/fr/
- [ ] No console errors in browser DevTools
- [ ] Tailwind CSS styles are applied
- [ ] Navigation links work
- [ ] Images load (if API is configured)

---

## Common Installation Issues

### Issue 1: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete package-lock.json and node_modules
rm -rf node_modules package-lock.json

# Try again
npm install
```

### Issue 2: Port 3021 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3025
```

Or edit `package.json`:
```json
"scripts": {
  "dev": "vite --port 3025"
}
```

### Issue 3: "Cannot find module" errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue 4: Environment variables not loading

**Solution:**
1. Ensure `.env` file exists in `/workspace/vue-app/`
2. Ensure all variables start with `VITE_`
3. Restart the development server
4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue 5: Blank page or errors in console

**Solution:**
1. Check browser console for errors
2. Verify API URL in `.env` is correct
3. Check Network tab for failed requests
4. Ensure CORS is configured on backend

---

## Build for Production

### Step 1: Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Step 2: Preview Production Build

```bash
npm run preview
```

Production preview will run at: http://localhost:4002/fr/

### Step 3: Deploy

Deploy the `dist/` directory to your hosting service:

- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: `vercel --prod`
- **AWS S3**: `aws s3 sync dist/ s3://your-bucket/`
- **Nginx**: Copy `dist/` to `/var/www/html/`

---

## Development Tools

### Recommended VS Code Extensions

1. **Volar** (Vue Language Features)
2. **Tailwind CSS IntelliSense**
3. **ESLint**
4. **Prettier**

Install via VS Code:
```
Ctrl+P (or Cmd+P)
ext install Vue.volar
ext install bradlc.vscode-tailwindcss
ext install dbaeumer.vscode-eslint
```

### Browser Extensions

1. **Vue DevTools**
   - Chrome: https://chrome.google.com/webstore
   - Firefox: https://addons.mozilla.org/firefox

---

## Next Steps

After successful installation:

1. **Read the documentation**
   - [README.md](./README.md) - Main documentation
   - [QUICK_START.md](../QUICK_START.md) - Quick reference

2. **Explore the codebase**
   - Check `src/views/` for page components
   - Check `src/components/` for reusable components
   - Review `src/router/index.js` for routes

3. **Start developing**
   - Create new components
   - Port components from Next.js version
   - Test API integrations

---

## Getting Help

If you encounter issues:

1. Check [Troubleshooting](#common-installation-issues) section above
2. Review [README.md](./README.md) for detailed documentation
3. Check [MIGRATION_PLAN.md](../MIGRATION_PLAN.md) for development guidance
4. Verify your Node.js and npm versions
5. Check browser console for errors

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev -- --port X  # Use custom port

# Building
npm run build           # Build for production
npm run preview         # Preview production build

# Linting
npm run lint           # Run ESLint
npm run lint -- --fix  # Auto-fix issues

# Cleaning
rm -rf node_modules dist  # Clean install
npm cache clean --force   # Clean npm cache
```

---

## Success Indicators

✅ You've successfully installed when:

- Development server starts without errors
- Browser shows the APS website at localhost:3021/fr/
- Hot reload works (changes reflect on save)
- No errors in terminal or browser console
- Tailwind CSS styles are applied
- Routing works (can navigate between pages)

---

## Installation Complete! 🎉

You're now ready to develop with Vue.js. For detailed usage instructions, see:

- **[README.md](./README.md)** - Complete documentation
- **[QUICK_START.md](../QUICK_START.md)** - Quick reference guide
- **[MIGRATION_PLAN.md](../MIGRATION_PLAN.md)** - Migration strategy

Happy coding! 🚀
