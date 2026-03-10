export function SchemeCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full shimmer" />
        <div className="w-20 h-5 rounded-full shimmer" />
      </div>
      <div className="w-full h-5 rounded shimmer" />
      <div className="w-3/4 h-5 rounded shimmer" />
      <div className="w-32 h-8 rounded-xl shimmer" />
      <div className="w-full h-4 rounded shimmer" />
      <div className="w-5/6 h-4 rounded shimmer" />
      <div className="w-24 h-4 rounded shimmer mt-2" />
    </div>
  );
}

export function SchemeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, idx) => (
        <SchemeCardSkeleton key={String(idx)} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-yojna-bg pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="w-64 h-10 rounded-xl shimmer mb-4" />
        <div className="w-96 h-6 rounded shimmer mb-12" />
        <SchemeGridSkeleton count={9} />
      </div>
    </div>
  );
}
