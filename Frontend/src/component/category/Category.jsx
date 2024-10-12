import React from "react";
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="container  ">
      <div className="grid grid-cols-1 lg:grid-cols-2 py-10 gap-4">
        {/* Left Column: Women's Style */}
        <div
          className="flex  bg-[#ddb892] rounded-md overflow-hidden h-full w-full px-2"
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          <img
            src="src/assets/women.png"
            alt="Women's Style"
            className="object-cover h-full w-1/2 self-end"
          />
          <div className="p-4 flex flex-col justify-center items-center text-right w-full">
            <p className="text-base font-semibold text-blue-800 tracking-tighter">
              New Arrivals
            </p>
            <p className="text-2xl font-bold">Women's Style</p>
            <p className="text-sm font-semibold mt-3">UP TO 70% OFF</p>
            <button
              className="mt-4 text-sm bg-transparent border-black hover:border-2 border-2 md:w-1/2 w-full  font-medium text-black py-2 rounded-full transition-all ease-in hover:bg-black hover:text-white "
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Column: Categories Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
          data-aos="flip-up"
          data-aos-duration="2000"
        >
          {/* Handbag */}
          <div className="flex bg-[#e29578] rounded-md px-2 items-center  justify-evenly w-full p-2">
            <div className="ml-4 ">
              <span className="bg-blue-800 text-white text-[12px] rounded-sm">
                25% OFF
              </span>
              <p className="text-white font-semibold text-lg mt-2">Handbag</p>
              <button
                className="flex items-center text-white font-medium mt-2 "
                onClick={() => navigate("/products")}
              >
                Shop Now <GrFormNext className="text-white text-xs ml-1" />
              </button>
            </div>
            <img
              src="src/assets/handbag.png"
              alt="Handbag"
              className="object-cover w-1/3 h-full scale-[1.2]"
            />
          </div>

          {/* Watch */}
          <div
            className="flex bg-[#7f5539] rounded-md p-2 items-center justify-evenly w-full"
            data-aos="flip-down"
            data-aos-duration="2000"
          >
            <div className="ml-4 ">
              <span className="bg-blue-800 text-white text-[12px]  rounded-sm">
                45% OFF
              </span>
              <p className="text-white font-semibold text-lg mt-2">Watch</p>
              <button
                className="flex items-center text-white font-medium mt-2"
                onClick={() => navigate("/products")}
              >
                Shop Now <GrFormNext className="text-white text-sm ml-1" />
              </button>
            </div>
            <img
              src="src/assets/watch.png"
              alt="Stylish Watch"
              className="object-contain w-1/3 h-full scale-[1.4]"
            />
          </div>

          {/* Accessories */}
          <div
            className="flex w-full md:col-span-2 bg-[#9c6644] p-2 rounded-md items-center text-white justify-between h-[220px]"
            data-aos="flip-right"
            data-aos-duration="1000"
          >
            <div className="ml-4">
              <span className="text-sm font-medium">Accessories</span>
              <p className="text-xl font-semibold mt-1">Men's T-Shirts</p>
              <p className="text-sm font-medium mb-2">Min. 40-80% off</p>
              <button
                className="flex items-center underline underline-offset-4"
                onClick={() => navigate("/products")}
              >
                Shop Now <GrFormNext className="text-white text-sm ml-1" />
              </button>
            </div>
            <img
              src="src/assets/tshirt.png"
              alt="Men's T-Shirts"
              className="object-contain w-1/2 h-full scale-[1.2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
