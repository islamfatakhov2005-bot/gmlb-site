import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { sendTelegramMessage, formatLeadMessage } from '@/lib/telegram'

// Простой rate limiter: IP → timestamp последнего запроса
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60_000 // 1 минута между заявками с одного IP

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const lastRequest = rateLimitMap.get(ip)
    if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: 'Слишком много запросов. Попробуйте через минуту.' },
        { status: 429 },
      )
    }

    const body = await request.json()

    // Honeypot: если заполнено скрытое поле — это бот
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // Валидация
    const { name, phone, telegram, message, productId, source } = body

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Укажите имя (минимум 2 символа)' }, { status: 400 })
    }

    const phoneClean = phone?.replace(/\D/g, '')
    if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 15) {
      return NextResponse.json({ error: 'Укажите корректный номер телефона' }, { status: 400 })
    }

    // Сохранение в БД через Payload
    const payload = await getPayloadClient()

    // Получаем название продукта (если указан)
    let productTitle: string | undefined
    if (productId) {
      try {
        const product = await payload.findByID({ collection: 'products', id: productId })
        productTitle = product.title
      } catch {
        // Продукт не найден — не критично
      }
    }

    await payload.create({
      collection: 'leads',
      data: {
        name: name.trim(),
        phone: phoneClean,
        telegram: telegram?.trim() || undefined,
        message: message?.trim() || undefined,
        product: productId || undefined,
        source: source || undefined,
        status: 'new',
      },
    })

    // Отправка уведомления в Telegram
    await sendTelegramMessage({
      text: formatLeadMessage({
        name: name.trim(),
        phone: phoneClean,
        telegram: telegram?.trim(),
        message: message?.trim(),
        product: productTitle,
      }),
    })

    // Обновляем rate limit
    rateLimitMap.set(ip, Date.now())

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /leads] Ошибка:', error)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
