# GMLB Website — Полное руководство по проекту

> Этот файл описывает весь проект целиком: стек, архитектуру, дизайн-систему, CMS, деплой.
> Достаточно, чтобы воспроизвести аналогичный сайт с нуля.

---

## 1. Что это за проект

**GMLB** — B2B сайт компании по автоматизации бизнеса (Telegram-боты, парсеры, RAG-решения, AI-агенты).
Целевая аудитория: малый бизнес и e-commerce в России и СНГ.

**Домен:** https://gmlb.ru
**Admin:** https://gmlb.ru/admin

---

## 2. Технологический стек

| Слой | Технология | Версия |
|------|-----------|--------|
| Фреймворк | Next.js App Router | 15.x |
| CMS | Payload CMS | 3.x |
| База данных | PostgreSQL 16 (Docker) | — |
| Стилизация | Tailwind CSS v4 | 4.x |
| Анимации | Framer Motion | 12.x |
| Иконки | Lucide React | 0.469+ |
| Тосты | Sonner | 1.7+ |
| ORM | Payload встроенный (drizzle) | — |
| Rich Text | @payloadcms/richtext-lexical | 3.x |
| Шрифты | Inter (Google Fonts, cyrillic) | — |
| Язык | TypeScript | 5.x |

### Все зависимости package.json
```json
"dependencies": {
  "@payloadcms/db-postgres": "^3.0.0",
  "@payloadcms/next": "^3.0.0",
  "@payloadcms/richtext-lexical": "^3.0.0",
  "framer-motion": "^12.0.0",
  "graphql": "^16.0.0",
  "lucide-react": "^0.469.0",
  "next": "15.x",
  "payload": "^3.0.0",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "sass": "^1.97.3",
  "sharp": "^0.33.0",
  "sonner": "^1.7.0"
},
"devDependencies": {
  "@tailwindcss/postcss": "^4.0.0",
  "@types/node": "^22.0.0",
  "@types/react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "tw-animate-css": "^1.2.5",
  "typescript": "^5.5.0",
  "postcss": "^8.4.0"
}
```

### npm scripts
```json
"dev": "next dev",
"build": "next build",
"start": "next start -p 4444",
"generate:types": "payload generate:types"
```

---

## 3. Структура проекта

```
/
├── app/
│   ├── (frontend)/               # Все фронтенд-страницы
│   │   ├── layout.tsx            # Root layout: Header + Footer + Toaster
│   │   ├── page.tsx              # Главная: все секции
│   │   ├── globals.css           # ВСЕ стили (Tailwind v4 @theme)
│   │   ├── not-found.tsx         # 404 страница
│   │   ├── loading.tsx           # Скелетон загрузки
│   │   ├── products/
│   │   │   ├── page.tsx          # Каталог продуктов
│   │   │   └── [slug]/
│   │   │       ├── page.tsx      # Страница продукта
│   │   │       └── loading.tsx
│   │   ├── cases/page.tsx        # Кейсы
│   │   ├── contact/page.tsx      # Контакты/консультация
│   │   └── api/
│   │       └── submit-lead/route.ts  # API лидов
│   └── (payload)/                # Payload CMS admin (авто)
├── components/
│   ├── sections/                 # Секции страниц
│   │   ├── Hero.tsx
│   │   ├── ProductsGrid.tsx
│   │   ├── About.tsx
│   │   ├── Cases.tsx
│   │   ├── Advantages.tsx
│   │   ├── Reviews.tsx
│   │   ├── Contact.tsx
│   │   ├── ProductsCatalog.tsx
│   │   └── ProductDetail.tsx
│   ├── layout/
│   │   ├── Header.tsx            # 'use client'
│   │   └── Footer.tsx            # 'use client'
│   └── ui/
│       ├── LeadForm.tsx
│       ├── MatrixText.tsx
│       └── ...
├── collections/                  # Payload CMS коллекции
│   ├── Products.ts
│   ├── Cases.ts
│   ├── Reviews.ts
│   ├── Advantages.ts
│   ├── Leads.ts
│   ├── Blog.ts
│   ├── Users.ts
│   └── Media.ts
├── globals/
│   └── SiteSettings.ts           # Все тексты сайта (8 табов)
├── lib/
│   ├── payload.ts                # getPayloadClient() с fast-fail
│   ├── renderGreen.tsx           # **слово** → зелёный span
│   └── telegram.ts               # sendTelegramMessage(), formatLeadMessage()
├── public/
│   └── media/
│       └── hero-video.mp4        # Фоновое видео (6.7MB)
├── payload.config.ts             # Конфиг Payload CMS
├── next.config.ts                # withPayload() wrapper
└── tsconfig.json                 # excludes Design/
```

---

## 4. Дизайн-система

### Цветовая палитра
```css
/* globals.css — @theme секция */
--background: oklch(0.095 0.025 155)  /* #081410 — тёмный зелёно-чёрный фон */
--foreground: oklch(0.95 0.005 155)   /* #E6EDF3 — светло-серый текст */
--primary: oklch(0.65 0.18 155)       /* #22C55E — изумрудно-зелёный акцент */
--secondary: oklch(0.16 0.025 155)    /* #1A3A2E — тёмно-зелёный */
--border: oklch(1 0 0 / 8%)           /* rgba(255,255,255,0.08) */
```

Дополнительные зелёные: `#22C55E` (primary), `#10B981` (secondary green)

### Концепция дизайна
**Dark Glassmorphism** — тёмный фон + полупрозрачные стеклянные карточки с зелёным свечением.

- Фон: `#081410` (почти чёрный с зелёным оттенком)
- Карточки: `rgba(34,197,94,0.03)` + `backdrop-filter: blur(16px)` + зелёная обводка
- Секции с белым фоном: `border-radius: 85px`, `overflow: hidden` (`.sections-wrapper`)
- Dot grid анимация: радиальные точки с 3D wave эффектом

### Ключевые CSS классы
```css
.glass-card      /* glassmorphism карточка, hover: lift + glow */
.btn-gradient    /* #22C55E→#10B981 градиент, glow shadow, pill */
.btn-outline-green /* прозрачный с зелёной обводкой */
.input-dark      /* инпут на тёмном фоне, focus: зелёный */
.gradient-text   /* зелёный градиент для текста */
.grid-bg         /* анимированная dot grid секция */
.sections-wrapper /* белые секции с radius 85px */
.tag-badge       /* зелёные бейджи */
.text-glow       /* text-shadow зелёное свечение */
```

### Анимации (keyframes)
| Название | Эффект | Длительность |
|----------|--------|-------------|
| `spacetime-wave` | 3D rotateX/Y + scale волна на dot grid | 12s |
| `glow-pulse` | opacity пульсация на свечении | 8s |
| `float` | translateY ±12px (карточки) | 6s |
| `blob` | translate + scale (фоновые пятна) | 7s |
| `blink` | мигание курсора (Hero MatrixWord) | 1s |
| `pulse-glow-green` | box-shadow пульсация | 2s |

### Hero секция
- Первая строка: обычный текст (из CMS)
- Вторая строка: **MatrixWord** — анимация reveal/hold/erase слов (фазы: reveal 75мс/символ, hold 2200мс, erase 50мс/символ)
- Фоновое видео: `mix-blend-mode: screen` (чёрный фон исчезает), `opacity: 0.55`, скорость `0.8x`
- Счётчики: RAF ease-out анимация (1400мс, кубическая)
- Scroll: blur + scale + opacity через Framer Motion `useScroll`

### Header
- Pill-shape, фиксированный
- При скролле: `rgba(8,20,14,0.15)` → `rgba(8,20,14,0.55)`, `blur(32px)`
- Логотип: Zap иконка + "GMLB"
- Мобильное меню: AnimatePresence

### Footer
- Тёмная тема
- `motion.footer` с `useScroll` blur+scale, offset `['start end', 'start 0.5']`
- 4 колонки: бренд, продукты, ресурсы, контакты

---

## 5. Payload CMS — Коллекции

### Products
```ts
fields: [
  title, slug (unique, auto-generate),
  shortDescription, coverImage (upload),
  tags[] (text),
  iconName (Lucide icon name, e.g. 'Bot'),
  color (hex, default '#22C55E'),
  featured (checkbox),
  isPublished (checkbox, default false),
  priceFrom, priceTo (number),
  overview (richtext Lexical),
  pains[], solutions[], faqs[],
  seoTitle, seoDescription
]
```

### Cases
```ts
fields: [
  title, clientType,
  description (textarea),
  metrics[] { label, value, iconName },
  tags[] (text),
  color (hex),
  product (relationship → Products)
]
```

### Reviews
```ts
fields: [
  name, role, text,
  rating (1-5, select),
  initials (2 буквы),
  color (hex),
  isPublished
]
```

### Advantages
```ts
fields: [
  title, description,
  iconName (Lucide),
  color (hex),
  order (number, для сортировки)
]
```

### Leads (заявки)
```ts
fields: [
  name, phone, telegram, message,
  product (relationship → Products),
  source (text, откуда пришёл),
  status (select: new/in-progress/closed)
]
access: { create: () => true, read: isAdmin, update: isAdmin, delete: isAdmin }
```

### Media
```ts
// upload коллекция
staticDir: 'public/media'
imageSizes: [thumbnail 400x300, card 768x512, desktop 1920x*]
```

### Users
```ts
// auth: true
fields: [email (useAsTitle)]
```

---

## 6. SiteSettings Global — 8 табов

Все тексты сайта редактируются из `/admin` → Настройки → Настройки сайта.

**Синтаксис зелёного текста: `**слово**` → зелёный span**

### Таб 1: 🚀 Главный экран
| Поле | Тип | Назначение |
|------|-----|-----------|
| heroBadge | text | Текст зелёного бейджа вверху |
| heroHeading | text | Первая строка заголовка h1 |
| heroCyclingWords[] | array {word} | Анимированные слова (вторая строка) |
| heroSubheading | textarea | Подзаголовок под h1 |
| stat1-3 Value/Label | text×6 | Три счётчика внизу героя |

### Таб 2: 📦 Продукты
| productsHeading | text | Заголовок секции продуктов |
| productsSubheading | text | Подзаголовок |

### Таб 3: 🏢 О компании
| aboutHeading | text | Заголовок (поддерживает **зелёный**) |
| aboutDescription | textarea | Текст описания компании |
| aboutPoints[] | array {text} | Список пунктов с галочками |
| aboutImage | upload | Иллюстрация справа |
| aboutStatValue/Label | text×2 | Бейдж с цифрой |

### Таб 4: 📊 Кейсы
| casesHeading | text | Заголовок |
| casesSubheading | text | Подзаголовок |

### Таб 5: ⚡ Преимущества
| advantagesHeading | text | Заголовок |
| advantagesSubheading | text | Подзаголовок |

### Таб 6: ⭐ Отзывы
| reviewsHeading | text | Заголовок |

### Таб 7: 📬 Обратная связь
| contactHeading | text | Заголовок формы |
| contactDescription | textarea | Описание под заголовком |
| contactBullet1-3 | text×3 | Три пункта-преимущества |

### Таб 8: ⚙️ Контакты и бот
| telegram | text | Username без @ |
| email | email | Email компании |
| phone | text | Телефон |
| tgBotToken | text | Токен Telegram бота |
| tgChatId | text | Chat ID для уведомлений |

---

## 7. Зелёный текст — renderGreen()

```tsx
// lib/renderGreen.tsx
export function renderGreen(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <span key={i} className="gradient-text">{part}</span> : part
  )
}
```

**Использование:**
- В JSX: `{renderGreen(heading)}` — рендерит **слово** как зелёный span
- В MatrixText (анимация посимвольно): `text={heading.replace(/\*\*(.*?)\*\*/g, '$1')}` — убираем `**` перед анимацией, т.к. MatrixText не умеет JSX-детей

---

## 8. API маршрут — /api/submit-lead

```ts
// app/(frontend)/api/submit-lead/route.ts
// POST: { name, phone, telegram?, message?, productId?, source? }

Валидация:
- name: минимум 2 символа
- phone: 10-15 цифр после чистки

Защита:
- Honeypot поле "website" (если заполнено — 200 без действий)
- Rate limit: 1 запрос / IP / 60 сек

Действия:
1. payload.create({ collection: 'leads', data: {...} })
2. sendTelegramMessage(formatLeadMessage(data))

Ответ: { success: true } или { error: '...' }
```

### lib/telegram.ts
```ts
export async function sendTelegramMessage({ text, parseMode = 'HTML' })
// Берёт BOT_TOKEN и CHAT_ID из:
// 1. SiteSettings (tgBotToken, tgChatId)
// 2. process.env.TG_BOT_TOKEN, TG_CHAT_ID

export function formatLeadMessage(data): string
// Форматирует красивое HTML сообщение для Telegram
```

---

## 9. lib/payload.ts — fast-fail паттерн

```ts
export async function getPayloadClient() {
  if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI not set')
  }
  return getPayload({ config: payloadConfig })
}
```

**Важно:** ВСЕ вызовы `getPayloadClient()` на страницах обёрнуты в `try/catch`:
```ts
try {
  const payload = await getPayloadClient()
  const result = await payload.findGlobal({ slug: 'site-settings' })
  s = result
} catch { /* использовать дефолты */ }
```

---

## 10. payload.config.ts

```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nextPayload } from '@payloadcms/next'

export default buildConfig({
  collections: [Users, Media, Products, Cases, Reviews, Advantages, Leads, Blog],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    push: !process.env.DATABASE_URI ? false : true,  // НЕ работает для новых колонок на VPS!
  }),
  editor: lexicalEditor(),
  admin: { meta: { titleSuffix: ' — GMLB Admin' } },
  typescript: { outputFile: 'payload-types.ts' },
  sharp,
})
```

---

## 11. VPS Инфраструктура

### Сервер
- **Hoster:** Beget VPS
- **IP:** 194.156.119.167
- **Ресурсы:** 1 CPU, 3GB RAM, 15GB SSD
- **OS:** Ubuntu (Node.js 20)
- **Путь проекта:** `/var/www/gmlb-site`

### Docker контейнеры (уже запущены)
| Контейнер | Назначение | Порт |
|-----------|-----------|------|
| n8n-postgres-1 | PostgreSQL 16 (основной) | 127.0.0.1:5432 |
| n8n-traefik-1 | Reverse proxy + SSL | 80, 443 |
| n8n-n8n-1 | n8n автоматизация | 5678 |
| excalidraw | Доска | 8090 |

### PostgreSQL (через Docker)
```
DB: gmlb
User: gmlb
Password: Islam2005
Host: 127.0.0.1:5432 (Docker proxy)
```

Подключение через:
```bash
docker exec -it n8n-postgres-1 psql -U gmlb -d gmlb -c "SQL запрос"
```

### Traefik (HTTPS)
- Файл конфига: `/opt/beget/n8n/traefik-dynamic/gmlb.yml`
- Роутинг: `gmlb.ru` → `http://172.17.0.1:4444`
- SSL: автоматически от Let's Encrypt
- **Nginx НЕ используется** — Traefik занимает 80/443

### PM2
```bash
pm2 start npm --name "gmlb-site" -- start   # запуск
pm2 restart gmlb-site                         # перезапуск
pm2 logs gmlb-site --lines 50                 # логи
pm2 status                                    # статус
```

### .env.local на VPS
```
PAYLOAD_SECRET=gmlb_super_secret_key_2026_payload_cms_x7k9m2
DATABASE_URI=postgresql://gmlb:Islam2005@127.0.0.1:5432/gmlb
NEXT_PUBLIC_SITE_URL=https://gmlb.ru
NEXT_PUBLIC_TELEGRAM_MANAGER=@gmlb_automation
```

---

## 12. Деплой — пошаговая инструкция

### Локально
```bash
git add -A
git commit -m "описание изменений"
git push
```

### На VPS
```bash
cd /var/www/gmlb-site
git pull
NODE_OPTIONS="--max-old-space-size=2048" NEXT_TELEMETRY_DISABLED=1 npm run build
pm2 restart gmlb-site
```

### Если добавляли новые поля в коллекции/SiteSettings
**ВАЖНО: `push: true` НЕ работает на этом VPS!**

Для text/textarea полей добавить колонку вручную:
```bash
docker exec -it n8n-postgres-1 psql -U gmlb -d gmlb -c \
  "ALTER TABLE \"site_settings\" ADD COLUMN IF NOT EXISTS \"col_name\" character varying DEFAULT 'default value';"
```

Для array полей создать таблицу вручную:
```bash
docker exec -it n8n-postgres-1 psql -U gmlb -d gmlb -c "
CREATE TABLE IF NOT EXISTS \"site_settings_array_name\" (
  \"id\" serial PRIMARY KEY,
  \"_order\" integer NOT NULL,
  \"_parent_id\" integer NOT NULL REFERENCES \"site_settings\"(\"id\") ON DELETE CASCADE,
  \"field_name\" text NOT NULL
);
CREATE INDEX IF NOT EXISTS \"idx_order\" ON \"site_settings_array_name\" (\"_order\");
CREATE INDEX IF NOT EXISTS \"idx_parent\" ON \"site_settings_array_name\" (\"_parent_id\");
"
```

---

## 13. Патчи на VPS (Node 20 совместимость)

**ВАЖНО: при `npm install` патчи слетают — переприменять!**

### Патч 1: undici/cachestorage.js
```
Файл: /var/www/gmlb-site/node_modules/undici/lib/web/cache/cachestorage.js
Замена: webidl.illegalConstructor() → // patched
```

### Патч 2: payload/loadEnv.js
```
Файл: /var/www/gmlb-site/node_modules/payload/dist/bin/loadEnv.js
Заменить весь файл на кастомный .env.local загрузчик:
```
```js
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
export function loadEnv(dir) {
  const envPath = join(dir || process.cwd(), '.env.local');
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}
```

---

## 14. Миграции Payload CMS

```bash
cd /var/www/gmlb-site

# Создать миграцию (интерактивно — выбирать "+ create column")
NODE_OPTIONS="--import tsx" npx payload migrate:create --name=название

# Применить
NODE_OPTIONS="--import tsx" npx payload migrate

# Перезапустить
pm2 restart gmlb-site
```

---

## 15. next.config.ts

```ts
import { withPayload } from '@payloadcms/next/withPayload'

const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  typescript: { ignoreBuildErrors: true },  // только на VPS
  eslint: { ignoreDuringBuilds: true },      // только на VPS
}

export default withPayload(config)
```

---

## 16. Как сделать второй такой же сайт

### Шаг 1: Создать Next.js проект
```bash
npx create-next-app@latest my-site --typescript --tailwind --app
cd my-site
```

### Шаг 2: Установить зависимости
```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
npm install framer-motion lucide-react sonner sharp graphql sass
npm install -D tw-animate-css
```

### Шаг 3: Настроить Payload
```bash
npx create-payload-app@latest
# выбрать: blank, postgres
```
Скопировать `payload.config.ts`, `collections/`, `globals/` из GMLB.

### Шаг 4: Настроить Tailwind v4
Удалить `tailwind.config.ts`. В `globals.css` использовать `@theme` директиву с цветами GMLB.

### Шаг 5: Скопировать дизайн-систему
- `app/(frontend)/globals.css` — все переменные, классы, анимации
- `lib/renderGreen.tsx` — утилита зелёного текста
- `components/layout/Header.tsx`, `Footer.tsx`

### Шаг 6: Создать секции
Скопировать и адаптировать из `components/sections/`.
Каждая секция принимает пропсы из SiteSettings.

### Шаг 7: Настроить page.tsx
```ts
export const revalidate = 30  // ISR кэш 30 сек

export default async function HomePage() {
  let s = null
  try {
    const payload = await getPayloadClient()
    s = await payload.findGlobal({ slug: 'site-settings' })
  } catch {}

  return <> <Hero {...propsFromS} /> ... </>
}
```

### Шаг 8: PostgreSQL на VPS
```bash
# В Docker контейнере PostgreSQL
docker exec -it postgres psql -U root -d postgres -c "
CREATE USER newsite WITH PASSWORD 'password';
CREATE DATABASE newsite OWNER newsite;
GRANT ALL PRIVILEGES ON DATABASE newsite TO newsite;
"
```

### Шаг 9: Traefik для домена
Создать файл `/opt/beget/n8n/traefik-dynamic/newsite.yml`:
```yaml
http:
  routers:
    newsite:
      rule: "Host(`newsite.ru`)"
      service: newsite
      entryPoints: [websecure]
      tls: { certResolver: letsencrypt }
  services:
    newsite:
      loadBalancer:
        servers: [{ url: "http://172.17.0.1:PORT" }]
```

### Шаг 10: PM2 запуск
```bash
cd /var/www/newsite
npm run build
pm2 start npm --name "newsite" -- start
```

---

## 17. Известные проблемы и решения

| Проблема | Причина | Решение |
|----------|---------|---------|
| "Nothing found" в SiteSettings | DB запрос падает из-за отсутствия колонки/таблицы | Добавить вручную через ALTER TABLE / CREATE TABLE |
| `push: true` не добавляет колонки | Баг совместимости на этом VPS | Всегда добавлять вручную через psql |
| `public/media` конфликт при git pull | media существует как файл | `rm -rf public/media && git pull` |
| Патчи слетают после npm install | node_modules перезаписывается | Переприменить вручную оба патча |
| prerender-manifest.json not found | Стартуем до окончания билда | Нормально, исчезает после нового билда |
| Failed to find Server Action | Стартуем со старым билдом | Исчезает после полного билда + pm2 restart |
| Видео не играет на iOS | Safari требует WebKit prefix | `WebkitTransform: translateZ(0)` + `playsInline` |
| CMS изменения не появляются | ISR кэш | `revalidate = 30` или `pm2 restart` |

---

## 18. SEO настройки

- **sitemap.xml:** `app/sitemap.ts` — динамически генерирует все продукты + страницы
- **metadata:** в каждом layout.tsx / page.tsx через export metadata
- **OG image:** `opengraph-image.tsx` — динамический
- **robots.txt:** настроен через Next.js
- **JSON-LD:** через `components/seo/JsonLd.tsx`

Нужно сделать:
1. Google Search Console → добавить сайт → отправить sitemap
2. Яндекс Вебмастер → то же самое

---

## 19. Производительность

- ISR revalidate: 30сек (главная), 60сек (продукты), 5мин (каталог)
- Изображения: Next.js `<Image>` с avif/webp, 3 размера
- Видео: 6.7MB, autoPlay muted loop playsInline, 0.8x скорость
- `Promise.allSettled` для параллельных запросов к БД
- Backdrop-filter тяжёлый — нормально на B2B аудитории

---

*Последнее обновление: март 2026*
