import React, { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import { useStoreContext } from "../context/Store";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useStoreContext();
  const VerifyPayment = async () => {
    let response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    VerifyPayment();
  }, []);
  return (
    <div className="container pt-20 min-h-screen">
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-9 h-9 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Verify;
