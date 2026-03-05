export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full animate-spin"
          style={{ border: '2px solid rgba(34,197,94,0.2)', borderTopColor: '#22C55E' }}
        />
        <p className="text-sm" style={{ color: 'rgba(230,237,243,0.5)' }}>Загрузка...</p>
      </div>
    </div>
  )
}
