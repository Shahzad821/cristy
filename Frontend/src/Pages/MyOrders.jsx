import React, { useEffect, useState } from "react";

import axios from "axios";
import { GoPackageDependents } from "react-icons/go";
import { useStoreContext } from "../context/Store";

const MyOrders = () => {
  const { url, token } = useStoreContext();
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      let response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="myorders p-6 bg-gray-100 container mt-20 min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>
      <div className="grid grid-cols-1 gap-6">
        {data?.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            <GoPackageDependents className="text-2xl text-blue-500 mb-2" />
            <p className="mb-2">
              {order.items.map((item, index) => (
                <span key={index} className="text-gray-800 text-base">
                  {item.name} x {item.quantity}
                  {index < order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="text-lg font-semibold mb-2">
              ${Math.round(order.amount)}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Items: {order.items.length}
            </p>
            <p className="text-sm mb-4">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              ></span>
              <b className="ml-1">{order.status}</b>
            </p>
            <button className="mt-auto bg-blue-500 text-white py-2 px-4 self-center w-full rounded hover:bg-blue-600 md:w-1/2 lg:w-1/3">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
