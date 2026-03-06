import type { GlobalConfig } from 'payload'

const GREEN_HINT = 'Оберните слово в **звёздочки** чтобы покрасить его в зелёный. Пример: **слово**'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Настройки' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🚀 Главный экран',
          fields: [
            { name: 'heroBadge', type: 'text', label: 'Текст бейджа', defaultValue: '✦ Автоматизация бизнеса нового поколения' },
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
          label: '📦 Продукты',
          fields: [
            { name: 'productsHeading', type: 'text', label: 'Заголовок', defaultValue: 'Решения для **вашего** бизнеса', admin: { description: GREEN_HINT } },
            { name: 'productsSubheading', type: 'text', label: 'Подзаголовок', defaultValue: 'Готовые инструменты автоматизации, которые экономят время и увеличивают прибыль' },
          ],
        },
        {
          label: '🏢 О компании',
          fields: [
            { name: 'aboutHeading', type: 'text', label: 'Заголовок', defaultValue: 'Мы делаем автоматизацию **доступной** для малого бизнеса', admin: { description: GREEN_HINT } },
            { name: 'aboutDescription', type: 'textarea', label: 'Описание', defaultValue: 'GMLB — команда разработчиков, специализирующихся на автоматизации бизнес-процессов для малого бизнеса и e-commerce. Мы создаём инструменты, которые раньше были доступны только крупным компаниям.' },
            {
              name: 'aboutPoints',
              type: 'array',
              label: 'Пункты (галочки)',
              fields: [{ name: 'text', type: 'text', required: true, label: 'Текст пункта' }],
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'Иллюстрация' },
            { name: 'aboutStatValue', type: 'text', label: 'Бейдж: цифра (напр. 50+)', defaultValue: '50+' },
            { name: 'aboutStatLabel', type: 'text', label: 'Бейдж: подпись', defaultValue: 'продуктов к концу года' },
          ],
        },
        {
          label: '📊 Кейсы',
          fields: [
            { name: 'casesHeading', type: 'text', label: 'Заголовок', defaultValue: '**Реальные** результаты', admin: { description: GREEN_HINT } },
            { name: 'casesSubheading', type: 'text', label: 'Подзаголовок', defaultValue: 'Как наши продукты помогают бизнесу расти и экономить время' },
          ],
        },
        {
          label: '⚡ Преимущества',
          fields: [
            { name: 'advantagesHeading', type: 'text', label: 'Заголовок', defaultValue: 'Наши **преимущества**', admin: { description: GREEN_HINT } },
            { name: 'advantagesSubheading', type: 'text', label: 'Подзаголовок', defaultValue: 'Мы не просто пишем код — мы решаем бизнес-задачи' },
          ],
        },
        {
          label: '⭐ Отзывы',
          fields: [
            { name: 'reviewsHeading', type: 'text', label: 'Заголовок', defaultValue: 'Что говорят **наши клиенты**', admin: { description: GREEN_HINT } },
          ],
        },
        {
          label: '📬 Обратная связь',
          fields: [
            { name: 'contactHeading', type: 'text', label: 'Заголовок', defaultValue: 'Готовы **автоматизировать** ваш бизнес?', admin: { description: GREEN_HINT } },
            { name: 'contactDescription', type: 'textarea', label: 'Описание', defaultValue: 'Оставьте заявку и мы свяжемся с вами в течение 2 часов. Обсудим ваши задачи и предложим оптимальное решение.' },
            { name: 'contactBullet1', type: 'text', label: 'Пункт 1', defaultValue: 'Ответим в Telegram за 15 минут' },
            { name: 'contactBullet2', type: 'text', label: 'Пункт 2', defaultValue: 'Бесплатная консультация 30 минут' },
            { name: 'contactBullet3', type: 'text', label: 'Пункт 3', defaultValue: 'Без обязательств и скрытых платежей' },
          ],
        },
        {
          label: '⚙️ Контакты и бот',
          fields: [
            { name: 'telegram', type: 'text', label: 'Telegram username', defaultValue: 'gmlb_automation', admin: { description: 'Без @, только username' } },
            { name: 'email', type: 'email', label: 'Email', defaultValue: 'info@gmlb.ru' },
            { name: 'phone', type: 'text', label: 'Телефон', defaultValue: '+7 (XXX) XXX-XX-XX' },
            { name: 'tgBotToken', type: 'text', label: 'Telegram Bot Token', admin: { description: 'Токен бота для получения заявок. Если не указан — берётся из .env' } },
            { name: 'tgChatId', type: 'text', label: 'Telegram Chat ID', admin: { description: 'ID чата для уведомлений. Если не указан — берётся из .env' } },
          ],
        },
      ],
    },
  ],
}
