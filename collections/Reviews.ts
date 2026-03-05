import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'rating', 'isPublished'],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Имя клиента' },
    { name: 'role', type: 'text', required: true, label: 'Роль / Должность', admin: { description: 'Напр: Реселлер Apple, Москва' } },
    { name: 'text', type: 'textarea', required: true, label: 'Текст отзыва' },
    { name: 'rating', type: 'number', defaultValue: 5, min: 1, max: 5, label: 'Оценка (1-5)' },
    { name: 'initials', type: 'text', label: 'Инициалы (напр. АМ)', admin: { description: '2 буквы для аватара' } },
    {
      name: 'color',
      type: 'text',
      label: 'Цвет аватара (hex)',
      defaultValue: '#22C55E',
      admin: { description: 'Напр: #3B82F6, #8B5CF6, #10B981' },
    },
    { name: 'isPublished', type: 'checkbox', defaultValue: true, label: 'Опубликован', admin: { position: 'sidebar' } },
  ],
}
