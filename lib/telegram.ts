const TELEGRAM_API = 'https://api.telegram.org/bot'

interface SendMessageOptions {
  text: string
  parseMode?: 'HTML' | 'Markdown'
}

export async function sendTelegramMessage({ text, parseMode = 'HTML' }: SendMessageOptions) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[Telegram] BOT_TOKEN или CHAT_ID не указаны, уведомление пропущено')
    return null
  }

  const url = `${TELEGRAM_API}${token}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Telegram] Ошибка отправки:', error)
    return null
  }

  return response.json()
}

export function formatLeadMessage(data: {
  name: string
  phone: string
  telegram?: string
  message?: string
  product?: string
}) {
  return [
    '🔔 <b>Новый лид</b>',
    '',
    `<b>Продукт:</b> ${data.product || 'Главная'}`,
    `<b>Имя:</b> ${data.name}`,
    `<b>Телефон:</b> ${data.phone}`,
    `<b>Telegram:</b> ${data.telegram || 'не указан'}`,
    `<b>Сообщение:</b> ${data.message || '—'}`,
  ].join('\n')
}
