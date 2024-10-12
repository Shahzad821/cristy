import React, { useEffect, useState } from "react";
import Navbar from "./component/navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./component/Footer/Footer";

import SearchedProducts from "./Pages/SearchedProducts";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import MyOrders from "./Pages/MyOrders";
import Verify from "./Pages/Verify";
import Contact from "./component/contact/Contact";
const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Navbar setShowSignup={setShowSignup} />

      {showSignup && <Signup setShowSignup={setShowSignup} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchedProducts />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer></Footer>
      <Toaster />
    </>
  );
};

export default App;
