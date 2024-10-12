import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import Items from "../component/items/Items";
import { useStoreContext } from "../context/Store";

const fetchItems = async (url) => {
  const response = await fetch(`${url}/api/items/get`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.items;
};

const Products = () => {
  const { url } = useStoreContext();
  const {
    data: items = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: () => fetchItems(url),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  return (
    <div className="container pt-[70px]">
      <h1 className="font-semibold mt-2 text-xl">Products:</h1>
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
          <div className="w-9 h-9 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-700">Loading items, please wait...</p>
        </div>
      )}
      {error && (
        <div className="text-center min-h-[50vh] text-black text-lg font-semibold">
          <span className="text-red-500">Oops! Something went wrong.</span>
          <p className="mt-2">{error.message}</p>
          <button
            onClick={refetch}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      )}
      {!isLoading && currentItems.length === 0 && (
        <div className="text-center">No items found.</div>
      )}
      {currentItems.length > 0 && <Items items={currentItems} />}
      {items.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={<span className="text-black hidden">Previous</span>}
          nextLabel={<span className="text-black">Next</span>}
          breakLabel={<span className="text-gray-500 ">...</span>}
          breakClassName="text-gray-500 "
          pageCount={Math.ceil(items.length / itemsPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="flex gap-2 items-center justify-center my-4"
          activeClassName="bg-blue-500 text-white rounded-md px-3 py-1"
          pageClassName="text-black rounded-md hover:bg-blue-200 px-3 py-1 transition duration-200"
          previousClassName="text-black rounded-md hover:bg-blue-200 px-3 py-1 transition duration-200"
          nextClassName="text-black rounded-md hover:bg-blue-200 px-3 py-1 transition duration-200"
          forcePage={currentPage}
          onClick={() => window.scrollTo(0, 0)}
        />
      )}
    </div>
  );
};

export default Products;
