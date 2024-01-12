"use client";
import { useState } from "react";
import Checkout from "./components/Checkout/Checkout";
import Product from "./components/Product/Product";
import { SearchItem } from "./models/search";
import { useAtom } from "jotai";
import { searchAtom } from "./variable";

export default function Home() {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // try {
    //   if (!searchQuery.trim()) {
    //     console.error("Search query is empty");
    //     return;
    //   }
    //   const response = await fetch(`/api/search?query=${searchQuery}`, {
    //     method: "GET",
    //   });
    //   if (!response.ok) {
    //     const { error } = await response.json();
    //     console.error("Server responded with an error:", error);
    //     return;
    //   }
    //   const { message: searchResults } = await response.json();
    //   if (Array.isArray(searchResults)) {
    //     const mappedResults = searchResults.map(
    //       (result) => new SearchItem(result)
    //     );
    //     setSearchResults(mappedResults);
    //   } else {
    //     console.error(
    //       "Invalid data structure received from the server:",
    //       searchResults
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error fetching search results:", error.message);
    // }
  };

  return (
    <>
      <div className="mt-10 mx-10 flex items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search Here"
          className="border-2 border-black rounded-md p-2 outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white rounded-md p-2 text-center"
        >
          Search
        </button>
      </div>
      <div className="p-10 font-nunito flex flex-col sm:flex-row items-start justify-center gap-5">
        <Product />
        <Checkout />
      </div>
    </>
  );
}
