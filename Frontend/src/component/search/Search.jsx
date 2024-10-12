import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ search, setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${inputValue}`);
    setSearch(false);
    setInputValue("");
  };

  return (
    <div className="container">
      {search && (
        <div className="absolute px-1 h-screen top-full right-0 left-0 bottom-0 flex items-start pt-10 justify-center bg-gray-500 z-50">
          <input
            type="text"
            value={inputValue}
            placeholder="Search"
            className="w-full max-w-md h-10 border border-gray-300 rounded px-2 focus:outline-none"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="ml-2 h-10 px-4 bg-blue-500 text-white rounded text-sm"
            onClick={() => {
              handleSearch();
              window.scrollTo(0, 0);
            }}
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
