import type { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientType', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок кейса' },
    { name: 'clientType', type: 'text', label: 'Тип клиента', admin: { description: 'Напр: Реселлер Apple, Продавец WB' } },
    { name: 'description', type: 'textarea', required: true, label: 'Описание кейса' },
    {
      name: 'metrics',
      type: 'array',
      label: 'Ключевые метрики',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Метка' },
        { name: 'value', type: 'text', required: true, label: 'Значение' },
        {
          name: 'iconName',
          type: 'select',
          label: 'Иконка',
          defaultValue: 'TrendingUp',
          options: [
            { label: 'Рост', value: 'TrendingUp' },
            { label: 'Время', value: 'Clock' },
            { label: 'Деньги', value: 'DollarSign' },
            { label: 'Пользователи', value: 'Users' },
          ],
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      fields: [{ name: 'tag', type: 'text', required: true, label: 'Тег' }],
    },
    {
      name: 'color',
      type: 'text',
      label: 'Цвет акцента (hex)',
      defaultValue: '#22C55E',
      admin: { position: 'sidebar' },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      label: 'Связанный продукт',
      admin: { position: 'sidebar' },
    },
  ],
}
