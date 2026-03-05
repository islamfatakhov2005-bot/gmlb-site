export default function ProductLoading() {
  return (
    <div className="pt-20 lg:pt-24">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-pulse">
          {/* Текстовый скелетон */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-white/5 rounded-full" />
              <div className="h-6 w-16 bg-white/5 rounded-full" />
            </div>
            <div className="h-12 w-3/4 bg-white/5 rounded-lg" />
            <div className="h-6 w-full bg-white/5 rounded-lg" />
            <div className="h-6 w-2/3 bg-white/5 rounded-lg" />
            <div className="flex gap-4 mt-6">
              <div className="h-12 w-40 bg-white/5 rounded-xl" />
              <div className="h-12 w-48 bg-white/5 rounded-xl" />
            </div>
          </div>
          {/* Картинка скелетон */}
          <div className="aspect-video bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
