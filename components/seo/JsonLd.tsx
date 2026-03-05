interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GMLB',
        url: siteUrl,
        description: 'Автоматизация бизнес-процессов. Telegram-боты, парсеры, RAG-решения.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          availableLanguage: 'Russian',
        },
      }}
    />
  )
}

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  priceFrom,
  priceTo,
}: {
  name: string
  description: string
  image?: string
  url: string
  priceFrom?: number
  priceTo?: number
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image,
        url,
        ...(priceFrom && {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'RUB',
            lowPrice: priceFrom,
            ...(priceTo && { highPrice: priceTo }),
          },
        }),
      }}
    />
  )
}

export function FAQJsonLd({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (!items.length) return null
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  )
}
