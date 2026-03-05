import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GMLB — Автоматизация бизнеса'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0F',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Фоновый градиент */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.15)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '30%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.1)',
            filter: 'blur(80px)',
          }}
        />

        {/* Логотип */}
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 'bold', marginBottom: 24 }}>
          <span style={{ color: '#3B82F6' }}>G</span>
          <span>MLB</span>
        </div>

        {/* Подзаголовок */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Автоматизация бизнес-процессов
        </div>

        <div
          style={{
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.4)',
            marginTop: 16,
          }}
        >
          Telegram-боты · Парсеры · RAG-решения · Чат-боты
        </div>
      </div>
    ),
    { ...size },
  )
}
