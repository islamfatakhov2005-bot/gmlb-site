import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getPayloadClient = () => {
  if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI not configured')
  }
  return getPayload({ config: configPromise })
}
