import { ChangeEvent, useEffect, useState } from "react";
import useFilterStore from "../store/filterStore";
import { debounce } from "lodash";

export default function SearchBar() {
  const [input, setInput] = useState<string>("");
  const setSearch = useFilterStore((state) => state.setSearch);

 
  const debouncedSetSearch = debounce((value: string) => {
    setSearch(value);
  }, 300); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, []);

  return (
    <div className="mb-4 bg-amber-50 text-black border-none" >
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search by name, city, or tag..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
