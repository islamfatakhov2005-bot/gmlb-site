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

        // ─────────────────────────────────────────
        // БРЕНДИНГ
        // ─────────────────────────────────────────
        {
          label: '🎨 Брендинг',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Логотип',
              admin: {
                description: 'Квадратная иконка рядом с текстом «GMLB.». Рекомендуется PNG или SVG с прозрачным фоном, оптимальный размер: 30×30 px. Если не загружена — отображается стандартная иконка-молния.',
              },
            },
            {
              name: 'logoText',
              type: 'text',
              label: 'Текст логотипа',
              defaultValue: 'GMLB',
              admin: {
                description: 'Текст рядом с иконкой/логотипом. Отображается если логотип не загружен, или вместе с ним.',
              },
            },
          ],
        },

        // ─────────────────────────────────────────
        // ХЕДЕР
        // ─────────────────────────────────────────
        {
          label: '📌 Хедер',
          fields: [
            {
              name: 'headerCtaText',
              type: 'text',
              label: 'Текст кнопки CTA',
              defaultValue: 'Консультация',
              admin: { description: 'Зелёная кнопка в правой части меню (desktop). На мобиле добавляется "Получить " перед текстом.' },
            },
            {
              name: 'headerCtaUrl',
              type: 'text',
              label: 'Ссылка кнопки CTA',
              defaultValue: '/contact',
              admin: { description: 'Куда ведёт кнопка. Используйте /contact или https://... для внешней ссылки.' },
            },
          ],
        },

        // ─────────────────────────────────────────
        // ГЛАВНЫЙ ЭКРАН
        // ─────────────────────────────────────────
        {
          label: '🚀 Главный экран',
          fields: [
            { name: 'heroBadge', type: 'text', label: 'Текст бейджа', defaultValue: '✦ Автоматизация бизнеса нового поколения' },
            { name: 'heroHeading', type: 'text', label: 'Заголовок (первая строка)', defaultValue: 'Автоматизация бизнеса', admin: { description: 'Первая строка большого заголовка. Вторая строка — анимированные слова ниже.' } },
            {
              name: 'heroCyclingWords',
              type: 'array',
              label: 'Анимированные слова (вторая строка)',
              admin: { description: 'Слова которые по очереди печатаются в зелёном цвете под заголовком' },
              fields: [{ name: 'word', type: 'text', required: true, label: 'Слово / фраза' }],
            },
            { name: 'heroSubheading', type: 'textarea', label: 'Подзаголовок', defaultValue: 'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Профессиональные инструменты для малого бизнеса и e-commerce в России и СНГ.' },
            { name: 'stat1Value', type: 'text', label: 'Стат 1: значение', defaultValue: '50+' },
            { name: 'stat1Label', type: 'text', label: 'Стат 1: подпись', defaultValue: 'Продуктов' },
            { name: 'stat2Value', type: 'text', label: 'Стат 2: значение', defaultValue: '10+' },
            { name: 'stat2Label', type: 'text', label: 'Стат 2: подпись', defaultValue: 'Лидов в месяц' },
            { name: 'stat3Value', type: 'text', label: 'Стат 3: значение', defaultValue: '24/7' },
            { name: 'stat3Label', type: 'text', label: 'Стат 3: подпись', defaultValue: 'Автоматизация' },
            {
              name: 'heroVideoUrl',
              type: 'text',
              label: 'URL фонового видео',
              defaultValue: '/media/hero-video.mp4',
              admin: {
                description: 'Путь к видео для фона главного экрана. Загрузите файл через Media и скопируйте URL. Рекомендуется MP4, тёмный фон, без звука.',
              },
            },
          ],
        },

        // ─────────────────────────────────────────
        // ПРОДУКТЫ
        // ─────────────────────────────────────────
        {
          label: '📦 Продукты',
          fields: [
            { name: 'productsHeading', type: 'text', label: 'Заголовок', defaultValue: 'Решения для **вашего** бизнеса', admin: { description: GREEN_HINT } },
            { name: 'productsSubheading', type: 'text', label: 'Подзаголовок', defaultValue: 'Готовые инструменты автоматизации, которые экономят время и увеличивают прибыль' },
          ],
        },

        // ─────────────────────────────────────────
        // О КОМПАНИИ
        // ─────────────────────────────────────────
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
            { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'Иллюстрация', admin: { description: 'Фото или иллюстрация в правой колонке. Рекомендуется: 600×400 px, JPG/PNG/WebP.' } },
            { name: 'aboutStatValue', type: 'text', label: 'Бейдж: цифра (напр. 50+)', defaultValue: '50+' },
            { name: 'aboutStatLabel', type: 'text', label: 'Бейдж: подпись', defaultValue: 'продуктов к концу года' },
            {
              name: 'aboutCtaText',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Обсудить проект',
              admin: { description: 'Текст зелёной кнопки под списком. Кнопка прокручивает страницу к форме контактов.' },
            },
          ],
        },

        // ─────────────────────────────────────────
        // КЕЙСЫ
        // ─────────────────────────────────────────
        {
          label: '📊 Кейсы',
          fields: [
            { name: 'casesHeading', type: 'text', label: 'Заголовок', defaultValue: '**Реальные** результаты', admin: { description: GREEN_HINT } },
            { name: 'casesSubheading', type: 'text', label: 'Подзаголовок', defaultValue: 'Как наши продукты помогают бизнесу расти и экономить время' },
          ],
        },

        // ─────────────────────────────────────────
        // ПРЕИМУЩЕСТВА
        // ─────────────────────────────────────────
        {
          label: '⚡ Преимущества',
          fields: [
            { name: 'advantagesHeading', type: 'text', label: 'Заголовок', defaultValue: 'Наши **преимущества**', admin: { description: GREEN_HINT } },
            { name: 'advantagesSubheading', type: 'text', label: 'Подзаголовок', defaultValue: 'Мы не просто пишем код — мы решаем бизнес-задачи' },
          ],
        },

        // ─────────────────────────────────────────
        // ОТЗЫВЫ
        // ─────────────────────────────────────────
        {
          label: '⭐ Отзывы',
          fields: [
            { name: 'reviewsHeading', type: 'text', label: 'Заголовок', defaultValue: 'Что говорят **наши клиенты**', admin: { description: GREEN_HINT } },
          ],
        },

        // ─────────────────────────────────────────
        // ОБРАТНАЯ СВЯЗЬ
        // ─────────────────────────────────────────
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

        // ─────────────────────────────────────────
        // ФУТЕР
        // ─────────────────────────────────────────
        {
          label: '🦶 Футер',
          fields: [
            {
              name: 'footerDescription',
              type: 'textarea',
              label: 'Описание компании',
              defaultValue: 'Автоматизация бизнеса для малого бизнеса и e-commerce. Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов.',
              admin: { description: 'Короткое описание под логотипом в левой колонке футера.' },
            },
            {
              name: 'footerProducts',
              type: 'array',
              label: 'Ссылки "Продукты" в футере',
              admin: { description: 'Список ссылок в колонке "Продукты". Используйте /products или /products/slug для конкретного продукта.' },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Название' },
                { name: 'href', type: 'text', required: true, label: 'Ссылка (напр. /products/telegram-bot)' },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────
        // КОНТАКТЫ И БОТ
        // ─────────────────────────────────────────
        {
          label: '⚙️ Контакты и бот',
          fields: [
            { name: 'telegram', type: 'text', label: 'Telegram username', defaultValue: 'gmlb_automation', admin: { description: 'Без @, только username. Отображается на сайте и в футере.' } },
            { name: 'email', type: 'email', label: 'Email', defaultValue: 'info@gmlb.ru' },
            { name: 'phone', type: 'text', label: 'Телефон', defaultValue: '+7 (XXX) XXX-XX-XX' },
            {
              name: 'tgBotToken',
              type: 'text',
              label: 'Telegram Bot Token',
              admin: {
                description: 'Токен бота (@BotFather). Если заполнен — используется вместо переменной TELEGRAM_BOT_TOKEN из .env.',
              },
            },
            {
              name: 'tgChatId',
              type: 'text',
              label: 'Telegram Chat ID',
              admin: {
                description: 'ID чата/группы для уведомлений о заявках. Если заполнен — используется вместо TELEGRAM_CHAT_ID из .env.',
              },
            },
          ],
        },

        // ─────────────────────────────────────────
        // SEO
        // ─────────────────────────────────────────
        {
          label: '🔍 SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: 'Заголовок сайта (title)',
              defaultValue: 'GMLB — Автоматизация бизнеса',
              admin: { description: 'Отображается во вкладке браузера и в результатах поиска. До 60 символов.' },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: 'Мета-описание (description)',
              defaultValue: 'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Автоматизация бизнес-процессов для малого бизнеса и e-commerce.',
              admin: { description: 'Краткое описание сайта для поисковиков и соцсетей. До 160 символов.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG-изображение',
              admin: { description: 'Картинка при публикации ссылки в соцсетях (ВКонтакте, Telegram). Рекомендуется: 1200×630 px, JPG/PNG.' },
            },
            {
              name: 'seoKeywords',
              type: 'text',
              label: 'Ключевые слова',
              admin: { description: 'Через запятую. Например: автоматизация бизнеса, telegram-бот, парсер маркетплейсов' },
            },
          ],
        },

        // ─────────────────────────────────────────
        // АНАЛИТИКА
        // ─────────────────────────────────────────
        {
          label: '📊 Аналитика',
          fields: [
            {
              name: 'yandexMetrikaId',
              type: 'text',
              label: 'Яндекс.Метрика — ID счётчика',
              admin: { description: 'Только цифры. Пример: 98765432. Если пусто — скрипт не подключается.' },
            },
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics 4 — Measurement ID',
              admin: { description: 'Формат G-XXXXXXXXXX. Если пусто — скрипт не подключается.' },
            },
          ],
        },

      ],
    },
  ],
}
