import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isPublished', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название продукта' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL (slug)',
      admin: { position: 'sidebar', description: 'Латиница, дефисы' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Краткое описание',
      admin: { description: 'Для карточки на главной' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Обложка', admin: { description: 'Обложка карточки продукта. Рекомендуется: 800×500 px, JPG/PNG/WebP. Если не загружена — отображается иконка.' } },
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true, label: 'Тег' }],
    },
    {
      name: 'iconName',
      type: 'select',
      label: 'Иконка',
      defaultValue: 'Bot',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Бот', value: 'Bot' },
        { label: 'Поиск', value: 'Search' },
        { label: 'Мозг (AI)', value: 'Brain' },
        { label: 'Чат', value: 'MessageSquare' },
        { label: 'Обновление', value: 'RefreshCw' },
        { label: 'График', value: 'BarChart2' },
        { label: 'Слои', value: 'Layers' },
        { label: 'Корзина', value: 'ShoppingCart' },
        { label: 'Рост', value: 'TrendingUp' },
        { label: 'Молния', value: 'Zap' },
      ],
    },
    {
      name: 'color',
      type: 'text',
      label: 'Цвет (hex)',
      defaultValue: '#22C55E',
      admin: { position: 'sidebar', description: 'Напр: #22C55E, #8B5CF6' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Популярный', admin: { position: 'sidebar' } },
    { name: 'isPublished', type: 'checkbox', defaultValue: false, label: 'Опубликован', admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Обзор',
          fields: [{ name: 'overview', type: 'textarea', required: true, label: 'Обзор продукта' }],
        },
        {
          label: 'Боли',
          fields: [
            {
              name: 'pains',
              type: 'array',
              label: 'Проблемы клиента',
              fields: [{ name: 'text', type: 'text', required: true, label: 'Проблема' }],
            },
          ],
        },
        {
          label: 'Решение',
          fields: [{ name: 'solution', type: 'textarea', label: 'Как продукт решает проблему' }],
        },
        {
          label: 'Как работает',
          fields: [
            {
              name: 'howItWorks',
              type: 'array',
              label: 'Шаги',
              fields: [{ name: 'step', type: 'text', required: true, label: 'Шаг' }],
            },
          ],
        },
        {
          label: 'Тарифы',
          fields: [
            { name: 'priceFrom', type: 'number', label: 'Цена от (₽)', admin: { width: '50%' } },
            { name: 'priceTo', type: 'number', label: 'Цена до (₽)', admin: { width: '50%' } },
            {
              name: 'pricingPlans',
              type: 'array',
              label: 'Тарифные планы',
              fields: [
                { name: 'name', type: 'text', required: true, label: 'Название' },
                { name: 'price', type: 'text', required: true, label: 'Цена (напр. 15 000 ₽)' },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Что включено',
                  fields: [{ name: 'feature', type: 'text', required: true, label: 'Пункт' }],
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'array',
              label: 'Вопросы и ответы',
              fields: [
                { name: 'question', type: 'text', required: true, label: 'Вопрос' },
                { name: 'answer', type: 'textarea', required: true, label: 'Ответ' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'seoTitle', type: 'text', label: 'Meta Title' },
            { name: 'seoDescription', type: 'textarea', label: 'Meta Description' },
          ],
        },
      ],
    },
  ],
}
