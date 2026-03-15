const TELEGRAM_API = 'https://api.telegram.org/bot'

// Экранируем HTML-символы, чтобы пользователи не могли внедрить теги в Telegram-сообщение
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface SendMessageOptions {
  text: string
  parseMode?: 'HTML' | 'Markdown'
  // Переопределение токена и chatId (приоритет — CMS, fallback — .env)
  tokenOverride?: string
  chatIdOverride?: string
}

export async function sendTelegramMessage({
  text,
  parseMode = 'HTML',
  tokenOverride,
  chatIdOverride,
}: SendMessageOptions) {
  const token  = tokenOverride  || process.env.TELEGRAM_BOT_TOKEN
  const chatId = chatIdOverride || process.env.TELEGRAM_CHAT_ID

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
    `<b>Продукт:</b> ${escapeHtml(data.product || 'Главная')}`,
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `<b>Telegram:</b> ${data.telegram ? escapeHtml(data.telegram) : 'не указан'}`,
    `<b>Сообщение:</b> ${data.message ? escapeHtml(data.message) : '—'}`,
  ].join('\n')
}
