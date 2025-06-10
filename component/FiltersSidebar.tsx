import { useState, useEffect } from 'react';
import useFilterStore from '../store/filterStore';

const priceOptions = {
  min: 0,
  max: 20000,
};

const allCities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad'];
const allStyles = ['Outdoor', 'Studio', 'Candid', 'Indoor', 'Traditional'];

export default function FiltersSidebar() {
  const {
    priceRange,
    setPriceRange,
    rating,
    setRating,
    styles,
    setStyles,
    city,
    setCity,
    resetFilters,
  } = useFilterStore();

  const [localMin, setLocalMin] = useState<number>(priceOptions.min);
  const [localMax, setLocalMax] = useState<number>(priceOptions.max);

  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  const updatePrice = () => {
    setPriceRange([localMin, localMax]);
  };

  const handleReset = () => {
    resetFilters();
    setLocalMin(priceOptions.min);
    setLocalMax(priceOptions.max);
  };

  return (
    <div className="p-4 border rounded-lg mb-6 shadow bg-amber-50 text-black">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

 
      <div className="mb-4">
        <h3 className="font-semibold">Price Range (₹)</h3>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            onBlur={updatePrice}
            placeholder="Min"
            className="w-1/2 p-1 border rounded"
            min={priceOptions.min}
            max={priceOptions.max}
          />
          <span>to</span>
          <input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            onBlur={updatePrice}
            placeholder="Max"
            className="w-1/2 p-1 border rounded"
            min={priceOptions.min}
            max={priceOptions.max}
          />
        </div>
      </div>

   
      <div className="mb-4 bg-amber-100 text-black">
        <h3 className="font-semibold border-2 text-center">Minimum Rating</h3>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-1  rounded mt-2"
        >
          <option value={0}>Any</option>
          <option value={3}>3+ stars</option>
          <option value={4}>4+ stars</option>
          <option value={4.5}>4.5+ stars</option>
          <option value={5}>5 stars only</option>
        </select>
      </div>

    
      <div className="mb-4">
        <h3 className="font-semibold">Styles</h3>
        {allStyles.map((style, idx) => (
          <div key={idx} className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={styles.includes(style)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setStyles([...styles, style]);
                  } else {
                    setStyles(styles.filter((s) => s !== style));
                  }
                }}
                className="form-checkbox"
              />
              <span className="ml-2">{style}</span>
            </label>
          </div>
        ))}
      </div>

  
      <div className="mb-4">
        <h3 className="font-semibold">City</h3>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-1 border rounded mt-2"
        >
          <option value="">All Cities</option>
          {allCities.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleReset}
        className="mt-2 w-full bg-amber-300 text-white py-2 rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
}
