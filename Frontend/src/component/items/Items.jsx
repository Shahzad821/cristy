import React, { useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalf } from "react-icons/fa";
import { useStoreContext } from "../../context/Store";

const Items = ({ items }) => {
  const { addToCart, removeFromCart, cartItems } = useStoreContext();

  const handleCartToggle = useCallback(
    (item) => {
      if (cartItems[item._id]) {
        removeFromCart(item._id);
      } else {
        addToCart(item._id);
      }
    },
    [cartItems, addToCart, removeFromCart]
  );

  return (
    <div className="container my-5">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
        {items?.map((item) => (
          <div
            key={item._id}
            className="border-2 border-gray-200 p-2 rounded-md hover:scale-[1.01] ease-in transition-all"
            data-aos="zoom-in"
            data-aos-duration="2000"
            data-aos-delay="500"
            data-aos-easing="ease-in-out"
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-contain rounded-md"
              style={{ backgroundColor: "rgba(141, 169, 196, 0.3)" }}
            />
            <div>
              <p className="text-xs font-medium tracking-tighter text-[#003566]">
                {item.category}
              </p>
              <p className="text-sm font-medium">
                {item.name.length > 15
                  ? `${item.name.slice(0, 15)}..`
                  : item.name}
              </p>
              <p className="flex gap-1 text-yellow-500 text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalf />
              </p>
              <p className="text-sm">{Math.floor(item.price)}$</p>
              <div className="flex justify-center w-full items-end">
                <button
                  onClick={() => handleCartToggle(item)}
                  className={`${
                    cartItems[item._id] ? "bg-red-600" : "bg-blue-800"
                  } text-white w-full py-2 text-base rounded-full mx-auto ease-in transition-all`}
                >
                  {cartItems[item._id] ? "Remove" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
