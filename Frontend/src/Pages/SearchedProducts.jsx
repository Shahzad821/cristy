import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Items from "../component/items/Items";
import { useStoreContext } from "../context/Store";

const fetchData = async (queryParam, url) => {
  try {
    const response = await axios.get(`${url}/api/search?name=${queryParam}`);
    return response.data.products;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

const SearchedProducts = () => {
  const { url } = useStoreContext();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["search", queryParam],
    queryFn: () => fetchData(queryParam, url),
    enabled: !!queryParam,
  });

  return (
    <div className="container">
      <div className="pt-[80px] min-h-[90vh]">
        <h2 className="text-2xl font-semibold ">Searched Products:</h2>
        <div>
          {isLoading && (
            <div className="flex items-center justify-center  h-[80vh] w-full">
              <div
                className="w-9 h-9 border-4 border-black border-t-transparent rounded-full animate-spin"
                aria-label="Loading..."
              ></div>
            </div>
          )}
          {isError && (
            <div className="text-center min-h-[50vh] text-black text-lg font-semibold">
              <span className="text-red-500">Error: {error.message}</span>
            </div>
          )}
          {data && data.length === 0 && (
            <div className="text-center min-h-[50vh] text-black text-lg font-semibold flex items-center justify-center">
              <span>No products found for your search.</span>
            </div>
          )}
          {data && data.length > 0 && <Items items={data} />}
        </div>
      </div>
      <div className="text-end font-semibold text-base mt-4 ">
        Products:{data?.length}
      </div>
    </div>
  );
};

export default SearchedProducts;
