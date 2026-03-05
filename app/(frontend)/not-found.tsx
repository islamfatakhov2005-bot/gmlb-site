import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="grid-bg min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-extrabold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: '#E6EDF3' }}>Страница не найдена</h1>
        <p className="text-sm mb-8" style={{ color: 'rgba(230,237,243,0.55)' }}>
          Похоже, эта страница была перемещена или не существует
        </p>
        <Link href="/">
          <button className="btn-gradient">Вернуться на главную</button>
        </Link>
      </div>
    </div>
  )
}
