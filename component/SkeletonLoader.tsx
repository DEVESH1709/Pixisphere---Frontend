interface SkeletonLoaderProps {
  count: number;
}

export default function SkeletonLoader({ count }: SkeletonLoaderProps) {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((_, idx) => (
        <div
          key={idx}
          className="border rounded-lg overflow-hidden shadow animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
