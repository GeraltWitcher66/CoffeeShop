export default function Loading() {
  return (
    <div className="container-page py-16" role="status" aria-live="polite">
      <span className="sr-only">در حال بارگذاری…</span>
      <div className="h-8 w-48 animate-pulse rounded-full bg-brown/10" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="aspect-[4/5] rounded-[1.75rem] bg-brown/10" />
            <div className="mt-4 h-3 w-2/3 rounded-full bg-brown/10" />
            <div className="mt-2 h-3 w-1/3 rounded-full bg-brown/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
