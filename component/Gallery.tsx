interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {images.map((img, idx) => (
        <div key={idx} className="rounded overflow-hidden border-4">
          <img
            src={img} 
            alt={`Gallery image ${idx + 1}`}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
