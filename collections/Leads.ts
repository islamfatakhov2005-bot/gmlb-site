import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'product', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Имя',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Телефон',
    },
    {
      name: 'telegram',
      type: 'text',
      label: 'Telegram',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Сообщение',
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      label: 'Продукт',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Источник',
      admin: {
        description: 'Страница, с которой пришла заявка',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Статус',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Новый', value: 'new' },
        { label: 'В работе', value: 'in-progress' },
        { label: 'Завершён', value: 'done' },
        { label: 'Спам', value: 'spam' },
      ],
    },
  ],
}
