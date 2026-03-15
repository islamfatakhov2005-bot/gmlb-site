import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Cases } from './collections/Cases'
import { Reviews } from './collections/Reviews'
import { Advantages } from './collections/Advantages'
import { Leads } from './collections/Leads'
import { Blog } from './collections/Blog'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — GMLB Admin',
    },
  },

  collections: [Users, Media, Products, Cases, Reviews, Advantages, Leads, Blog],

  globals: [SiteSettings],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: !process.env.DATABASE_URI ? false : true,
  }),

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
