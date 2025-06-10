interface SortingProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function Sorting({ sortBy, setSortBy }: SortingProps) {
  return (
    <div className="mb-4">
      <label className="font-semibold mr-2">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-1 border rounded"
      >
        <option value="recent">Recently Added</option>
        <option value="price">Price: Low to High</option>
        <option value="rating">Rating: High to Low</option>
      </select>
    </div>
  );
}
