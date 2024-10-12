import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../context/Store";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    cartItems,
    addToCart,
    removeFromCart,
    totalCartItems,
    totalCartAmount,
  } = useStoreContext();

  const hasItems = Object.keys(cartItems).some((key) => cartItems[key] > 0);

  return (
    <div className="container pt-20 min-h-[80vh] bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        My Bag
      </h1>
      {hasItems ? (
        items.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div
                key={item._id}
                className="bg-[#8da9c4] shadow-md rounded-lg grid grid-cols-2  gap-4 text-center py-4 my-4 p-4 transition-transform transform hover:scale-[1.01]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain bg-gray-200 md:w-52 md:h-52 w-36 h-36 rounded-lg"
                />
                <div className="relative text-center flex flex-col items-center justify-center">
                  <p className="md:text-xl text-lg text-white md:font-semibold font-medium">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-50">{item.category}</p>
                  <p className="text-gray-100">
                    <span className="font-medium text-white">Price:</span> $
                    {Math.floor(item.price)}
                  </p>
                  <div className="flex md:gap-9 gap-4 w-full items-center md:w-1/2 lg:w-1/3   border-grey-50 text-white justify-center border rounded-full py-2 px-3 mt-2">
                    <IoIosRemove
                      className="text-xl cursor-pointer hover:text-red-600"
                      onClick={() => removeFromCart(item._id)}
                    />
                    <p className="font-medium">{cartItems[item._id]}</p>
                    <IoIosAdd
                      className="text-xl cursor-pointer hover:text-green-600"
                      onClick={() => addToCart(item._id)}
                    />
                  </div>
                  <p className="mt-2 text-gray-100">
                    <span className="font-medium text-white">Total:</span> $
                    {Math.floor(item.price * cartItems[item._id])}
                  </p>

                  <RxCross2
                    className="text-xl cursor-pointer hover:text-red-600 text-white absolute top-[-14px] right-[-10px]"
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-lg text-gray-500">No Products in the bag.</p>
        </div>
      )}
      <div className="bg-[#003049] p-4 md:w-1/2 rounded-lg my-6">
        <h2 className="text-white text-2xl font-bold">Summary:</h2>
        <div className="flex flex-col items-center text-start mt-4">
          <p className="text-white font-medium flex justify-between gap-6 mb-2 w-full">
            <span>Total Items:</span>
            {totalCartItems()}
          </p>
          <p className="text-white font-medium flex justify-between gap-6 mb-2 w-full">
            <span>Total Price:</span>
            {totalCartAmount() > 0 ? Math.floor(totalCartAmount()) : 0}$
          </p>
          <p className="text-white font-medium flex justify-between gap-6 mb-2 w-full">
            <span>Delivery Charges:</span>
            2$
          </p>
          <p className="text-[#f28482] font-bold flex justify-between gap-6 mb-2 w-full">
            <span>Grand Total:</span>
            {totalCartAmount() > 0 ? Math.floor(totalCartAmount() + 2) : 0}$
          </p>
        </div>
        <button
          className="mt-4 bg-[#f28482] text-white py-2 px-4 rounded-full hover:bg-[#e57e8d] transition"
          onClick={() => {
            navigate("/placeorder"), window.scrollTo(0, 0);
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
