import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/Store";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const { totalCartAmount, token, items, url, cartItems } = useStoreContext();

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = items
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalCartAmount(),
    };

    if (paymentMethod === "paypal") {
      try {
        const response = await axios.post(url + "/api/order/place", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          toast.error("Error processing payment");
        }
      } catch (error) {
        toast.error("Error processing payment");
      }
    } else {
      navigate("/myorders");
      toast.success("Order placed successfully!");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.error("Please login to continue");
    } else if (totalCartAmount() === 0) {
      navigate("/cart");
      toast.error("Cart is empty");
    }
  }, [token]);

  return (
    <form
      className="flex flex-col container md:flex-row max-w-5xl mx-auto p-6 rounded-lg min-h-[100vh] pt-[100px]"
      onSubmit={placeOrder}
    >
      <div className="flex-1 md:mr-4 bg-slate-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <input
            required
            type="email"
            placeholder="Email address"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            required
            type="text"
            placeholder="Street"
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="State"
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Zip Code"
              name="zip"
              value={data.zip}
              onChange={onChangeHandler}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              required
              type="text"
              placeholder="Country"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <input
            required
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex-1 md:ml-4 mt-6 md:mt-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Cart Totals
          </h2>
          <div className="flex justify-between mb-2 text-white">
            <p>Subtotal</p>
            <p>${Math.floor(totalCartAmount())}</p>
          </div>
          <div className="flex justify-between mb-2 text-white">
            <p>Delivery Fee</p>
            <p>${Math.floor(totalCartAmount() === 0 ? 0 : 2)}</p>
          </div>
          <hr className="my-2 border-white opacity-50" />
          <div className="flex justify-between font-bold mb-4 text-white">
            <p>Total</p>
            <p>
              ${Math.floor(totalCartAmount() === 0 ? 0 : totalCartAmount() + 2)}
            </p>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Payment Method
          </h1>
          <form className="flex flex-col gap-4">
            <label
              htmlFor="cod"
              className="p-4 rounded-md mb-2 bg-blue-600 flex items-center text-base text-white cursor-pointer transition duration-200 hover:bg-blue-700"
            >
              <input
                type="radio"
                name="payment"
                id="cod"
                value="cod"
                className="hidden peer"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                required
              />
              <span className="w-5 h-5 border-2 border-white rounded-full mr-2 flex items-center justify-center peer-checked:bg-white peer-checked:border-transparent">
                {paymentMethod === "cod" && (
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                )}
              </span>
              COD (Cash on delivery)
            </label>
            <label
              htmlFor="paypal"
              className="p-4 rounded-md mb-2 bg-purple-600 flex items-center text-base text-white cursor-pointer transition duration-200 hover:bg-purple-700"
            >
              <input
                type="radio"
                name="payment"
                id="paypal"
                value="paypal"
                className="hidden peer"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                required
              />
              <span className="w-5 h-5 border-2 border-white rounded-full mr-2 flex items-center justify-center peer-checked:bg-white peer-checked:border-transparent">
                {paymentMethod === "paypal" && (
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                )}
              </span>
              Stripe (Credit/Debit)
            </label>
          </form>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200 font-semibold shadow-md"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
