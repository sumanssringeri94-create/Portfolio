# Suman S — Personal Portfolio Website

A fast, accessible, responsive single-page developer portfolio website built with semantic HTML5, modern CSS3 (with CSS custom variables and theming), and vanilla JavaScript. 

Designed and engineered to mirror the layout rhythm, section order, and interactive style of [tim-gesemann.dev](https://www.tim-gesemann.dev/) while establishing an authentic, unique personal brand tailored to Suman S.

---

## 🚀 Key Features

- **Pixel-Accurate Section Order & Rhythm**:
  1. **Sticky Navbar**: Brand monogram (`SS`), smooth-scroll links, light/dark mode switch, GitHub & LinkedIn links, and mobile hamburger drawer.
  2. **Hero Section**: Friendly greeting with animated waving hand, large name heading, custom tagline, succinct bio, photo beside text (gracefully stacked on mobile), and signature sliding-hover "GET IN TOUCH" CTA button.
  3. **"I'M GOOD AT THIS" (Skills)**: Grid of crisp SVG vector badges for 18 core technologies with hover lift and glowing borders (strictly excluding TypeScript as requested).
  4. **"THINGS I WORKED ON" (Projects)**: 6 clean project cards featuring real GitHub descriptions, live demo links, repository buttons, and "Link coming soon" tags for unreleased repositories.
  5. **Experience & Leadership Timeline**: Chronological vertical track with milestone nodes, dates, leadership positions, college details, and field research highlights.
  6. **Compact Achievements Block**: Showcases NPTEL certifications (HCI Elite+Silver 87%, OS Elite), hackathon participations, codethon victory, and 2026 tech summits attended (strictly no CGPA and factual wording).
  7. **Interactive "CONTACT ME" Section**: Clean form with real-time character counters (`0/50`, `0/500`), instant validation popover tooltips, cookie/privacy consent, and Formspree/Web3Forms integration with preview fallback.
  8. **Footer**: Accessible modals for Imprint, Privacy Policy, and Cookie Policy, with an auto-updating copyright notice.
- **Floating Social Bar**: Fixed vertical social links on the bottom-left corner with guide line.
- **Light & Dark Mode**: Respects `prefers-color-scheme` automatically and allows manual toggling with persistent `localStorage` memory.
- **Zero Build Step**: Pure vanilla HTML, CSS, and JS — runs out of the box with zero npm installations or compilation pipelines.
- **Centralized Data**: All profile details, projects, and milestones are neatly organized in `content.js` for instant updates.
- **SEO & Schema.org**: Fully equipped with meta tags, Open Graph cards, Twitter cards, and Schema.org JSON-LD (`Person`, `WebSite`, `SoftwareApplication`).
- **Accessibility & Motion**: Fully keyboard accessible, high contrast ratios, semantic HTML5 tags, and respects `prefers-reduced-motion`.

---

## 📁 Project Structure

```
portfolio-website/
├── assets/
│   ├── me.png              # Profile photo (placeholder included; drop your real photo here)
│   └── favicon.svg         # Modern vector SS monogram favicon
├── index.html              # Core semantic HTML5 document
├── styles.css              # Custom styling, CSS variables, typography & responsive layouts
├── content.js              # Centralized data model (edit your projects, bio & links here)
├── script.js               # Theme toggle, mobile menu, validation, counters & modals
└── README.md               # Setup & deployment guide
```

---

## 💻 How to Run Locally

### Option A: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey (if not already installed).
3. Open the `portfolio-website` folder in VS Code.
4. Right-click on `index.html` and select **"Open with Live Server"** (or click **Go Live** on the status bar).
5. The portfolio will automatically open at `http://127.0.0.1:5500`.

### Option B: Python Local Server
If you have Python installed, run this command in your terminal inside the project directory:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🌐 How to Deploy for Free

### 1. Deploying on Vercel
1. Initialize a git repository and commit the files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Push your repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/sumanssringeri94-create/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Visit [vercel.com](https://vercel.com/) and sign in with GitHub.
4. Click **"Add New Project"**, select your repository, leave build commands empty (it's static HTML), and click **"Deploy"**.
5. Your portfolio is live in seconds with free SSL and custom domain support!

### 2. Deploying on GitHub Pages
1. Push the code to a repository named `sumanssringeri94-create.github.io` (or any repo name):
   ```bash
   git push -u origin main
   ```
2. In GitHub, go to your repository **Settings** -> **Pages**.
3. Under **Branch**, select `main` and root `/` folder, then click **Save**.
4. Your website will be available at: `https://sumanssringeri94-create.github.io/`.

### 3. Deploying on Netlify
1. Go to [netlify.com](https://www.netlify.com/) and log in.
2. Drag and drop the `portfolio-website` folder directly into the Netlify Dashboard, or import from GitHub.
3. Your site deploys instantly!

---

## 📝 Checklist: What You Still Need to Fill In

Before launching publicly, check off these simple placeholder items:

- [x] **Profile Picture (`assets/me.png`)**:
  - Profile photograph updated with your official portrait.
- [ ] **Contact Email**:
  - In `content.js` and `index.html` (modal), replace `[TODO: my email]` with your active email address.
- [ ] **Contact Form Endpoint**:
  - Go to [formspree.io](https://formspree.io/) (free tier), create a new form, and copy your endpoint ID (e.g., `https://formspree.io/f/mqkvrpqw`).
  - Paste it into `action="https://formspree.io/f/YOUR_FORM_ID"` in `index.html` and `formEndpoint` in `content.js`.
- [ ] **Unreleased Project Links**:
  - When CloudSelect and Sri Sairam University Website repositories or live demos become public, update their URLs in `content.js` and remove the `isComingSoon: true` flag.
