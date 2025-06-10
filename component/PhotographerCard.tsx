import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";

interface PhotographerCardProps {
  photographer: {
    id: number;
    name: string;
    profilePic: string;
    location: string;
    price: number;
    rating: number;
    tags: string[];
  };
}

export default function PhotographerCard({ photographer }: PhotographerCardProps) {
  return (
    <div className="border-8 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <Image
        src={photographer.profilePic}
        alt={photographer.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-amber-200">{photographer.name}</h3>
        <p className="text-gray-600">{photographer.location}</p>
        <div className="flex items-center mt-1">
          <StarRating rating={photographer.rating} />
          <span className="ml-2">{photographer.rating.toFixed(1)}</span>
        </div>
        <p className="text-lg font-bold mt-2">₹{photographer.price}</p>

        <div className="mt-2 flex flex-wrap gap-1">
          {photographer.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
         href={`/photographers/${photographer.id}`}
          className="mt-4 inline-block text-blue-600"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
