"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FiltersSidebar from "@/component/FiltersSidebar";
import PhotographerCard from "@/component/PhotographerCard";
import SkeletonLoader from "@/component/SkeletonLoader";
import SearchBar from "@/component/SearchBar";
import Sorting from "@/component/Sorting";
import LoadMoreButton from "@/component/LoadMoreButton";
import useFilterStore from "@/store/filterStore";
import NavigationBar from "@/component/NavigationBar";

interface Photographer {
  id: number;
  name: string;
  city: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  profilePic: string;
  createdAt: string;
}

export default function HomePage() {
  const [allPhotos, setAllPhotos] = useState<Photographer[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const { priceRange, rating, styles, city, search } = useFilterStore();
  const [sortBy, setSortBy] = useState<string>("recent");

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3001/photographers");
        setAllPhotos(res.data);
      } catch (error) {
        console.error("Error fetching photographers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const getFilteredPhotos = () => {
    const searchLower = search.trim().toLowerCase();

    return allPhotos.filter((p) => {
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      const ratingMatch = p.rating >= rating;
      const stylesMatch = styles.length === 0 || styles.every((style) => p.styles.includes(style));
      const cityMatch = city === "" || p.location.toLowerCase() === city.toLowerCase();
      const searchMatch =
        searchLower === "" ||
        p.name.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      return priceMatch && ratingMatch && stylesMatch && cityMatch && searchMatch;
    });
  };

  useEffect(() => {
    let filtered = getFilteredPhotos();

    // Sorting
    if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setPage(1);
    setDisplayedPhotos(filtered.slice(0, pageSize));
  }, [allPhotos, priceRange, rating, styles, city, search, sortBy]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize;
    const filtered = getFilteredPhotos();
    const newItems = filtered.slice(start, start + pageSize);
    setDisplayedPhotos((prev) => [...prev, ...newItems]);
    setPage(nextPage);
  };

  const filteredLength = getFilteredPhotos().length;

  return (
  <>
  <NavigationBar />

  <div className="pt-20 bg-gray-900 flex">

    <aside className="hidden md:block w-1/4 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-4 bg-gray-800">
      <FiltersSidebar />
    </aside>


    <main className="w-full md:w-3/4 md:pl-6 relative">
  
      <div className="bg-gray-900 p-2 border-b border-gray-700">
        <SearchBar />
        <Sorting sortBy={sortBy} setSortBy={setSortBy} />
      </div>

   
      {loading ? (
        <SkeletonLoader count={pageSize} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {displayedPhotos.length > 0 ? (
            displayedPhotos.map((photo) => (
              <PhotographerCard key={photo.id} photographer={photo} />
            ))
          ) : (
            <div className="text-center col-span-full text-gray-500 py-10">
              No photographers found.
            </div>
          )}
        </div>
      )}

      {!loading && displayedPhotos.length < filteredLength && (
        <div className="p-4">
          <LoadMoreButton onClick={handleLoadMore} />
        </div>
      )}
    </main>
  </div>
</>

  );
}
