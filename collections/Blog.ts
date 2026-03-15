import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isPublished', 'publishedAt'],
    description: 'Чтобы статья появилась на сайте: поставьте галочку «Опубликовано» и сохраните.',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Авто-проставляем дату публикации при первой публикации
        if (data.isPublished && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL (slug)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Содержание',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'Meta Description',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Тег',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: { position: 'sidebar' },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      label: 'Опубликовано',
      admin: { position: 'sidebar' },
    },
  ],
}
