"use client";

import { useEffect, useState } from "react";
import axios from "axios"
import StarRating from "@/component/StarRating";
import Gallery from "@/component/Gallery";
import ReviewList from "@/component/ReviewList";
import InquiryModal from "@/component/InquiryModal";
import useModalStore from "@/store/modalStore";
import { MapIcon } from "lucide-react";
import NavigationBar from "./NavigationBar";

interface Review {

  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  bio: string;
  styles: string[];
  tags: string[];
  portfolio: string[];
  reviews: Review[];
  rating: number;
}

export default function PhotographerProfile({ id }: { id: string }) {
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const openInquiry = useModalStore((state) => state.openInquiry);
  const closeInquiry = useModalStore((state) => state.closeInquiry);
  const isModalOpen = useModalStore((state) => state.inquiryOpen);

  useEffect(() => {
    axios
      .get<Photographer>(`${process.env.NEXT_PUBLIC_API_URL}/photographers/${id}`)
      .then((res) => setPhotographer(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);
   
  if (loading || !photographer) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">

  <header className="w-full shadow bg-black fixed top-0 left-0 right-0 z-50">
    <NavigationBar />
  </header>

  <main className="flex-1 max-w-4xl mx-auto px-4 pt-24 pb-6">
   
    <h1 className="text-4xl font-bold text-amber-300 text-center mb-2">{photographer.name}</h1>
    <p className="text-amber-300 text-center flex justify-center items-center gap-2 mb-2">
      <MapIcon className="w-5 h-5" />
      {photographer.location}
    </p>

    <div className="flex items-center justify-center gap-2 mb-4">
      <StarRating rating={photographer.rating} />
      <span className="text-gray-300">{photographer.reviews.length} reviews</span>
    </div>

    <p className="text-lg font-semibold text-center mb-4">Price: ₹{photographer.price}</p>
    <p className="text-center text-gray-300 mb-6">{photographer.bio}</p>

    <div className="mb-4">
      <h3 className="font-semibold text-amber-300 mb-1">Styles:</h3>
      <div className="flex flex-wrap gap-2">
        {photographer.styles.map((style, idx) => (
          <span
            key={idx}
            className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
          >
            {style}
          </span>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold text-amber-300 mb-1">Tags:</h3>
      <div className="flex flex-wrap gap-2">
        {photographer.tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

 
    <div className="mb-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-amber-200">Gallery</h2>
      <Gallery images={photographer.portfolio} />
    </div>

    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-amber-200">Reviews</h2>
      <ReviewList reviews={photographer.reviews} />
    </div>
    <button
      onClick={openInquiry}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Send Inquiry
    </button>

    {isModalOpen && (
      <InquiryModal onClose={closeInquiry} photographerName={photographer.name} />
    )}
  </main>
</div>

  );
}
