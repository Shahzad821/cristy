import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Items from "../items/Items";
import { useStoreContext } from "../../context/Store";

const fetchData = async (category, url) => {
  try {
    const response = await axios.get(url + `/api/search?category=${category}`);
    return response.data.products;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const FeaturedProducts = () => {
  const { url } = useStoreContext();
  const [active, setActive] = useState("NEW ARRIVAL");

  // Map active category to a specific category string
  const categoryMap = {
    "NEW ARRIVAL": "mens-shoes",
    "BEST SELLING": "mens-watches",
    "TOP RATED": "womens-shoes",
  };

  const category = categoryMap[active];

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["featuredProducts", category],
    queryFn: () => fetchData(category, url),
    enabled: !!category,
  });

  const handleCategoryClick = (category) => {
    setActive(category);
  };

  return (
    <div className="container min-h-[70vh]">
      <h1 className="text-center font-bold text-2xl md:text-3xl mb-5">
        Featured Products
      </h1>
      <div className="flex justify-center items-center gap-9 mb-9">
        {Object.keys(categoryMap).map((category) => (
          <p
            key={category}
            className={`text-base font-semibold relative cursor-pointer ${
              active === category
                ? "after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-full after:h-[2px] after:bg-[#023047]"
                : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.toUpperCase().replace(/_/g, " ")}
          </p>
        ))}
      </div>
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
        <Items items={data} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
