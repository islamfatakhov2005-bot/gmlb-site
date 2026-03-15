import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const securityHeaders = [
  // Запрет встраивания сайта в iframe (защита от clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Запрет MIME-sniffing браузером
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Отправляем только origin в Referer-заголовке
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // XSS-фильтр (legacy, но всё ещё полезен для старых браузеров)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // HSTS: принудительный HTTPS на 2 года (включать только когда SSL настроен!)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Ограничиваем доступ к API браузера
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Только явно разрешённые домены для изображений
      { protocol: 'https', hostname: 'd2xsxph8kpxj0f.cloudfront.net' },
      // Локальные медиафайлы Payload CMS (localhost для разработки)
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  async headers() {
    return [
      {
        // Применяем ко всем маршрутам
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withPayload(nextConfig)
