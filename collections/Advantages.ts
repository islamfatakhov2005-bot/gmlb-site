import type { CollectionConfig } from 'payload'

export const Advantages: CollectionConfig = {
  slug: 'advantages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок преимущества' },
    { name: 'description', type: 'textarea', required: true, label: 'Описание' },
    {
      name: 'iconName',
      type: 'select',
      label: 'Иконка',
      defaultValue: 'Zap',
      options: [
        { label: 'Молния (быстро)', value: 'Zap' },
        { label: 'Код', value: 'Code2' },
        { label: 'Рост', value: 'TrendingUp' },
        { label: 'Щит (безопасность)', value: 'Shield' },
        { label: 'Поддержка', value: 'HeadphonesIcon' },
        { label: 'Часы (экономия времени)', value: 'Clock' },
        { label: 'Мозг (AI)', value: 'Brain' },
        { label: 'Бот', value: 'Bot' },
        { label: 'Звезда', value: 'Star' },
        { label: 'Сердце', value: 'Heart' },
      ],
    },
    {
      name: 'color',
      type: 'text',
      label: 'Цвет иконки (hex)',
      defaultValue: '#22C55E',
      admin: { description: 'Напр: #F59E0B, #8B5CF6, #06B6D4' },
    },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Порядок', admin: { position: 'sidebar' } },
  ],
}
