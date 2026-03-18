# Standard Operating Procedure — Lumière Pâtisserie Website

> Master SOP covering the full website: what it is, how it works, how to operate it, and how to extend it.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Name** | Lumière Pâtisserie |
| **Tagline** | "Where Ubuntu Meets Artisan Excellence" |
| **Concept** | Afro-fusion restaurant & café celebrating African heritage through artisan pastry and soulful flavors |
| **Philosophy** | Ubuntu: "I am because we are" |
| **Phone** | (310) 555-0199 |
| **Hours** | Open Daily: 8 AM – 9 PM |
| **Price Range** | $$$ |
| **Live URL** | Deployed on Netlify (see deployment section) |

---

## 2. Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | HTML / CSS / Vanilla JS | Static site, no build step |
| **Backend (DB)** | Supabase (Free Tier) | Project ID: `vzwqakkjufbvpagthtif`, Region: `us-east-1` |
| **Hosting** | Netlify | Publish directory: `public/`, no build command |
| **Fonts** | Google Fonts | Inter (body), Playfair Display (headings) |
| **CDN** | jsDelivr | Supabase JS client loaded via CDN |
| **Version Control** | Git | Repository initialized locally |

---

## 3. File & Directory Structure

```
Restaurant : Café Website/
├── public/                    ← Deploy root (served by Netlify)
│   ├── index.html             ← Single-page website (668 lines)
│   ├── css/
│   │   └── style.css          ← Full design system (1174 lines)
│   ├── js/
│   │   ├── app.js             ← Core interactivity & Supabase integration (392 lines)
│   │   └── debug.js           ← Element audit script (39 lines)
│   └── assets/                ← All images (hero, menu items, venue, logo)
├── database/                  ← Database documentation
│   ├── overview.md            ← Supabase project metadata & connection info
│   ├── schema.md              ← Table schemas, column definitions, RLS policies
│   ├── automations.md         ← Future automation opportunities
│   └── code_changes.md        ← Changelog of Supabase integration work
├── directives/                ← SOPs & agent instructions
│   ├── website_sop.md         ← THIS FILE
│   ├── deploy_to_netlify.md   ← Deployment procedure
│   └── implement_theme.md     ← Original theme directive
├── execution/                 ← Deterministic Python scripts
│   └── verify_netlify_config.py
├── netlify.toml               ← Deployment configuration + security headers
├── GEMINI.md / CLAUDE.md / AGENTS.md  ← Agent operating instructions
└── .gitignore
```

---

## 4. Website Sections (Top → Bottom)

### 4.1 Fixed Navigation Header
- **Logo** on the left (`assets/logo.png`), clickable link returning to the home page (`index.html`)
- **Nav links**: Hours & Location, Menus, Events & Private Dining, Happenings, Gift Cards, Reservations
- **Hamburger menu** for mobile (3-span toggle → slides in nav)
- **Reservations** link opens the reservations modal (not a page scroll)
- Active section highlighting on scroll for non-Reservations links
- Smooth scroll with nav-height offset for anchor links

### 4.2 Hero Section
- Full-viewport height, centered text
- Background: CSS-driven hero image (`assets/hero-afro.png`) with dark gradient overlay
- **Headline**: "Lumière Pâtisserie"
- **Subhead**: "Where Ubuntu Meets Excellence. Celebrating African Heritage Through Artisan Pastry & Soulful Flavors."
- **CTA**: "Explore Our Journey" → smooth scrolls to `#menu`

### 4.3 Menu Section (`#menu`)
- **Header**: "Our Culinary Story" with descriptive subtext
- **8 category tabs** (button-based filtering, no page reload):

| Tab Label | `data-category` | Items | Price Range |
|---|---|---|---|
| Brunch | `brunch` | 4 items | $16–$22 |
| Breakfast | `breakfast` | 4 items | $12–$16 |
| Lunch | `pastries` | 4 items (default active) | $17–$26 |
| Dinner | `desserts` | 5 items | $24–$38 |
| Drink Menu | `cafe` | 5 items | $5–$6 |
| Cocktails | `savory` | 5 items | $14–$18 |
| Wine List | `wine` | 3 items | $12–$56 (glass/bottle) |
| Dessert | `dessert-ext` | 6 items | $9–$20 |

- Each **menu card** has: image, title, price, description, optional "Chef's Selection" badge
- Cards use **IntersectionObserver** for fade-in reveal as they scroll into view
- Menu containers support **mouse drag/swipe** for horizontal scrolling
- Bottom CTA: "Order for Pickup" → shows "coming soon" alert

### 4.4 "Join Our Circle" Section
- Ubuntu philosophy quote
- Operating hours reminder
- Community-focused copy

### 4.5 Events & Private Dining Section (`#events`)
- **Hero image** with overlay (`assets/events-hero.png`)
- Three descriptive paragraphs about gathering, menus, and capacity (up to 1,000 guests)
- **CTA**: "Plan Your Gathering" → opens `#event-inquiry-modal`
- **Venue photos**: Interior & outdoor venue images in a 2-column grid

### 4.6 Instagram / Happenings Section (`#happenings`)
- **Heading**: "OUR COMMUNITY'S MOMENTS"
- **Subtitle**: Tag invitation for Instagram features
- **10-image grid** showcasing food photography
- **4 social icons** (Facebook, Instagram, Facebook alt, LinkedIn) — currently `href="#"` placeholders

### 4.7 Experience Ubuntu Section (`#hours`)
- Welcome message
- Operating hours
- Community-focused quote

---

## 5. Interactive Features (app.js)

### 5.1 Supabase Client Initialization
- Initializes inside `DOMContentLoaded` for safety
- Uses CDN-loaded `window.supabase.createClient()`
- **Graceful fallback**: If CDN fails (ad blocker, network), `supabase` variable stays `null` and forms show phone-call fallback message
- **Connection**: `https://vzwqakkjufbvpagthtif.supabase.co` + publishable anon key

### 5.2 Hamburger Menu (Mobile)
- Toggles `.active` on both the hamburger button and nav menu
- Locks body scroll when menu is open
- Auto-closes when any nav link is clicked

### 5.3 Menu Tab Filtering
- Click a tab → adds `.active` to that tab, removes from others
- Shows matching `data-category` container, hides all others via `.hidden` class
- Default active tab: Lunch (`pastries`)

### 5.4 Menu Horizontal Swipe/Drag
- Mouse-based drag scrolling on each `.menu-container`
- `mousedown`/`mousemove`/`mouseup`/`mouseleave` event listeners
- Scroll multiplier: `2x` for responsive feel

### 5.5 Card Fade-In Animation
- `IntersectionObserver` watches all `.menu-card` elements
- Adds `.visible` class when card enters viewport → triggers CSS opacity/transform transition

### 5.6 Smooth Scroll Navigation
- All non-Reservations nav links use `scrollTo()` with `behavior: 'smooth'`
- Accounts for fixed nav header height + 20px padding

### 5.7 Reservations Modal
- **Trigger**: Click "Reservations" nav link
- **Fields**: Name (req), Email (req), Phone, # Guests (1–8+), Date (req), Time, Special Requests
- **Submit flow**:
  1. Button disabled + text → "Submitting..."
  2. Payload built from `FormData`
  3. If `supabase` is null → alert with phone fallback
  4. `supabase.from('reservations').insert([payload])`
  5. Success → alert + close modal + reset form
  6. Error → alert with retry message
  7. Network error → separate catch with connection message

### 5.8 Event Inquiry Modal
- **Trigger**: Click "Plan Your Gathering" CTA in events section
- **Fields**: Name (req), Email (req), Phone, Event Type dropdown (req: Private Dining / Birthday / Corporate / Wedding / Anniversary / Other), Preferred Date, Guest Count (1–1000), Vision/Message (req)
- **Submit flow**: Same pattern as reservations → inserts into `event_inquiries` table

### 5.9 Modal Close Logic (Shared)
- **X button**: Each `.modal-close` button closes its parent modal
- **Backdrop click**: Clicking the `.modal` overlay (not content) closes it
- **Escape key**: Closes all active modals
- Restores `body` scroll on close

### 5.10 Orphaned CTA Handling
- Catches any `a.cta-button` with `href="#"` that doesn't have its own handler
- "Order" / "Pickup" buttons → show "coming soon" alert
- Others → scroll to top

### 5.11 Section Reveal Animations
- Events, Instagram, and About sections start hidden (opacity: 0, translateY: 30px)
- `IntersectionObserver` with 10% threshold triggers fade-in (0.6s ease)

### 5.12 Active Nav Highlight on Scroll
- Scroll listener checks which `section[id]` is in viewport
- Adds `.active-link` to the corresponding nav link

---

## 6. Database (Supabase)

### 6.1 Connection Details
| Field | Value |
|---|---|
| Project URL | `https://vzwqakkjufbvpagthtif.supabase.co` |
| Dashboard | `https://supabase.com/dashboard/project/vzwqakkjufbvpagthtif` |
| Anon Key | Embedded in `app.js` (INSERT-only, safe for browser) |
| Organization | Aura Transportation |

### 6.2 Table: `reservations`
| Column | Type | Required | Default |
|---|---|---|---|
| `id` | UUID | auto | `gen_random_uuid()` |
| `created_at` | Timestamptz | auto | `NOW()` |
| `name` | Text | Yes | — |
| `email` | Text | Yes | — |
| `phone` | Text | No | null |
| `date` | Date | Yes | — |
| `time` | Time | No | null |
| `guests` | Integer | No | null |
| `special_requests` | Text | No | null |
| `status` | Text | auto | `'pending'` |

**Status workflow**: `pending` → `confirmed` or `cancelled`

### 6.3 Table: `event_inquiries`
| Column | Type | Required | Default |
|---|---|---|---|
| `id` | UUID | auto | `gen_random_uuid()` |
| `created_at` | Timestamptz | auto | `NOW()` |
| `name` | Text | Yes | — |
| `email` | Text | Yes | — |
| `phone` | Text | No | null |
| `event_type` | Text | Yes | — |
| `event_date` | Date | No | null |
| `guest_count` | Integer | No | null |
| `message` | Text | Yes | — |
| `status` | Text | auto | `'new'` |

**Status workflow**: `new` → `in_review` → `responded` → `closed`

### 6.4 Security Model (RLS)
- Row Level Security enabled on both tables
- **Public (anon)**: INSERT only — visitors can submit forms
- **No public SELECT/UPDATE/DELETE** — only authenticated admin users via Supabase dashboard

---

## 7. Design System (style.css)

### 7.1 Color Palette (CSS Variables)
| Variable | Value | Description |
|---|---|---|
| `--color-bg` | `#FDF8F3` | Warm cream/sand background |
| `--color-text` | `#2A1810` | Deep mahogany/rich brown |
| `--color-accent` | `#D4A54A` | Vibrant African gold |
| `--color-terra` | `#D85835` | Terracotta / African earth |
| `--color-copper` | `#8B6914` | Warm copper tone |
| `--color-ochre` | `#CC7722` | Rich ochre |
| `--color-rust` | `#5C3A1E` | Deep spice rust |
| `--color-shadow` | `rgba(42,24,16,0.1)` | Mahogany shadow |

### 7.2 Typography
| Role | Font / Stack |
|---|---|
| Headings | `'Playfair Display', Georgia, serif` |
| Body | `'Inter', -apple-system, sans-serif` |

### 7.3 Key Design Elements
- **African geometric pattern overlay** on `body::before` (subtle repeating gradients at 3% opacity)
- **Gradient CTA buttons**: Gold → Ochre, with hover darkening + subtle scale
- **African pattern corner accents** on menu cards (`::before` pseudo-element)
- **Kente-inspired border strip** between sections (repeating linear gradient)
- **Chef's Selection badge**: Gold background, uppercase, absolute-positioned
- **Glassmorphism modals**: Backdrop blur, semi-transparent background
- **Section reveal animations**: Fade-in with upward translate on scroll

### 7.4 Responsive Breakpoints
- **768px**: Mobile hamburger menu, scrollable horizontal menu tabs, stacked layouts, adjusted font sizes
- All images use `object-fit: cover` for consistent aspect ratios

---

## 8. Deployment Procedure

### 8.1 Pre-Deployment Checklist
1. All files are in `public/` (HTML, CSS, JS, assets)
2. `netlify.toml` exists in project root with `publish = "public"`
3. No broken asset paths (all relative paths starting with `assets/`)
4. Supabase CDN link is reachable
5. Run `execution/verify_netlify_config.py` to validate config

### 8.2 Netlify Configuration (`netlify.toml`)
```toml
[build]
  publish = "public"
  command = ""          # Static site, no build step

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Content-Type-Options = "nosniff"
```

### 8.3 Deploy Steps
1. Commit all changes to Git
2. Push to GitHub (or connect the repo to Netlify for auto-deploy)
3. Manual deploy: `netlify deploy --prod` from project root (requires Netlify CLI)
4. Verify live site loads correctly
5. Test both form submissions (reservation + event inquiry) on the live URL

See `directives/deploy_to_netlify.md` for the full deployment directive.

---

## 9. SEO & Structured Data

### 9.1 Meta Tags
- `<title>`: "Lumière Pâtisserie | Where Ubuntu Meets Artisan Excellence"
- `<meta name="description">`: Full brand description mentioning African heritage, artisan pastries, Ubuntu philosophy

### 9.2 JSON-LD Schema (Restaurant type)
```json
{
  "@type": "Restaurant",
  "name": "Lumière Pâtisserie",
  "servesCuisine": "Afro-Fusion Artisan Pastry",
  "priceRange": "$$$",
  "telephone": "+13105550199",
  "openingHoursSpecification": "08:00–21:00 daily",
  "menu": "#menu anchor link"
}
```

### 9.3 Additional SEO Elements
- Semantic HTML5 (`<nav>`, `<main>`, `<section>`)
- Single `<h1>` per page
- `alt` text on all images
- Preconnect hints for Google Fonts

---

## 10. Maintenance & Operations

### 10.1 Checking Reservations
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/vzwqakkjufbvpagthtif)
2. Navigate to Table Editor → `reservations`
3. Review entries with `status = 'pending'`
4. Update `status` to `confirmed` or `cancelled` as appropriate

### 10.2 Checking Event Inquiries
1. Same Supabase Dashboard → `event_inquiries`
2. Review entries with `status = 'new'`
3. Progress through: `new` → `in_review` → `responded` → `closed`

### 10.3 Updating Menu Items
1. Edit `public/index.html`
2. Find the relevant `<div class="menu-container" data-category="...">` section
3. Add/edit/remove `.menu-card` elements within
4. Each card structure:
```html
<div class="menu-card">
    <span class="chef-badge">Chef's Selection</span>  <!-- optional -->
    <img src="assets/[image].png" alt="[Item Name]" class="menu-item-image">
    <h3 class="menu-item-title">[Item Name]</h3>
    <div class="menu-item-price">[Price]</div>
    <p class="menu-item-desc">[Description]</p>
</div>
```
5. Place food images in `public/assets/` (recommended: PNG, square or 4:3, ≤500KB)
6. Redeploy

### 10.4 Adding a New Menu Category
1. Add a new `<button>` to `.menu-tabs` with a unique `data-category`
2. Add a corresponding `<div class="menu-container hidden" data-category="[new]">` with menu cards
3. The JS tab logic is dynamic — no JS changes needed

### 10.5 Updating Social Links
- Edit the `href="#"` on the 4 `<a class="social-icon">` elements in the Instagram section
- Replace with actual profile URLs

### 10.6 Updating Operating Hours
- Edit text in both About sections (`#hours` and the first about-section)
- Update JSON-LD `openingHoursSpecification` in `<head>`

---

## 11. Debug & Troubleshooting

### 11.1 Debug Script (`debug.js`)
- Runs on `DOMContentLoaded`
- Audits presence of all critical DOM elements (hamburger, nav, tabs, modals, forms, buttons)
- Reports `✓` / `✗` for each element
- Reports Supabase library load status
- **Check browser console** for debug output

### 11.2 Common Issues

| Problem | Cause | Fix |
|---|---|---|
| Forms show phone fallback | Supabase CDN blocked (ad blocker, firewall) | Whitelist `cdn.jsdelivr.net` |
| Hamburger doesn't toggle | JS error in `app.js` | Check console for errors |
| Menu tabs don't filter | Missing `data-category` match between tab and container | Ensure exact string match |
| Modal doesn't open | Missing element ID or selector mismatch | Run `debug.js` to identify missing elements |
| Images don't load | Wrong path or missing file in `public/assets/` | Verify filename matches `src` attribute |
| Form submits but no data in Supabase | RLS policy issue or schema mismatch | Check Supabase dashboard for failed inserts |

### 11.3 Console Logging Convention
- `app.js` logs `✓` for each successfully initialized feature
- Pattern: `APP.JS: [Feature Name] ✓`
- Errors: `APP.JS: [Feature Name] error: [details]`
- Final: `APP.JS: ===== ALL INITIALIZATION COMPLETE =====`

---

## 12. Future Automation Opportunities

See `database/automations.md` for full details. Priority order:

1. **Confirmation emails** on form submit (Supabase Edge Function + Resend/SendGrid)
2. **Staff Slack alerts** on new submissions (Slack Incoming Webhook)
3. **24-hour guest reminders** (Python cron + email provider)
4. **Daily reservation digest** for staff planning
5. **Google Calendar events** on status confirmation
6. **Weekly Google Sheets report** for business insights
7. **Status-driven emails** (confirmed/cancelled notifications)
8. **Stale inquiry nudge** for follow-up discipline

---

## 13. Security Notes

- **Anon key in browser is safe** — RLS restricts it to INSERT only
- **No secret keys** are exposed client-side
- **Security headers** are enforced via `netlify.toml`:
  - `X-Frame-Options: DENY` (clickjacking protection)
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Content-Type-Options: nosniff`
- **Data access**: Only authenticated admin users can read/modify/delete data via Supabase Dashboard

---

## 14. Asset Inventory

Total image assets: ~50+ PNG files in `public/assets/`. Key categories:

| Category | Examples |
|---|---|
| **Branding** | `logo.png`, `hero-afro.png`, `hero.png` |
| **Venue** | `venue-interior.png`, `venue-outdoor.png`, `events-hero.png` |
| **Brunch** | `le_brunch_lumiere.png`, `plantain_gruyere_tartine.png`, `salmon_parisienne.png`, `afro_breakfast_bowl.png` |
| **Breakfast** | `french_omelette.png`, `pain_perdu.png`, `avocado_tartine.png`, `croissant.png` |
| **Lunch** | `poulet_yassa_wrap.png`, `nicoise_salad.png`, `jerk_mushroom_tart.png`, `steak_frites.png` |
| **Dinner** | `branzino_provencal.png`, `short_rib_bourguignon.png`, `lamb_tagine.png`, `mafe_stew.png`, `duck_confit.png` |
| **Desserts** | `mousse.png`, `macarons.png`, `eclair.png`, `creme_brulee.png`, `tropical_mille_feuille.png`, `amarula_affogato.png` |
| **Drinks** | `ethiopian_coffee_*.png`, `rooibos_latte_*.png`, `bissap_tea_*.png`, `moroccan_mint_tea.png`, `cafe_touba.png` |
| **Cocktails** | `hibiscus_royale.png`, `savanna_old_fashioned.png`, `dakar_gin_fizz.png`, `espresso_martini_noir.png`, `cape_town_mule.png` |
| **Wine** | `chenin_blanc.png`, `provence_rose.png`, `bordeaux_superieur.png` |

All images are AI-generated editorial-style food photography, optimized for web display.

---

## 15. Change Log

> Every change to the website must be logged here. Newest entries go at the top.

| Date | Change Summary | Files Modified | SOP Sections Updated |
|---|---|---|---|
| 2026-03-18 | Made logo a clickable link to home page | `public/index.html` | §4.1, §15 |
| 2026-02-21 | Initial SOP created from full site audit | `directives/website_sop.md` (new) | All (1–14) |

---

## 16. SOP Maintenance Rules

> **This SOP is a living document.** Any agent or developer making changes to the website MUST update this file as part of the same work session.

### 16.1 When to Update This SOP

Update this SOP whenever ANY of the following occur:

| Change Type | SOP Sections to Update |
|---|---|
| Menu item added/removed/edited | §4.3 (menu table), §14 (asset inventory if new image) |
| New page section or feature | §4 (website sections), §5 (interactive features if JS) |
| Database schema change | §6 (database tables) |
| New CSS variable / design token | §7 (design system) |
| Deployment config change | §8 (deployment procedure) |
| New file added to project | §3 (file structure) |
| Bug fix or troubleshooting discovery | §11 (debug & troubleshooting) |
| New automation implemented | §12 (automations — move from future to implemented) |
| Security change | §13 (security notes) |
| Any change | §15 (change log — always) |

### 16.2 How to Update

1. **Make the code change first** — edit HTML, CSS, JS, or config files as needed
2. **Update the relevant SOP section(s)** — keep descriptions accurate and concise
3. **Add a changelog entry** — append a row to the table in §15 with: date, summary, files modified, SOP sections updated
4. **Deploy** — follow §8 if deploying to production

### 16.3 Agent-Specific Rule

**For AI agents (GEMINI, Claude, Codex, etc.):** After completing any code modification to this project, you MUST:
1. Read `directives/website_sop.md`
2. Update the affected sections to reflect your changes
3. Add a new row to the Change Log (§15)
4. Do NOT skip this step — the SOP is the system's memory
