import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Настройки' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Главный экран',
          fields: [
            { name: 'heroBadge', type: 'text', label: 'Текст бейджа', defaultValue: '✦ Автоматизация бизнеса нового поколения' },
            { name: 'heroHeading', type: 'text', label: 'Заголовок (часть 1)', defaultValue: 'Автоматизируйте' },
            { name: 'heroHeadingHighlight', type: 'text', label: 'Заголовок (выделенная часть)', defaultValue: 'бизнес-процессы' },
            { name: 'heroHeadingEnd', type: 'text', label: 'Заголовок (часть 2)', defaultValue: 'с помощью умных ботов' },
            { name: 'heroSubheading', type: 'textarea', label: 'Подзаголовок', defaultValue: 'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Профессиональные инструменты для малого бизнеса и e-commerce в России и СНГ.' },
            { name: 'stat1Value', type: 'text', label: 'Стат 1: значение', defaultValue: '50+' },
            { name: 'stat1Label', type: 'text', label: 'Стат 1: подпись', defaultValue: 'Продуктов' },
            { name: 'stat2Value', type: 'text', label: 'Стат 2: значение', defaultValue: '10+' },
            { name: 'stat2Label', type: 'text', label: 'Стат 2: подпись', defaultValue: 'Лидов в месяц' },
            { name: 'stat3Value', type: 'text', label: 'Стат 3: значение', defaultValue: '24/7' },
            { name: 'stat3Label', type: 'text', label: 'Стат 3: подпись', defaultValue: 'Автоматизация' },
          ],
        },
        {
          label: 'О компании',
          fields: [
            { name: 'aboutHeading', type: 'text', label: 'Заголовок', defaultValue: 'Мы делаем автоматизацию **доступной** для малого бизнеса', admin: { description: 'Оберните слово в **звёздочки** чтобы покрасить его в зелёный. Пример: **доступной**' } },
            { name: 'aboutDescription', type: 'textarea', label: 'Описание', defaultValue: 'GMLB — команда разработчиков, специализирующихся на автоматизации бизнес-процессов для малого бизнеса и e-commerce. Мы создаём инструменты, которые раньше были доступны только крупным компаниям.' },
            {
              name: 'aboutPoints',
              type: 'array',
              label: 'Пункты (галочки)',
              fields: [{ name: 'text', type: 'text', required: true, label: 'Текст пункта' }],
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'Иллюстрация' },
            { name: 'aboutStatValue', type: 'text', label: 'Бейдж: цифра', defaultValue: '50+' },
            { name: 'aboutStatLabel', type: 'text', label: 'Бейдж: подпись', defaultValue: 'продуктов к концу года' },
          ],
        },
        {
          label: 'Контакты',
          fields: [
            { name: 'telegram', type: 'text', label: 'Telegram username', defaultValue: 'gmlb_automation', admin: { description: 'Без @, только username' } },
            { name: 'email', type: 'email', label: 'Email', defaultValue: 'info@gmlb.ru' },
            { name: 'phone', type: 'text', label: 'Телефон', defaultValue: '+7 (XXX) XXX-XX-XX' },
          ],
        },
        {
          label: 'Telegram уведомления',
          fields: [
            { name: 'tgBotToken', type: 'text', label: 'Telegram Bot Token', admin: { description: 'Токен бота для получения заявок. Если не указан — берётся из .env TELEGRAM_BOT_TOKEN' } },
            { name: 'tgChatId', type: 'text', label: 'Telegram Chat ID', admin: { description: 'ID чата/группы для уведомлений. Если не указан — берётся из .env TELEGRAM_CHAT_ID' } },
          ],
        },
      ],
    },
  ],
}
