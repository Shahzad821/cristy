import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Items from "../items/Items";
import { useStoreContext } from "../../context/Store";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url + `/api/items/get`);
    return response.data.items;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

const OurCollection = () => {
  const { url } = useStoreContext();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["collection"],
    queryFn: () => fetchData(url),
  });

  // Filter items based on categories
  const filteredItems = data?.filter(
    (item) => item.category === "mens-shirts" || item.category === "womens-bags"
  );

  return (
    <div className="container min-h-[70vh]">
      <h1 className="text-center font-extrabold text-2xl md:text-3xl mb-5 mt-5 font-dancing">
        Our Collections
      </h1>
      <p className="text-center text-base font-serif tracking-wide mb-5">
        {" "}
        Discover our collection of women’s shirts and bags, where style meets
        functionality. Each shirt features unique designs and comfortable fits,
        perfect for any occasion—from casual outings to professional settings.
        Complement your look with our chic bags, crafted with attention to
        detail and practical elegance. Whether you're dressing up or keeping it
        casual, our collection offers versatile pieces that empower you to
        express your individuality with confidence.
      </p>
      <div>
        {isLoading && (
          <div className="flex items-center justify-center h-[70vh] md:h-full w-full">
            <div className="w-9 h-9 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {isError && (
          <div className="text-center min-h-[50vh] text-black text-lg font-semibold">
            <span className="text-red-500">Error: {error.message}</span>
          </div>
        )}
        {filteredItems && filteredItems.length > 0 ? (
          <Items items={filteredItems} />
        ) : (
          !isLoading && <div className="text-center">No items found.</div>
        )}
      </div>
    </div>
  );
};

export default OurCollection;
