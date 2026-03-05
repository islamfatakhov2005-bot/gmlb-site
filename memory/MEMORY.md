# GMLB Site — Memory

## Project Overview
Business automation landing site for GMLB (Telegram bots, parsers, RAG solutions).

## Stack
- Next.js 15 (App Router, SSR/ISR)
- Payload CMS 3 (admin panel at /admin)
- PostgreSQL (via @payloadcms/db-postgres)
- Tailwind CSS v4 (config in CSS, not tailwind.config.ts)
- Framer Motion v12, Lucide React, Sonner

## Design System
- Dark glassmorphism, #081410 background, #22C55E/#10B981 green accent
- CSS classes: .glass-card, .btn-gradient, .btn-outline-green, .grid-bg, .gradient-text, .tag-badge, .input-dark, .section-divider
- Spacetime dot grid animated background via .grid-bg pseudo-elements
- Font: Inter (body) + Plus Jakarta Sans (headings)

## Key Files
- `app/(frontend)/globals.css` — Tailwind v4 + full design system CSS
- `app/(frontend)/layout.tsx` — async layout, fetches site settings for Footer
- `payload.config.ts` — Payload config with all collections + SiteSettings global
- `lib/payload.ts` — getPayloadClient()
- `lib/telegram.ts` — sendTelegramMessage(), formatLeadMessage()
- `app/(frontend)/api/leads/route.ts` — contact form API with rate limiting

## Payload Collections
- products: title, slug, shortDescription, coverImage, tags[], iconName, color, featured, isPublished, overview, pains[], solution, howItWorks[], priceFrom, priceTo, pricingPlans[], faq[], seoTitle, seoDescription
- cases: title, clientType, description, metrics[], tags[], color, product (relation)
- reviews: name, role, text, rating, initials, color, isPublished
- advantages: title, description, iconName, color, order
- leads: name, phone, telegram, message, product, source, status
- media, users, blog (existing)

## Payload Globals
- site-settings: hero text/stats, about section, contacts (telegram/email/phone), tg bot tokens

## Pages
- / — Home (all sections)
- /products — catalog with search/filter (ProductsCatalog client component)
- /products/[slug] — product detail with tabs (ProductDetail client component)
- /cases, /advantages, /reviews, /contact — standalone pages

## Components
All in components/sections/ and components/layout/
- All section components accept optional props with defaults (fallback to hardcoded design data)
- Header: uses usePathname for active state
- Footer: receives telegram/email/phone from layout

## Deployment (Beget VPS)
- VPS: 1 vCPU, 3GB RAM, 15GB disk (n8n already running)
- Build locally → deploy built files to VPS
- Stack on VPS: Node.js (nvm), PM2, PostgreSQL, Nginx
- See DEPLOY.md for deployment instructions

## Environment Variables Needed
- DATABASE_URI=postgresql://user:pass@localhost:5432/gmlb
- PAYLOAD_SECRET=random-secret-string
- NEXT_PUBLIC_SITE_URL=https://yourdomain.ru
- TELEGRAM_BOT_TOKEN=... (optional, can set in admin panel)
- TELEGRAM_CHAT_ID=... (optional, can set in admin panel)
