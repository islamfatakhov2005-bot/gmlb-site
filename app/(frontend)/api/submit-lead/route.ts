import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { sendTelegramMessage, formatLeadMessage } from '@/lib/telegram'

// Простой rate limiter: IP → timestamp последнего запроса
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60_000 // 1 минута между заявками с одного IP

// Максимально допустимые длины полей
const MAX_NAME_LEN = 100
const MAX_TELEGRAM_LEN = 50
const MAX_MESSAGE_LEN = 2000
const MAX_SOURCE_LEN = 200

export async function POST(request: Request) {
  try {
    // --- Определяем IP клиента (берём первый из x-forwarded-for, затем x-real-ip) ---
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwarded?.split(',')[0].trim() || realIp || null

    // Rate limiting только для идентифицированных IP
    if (ip) {
      const lastRequest = rateLimitMap.get(ip)
      if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
        return NextResponse.json(
          { error: 'Слишком много запросов. Попробуйте через минуту.' },
          { status: 429 },
        )
      }
    }

    // --- Проверяем Content-Type ---
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Неверный формат запроса.' }, { status: 400 })
    }

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Некорректный JSON.' }, { status: 400 })
    }

    // Honeypot: если заполнено скрытое поле — это бот
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // --- Извлекаем и строго приводим типы полей ---
    const name      = typeof body.name      === 'string' ? body.name.trim()      : ''
    const phone     = typeof body.phone     === 'string' ? body.phone            : ''
    const telegram  = typeof body.telegram  === 'string' ? body.telegram.trim()  : ''
    const message   = typeof body.message   === 'string' ? body.message.trim()   : ''
    const source    = typeof body.source    === 'string' ? body.source.trim()    : ''
    const productId = typeof body.productId === 'string' ? body.productId        : undefined

    // --- Валидация ---
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Укажите имя (минимум 2 символа)' }, { status: 400 })
    }
    if (name.length > MAX_NAME_LEN) {
      return NextResponse.json({ error: `Имя слишком длинное (максимум ${MAX_NAME_LEN} символов)` }, { status: 400 })
    }

    const phoneClean = phone.replace(/\D/g, '')
    if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 15) {
      return NextResponse.json({ error: 'Укажите корректный номер телефона' }, { status: 400 })
    }

    if (telegram.length > MAX_TELEGRAM_LEN) {
      return NextResponse.json({ error: 'Telegram username слишком длинный' }, { status: 400 })
    }
    if (message.length > MAX_MESSAGE_LEN) {
      return NextResponse.json({ error: `Сообщение слишком длинное (максимум ${MAX_MESSAGE_LEN} символов)` }, { status: 400 })
    }

    // --- Сохранение в БД через Payload ---
    const payload = await getPayloadClient()

    // Читаем настройки CMS (токен бота и продукт — параллельно)
    const [settingsResult, productResult] = await Promise.allSettled([
      payload.findGlobal({ slug: 'site-settings' }),
      productId
        ? payload.findByID({ collection: 'products', id: productId })
        : Promise.resolve(null),
    ])

    const settings   = settingsResult.status === 'fulfilled' ? (settingsResult.value as any) : null
    const productDoc = productResult.status  === 'fulfilled' ? productResult.value            : null
    const productTitle: string | undefined = (productDoc as any)?.title

    // Приоритет: токен из CMS → fallback на .env
    const tokenOverride  = settings?.tgBotToken  || undefined
    const chatIdOverride = settings?.tgChatId     || undefined

    await payload.create({
      collection: 'leads',
      data: {
        name,
        phone: phoneClean,
        telegram: telegram || undefined,
        message: message || undefined,
        product: productId || undefined,
        source: source.slice(0, MAX_SOURCE_LEN) || undefined,
        status: 'new',
      },
    })

    // --- Отправка уведомления в Telegram ---
    await sendTelegramMessage({
      text: formatLeadMessage({
        name,
        phone: phoneClean,
        telegram: telegram || undefined,
        message: message || undefined,
        product: productTitle,
      }),
      tokenOverride,
      chatIdOverride,
    })

    // Обновляем rate limit только для идентифицированных IP
    if (ip) rateLimitMap.set(ip, Date.now())

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /leads] Ошибка:', error)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
