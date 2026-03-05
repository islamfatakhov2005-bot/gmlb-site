import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'd2xsxph8kpxj0f.cloudfront.net' },
      { protocol: 'https', hostname: '**' },
    ],
  },
}

export default withPayload(nextConfig)
