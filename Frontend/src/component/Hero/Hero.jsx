import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useStoreContext } from "../../context/Store";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const { url } = useStoreContext();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url + "/api/search?category=mens-shoes");
      if (response.data) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="lg:h-screen md:h-[60vh] h-auto lg:pt-0 w-full pt-[80px] bg-[#d8e2dc] lg:pb-0 pb-10 rounded-bl-lg rounded-br-lg lg:rounded-none">
      {loading ? (
        <div className="flex items-center justify-center h-[70vh] md:h-full w-full">
          <div className="w-9 h-9 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="w-full h-full  text-lg color-black font-medium flex items-center justify-center">
          {error}
        </p>
      ) : products.length > 0 ? (
        <div className="container w-full h-full relative">
          <Slider
            {...settings}
            className="h-full w-full content-center overflow-x-hidden"
            ref={sliderRef}
          >
            {products.map((item) => (
              <div key={item._id} className="slider-container w-full h-full">
                <div className="w-full h-full  text-black flex md:flex-row flex-col items-center gap-9 justify-evenly rounded-bl-md rounded-br-md relative">
                  <div
                    className="text-center w-full md:w-1/2"
                    data-aos={!loading ? "fade-right" : undefined}
                    data-aos-duration="3000"
                  >
                    <span className="font-dancing text-3xl text-[#023e8a]">
                      Season Sale
                    </span>
                    <p className="text-3xl lg:text-4xl font-bold mb-4">
                      Men's Fashion
                    </p>
                    <p className="text-base md:text-lg font-medium mb-9 font-serif">
                      Min. 30-70% Off
                    </p>
                    <div className="flex gap-8 justify-center">
                      <button className="bg-[#03045e] text-white border-black px-3 py-2 text-base font-medium hover:text-[#03045e] hover:bg-transparent border-2 hover:border-[#03045e] ease-in transition-all duration-300">
                        Shop Now
                      </button>
                      <button className="text-[#03045e] border-[#03045e] border-2 px-3 py-2 text-base font-medium hover:bg-[#03045e] hover:text-white ease-in transition-all">
                        Read More
                      </button>
                    </div>
                  </div>
                  <div
                    className="md:w-1/2 w-full flex items-center justify-center"
                    data-aos={!loading ? "fade-left" : undefined}
                    data-aos-duration="3000"
                  >
                    <img
                      src={item.image}
                      alt={`Image of ${item.name}`} // Improved alt text
                      className="w-[70%] h-full object-contain bg-custom-gradient rounded-custom-radius"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          {/* Left arrow */}
          <span
            className="absolute left-6 md:left-10 top-1/2 md:transform -translate-y-1/2 border-2 border-black p-1  rounded-full  hover:bg-[#0b2545] hover:text-white ease-in transition-all duration-300"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaArrowLeft className="md:text-xl text-sm" />
          </span>
          {/* Right arrow */}
          <span
            className="absolute right-6 md:right-10   top-1/2 md:transform -translate-y-1/2  border-2 border-black p-1  rounded-full hover:bg-[#0b2545] hover:text-white ease-in transition-all duration-300"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaArrowRight className="md:text-xl text-sm" />
          </span>
        </div>
      ) : (
        <p className="w-full h-full text-lg color-black font-semibold">
          No products found. Try checking back later or explore other
          categories!
        </p>
      )}
    </div>
  );
};

export default Hero;
